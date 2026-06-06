# 269_RESOURCE_TUTORIAL_ARTICLES_V01

## 任务目标

新增 / 填充 2 篇资源包配套教学文章。文章正文由 GPT 已经写好，OpenCode 不要重新创作整篇文章，只负责：

1. 参考项目现有文章结构和 frontmatter schema。
2. 将 `tasks/269_drafts/keyword-cleaning-sheet-tutorial.md` 落地为新文章。
3. 用 `tasks/269_drafts/listing-checklist.md` 填充现有占位文章 `src/content/posts/listing-checklist.md`。
4. 如 frontmatter 字段与项目 schema 不完全一致，只做必要适配。
5. 保持正文核心内容、标题、结构和表达不被大改。
6. 补齐必要站内链接。
7. 跑 build / seo / images 验证。
8. 输出报告。

## 必须阅读

- AGENTS.md
- .opencode/skills/ayan-content-ops/SKILL.md
- .opencode/skills/ayan-conversion-qa/SKILL.md
- .opencode/skills/ayan-release-check/SKILL.md
- docs/content-production-sop.md（如存在）
- reports/269_RESOURCE_TUTORIAL_ARTICLES_PRECHECK_V01_report.md
- 现有 resources 页面
- 现有 tools / listing 相关文章

## 草稿文件

1. `tasks/269_drafts/keyword-cleaning-sheet-tutorial.md`
2. `tasks/269_drafts/listing-checklist.md`

## 落地要求

### E01：关键词清洗表怎么填：逐字段教学

- 新建：`src/content/posts/keyword-cleaning-sheet-tutorial.md`
- topic: tools
- stage: 实操
- intent: 工具
- 不要与 `keyword-cleaning-method.md` 混淆。E01 是逐字段教学，不是关键词清洗 SOP。

### E02：Listing 自检清单怎么用：检查顺序和判断标准

- 不新建文件
- 直接替换 / 填充现有：`src/content/posts/listing-checklist.md`
- 保持 topic=listing
- 不要改成 topic=tools
- 保留 listing 专题链条 prevArticle / nextArticle / relatedArticleLinks

## 禁止事项

1. 不修改 AI 阿岩助手运行代码
2. 不修改 .opencode/
3. 不修改 AGENTS.md
4. 不修改 package.json
5. 不接入 LLM/API
6. 不新增依赖
7. 不新增公开课
8. 不自动 commit
9. 不自动 push
10. 不大幅重写 GPT 正文

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

`reports/269_RESOURCE_TUTORIAL_ARTICLES_V01_report.md`

报告必须包含：

1. 执行结论
2. 新增 / 填充文章清单
3. 每篇文章的 topic / stage / intent
4. 每篇文章对应资源 / 公开课 / 问卷承接
5. OpenCode 是否修改了 GPT 原文
6. 验证结果
7. 遗留问题
8. 风险
9. 下一步建议
10. 给 GPT 的回填摘要
