import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");
const reportsDir = path.join(root, "reports");
const reportPath = path.join(reportsDir, "content-update-audit-report.md");

const todayInput = process.env.CONTENT_AUDIT_DATE || new Date().toISOString().slice(0, 10);
const today = parseDate(todayInput);

const DEFAULT_CADENCE_DAYS = {
  evergreen: 180,
  "policy-sensitive": 90,
  "platform-update": 90,
  "news-brief": 30
};

const SENSITIVE_TOPICS = new Set(["ai-search"]);
const SENSITIVE_TAGS = ["规则", "政策", "合规", "Rufus", "Alexa", "AI搜索", "标题优化", "Item Highlights"];
const SENSITIVE_SLUG_PATTERNS = [/amazon/i, /rufus/i, /title-rule/i, /platform/i, /ai-search/i, /account-health/i];

fs.mkdirSync(reportsDir, { recursive: true });

function parseDate(value) {
  if (!value) return null;
  const normalized = String(value).trim().replace(/^["']|["']$/g, "");
  const date = new Date(`${normalized}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(date) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

function daysBetween(from, to) {
  if (!from || !to) return null;
  return Math.floor((to.getTime() - from.getTime()) / 86400000);
}

function stripQuotes(value) {
  return String(value || "").trim().replace(/^["']|["']$/g, "");
}

function parseArray(lines, index) {
  const values = [];
  for (let i = index + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.startsWith("  - ")) break;
    values.push(stripQuotes(line.replace(/^  -\s*/, "")));
  }
  return values;
}

function parseInlineArray(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  return trimmed
    .slice(1, -1)
    .split(",")
    .map((item) => stripQuotes(item))
    .filter(Boolean);
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const data = {};
  const lines = match[1].split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const scalar = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!scalar) continue;

    const [, key, rawValue] = scalar;
    if (rawValue === "") {
      data[key] = parseArray(lines, i);
      continue;
    }

    data[key] = parseInlineArray(rawValue) || stripQuotes(rawValue);
  }

  return data;
}

function hasSensitiveSignal(post) {
  const tags = Array.isArray(post.tags) ? post.tags : [];
  return (
    SENSITIVE_TOPICS.has(post.topic) ||
    tags.some((tag) => SENSITIVE_TAGS.some((keyword) => tag.includes(keyword))) ||
    SENSITIVE_SLUG_PATTERNS.some((pattern) => pattern.test(post.slug))
  );
}

function auditPost(post) {
  const updateType = post.updateType || "";
  const cadence = Number(post.reviewCadenceDays || DEFAULT_CADENCE_DAYS[updateType] || 180);
  const lastReviewed = parseDate(post.lastReviewed);
  const nextReviewDue = parseDate(post.nextReviewDue);
  const status = post.updateStatus || "";
  const isTracked = Boolean(updateType || status || lastReviewed || nextReviewDue);
  const sensitive = hasSensitiveSignal(post);

  const issues = [];
  if (sensitive && !isTracked) issues.push("高时效主题未设置更新标记");
  if (isTracked && !updateType) issues.push("缺 updateType");
  if (isTracked && !status) issues.push("缺 updateStatus");
  if (isTracked && !lastReviewed) issues.push("缺 lastReviewed");
  if (isTracked && !nextReviewDue) issues.push("缺 nextReviewDue");
  if (nextReviewDue && today > nextReviewDue) issues.push(`已过复核日期 ${formatDate(nextReviewDue)}`);
  if (lastReviewed && daysBetween(lastReviewed, today) > cadence) issues.push(`距离上次复核超过 ${cadence} 天`);
  if (["policy-sensitive", "platform-update", "news-brief"].includes(updateType) && !Array.isArray(post.sourceUrls)) {
    issues.push("高时效文章缺 sourceUrls");
  }

  let bucket = "ok";
  if (issues.some((issue) => issue.includes("已过复核日期") || issue.includes("超过"))) {
    bucket = "overdue";
  } else if (issues.length > 0) {
    bucket = "needs-review";
  } else if (isTracked && nextReviewDue && daysBetween(today, nextReviewDue) <= 14) {
    bucket = "upcoming";
  }

  return { ...post, updateType, status, lastReviewed, nextReviewDue, cadence, sensitive, isTracked, issues, bucket };
}

const posts = fs
  .readdirSync(postsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const slug = path.basename(file, ".md");
    const text = fs.readFileSync(path.join(postsDir, file), "utf8");
    const frontmatter = parseFrontmatter(text) || {};
    return { slug, ...frontmatter };
  })
  .map(auditPost)
  .sort((a, b) => {
    const priority = { overdue: 0, "needs-review": 1, upcoming: 2, ok: 3 };
    return priority[a.bucket] - priority[b.bucket] || a.slug.localeCompare(b.slug);
  });

const grouped = {
  overdue: posts.filter((post) => post.bucket === "overdue"),
  needsReview: posts.filter((post) => post.bucket === "needs-review"),
  upcoming: posts.filter((post) => post.bucket === "upcoming"),
  ok: posts.filter((post) => post.bucket === "ok")
};

function row(post) {
  const issueText = post.issues.length ? post.issues.join("；") : "无";
  return `| ${post.slug} | ${post.updateType || "-"} | ${post.status || "-"} | ${formatDate(post.lastReviewed) || "-"} | ${formatDate(post.nextReviewDue) || "-"} | ${issueText} |`;
}

function section(title, items) {
  const lines = [`## ${title}`, ""];
  if (!items.length) {
    lines.push("无。", "");
    return lines.join("\n");
  }
  lines.push("| slug | updateType | updateStatus | lastReviewed | nextReviewDue | 问题 |");
  lines.push("|---|---|---|---|---|---|");
  lines.push(...items.map(row));
  lines.push("");
  return lines.join("\n");
}

const report = [
  "# 内容更新审计报告",
  "",
  `- 审计日期：${formatDate(today)}`,
  `- 文章总数：${posts.length}`,
  `- 已设置更新标记：${posts.filter((post) => post.isTracked).length}`,
  `- 高时效主题文章：${posts.filter((post) => post.sensitive).length}`,
  `- 已过复核日期：${grouped.overdue.length}`,
  `- 需要补标记/补来源：${grouped.needsReview.length}`,
  `- 14 天内到期：${grouped.upcoming.length}`,
  "",
  section("已过复核日期", grouped.overdue),
  section("需要补标记或补来源", grouped.needsReview),
  section("14 天内到期", grouped.upcoming),
  "## 建议动作",
  "",
  "1. 先处理 `已过复核日期`：复核官方来源、更新正文、修改 `lastReviewed` 和 `nextReviewDue`。",
  "2. 再处理 `需要补标记或补来源`：为平台规则、AI 搜索、重点简报类文章补齐 `updateType`、`updateStatus`、`sourceUrls`。",
  "3. 每季度运行一次 `npm run content:update-audit`，并把报告归档到本季度执行报告里。",
  ""
].join("\n");

fs.writeFileSync(reportPath, report, "utf8");

console.log("Content update audit complete.");
console.log(`  posts checked: ${posts.length}`);
console.log(`  tracked posts: ${posts.filter((post) => post.isTracked).length}`);
console.log(`  sensitive posts: ${posts.filter((post) => post.sensitive).length}`);
console.log(`  overdue: ${grouped.overdue.length}`);
console.log(`  needs review: ${grouped.needsReview.length}`);
console.log(`  upcoming: ${grouped.upcoming.length}`);
console.log(`  report: ${reportPath}`);

if (grouped.overdue.length > 0) {
  process.exitCode = 1;
}
