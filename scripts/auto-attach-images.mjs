import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");
const manifestPath = path.join(root, "src", "data", "image-manifest.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const categoryTopicMap = {
  "AI 运营亚马逊": "ai-amazon",
  "AI 搜索": "ai-amazon",
  "广告 PPC": "ppc",
  "Listing 优化": "listing",
  "选品指南": "selection",
  "关键词": "listing",
  "工具模板": "common"
};

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\s*([\s\S]*?)\s*---/);
  if (!match) return {};
  const raw = match[1];
  const data = {};
  for (const line of raw.split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    data[key] = value;
  }
  return data;
}

function scoreImage(image, type, articleText, frontmatter) {
  let score = 0;

  if (image.type === type) score += 100;

  const topic = categoryTopicMap[frontmatter.category] || "common";
  if (image.topics?.includes(topic)) score += 40;

  const haystack = articleText.toLowerCase();

  for (const kw of image.keywords || []) {
    if (haystack.includes(String(kw).toLowerCase())) score += 6;
  }

  if (type === "hero" && image.type === "hero") score += 20;
  if (type === "summary" && image.type === "summary") score += 20;

  return score;
}

function pickImage(type, markdown, frontmatter) {
  const candidates = manifest
    .map((image) => ({ image, score: scoreImage(image, type, markdown, frontmatter) }))
    .sort((a, b) => b.score - a.score);

  return candidates[0]?.image;
}

function renderImage(image) {
  return [
    '<figure class="auto-article-image">',
    `  <img src="${image.path}" alt="${image.alt}" loading="lazy" />`,
    `  <figcaption>${image.alt}</figcaption>`,
    '</figure>'
  ].join("\n");
}

function attachImages(markdown) {
  const frontmatter = parseFrontmatter(markdown);

  return markdown.replace(
    /<!--\s*AUTO_IMAGE:([a-zA-Z0-9_-]+)\s*-->(?:\s*<!--\s*AUTO_IMAGE_RENDERED_START\s*-->[\s\S]*?<!--\s*AUTO_IMAGE_RENDERED_END\s*-->)?/g,
    (full, type) => {
      const image = pickImage(type, markdown, frontmatter);
      if (!image) return full;

      return [
        `<!-- AUTO_IMAGE:${type} -->`,
        '<!-- AUTO_IMAGE_RENDERED_START -->',
        renderImage(image),
        '<!-- AUTO_IMAGE_RENDERED_END -->'
      ].join("\n");
    }
  );
}

function walk(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files.push(...walk(full));
    else if (item.endsWith(".md")) files.push(full);
  }
  return files;
}

let changed = 0;

for (const file of walk(postsDir)) {
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("AUTO_IMAGE:")) continue;

  const after = attachImages(before);

  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed++;
    console.log(`attached images: ${path.relative(root, file)}`);
  }
}

console.log(`auto image attach complete. changed files: ${changed}`);