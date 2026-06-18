import fs from "node:fs";
import path from "node:path";

const importDir = path.resolve("docs/content-fill-import");
const postsDir = path.resolve("src/content/posts");
const coverTemplate = path.resolve(
  "public/images/articles/new-product-ppc-week-one/cover.svg",
);

const files = fs
  .readdirSync(importDir)
  .filter((f) => f.endsWith(".md") && f !== "交付清单.md");

function stripDuplicateTitle(body) {
  const lines = body.replace(/^\uFEFF/, "").split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (/^#\s+/.test(lines[i] || "")) {
    lines.splice(i, 1);
    while (i < lines.length && lines[i].trim() === "") lines.splice(i, 1);
  }
  return lines.join("\n");
}

function ensureCover(slug) {
  const dir = path.resolve("public/images/articles", slug);
  const cover = path.join(dir, "cover.svg");
  if (!fs.existsSync(cover)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(coverTemplate, cover);
    console.log("cover created", slug);
  }
}

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(importDir, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    console.warn("skip invalid frontmatter", file);
    continue;
  }
  const body = stripDuplicateTitle(match[2]);
  fs.writeFileSync(path.join(postsDir, file), `---\n${match[1].trimEnd()}\n---\n\n${body.trimStart()}`);
  ensureCover(slug);
  console.log("imported", file);
}

console.log(`done: ${files.length} files`);
