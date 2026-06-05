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
