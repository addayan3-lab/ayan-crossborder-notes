import fs from "node:fs";
import path from "node:path";

const postsDir = path.resolve("src/content/posts");

const articleTypeMap = {
  "keyword-learning-path.md": "learning-path",
  "listing-learning-path.md": "learning-path",
  "ppc-learning-path.md": "learning-path",
  "review-learning-path.md": "learning-path",
  "ai-competitor-matrix.md": "method",
  "ai-keyword-table.md": "method",
  "ai-listing-optimization.md": "method",
  "ai-market-size-estimate.md": "method",
  "ai-operations-resource-pack.md": "tutorial",
  "ai-ppc-report-review.md": "method",
  "ai-review-analysis.md": "method",
  "amazon-ai-tools-review.md": "theory",
  "amazon-platform-rules-beginner.md": "method",
  "keyword-cleaning-method.md": "method",
  "keyword-search-volume-trap.md": "method",
  "keyword-source-4-types.md": "method",
  "listing-five-bullets.md": "method",
  "negative-review-listing-fix.md": "method",
  "new-product-ppc-week-one.md": "method",
  "review-analysis-matrix.md": "method",
  "selection-pain-reverse.md": "method",
  "sp-ad-structure.md": "method",
};

const caseUpdates = {
  "case-selection-seems-ok-dont-do.md": { articleType: "case-study", hookType: "案例复盘", featured: true, homepageSlot: "hot-practical", resourceSlug: "competitor-selection-matrix" },
  "case-supplier-can-make-dont-order.md": { articleType: "case-study", hookType: "避坑", featured: true, homepageSlot: "hot-practical" },
  "case-listing-traffic-no-conversion.md": { articleType: "case-study", hookType: "案例复盘", featured: true, homepageSlot: "hot-practical", resourceSlug: "listing-checklist" },
  "case-clicks-no-orders-image-price.md": { articleType: "case-study", hookType: "避坑", featured: true, homepageSlot: "hot-practical", resourceSlug: "listing-checklist" },
  "case-ppc-high-acos-dont-panic.md": { articleType: "case-study", hookType: "反常识", featured: true, homepageSlot: "hot-practical", resourceSlug: "ppc-weekly-review", openClassSlug: "ppc-week-one" },
  "case-auto-ads-300-search-terms.md": { articleType: "case-study", hookType: "数字冲击", featured: true, homepageSlot: "hot-practical", resourceSlug: "ppc-weekly-review" },
  "case-review-pain-reverse-improvement.md": { articleType: "case-study", hookType: "案例复盘", featured: true, homepageSlot: "hot-practical", resourceSlug: "review-pain-analysis" },
  "case-rating-42-qa-risk.md": { articleType: "case-study", hookType: "避坑", featured: true, homepageSlot: "hot-practical", resourceSlug: "review-pain-analysis" },
  "case-new-product-week-one-review.md": { articleType: "case-study", hookType: "数字冲击", featured: true, homepageSlot: "hot-practical", resourceSlug: "ppc-weekly-review", openClassSlug: "ppc-week-one" },
  "case-keyword-200-to-30-listing.md": { articleType: "case-study", hookType: "数字冲击", featured: true, homepageSlot: "hot-practical", resourceSlug: "keyword-cleaning-sheet" },
};

const resourceLinks = {
  "keyword-cleaning-method.md": { resourceSlug: "keyword-cleaning-sheet", openClassSlug: "keyword-to-listing" },
  "keyword-cleaning-sheet-tutorial.md": { resourceSlug: "keyword-cleaning-sheet" },
  "listing-checklist.md": { resourceSlug: "listing-checklist", openClassSlug: "listing-conversion-check" },
  "listing-five-bullets.md": { openClassSlug: "listing-conversion-check" },
  "new-product-ppc-week-one.md": { resourceSlug: "ppc-weekly-review", openClassSlug: "ppc-week-one" },
  "sp-ad-structure.md": { resourceSlug: "ppc-weekly-review", openClassSlug: "ppc-week-one" },
  "ai-ppc-report-review.md": { resourceSlug: "ppc-weekly-review", openClassSlug: "ppc-week-one" },
  "ai-review-analysis.md": { resourceSlug: "review-pain-analysis", openClassSlug: "review-to-selection" },
  "review-analysis-matrix.md": { resourceSlug: "review-pain-analysis", openClassSlug: "review-to-selection" },
  "negative-review-listing-fix.md": { resourceSlug: "review-pain-analysis", openClassSlug: "review-to-selection" },
  "ai-competitor-matrix.md": { resourceSlug: "competitor-selection-matrix", openClassSlug: "competitor-selection-matrix" },
  "ai-market-size-estimate.md": { openClassSlug: "competitor-selection-matrix" },
  "selection-pain-reverse.md": { openClassSlug: "competitor-selection-matrix" },
  "amazon-platform-rules-beginner.md": { resourceSlug: "platform-rules-checklist", openClassSlug: "platform-rules-beginner" },
  "amazon-ai-tools-review.md": { resourceSlug: "ai-tools-review-sheet", openClassSlug: "ai-tools-for-amazon" },
};

function upsertField(frontmatter, key, value) {
  const line = `${key}: ${typeof value === "boolean" ? value : value}`;
  const re = new RegExp(`^${key}:.*$`, "m");
  if (re.test(frontmatter)) {
    return frontmatter.replace(re, line);
  }
  return frontmatter.trimEnd() + `\n${line}\n`;
}

function replaceField(frontmatter, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  if (re.test(frontmatter)) {
    return frontmatter.replace(re, `${key}: ${value}`);
  }
  return upsertField(frontmatter, key, value);
}

function patchFile(filename, fields) {
  const filePath = path.join(postsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn("skip missing", filename);
    return;
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return;
  let fm = match[1];
  for (const [key, value] of Object.entries(fields)) {
    if (key === "articleType" && fm.includes("articleType: case")) {
      fm = replaceField(fm, "articleType", "case-study");
      continue;
    }
    fm = upsertField(fm, key, value);
  }
  const body = raw.slice(match[0].length);
  fs.writeFileSync(filePath, `---\n${fm.trimEnd()}\n---${body}`);
  console.log("patched", filename);
}

for (const [file, type] of Object.entries(articleTypeMap)) {
  patchFile(file, { articleType: type });
}

for (const [file, fields] of Object.entries(caseUpdates)) {
  patchFile(file, fields);
}

for (const [file, fields] of Object.entries(resourceLinks)) {
  patchFile(file, fields);
}

// Normalize remaining case -> case-study
for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith(".md")) continue;
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
  if (raw.includes("articleType: case\n") || raw.includes("articleType: case\r\n")) {
    patchFile(file, { articleType: "case-study" });
  }
}

console.log("done");
