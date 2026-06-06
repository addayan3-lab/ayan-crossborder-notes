# 268_AI_PROMPT_ARTICLES_BATCH_V01

## 任务目标

新增 3 篇 AI 提示词文章。文章正文由 GPT 已经写好，放在本任务包的 `drafts/` 目录。

OpenCode 不要重新创作整篇文章，只负责：

1. 参考项目现有文章结构和 frontmatter schema。
2. 将 3 篇草稿落到 `src/content/posts/`。
3. 如 frontmatter 字段与项目 schema 不完全一致，只做必要适配。
4. 保持正文核心内容、标题、结构和表达不被大改。
5. 补齐站内链接、资源承接、公开课承接。
6. 跑 build / seo / images 验证。
7. 输出报告。

## 必须阅读

- AGENTS.md
- .opencode/skills/ayan-content-ops/SKILL.md
- .opencode/skills/ayan-conversion-qa/SKILL.md
- .opencode/skills/ayan-release-check/SKILL.md
- docs/content-production-sop.md（如存在）
- reports/266_CONTENT_ASSET_ROADMAP_AUDIT_V01_report.md
- reports/267_SELECTION_LEARNING_PATH_AND_BEGINNER_ENTRY_V01_report.md
- 现有 ai-search / keyword / listing 相关文章

## 草稿文件

请读取项目根目录下的：

1. `tasks/268_drafts/prompt-structure-for-amazon-sellers.md`
2. `tasks/268_drafts/ai-listing-prompt-template.md`
3. `tasks/268_drafts/ai-keyword-cleaning-prompts.md`

## 建议落地文件名

1. `src/content/posts/prompt-structure-for-amazon-sellers.md`
2. `src/content/posts/ai-listing-prompt-template.md`
3. `src/content/posts/ai-keyword-cleaning-prompts.md`

如果项目已有更合适的 slug 规则，可以小幅调整文件名，但不要改成含中文路径。

## 执行要求

1. OpenCode 只负责落地，不要大幅重写正文。
2. 如果需要根据项目 schema 调整 frontmatter，可以调整。
3. 如果需要补站内链接，可以小幅补充。
4. 不要新增公开课。
5. 不要修改 AI 阿岩助手运行代码。
6. 不要修改 .opencode/。
7. 不要修改 AGENTS.md。
8. 不要修改 package.json。
9. 不接入 LLM/API。
10. 不新增依赖。
11. 不自动 commit。
12. 不自动 push。

## 验证命令

执行后运行：

```bash
npm run build
npm run seo:audit
npm run images:check
```

如果 `reports/seo-audit-report.md` 只是自动重生成，请 restore 到 HEAD。

## 输出报告

写入：

`reports/268_AI_PROMPT_ARTICLES_BATCH_V01_report.md`

报告必须包含：

1. 执行结论
2. 新增文章清单
3. 每篇文章的 topic / stage / intent
4. 每篇文章对应资源 / 公开课 / 问卷承接
5. OpenCode 是否修改了 GPT 原文
6. 验证结果
7. 遗留问题
8. 风险
9. 下一步建议
10. 给 GPT 的回填摘要
