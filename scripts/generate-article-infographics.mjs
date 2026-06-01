import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");
const outputRoot = path.join(root, "public", "images", "generated-infographics");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugFromFile(file) {
  return path.basename(file, ".md");
}

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

function extractH2(markdown) {
  return [...markdown.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
}

function wrapText(text, max = 14) {
  const s = String(text);
  const chunks = [];
  let current = "";
  for (const ch of s) {
    current += ch;
    if (current.length >= max) {
      chunks.push(current);
      current = "";
    }
  }
  if (current) chunks.push(current);
  return chunks.slice(0, 3);
}

function textLines(text, x, y, options = {}) {
  const {
    size = 24,
    fill = "#ffffff",
    weight = 800,
    max = 14,
    gap = 32,
    anchor = "start"
  } = options;

  return wrapText(text, max)
    .map((line, index) => {
      return `<text x="${x}" y="${y + index * gap}" text-anchor="${anchor}" font-size="${size}" fill="${fill}" font-family="Microsoft YaHei, Arial" font-weight="${weight}">${escapeXml(line)}</text>`;
    })
    .join("\n");
}

function svgShell(title, subtitle, inner, theme = "dark") {
  if (theme === "light") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" rx="36" fill="#F7FAFF"/>
  <circle cx="1010" cy="120" r="220" fill="#DBEAFE" opacity="0.7"/>
  <circle cx="140" cy="590" r="260" fill="#EFF6FF" opacity="0.9"/>
  <text x="72" y="82" font-size="42" fill="#06152F" font-family="Microsoft YaHei, Arial" font-weight="900">${escapeXml(title)}</text>
  <text x="72" y="124" font-size="22" fill="#64748B" font-family="Microsoft YaHei, Arial">${escapeXml(subtitle)}</text>
  ${inner}
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020817"/>
      <stop offset="0.55" stop-color="#0B2B64"/>
      <stop offset="1" stop-color="#06152F"/>
    </linearGradient>
    <radialGradient id="glow" cx="62%" cy="43%" r="58%">
      <stop offset="0" stop-color="#38BDF8" stop-opacity="0.38"/>
      <stop offset="1" stop-color="#38BDF8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" rx="36" fill="url(#bg)"/>
  <circle cx="760" cy="280" r="300" fill="url(#glow)"/>
  <g opacity="0.20" stroke="#93C5FD">
    <path d="M90 500 C310 330 480 510 650 310 C820 110 1000 210 1110 90" fill="none" stroke-width="3"/>
    <path d="M90 390 H1110M90 270 H1110M90 150 H1110" stroke-width="1"/>
    <path d="M260 90 V580M480 90 V580M700 90 V580M920 90 V580" stroke-width="1"/>
  </g>
  <text x="72" y="82" font-size="42" fill="#FFFFFF" font-family="Microsoft YaHei, Arial" font-weight="900">${escapeXml(title)}</text>
  <text x="72" y="124" font-size="22" fill="#BFDBFE" font-family="Microsoft YaHei, Arial">${escapeXml(subtitle)}</text>
  ${inner}
</svg>`;
}

function makeScenarioSvg() {
  const cards = [
    ["选品", "市场容量与风险筛查"],
    ["Listing", "关键词与转化表达"],
    ["广告 PPC", "搜索词与预算复盘"],
    ["Review", "痛点与用户语言"],
    ["日常 SOP", "待办、复盘、执行清单"]
  ];

  const cardSvg = cards.map((card, i) => {
    const x = 70 + i * 220;
    return `<g transform="translate(${x} 220)">
      <rect width="190" height="230" rx="26" fill="rgba(255,255,255,0.10)" stroke="rgba(147,197,253,0.34)"/>
      <circle cx="95" cy="70" r="30" fill="#1368FF" opacity="0.86"/>
      <text x="95" y="82" text-anchor="middle" font-size="30" fill="#FFFFFF" font-family="Microsoft YaHei, Arial" font-weight="900">${escapeXml(card[0])}</text>
      ${textLines(card[1], 95, 142, { size: 18, fill: "#BFDBFE", weight: 500, max: 8, gap: 26, anchor: "middle" })}
    </g>`;
  }).join("\n");

  const arrows = [0, 1, 2, 3].map((i) => {
    const x = 262 + i * 220;
    return `<path d="M${x} 335 H${x + 34}" stroke="#60A5FA" stroke-width="5" stroke-linecap="round"/>
      <path d="M${x + 34} 335 L${x + 22} 326 M${x + 34} 335 L${x + 22} 344" stroke="#60A5FA" stroke-width="5" stroke-linecap="round"/>`;
  }).join("\n");

  return svgShell(
    "亚马逊 AI 运营五大场景",
    "把 AI 接入选品、Listing、广告、Review 和日常 SOP",
    `${cardSvg}\n${arrows}`,
    "dark"
  );
}

function makeDivisionSvg() {
  const aiItems = ["整理信息", "生成初稿", "对比差异", "提炼问题", "输出清单"];
  const sellerItems = ["产品判断", "市场理解", "合规判断", "预算决策", "最终执行"];

  const list = (items, x, y, color) => items.map((item, i) => {
    const yy = y + i * 48;
    return `<g>
      <circle cx="${x}" cy="${yy - 8}" r="8" fill="${color}"/>
      <text x="${x + 24}" y="${yy}" font-size="25" fill="#334155" font-family="Microsoft YaHei, Arial" font-weight="800">${escapeXml(item)}</text>
    </g>`;
  }).join("\n");

  const inner = `
    <rect x="80" y="180" width="470" height="390" rx="30" fill="#FFFFFF" stroke="#D9E7FF"/>
    <rect x="650" y="180" width="470" height="390" rx="30" fill="#FFFFFF" stroke="#D9E7FF"/>
    <text x="315" y="246" text-anchor="middle" font-size="36" fill="#1368FF" font-family="Microsoft YaHei, Arial" font-weight="900">AI 负责</text>
    <text x="885" y="246" text-anchor="middle" font-size="36" fill="#0F172A" font-family="Microsoft YaHei, Arial" font-weight="900">卖家负责</text>
    ${list(aiItems, 170, 315, "#1368FF")}
    ${list(sellerItems, 740, 315, "#0F172A")}
    <path d="M565 370 H635" stroke="#60A5FA" stroke-width="7" stroke-linecap="round"/>
    <path d="M635 370 L615 354 M635 370 L615 386" stroke="#60A5FA" stroke-width="7" stroke-linecap="round"/>
  `;

  return svgShell(
    "AI 与卖家的分工",
    "AI 提效，卖家判断；不要把辅助工具当成方向盘",
    inner,
    "light"
  );
}

function makeSopSvg() {
  const steps = [
    ["每天", "AI 整理运营待办"],
    ["每周", "广告报告复盘"],
    ["每周", "Review 痛点分析"],
    ["上新前", "Listing 检查"],
    ["每月", "产品线复盘"]
  ];

  const rows = steps.map((step, i) => {
    const y = 180 + i * 78;
    return `<g>
      <rect x="90" y="${y}" width="1020" height="58" rx="18" fill="rgba(255,255,255,0.10)" stroke="rgba(147,197,253,0.34)"/>
      <rect x="116" y="${y + 12}" width="96" height="34" rx="17" fill="#1368FF"/>
      <text x="164" y="${y + 36}" text-anchor="middle" font-size="20" fill="#FFFFFF" font-family="Microsoft YaHei, Arial" font-weight="900">${escapeXml(step[0])}</text>
      <text x="246" y="${y + 38}" font-size="26" fill="#FFFFFF" font-family="Microsoft YaHei, Arial" font-weight="900">${escapeXml(step[1])}</text>
    </g>`;
  }).join("\n");

  return svgShell(
    "阿岩卖家 AI 落地 SOP",
    "先从固定动作开始，不追工具，先建流程",
    rows,
    "dark"
  );
}

function makeGenericFrameworkSvg(frontmatter, headings) {
  const selected = headings.slice(0, 5);
  const cards = selected.length ? selected : ["核心问题", "分析路径", "执行步骤", "风险边界", "复盘优化"];

  const cardSvg = cards.map((title, i) => {
    const x = 70 + i * 220;
    return `<g transform="translate(${x} 220)">
      <rect width="190" height="230" rx="26" fill="rgba(255,255,255,0.10)" stroke="rgba(147,197,253,0.34)"/>
      <text x="95" y="96" text-anchor="middle" font-size="26" fill="#FFFFFF" font-family="Microsoft YaHei, Arial" font-weight="900">${escapeXml(String(i + 1).padStart(2, "0"))}</text>
      ${textLines(title.replace(/^.+?、/, ""), 95, 150, { size: 19, fill: "#BFDBFE", weight: 700, max: 8, gap: 26, anchor: "middle" })}
    </g>`;
  }).join("\n");

  return svgShell(
    frontmatter.title || "文章结构图",
    "从主题拆解到执行路径",
    cardSvg,
    "dark"
  );
}

function makeGenericSummarySvg(frontmatter) {
  const inner = `
    <rect x="110" y="200" width="980" height="80" rx="20" fill="#FFFFFF" stroke="#D9E7FF"/>
    <text x="150" y="252" font-size="27" fill="#1368FF" font-family="Microsoft YaHei, Arial" font-weight="900">先判断问题，再选择工具</text>
    <rect x="110" y="312" width="980" height="80" rx="20" fill="#FFFFFF" stroke="#D9E7FF"/>
    <text x="150" y="364" font-size="27" fill="#1368FF" font-family="Microsoft YaHei, Arial" font-weight="900">把重复动作变成 SOP</text>
    <rect x="110" y="424" width="980" height="80" rx="20" fill="#FFFFFF" stroke="#D9E7FF"/>
    <text x="150" y="476" font-size="27" fill="#1368FF" font-family="Microsoft YaHei, Arial" font-weight="900">用数据复盘，用人工做最终决策</text>
  `;

  return svgShell(
    "核心总结",
    frontmatter.title || "文章重点提炼",
    inner,
    "light"
  );
}

function renderFigure(src, alt) {
  return [
    '<figure class="auto-article-image">',
    `  <img src="${src}" alt="${escapeXml(alt)}" loading="lazy" />`,
    `  <figcaption>${escapeXml(alt)}</figcaption>`,
    '</figure>'
  ].join("\n");
}

function removeOldAutoImages(markdown) {
  let text = markdown;

  text = text.replace(/<!--\s*AUTO_IMAGE:[\s\S]*?<!--\s*AUTO_IMAGE_RENDERED_END\s*-->/g, "");
  text = text.replace(/<!--\s*AUTO_INFOGRAPHIC:[\s\S]*?<!--\s*AUTO_INFOGRAPHIC_RENDERED_END\s*-->/g, "");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text;
}

function insertMarkers(markdown, slug) {
  let text = markdown;

  if (!text.includes("AUTO_INFOGRAPHIC:hero")) {
    text = text.replace(/(#[^\n]+\n)/, `$1\n<!-- AUTO_INFOGRAPHIC:hero -->\n`);
  }

  if (!text.includes("AUTO_INFOGRAPHIC:framework")) {
    if (text.includes("## 二、AI 能帮卖家做什么，不能做什么")) {
      text = text.replace(/\n## 二、AI 能帮卖家做什么，不能做什么/, "\n<!-- AUTO_INFOGRAPHIC:framework -->\n\n## 二、AI 能帮卖家做什么，不能做什么");
    } else {
      const secondH2 = [...text.matchAll(/\n##\s+/g)][1];
      if (secondH2) {
        text = text.slice(0, secondH2.index) + "\n<!-- AUTO_INFOGRAPHIC:framework -->\n" + text.slice(secondH2.index);
      }
    }
  }

  if (!text.includes("AUTO_INFOGRAPHIC:summary")) {
    if (text.includes("## 九、阿岩给卖家的执行建议")) {
      text = text.replace(/\n## 九、阿岩给卖家的执行建议/, "\n<!-- AUTO_INFOGRAPHIC:summary -->\n\n## 九、阿岩给卖家的执行建议");
    } else if (text.includes("## 十、最后总结")) {
      text = text.replace(/\n## 十、最后总结/, "\n<!-- AUTO_INFOGRAPHIC:summary -->\n\n## 十、最后总结");
    } else {
      text += "\n\n<!-- AUTO_INFOGRAPHIC:summary -->\n";
    }
  }

  return text;
}

function generateForPost(file) {
  const slug = slugFromFile(file);
  const markdown = fs.readFileSync(file, "utf8");
  const frontmatter = parseFrontmatter(markdown);
  const headings = extractH2(markdown);
  const outDir = path.join(outputRoot, slug);
  ensureDir(outDir);

  let heroSvg;
  let frameworkSvg;
  let summarySvg;

  if (slug === "2026-amazon-ai-operations") {
    heroSvg = makeScenarioSvg();
    frameworkSvg = makeDivisionSvg();
    summarySvg = makeSopSvg();
  } else {
    heroSvg = makeGenericFrameworkSvg(frontmatter, headings);
    frameworkSvg = makeGenericFrameworkSvg(frontmatter, headings.slice(1));
    summarySvg = makeGenericSummarySvg(frontmatter);
  }

  fs.writeFileSync(path.join(outDir, "hero.svg"), heroSvg, "utf8");
  fs.writeFileSync(path.join(outDir, "framework.svg"), frameworkSvg, "utf8");
  fs.writeFileSync(path.join(outDir, "summary.svg"), summarySvg, "utf8");

  let next = removeOldAutoImages(markdown);
  next = insertMarkers(next, slug);

  const imageBase = `/images/generated-infographics/${slug}`;

  next = next.replace(
    /<!--\s*AUTO_INFOGRAPHIC:hero\s*-->/g,
    [
      "<!-- AUTO_INFOGRAPHIC:hero -->",
      "<!-- AUTO_INFOGRAPHIC_RENDERED_START -->",
      renderFigure(`${imageBase}/hero.svg`, "亚马逊 AI 运营五大场景图"),
      "<!-- AUTO_INFOGRAPHIC_RENDERED_END -->"
    ].join("\n")
  );

  next = next.replace(
    /<!--\s*AUTO_INFOGRAPHIC:framework\s*-->/g,
    [
      "<!-- AUTO_INFOGRAPHIC:framework -->",
      "<!-- AUTO_INFOGRAPHIC_RENDERED_START -->",
      renderFigure(`${imageBase}/framework.svg`, "AI 与卖家的分工示意图"),
      "<!-- AUTO_INFOGRAPHIC_RENDERED_END -->"
    ].join("\n")
  );

  next = next.replace(
    /<!--\s*AUTO_INFOGRAPHIC:summary\s*-->/g,
    [
      "<!-- AUTO_INFOGRAPHIC:summary -->",
      "<!-- AUTO_INFOGRAPHIC_RENDERED_START -->",
      renderFigure(`${imageBase}/summary.svg`, "阿岩卖家 AI 落地 SOP 图"),
      "<!-- AUTO_INFOGRAPHIC_RENDERED_END -->"
    ].join("\n")
  );

  if (next !== markdown) {
    fs.writeFileSync(file, next, "utf8");
    console.log(`updated article: ${path.relative(root, file)}`);
  }

  console.log(`generated infographics: ${path.relative(root, outDir)}`);
}

const target = process.argv[2];
const files = fs.readdirSync(postsDir)
  .filter((name) => name.endsWith(".md"))
  .map((name) => path.join(postsDir, name))
  .filter((file) => {
    if (!target) return true;
    return slugFromFile(file) === target;
  });

for (const file of files) {
  generateForPost(file);
}

console.log(`done. posts processed: ${files.length}`);