# C:\rpg\ayan-crossborder-notes 项目开发稳快计划 v1.0

> 项目：阿岩跨境笔记  
> 路径：`C:\rpg\ayan-crossborder-notes`  
> 定位：写给亚马逊卖家的 AI 运营实战知识站  
> 技术栈：Astro + Markdown + Cloudflare Pages + Pagefind + IndexNow  
> 目标：让后续开发更稳、更快、更容易交给 OpenCode / Codex / GPT 接力执行。  
> 版本日期：2026-06-05。

---

## 1. 当前项目判断

### 1.1 项目已经不是“建站初期”

这个项目已经过了“能不能跑起来”的阶段，目前更像是一个正在扩内容、扩承接、扩工具体验的内容产品。

已知状态：

- 本地项目路径：`C:\rpg\ayan-crossborder-notes`
- 技术路线：Astro + Markdown + GitHub + Cloudflare Pages
- 搜索：Pagefind
- 收录：IndexNow
- 当前已有文章、专题、资源中心、公开课承接页、AI 阿岩助手 MVP
- SEO 审计曾达到 `Fail 0`
- 图片 manifest 检查曾稳定
- 当前重点不是“再加新技术”，而是 **内容厚度 + 用户路径 + AI 助手体验 + 自动化检查**

### 1.2 项目真正的开发目标

不是单纯把页面越做越多，而是形成一个闭环：

```text
新手卖家搜索问题
  ↓
进入文章 / 专题 / 学习路径
  ↓
看到资源模板 / 公开课入口
  ↓
通过问卷或资料承接
  ↓
进入微信 / 社群 / 课程转化
```

所以后续开发必须围绕四件事：

1. 内容是否解决新手痛点。
2. 页面之间是否能自然引导。
3. 用户是否知道下一步该点哪里。
4. AI 阿岩助手是否能把用户引到正确内容，而不是乱跳资源页。

---

## 2. 后续 60 天开发主线

### 总原则

未来 60 天不要乱开新坑，只抓 4 条线：

| 优先级 | 主线 | 目标 | 重要程度 |
|---|---|---|---|
| P0 | 内容结构稳定 | 文章、专题、学习路径、资源页逻辑清楚 | 最高 |
| P1 | 承接路径优化 | 公开课、资料、问卷、微信路径自然 | 最高 |
| P2 | AI 阿岩助手增强 | 从“关键词匹配”升级为“引导式推荐” | 高 |
| P3 | 自动化质量检查 | 每次上线前自动检查 SEO、链接、图片、搜索 | 高 |

暂时不要优先做：

- 复杂会员系统
- 登录系统
- 真正后端数据库
- 复杂 AI Agent 平台
- 大量新页面堆数量
- 重型 CMS
- 复杂付费系统

原因：当前最重要的是 **验证内容和转化路径**，不是做大而全的产品。

---

## 3. 项目目录规范

建议固定目录：

```text
C:\rpg\ayan-crossborder-notes
  AGENTS.md
  README.md
  package.json
  astro.config.mjs
  src/
  public/
  scripts/
  docs/
  tasks/
  reports/
  backups/
  archive/
  .opencode/
    commands/
    skills/
```

### 3.1 目录用途

| 目录 | 用途 |
|---|---|
| `src/content/` | 文章、资源、公开课内容 |
| `src/pages/` | 页面路由 |
| `src/components/` | 组件 |
| `public/` | 静态图片、robots、manifest 等 |
| `scripts/` | SEO、图片、索引、自动化脚本 |
| `docs/` | 长期项目文档 |
| `tasks/` | OpenCode / Codex 任务说明 |
| `reports/` | 每次执行结果报告 |
| `backups/` | 修改前备份 |
| `archive/` | 废弃文件、旧方案归档 |
| `.opencode/commands/` | OpenCode 常用命令模板 |
| `.opencode/skills/` | OpenCode 专项技能 |

### 3.2 根目录禁止堆放

以后不要让 AI 把这些文件直接放根目录：

```text
*_prompt.md
*_report.md
*_backup*
debug_*
tmp_*
临时说明.md
一次性检查.md
```

统一放到：

```text
tasks/
reports/
backups/
archive/
```

---

## 4. AI 执行分工：什么时候用中，什么时候用高

### 4.1 推理等级规则

| 任务 | 推荐工具模式 | 推理等级 |
|---|---|---|
| 查页面数量、查链接、查 SEO、查图片 | Plan / 只读 | 中 |
| 新增一篇文章 | Build | 中 |
| 修复一处页面跳转 | Build | 中 |
| 调整首页入口 | Build | 中 |
| AI 阿岩助手匹配逻辑改动 | Build | 高 |
| 资源中心结构重排 | Build | 高 |
| 大规模 frontmatter 规范化 | Build | 高 |
| 重构内容模型 / schema | Build | 高 |
| Cloudflare 部署异常 | Plan 先查，Build 再修 | 高 |

### 4.2 OpenCode / Codex 使用原则

- **OpenCode**：适合直接读项目、改文件、跑检查。
- **Codex**：适合复杂修复、跨文件逻辑检查、架构/风险判断。
- **GPT**：适合规划、任务拆解、判断结果、生成 prompt、做内容策略。
- **DeepSeek V4 Flash Free**：适合免费执行普通任务。
- **强模型**：只用于复杂助手逻辑、结构重构、反复失败问题。

---

## 5. 固定开发流程

以后每次开发都按这个流程，不要跳步。

```text
第 1 步：GPT / 用户确定任务
第 2 步：生成 tasks/xxx_task.md
第 3 步：OpenCode / Codex 执行
第 4 步：运行验证命令
第 5 步：输出 reports/xxx_report.md
第 6 步：把“给 GPT 的回填摘要”粘回来
第 7 步：GPT 判断是否继续下一批
```

### 5.1 每批任务不要太大

推荐批次大小：

| 任务类型 | 一批最多做多少 |
|---|---|
| 新增文章 | 1-3 篇 |
| 修复链接 | 5-15 处 |
| 调整组件 | 1-2 个组件 |
| 首页结构 | 1 次只改 1 个区域 |
| AI 助手逻辑 | 1 次只改 1 类意图 |
| 资源中心 | 1 次只改 1 个模块 |
| SEO / 图片脚本 | 1 次只改 1 个脚本 |

---

## 6. 每次上线前必须跑的检查

在项目根目录执行：

```powershell
cd "C:\rpg\ayan-crossborder-notes"

npm run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ build 失败：先不要提交，请把错误粘给 GPT。"
  exit 1
}

npm run seo:audit
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ SEO 审计失败：先修复 Fail 项。"
  exit 1
}

npm run images:check
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ 图片检查失败：请检查 image manifest 和图片路径。"
  exit 1
}

git status --short
Write-Host "✅ 基础检查完成：请确认 git status 是否只有本次任务相关文件。"
```

如果某个脚本名与当前项目不一致，AI 必须先读取 `package.json` 再替换命令，不要硬跑。

---

## 7. 内容开发节奏

### 7.1 每周节奏

建议稳定节奏：

```text
每周 1 篇高质量文章
每周 1 次旧文内链优化
每两周 1 次专题页检查
每两周 1 次公开课承接路径检查
每月 1 次 AI 阿岩助手意图样本测试
每月 1 次 SEO / Search Console / Bing / Cloudflare 数据复盘
```

### 7.2 文章优先级

后续文章优先围绕新手痛点，不要过早写太专业的关键词细节。

优先主题：

1. 新手选品判断
2. 产品还能不能继续做
3. Listing 为什么没转化
4. 广告为什么烧钱没单
5. 差评怎么反推产品问题
6. 新品冷启动怎么安排
7. 怎么看类目前 10
8. 选品表格怎么填
9. 广告复盘表怎么用
10. 公开课前用户最关心的问题

### 7.3 内容不是越多越好

每新增一篇文章，要同时检查：

- 是否归入正确专题。
- 是否加入学习路径。
- 是否有上一篇 / 下一篇。
- 是否有相关文章。
- 是否有资源或公开课承接。
- 是否有明确下一步行动。
- AI 阿岩助手是否能推荐到它。

---

## 8. 页面与承接路径优化计划

### 8.1 首页

首页必须有清晰入口：

```text
选品
Listing
广告
差评
AI 工具
资源中心
公开课
AI 阿岩助手
```

当前重点：

- 首页必须有“选品”入口。
- 右下角“阿岩助手”后续应做成浮层助手，不要跳走到工具页。
- 首页不要堆太多卡片，要让新手知道从哪里开始。

### 8.2 资源中心

资源中心不能只是“领取资料”。

资源卡片建议分三类：

```text
选品判断表
Listing 检查表
广告复盘表
```

每个资源页要回答：

1. 这个表解决什么问题？
2. 适合谁用？
3. 怎么用？
4. 用完下一步是什么？
5. 是进入问卷，还是公开课，还是相关文章？

### 8.3 公开课页

公开课页目标不是展示“课程多专业”，而是让新手觉得：

```text
我现在的问题被说中了。
这个老师能把复杂问题讲明白。
我愿意填问卷 / 领资料 / 加微信。
```

公开课页建议包含：

- 新手常见误区
- 公开课能解决什么
- 适合谁
- 不适合谁
- 课前小问卷
- 资料包
- 相关文章
- 课程入口

---

## 9. AI 阿岩助手开发计划

### 9.1 当前定位

AI 阿岩助手暂时不要做成真正大模型客服。

当前阶段最适合做：

```text
规则匹配 + 问题分类 + 推荐文章 / 资源 / 公开课
```

核心目标：

- 用户输入“广告烧钱没单”，推荐广告复盘、Listing 转化、选品判断相关内容。
- 用户输入“产品还能不能做”，推荐选品分析、差评分析、类目前 10 观察。
- 用户输入“关键词不会选”，不要直接跳资源页，而是先推荐新手友好解释文章。
- 用户输入“资料”，再进入资源中心或问卷。

### 9.2 近期增强方向

分三阶段：

#### 阶段 1：意图词库增强

建立意图分类：

```text
selection      选品
listing        Listing / 转化
ppc            广告
review         差评 / Review
ai-search      AI 搜索 / 工具
resources      资料 / 表格
open-class     公开课
beginner       新手不知道从哪开始
```

每类维护：

```text
strongKeywords
weakKeywords
negativeKeywords
recommendedArticles
recommendedResources
recommendedOpenClasses
```

#### 阶段 2：问答引导

如果用户问题太模糊，不要直接给结果。

示例：

```text
你现在更像是哪种情况？
1. 有产品但不知道能不能继续做
2. 没产品，想重新选品
3. 有广告但烧钱没单
4. Listing 有流量没转化
```

#### 阶段 3：承接转化

当用户连续问资源、表格、课程时，再推荐：

```text
填写课前问卷
领取资料包
进入公开课页
添加微信
```

不要一开始就推微信。

---

## 10. 自动化脚本开发计划

### 10.1 必须稳定的脚本

建议保留并持续维护：

```text
npm run build
npm run seo:audit
npm run images:check
npm run pagefind
npm run indexnow:submit
```

具体以 `package.json` 当前脚本为准。

### 10.2 建议新增或强化的脚本

#### 1. 内链检查

目标：

- 检查文章里提到的站内文章是否真实存在。
- 检查上一篇 / 下一篇是否断链。
- 检查资源页链接是否有效。

建议脚本名：

```text
npm run links:check
```

#### 2. 承接路径检查

目标：

- 检查文章是否有下一步 CTA。
- 检查专题页是否有资源 / 公开课入口。
- 检查资源页是否有问卷 / 领取入口。

建议脚本名：

```text
npm run funnel:check
```

#### 3. AI 助手样本测试

目标：

- 输入固定 20-50 条用户问题。
- 检查匹配结果是否合理。
- 避免“只要问资料就乱跳资源页”。

建议脚本名：

```text
npm run assistant:test
```

#### 4. frontmatter 检查

目标：

检查文章是否包含：

```text
topic
stage
intent
relatedTopics
publicLessonUse
leadMagnet
wechatHook
```

建议脚本名：

```text
npm run content:check
```

---

## 11. 未来 10 个最该做的任务

按顺序做，不建议跳。

### 任务 01：项目专用 AGENTS.md 落地

目标：

- 把本方案里的 AGENTS 规则落到项目根目录。
- 固定 OpenCode 执行边界。
- 以后所有 AI 先读它。

推荐模式：Build  
推理等级：中

---

### 任务 02：建立 `.opencode/commands`

目标：

新增：

```text
.opencode/commands/audit.md
.opencode/commands/fix.md
.opencode/commands/content-check.md
.opencode/commands/assistant-test.md
.opencode/commands/release-check.md
```

推荐模式：Build  
推理等级：中

---

### 任务 03：首页“选品入口”检查与优化

目标：

- 首页必须能让新手看到选品入口。
- 不要只突出工具或资料。
- 首页路径：选品 → Listing → 广告 → 资源 / 公开课。

推荐模式：Build  
推理等级：中

---

### 任务 04：AI 阿岩助手入口改造计划

目标：

- 确认右下角助手目前是否跳转工具页。
- 设计为后续浮层助手。
- 先不做复杂 LLM，只做前端浮层和规则推荐。

推荐模式：Plan 先审查，Build 再执行  
推理等级：高

---

### 任务 05：资源中心 CTA 改造

目标：

- 资源领取不直接只跳微信。
- 优先走问卷 / 资料说明 / 对应文章。
- 微信作为后一步承接。

推荐模式：Build  
推理等级：中

---

### 任务 06：公开课承接页优化

目标：

- 更贴新手痛点。
- 不要太专业。
- 增加“你是不是遇到这些问题”。
- 增加问卷入口。

推荐模式：Build  
推理等级：中

---

### 任务 07：文章上一篇 / 下一篇 / 相关阅读检查

目标：

- 文章关系逻辑更简单。
- 提到相关文章时可点击。
- 不让新手迷路。

推荐模式：Build  
推理等级：中

---

### 任务 08：AI 阿岩助手意图样本测试

目标：

建立测试样本：

```text
我广告烧钱没单
我不知道怎么选品
关键词怎么找
产品有差评还能不能做
Listing 有流量没单
我想领表格
公开课讲什么
```

输出每条应该推荐的内容。

推荐模式：Build  
推理等级：高

---

### 任务 09：新增 3 篇“新手痛点”文章

优先写：

```text
选品第一步：新手不要先找爆款，先判断自己能不能打
Listing 有流量没转化：先看这 5 个地方
广告烧钱没单：新手先别急着降竞价
```

推荐模式：Build  
推理等级：中

---

### 任务 10：发布前一键检查脚本

目标：

做一个命令统一跑：

```text
build
seo:audit
images:check
links:check
assistant:test
git status
```

推荐模式：Build  
推理等级：中

---

## 12. 可直接给 OpenCode 的任务模板

### 12.1 只读审查项目状态

```text
请先阅读 C:\rpg\ayan-crossborder-notes 项目根目录的 AGENTS.md。

任务：只读审查当前项目状态，不修改文件。

重点检查：
1. 当前页面、文章、资源中心、公开课、AI 阿岩助手的结构。
2. package.json 里的脚本是否完整。
3. 是否存在临时文件散落在根目录。
4. 首页是否有明确“选品”入口。
5. 资源领取是否过度跳微信。
6. AI 阿岩助手是否容易误跳资源页。
7. 输出 reports/project_audit_report.md。

推荐模式：Plan
推理等级：中
```

---

### 12.2 小范围修复

```text
请先阅读 AGENTS.md。

任务：【这里写具体问题】

要求：
1. 只修改与任务直接相关的文件。
2. 不做无关重构。
3. 不删除文件。
4. 修改后运行 npm run build、npm run seo:audit、npm run images:check。
5. 输出 reports/fix_report.md。
6. 最后给出“给 GPT 的回填摘要”。

推荐模式：Build
推理等级：中
```

---

### 12.3 AI 阿岩助手专项修复

```text
请先阅读 AGENTS.md，并定位 AI 阿岩助手相关文件。

任务：【这里写助手问题，比如：用户问选品时不应优先跳资源页】

要求：
1. 先只读分析当前匹配逻辑。
2. 找出 strongKeywords / weakKeywords / matchTopic / 推荐顺序相关代码。
3. 修改时保持现有无 LLM / 无 API 的规则匹配结构。
4. 不引入新依赖。
5. 新增或更新测试样本。
6. 运行 build 和助手样本测试。
7. 输出 reports/assistant_fix_report.md。

推荐模式：Build
推理等级：高
```

---

### 12.4 内容新增任务

```text
请先阅读 AGENTS.md、现有文章结构和 frontmatter 规范。

任务：新增文章【文章标题】

要求：
1. 内容面向亚马逊新手卖家。
2. 不要写得过度专业。
3. 要解决真实痛点。
4. frontmatter 必须包含 topic、stage、intent、relatedTopics、publicLessonUse、leadMagnet、wechatHook。
5. 文中要有相关文章链接。
6. 结尾要有自然承接：资源 / 公开课 / 问卷。
7. 新增后运行 build、seo:audit、images:check。
8. 输出 reports/content_add_report.md。

推荐模式：Build
推理等级：中
```

---

## 13. 项目专用 AGENTS.md 建议内容

建议把下面内容复制到项目根目录：

```markdown
# 阿岩跨境笔记 AI 执行规则

## 1. 项目概况

- 项目名称：阿岩跨境笔记
- 路径：C:\rpg\ayan-crossborder-notes
- 定位：写给亚马逊卖家的 AI 运营实战知识站
- 技术栈：Astro + Markdown + Cloudflare Pages + Pagefind + IndexNow
- 目标：通过高质量内容、资源模板、公开课承接和 AI 阿岩助手，服务亚马逊新手卖家。

## 2. 核心业务原则

1. 内容为根，工具为辅，增长为后。
2. 文章要解决新手真实痛点，不要为了专业而专业。
3. 不要只堆文章数量，要保证学习路径和内链清楚。
4. 资源领取优先走问卷 / 资料说明，不要只跳微信。
5. AI 阿岩助手优先推荐正确内容，不要默认跳资源页。
6. 首页必须保留清晰的“选品”入口。
7. 公开课承接要贴近新手，不要过度关键词专业化。

## 3. 目录规范

- src/content/：文章、资源、公开课内容
- src/pages/：页面路由
- src/components/：页面组件
- public/：静态资源
- scripts/：自动化脚本
- docs/：长期文档
- tasks/：任务说明
- reports/：执行报告
- backups/：备份
- archive/：归档
- .opencode/commands/：OpenCode 命令模板
- .opencode/skills/：专项技能

## 4. 禁止操作

未经明确要求，不允许：

- 删除业务文件
- 大规模重构
- 批量改 URL
- 破坏 frontmatter
- 引入重型依赖
- 把临时文件放根目录
- 改动部署密钥或 .env
- 把 AI 阿岩助手改成需要付费 API 的方案
- 把资源领取入口全部改成微信页
- 移除首页选品入口

## 5. frontmatter 规则

文章 frontmatter 应优先包含：

- topic
- stage
- intent
- relatedTopics
- publicLessonUse
- leadMagnet
- wechatHook

如果字段不存在，先参考同类文章，不要随意创造不兼容结构。

## 6. AI 阿岩助手规则

当前阶段坚持：

- 无 LLM
- 无 API
- 规则匹配
- 意图分类
- 推荐文章 / 资源 / 公开课

助手推荐顺序：

1. 先判断用户问题属于选品、Listing、广告、Review、AI 工具、资源、公开课哪一类。
2. 优先推荐解释型文章。
3. 再推荐资源模板。
4. 最后才推荐问卷、公开课或微信承接。

## 7. 验证命令

修改后优先运行：

```powershell
npm run build
npm run seo:audit
npm run images:check
git status --short
git diff --stat
```

如果脚本不存在，先读取 package.json，再选择可用脚本。

## 8. 报告要求

每次任务完成后，必须输出报告到 reports/。

报告包含：

1. 任务名称
2. 执行结论
3. 修改文件
4. 具体改动
5. 验证结果
6. 风险
7. 下一步建议
8. 给 GPT 的回填摘要

## 9. 推理等级

- 只读审计、简单检查、报告：中
- 小范围内容或页面修复：中
- AI 阿岩助手、跨文件结构、SEO 脚本、部署问题：高

## 10. 开发原则

每次只做一批小任务。  
先稳定，再加功能。  
先把用户路径跑通，再考虑复杂工具。
```

---

## 14. 推荐 `.opencode/commands`

### 14.1 `.opencode/commands/ayan-audit.md`

```markdown
---
description: 只读审查阿岩跨境笔记项目状态
agent: plan
---

请先阅读 AGENTS.md，然后只读审查当前项目，不修改文件。

重点检查：
1. 页面结构
2. 文章和专题关系
3. 资源中心承接
4. 公开课入口
5. AI 阿岩助手入口和推荐逻辑
6. package.json 脚本
7. SEO / 图片 / 搜索检查
8. 根目录是否有临时文件

输出 reports/ayan_audit_report.md，并给出中文回填摘要。
```

### 14.2 `.opencode/commands/ayan-fix.md`

```markdown
---
description: 执行阿岩跨境笔记小范围修复
agent: build
---

请先阅读 AGENTS.md。

任务：
$ARGUMENTS

要求：
1. 只修改相关文件。
2. 不做无关重构。
3. 不删除文件。
4. 不破坏 frontmatter。
5. 不引入重型依赖。
6. 修改后运行 npm run build、npm run seo:audit、npm run images:check。
7. 输出 reports/ayan_fix_report.md。
8. 最后给出中文回填摘要。
```

### 14.3 `.opencode/commands/ayan-assistant-test.md`

```markdown
---
description: 测试 AI 阿岩助手推荐逻辑
agent: build
---

请先阅读 AGENTS.md，并定位 AI 阿岩助手相关文件。

任务：
测试并优化 AI 阿岩助手的推荐逻辑。

样本至少包含：
1. 我不知道怎么选品
2. 广告烧钱没单怎么办
3. Listing 有流量没转化
4. 产品有差评还能不能做
5. 关键词怎么找
6. 我想领表格
7. 公开课讲什么
8. 新手从哪里开始

要求：
1. 不接入 LLM。
2. 不引入 API。
3. 保持规则匹配。
4. 先输出当前命中结果。
5. 如需修复，只做最小修改。
6. 运行 build 和相关测试。
7. 输出 reports/ayan_assistant_test_report.md。
```

### 14.4 `.opencode/commands/ayan-release-check.md`

```markdown
---
description: 发布前检查阿岩跨境笔记
agent: plan
---

请先阅读 AGENTS.md。

执行发布前只读检查：

1. npm run build
2. npm run seo:audit
3. npm run images:check
4. git status --short
5. git diff --stat

如果存在 links:check、assistant:test、content:check，也一并运行。

输出 reports/ayan_release_check_report.md。
不要修改文件。
```

---

## 15. 推荐第一批执行命令

先不要上来就大改，第一批只做“建规则 + 审查”。

### 15.1 创建基础目录

```powershell
cd "C:\rpg\ayan-crossborder-notes"

$dirs = @("tasks", "reports", "backups", "archive", ".opencode\commands", ".opencode\skills")
foreach ($d in $dirs) {
  New-Item -ItemType Directory -Force -Path $d | Out-Null
}

Write-Host "✅ 基础目录已确认：tasks / reports / backups / archive / .opencode 已就绪。"
```

### 15.2 先让 OpenCode 只读审查

```powershell
cd "C:\rpg\ayan-crossborder-notes"

opencode run "请先阅读 AGENTS.md，然后只读审查当前项目。不要修改文件。重点检查：首页选品入口、资源中心承接、公开课入口、AI 阿岩助手推荐逻辑、package.json 脚本、SEO 和图片检查脚本、根目录临时文件。输出 reports/ayan_project_audit_report.md，并在最后写给 GPT 的回填摘要。推理等级：中。"

Write-Host "✅ OpenCode 只读审查任务已发起。完成后请把 reports/ayan_project_audit_report.md 的回填摘要粘给 GPT。"
```

---

## 16. 建议的 4 周推进节奏

### 第 1 周：稳住项目规则

目标：

- 建 AGENTS.md
- 建 `.opencode/commands`
- 跑一次只读审查
- 清理根目录临时文件
- 确认 build / seo / images 检查稳定

产出：

```text
AGENTS.md
.opencode/commands/*
reports/ayan_project_audit_report.md
reports/ayan_release_check_report.md
```

---

### 第 2 周：修用户路径

目标：

- 首页补强选品入口
- 文章上一篇 / 下一篇优化
- 资源中心 CTA 改成问卷 / 资料说明优先
- 公开课页贴近新手痛点

产出：

```text
首页路径更清楚
资源页承接更自然
公开课承接更像成交页
```

---

### 第 3 周：增强 AI 阿岩助手

目标：

- 意图词库增强
- 避免资源页误跳
- 增加新手不知道从哪开始的引导
- 建立样本测试

产出：

```text
assistant:test
reports/ayan_assistant_test_report.md
```

---

### 第 4 周：内容厚度

目标：

- 新增 3 篇新手痛点文章
- 每篇文章接入专题 / 学习路径 / 资源 / 公开课
- 做一次内链检查
- 做一次发布检查

产出：

```text
3 篇高质量文章
更清晰的学习路径
更完整的转化链路
```

---

## 17. 总结

这个项目后续要更稳更快，不是靠一次性大改，而是靠固定机制：

```text
AGENTS.md 定规则
.opencode/commands 固定任务
reports/ 固定回填
build / seo / images 固定验证
AI 阿岩助手固定样本测试
内容更新固定节奏
```

当前最优先不是继续堆功能，而是先做：

1. 项目专用 AGENTS.md
2. OpenCode commands
3. 只读审查报告
4. 首页 / 资源 / 公开课 / AI 助手路径修复
5. 发布前一键检查

这样开发会更稳，也更容易让 OpenCode / Codex 接力，不会每次都重新解释项目。
