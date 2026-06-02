import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const reportDir = path.join(root, "reports");
const reportPath = path.join(reportDir, "seo-audit-report.md");
const site = "https://amz.hao1234.top";

fs.mkdirSync(reportDir, { recursive: true });

function walk(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      files.push(...walk(full));
    } else if (item.endsWith(".html")) {
      files.push(full);
    }
  }

  return files;
}

function getMatch(html, regex) {
  const match = html.match(regex);
  return match ? String(match[1] || "").trim() : "";
}

function countMatch(html, regex) {
  return [...html.matchAll(regex)].length;
}

function toUrl(file) {
  let relative = path.relative(dist, file).replaceAll("\\", "/");

  if (relative === "index.html") return site + "/";
  if (relative.endsWith("/index.html")) {
    relative = relative.replace(/\/index\.html$/, "/");
    return site + "/" + relative;
  }

  return site + "/" + relative;
}

function checkLength(label, value, min, max) {
  const len = value.length;
  if (!value) return { ok: false, message: `${label} 缺失` };
  if (len < min) return { ok: false, message: `${label} 偏短：${len}` };
  if (len > max) return { ok: false, message: `${label} 偏长：${len}` };
  return { ok: true, message: `${label} 正常：${len}` };
}

const files = walk(dist);
const results = [];

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const url = toUrl(file);

  const title = getMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = getMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i);
  const canonical = getMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["'][^>]*>/i);

  const ogTitle = getMatch(html, /<meta\s+property=["']og:title["']\s+content=["']([^"']*)["'][^>]*>/i);
  const ogDescription = getMatch(html, /<meta\s+property=["']og:description["']\s+content=["']([^"']*)["'][^>]*>/i);
  const ogImage = getMatch(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']*)["'][^>]*>/i);

  const twitterCard = getMatch(html, /<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["'][^>]*>/i);

  const h1Count = countMatch(html, /<h1\b/gi);
  const h2Count = countMatch(html, /<h2\b/gi);

  const checks = [];

  checks.push(checkLength("title", title, 8, 70));
  checks.push(checkLength("description", description, 40, 170));

  if (h1Count !== 1) {
    checks.push({ ok: false, message: `H1 数量异常：${h1Count}` });
  } else {
    checks.push({ ok: true, message: "H1 数量正常：1" });
  }

  if (!canonical) {
    checks.push({ ok: false, message: "canonical 缺失" });
  } else if (!canonical.startsWith(site)) {
    checks.push({ ok: false, message: `canonical 域名异常：${canonical}` });
  } else {
    checks.push({ ok: true, message: "canonical 正常" });
  }

  checks.push(ogTitle ? { ok: true, message: "og:title 正常" } : { ok: false, message: "og:title 缺失" });
  checks.push(ogDescription ? { ok: true, message: "og:description 正常" } : { ok: false, message: "og:description 缺失" });
  checks.push(ogImage ? { ok: true, message: "og:image 正常" } : { ok: false, message: "og:image 缺失" });
  checks.push(twitterCard ? { ok: true, message: "twitter:card 正常" } : { ok: false, message: "twitter:card 缺失" });

  const pass = checks.filter((item) => item.ok).length;
  const fail = checks.length - pass;

  results.push({
    url,
    title,
    description,
    h1Count,
    h2Count,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    pass,
    fail,
    checks
  });
}

const robotsPath = path.join(dist, "robots.txt");
const sitemapIndexPath = path.join(dist, "sitemap-index.xml");

const robotsOk = fs.existsSync(robotsPath) && fs.readFileSync(robotsPath, "utf8").includes("Sitemap: https://amz.hao1234.top/sitemap-index.xml");
const sitemapOk = fs.existsSync(sitemapIndexPath) && fs.readFileSync(sitemapIndexPath, "utf8").includes("https://amz.hao1234.top/sitemap-0.xml");

const totalFail = results.reduce((sum, item) => sum + item.fail, 0);
const totalPass = results.reduce((sum, item) => sum + item.pass, 0);

let md = "";

md += "# 018｜站点 SEO 基础体检报告\n\n";
md += `生成时间：${new Date().toISOString()}\n\n`;
md += `站点：${site}\n\n`;

md += "## 一、总览\n\n";
md += `- 检查页面数：${results.length}\n`;
md += `- 通过项：${totalPass}\n`;
md += `- 问题项：${totalFail}\n`;
md += `- robots.txt：${robotsOk ? "PASS" : "FAIL"}\n`;
md += `- sitemap-index.xml：${sitemapOk ? "PASS" : "FAIL"}\n\n`;

md += "## 二、全站文件检查\n\n";
md += `- robots.txt：${robotsOk ? "正常" : "异常或缺失"}\n`;
md += `- sitemap-index.xml：${sitemapOk ? "正常" : "异常或缺失"}\n\n`;

md += "## 三、页面明细\n\n";

for (const item of results) {
  md += `### ${item.url}\n\n`;
  md += `- title：${item.title || "缺失"}\n`;
  md += `- description：${item.description || "缺失"}\n`;
  md += `- H1：${item.h1Count}\n`;
  md += `- H2：${item.h2Count}\n`;
  md += `- canonical：${item.canonical || "缺失"}\n`;
  md += `- og:title：${item.ogTitle || "缺失"}\n`;
  md += `- og:description：${item.ogDescription || "缺失"}\n`;
  md += `- og:image：${item.ogImage || "缺失"}\n`;
  md += `- twitter:card：${item.twitterCard || "缺失"}\n\n`;

  md += "检查结果：\n\n";
  for (const check of item.checks) {
    md += `- ${check.ok ? "PASS" : "FAIL"}：${check.message}\n`;
  }

  md += "\n";
}

md += "## 四、建议\n\n";

if (totalFail === 0 && robotsOk && sitemapOk) {
  md += "- 当前 SEO 基础项通过。下一步可以做结构化数据和 OG 分享图。\n";
} else {
  md += "- 优先修复 canonical、OG、twitter card、H1 数量异常。\n";
  md += "- 页面 description 太短或缺失的页面需要补充更明确的摘要。\n";
  md += "- og:image 缺失会影响微信、社群、搜索结果分享卡片展示。\n";
}

fs.writeFileSync(reportPath, md, "utf8");

console.log("SEO audit complete.");
console.log(`Pages checked: ${results.length}`);
console.log(`Pass: ${totalPass}`);
console.log(`Fail: ${totalFail}`);
console.log(`robots.txt: ${robotsOk ? "PASS" : "FAIL"}`);
console.log(`sitemap-index.xml: ${sitemapOk ? "PASS" : "FAIL"}`);
console.log(`Report: ${reportPath}`);

if (totalFail > 0 || !robotsOk || !sitemapOk) {
  process.exitCode = 1;
}