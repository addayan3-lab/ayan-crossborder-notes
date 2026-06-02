import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const root = process.cwd();
const postsDir = path.join(root, "src", "content", "posts");

fs.mkdirSync(postsDir, { recursive: true });

function slugify(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function writeUtf8(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

const rl = readline.createInterface({ input, output });

const title = await rl.question("文章标题：");
const slugInput = await rl.question("文章 slug（英文短链接，可留空自动生成）：");
const categoryInput = await rl.question("分类（默认：AI 运营亚马逊）：");
const descriptionInput = await rl.question("SEO 描述（建议 40-120 字，可留空生成占位）：");

rl.close();

const slug = slugify(slugInput || title);
if (!slug) {
  console.error("slug 为空，已取消。");
  process.exit(1);
}

const category = categoryInput.trim() || "AI 运营亚马逊";
const description = descriptionInput.trim() || `本文围绕${title}展开，结合亚马逊运营实战，整理可落地的方法、判断标准和执行 SOP。`;

const file = path.join(postsDir, `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`文章已存在：${file}`);
  process.exit(1);
}

const content = `---
title: "${title}"
description: "${description}"
pubDate: "${today()}"
category: "${category}"
draft: false
---

## 一、这篇文章解决什么问题

这里写用户痛点：谁会遇到这个问题，为什么现在必须解决。

## 二、核心判断标准

这里写判断逻辑，不要直接堆工具。先讲卖家应该怎么看问题。

## 三、AI 可以怎么帮忙

这里写 AI 能辅助整理、分析、生成、复盘的部分。

## 四、卖家必须自己判断什么

这里写 AI 不能替代人的部分：产品、预算、供应链、合规、最终决策。

## 五、具体执行 SOP

1. 第一步：
2. 第二步：
3. 第三步：

## 六、常见误区

- 误区一：
- 误区二：
- 误区三：

## 七、最后总结

用一段话总结这篇文章的核心观点，并引导用户领取资料包。
`;

writeUtf8(file, content);

console.log("");
console.log("新文章已创建：");
console.log(file);
console.log("");
console.log("下一步：编辑这篇文章，然后运行：");
console.log("npm run content:publish");