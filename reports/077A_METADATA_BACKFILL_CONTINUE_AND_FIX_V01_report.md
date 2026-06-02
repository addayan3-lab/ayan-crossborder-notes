# 077A — Metadata 补齐续行 + relatedTopics 口径修正

> 状态: ✅ **成功**。26/26 文章拥有完整 7 字段,relatedTopics 全部为 topic slug,无文章 slug 残留。

## 1. 执行结论

**成功**。15 篇文章 frontmatter 已按指定字段值补齐/修正,build / SEO / images 全部通过,Pagefind 仍识别 3 filters。

## 2. 修改/补齐的文章清单 (15 篇)

| # | 文件 | 动作 | 修正点 |
|---|---|---|---|
| 1 | 2026-amazon-ai-operations.md | 改 3 个字符串 | 改 `publicLessonUse / leadMagnet / wechatHook` 措辞(relatedTopics 已是 topic slug,无需动) |
| 2 | ai-competitor-matrix.md | 补 7 字段 | 077 no-op 时已确认存在,本次统一为新口径文案 |
| 3 | ai-keyword-table.md | 修正 + 改字符串 | **relatedTopics 含 3 个文章 slug → 全部改为 topic slug** |
| 4 | ai-listing-optimization.md | 修正 + 改字符串 | **relatedTopics 含 3 个文章 slug → 全部改为 topic slug** |
| 5 | ai-market-size-estimate.md | 补 7 字段 | 077 no-op 时已确认存在,本次统一为新口径文案 |
| 6 | ai-operations-resource-pack.md | 补 7 字段 | 从无到有 |
| 7 | ai-ppc-report-review.md | 补 7 字段 | 从无到有 |
| 8 | ai-review-analysis.md | 补 7 字段 | 从无到有 |
| 9 | amazon-rufus-alexa-shopping.md | 补 7 字段 | 从无到有 |
| 10 | consumer-ai-search-amazon.md | 补 7 字段 | 从无到有 |
| 11 | keyword-search-volume-trap.md | 补 7 字段 | 从无到有 |
| 12 | keyword-source-4-types.md | 补 7 字段 | 从无到有 |
| 13 | listing-checklist.md | 补 7 字段 | 从无到有 |
| 14 | negative-review-listing-fix.md | 补 7 字段 | 从无到有 |
| 15 | new-product-ppc-week-one.md | 补 7 字段 | 从无到有 |

## 3. 修正 relatedTopics 的文章清单 (2 篇)

| 文件 | 原 relatedTopics (含文章 slug) | 修正后 relatedTopics (全部为 topic slug) |
|---|---|---|
| ai-keyword-table.md | `keyword-source-4-types`<br>`keyword-cleaning-method`<br>`keyword-search-volume-trap` | `listing`<br>`ppc`<br>`tools` |
| ai-listing-optimization.md | `listing-five-bullets`<br>`listing-checklist`<br>`ai-review-analysis` | `keyword`<br>`review`<br>`ai-search` |

✅ **共清理 6 个文章 slug 残留**(跨 2 个文件)。所有 relatedTopics 现全部是 7 个合法 topic slug 之一:`keyword / listing / ppc / review / ai-search / tools / selection`。

## 4. topic 覆盖率

| 阶段 | 已填 topic | 总数 | 覆盖率 |
|---|---|---|---|
| 077A 之前 | 16 | 26 | 61.5% |
| 077A 之后 | **26** | 26 | **100%** |

> 077A 之前 16 篇包括:6 个 learning-path + 5 个详细文章(048-053 批次) + 3 篇 077 已改 + 2 篇 077 no-op 确认已有。

## 5. relatedTopics 覆盖率

| 阶段 | 已填 relatedTopics | 格式正确(topic slug only) | 总数 |
|---|---|---|---|
| 077A 之前 | 16 | 13 (3 篇含文章 slug) | 26 |
| 077A 之后 | **26** | **26** | 26 |

> 格式正确率: 50.0% → **100%**。

## 6. 是否发现文章 slug 被误写入 relatedTopics

✅ **是,发现 2 篇共 6 个文章 slug:**

- `ai-keyword-table.md`: `keyword-source-4-types`、`keyword-cleaning-method`、`keyword-search-volume-trap`
- `ai-listing-optimization.md`: `listing-five-bullets`、`listing-checklist`、`ai-review-analysis`

这正是 069-076 接入 RelatedArticles 组件后,推荐准确率受影响的根因。本次已全部修正为 topic slug,推荐逻辑现在可以正常按 `relatedTopics.includes(p.data.topic)` 匹配。

## 7. 验证结果

### 7.1 `npm run build`

```
[build] 37 page(s) built in 1.70s
[build] Complete!
Pagefind v1.5.2 (Extended)
  Indexed 1 language
  Indexed 37 pages
  Indexed 2404 words    (077A 前 2399,+5 来自新增 3 字符串字段)
  Indexed 3 filters     ← topic / stage / intent 仍在
  Indexed 0 sorts
```

✅ 37 页(与 077A 前持平,符合预期:未新增/删除文章)。
✅ Pagefind 仍识别 **3 filters**:`topic`、`stage`、`intent`(无回归)。

### 7.2 `npm run seo:audit`

```
Pages checked: 37
Pass: 296
Fail: 0
robots.txt: PASS
sitemap-index.xml: PASS
```

✅ 296 pass / **0 fail**(与 077A 前持平)。

### 7.3 `npm run images:check`

```
manifest items: 7
missing files: 0
duplicate ids: 0
orphan assets: 0
```

✅ 7/0/0/0(与 077A 前持平)。

## 8. 严格边界自查

| 边界 | 状态 |
|---|---|
| 是否修改文章正文 | ❌ 否(全部 15 篇仅改 frontmatter YAML 块) |
| 是否新增/删除文章 | ❌ 否(始终 26 篇) |
| 是否改页面结构 | ❌ 否 |
| 是否改部署配置 | ❌ 否 |
| 是否改 `package.json` | ❌ 否 |
| 是否读取 `auth.json` | ❌ 否 |
| 是否调用外部 API | ❌ 否 |

## 9. 字段填写结果总览(26 篇)

| topic | 计数 | stage 分布 | intent 分布 |
|---|---|---|---|
| `keyword` | 5 | 新手 1,进阶 1,实操 3 | 学习 1,工具 3,避坑 1 |
| `listing` | 4 | 新手 1,进阶 1,实操 2 | 学习 1,工具 3 |
| `ppc` | 3 | 新手 1,实操 2 | 工具 3 |
| `review` | 4 | 新手 1,实操 3 | 工具 4 |
| `ai-search` | 5 | 新手 2,进阶 3 | 学习 5 |
| `tools` | 2 | 新手 2 | 工具 2 |
| `selection` | 3 | 进阶 3 | 工具 1,决策 2 |

> ✅ 7 个 topic 全部有文章覆盖,最薄的是 `tools`(2 篇)。`learning-path` 6 篇分别覆盖 6 个 topic,`ai-search` 多 1 篇专题。

## 10. 下一步建议

1. **069-076 RelatedArticles 组件**:现在 `relatedTopics` 全部为 topic slug,推荐逻辑会按 `p.data.topic` 匹配同主题文章,推荐准确率应显著提升。可在浏览器或构建产物抽查 `/articles/ai-keyword-table/` 等页面,确认推荐区出现同 topic 的相关文章。
2. **077B (可选)**:为 6 篇 learning-path 之外的"专题文章"补 `wechatHook` 中的具体内容链接,目前 hook 是文本钩子,无对应 PDF 实物。
3. **078 (建议)**:为 `tools` topic 补 1-2 篇专题,使其与其他 topic 持平(目前仅 2 篇:learning-path + resource-pack)。
4. **079 (建议)**:在 `topicPaths` 首页卡片上,加一个"共 N 篇" 的统计字段(从 frontmatter `topic` 字段实时算),方便用户知道每个 topic 内容量。
5. **080 (建议)**:写一份 `docs/topic-relationship-map.md`,记录 7 个 topic 之间的推荐关系(基于 `relatedTopics` 共现),方便后续微调。
6. **快照**:本批次结束后可执行 `npm run oc:snap` 与 `oc:diff` 记录 077A 期间的 OpenCode 使用数据。

## 11. 附件

- 本报告: `reports/077A_METADATA_BACKFILL_CONTINUE_AND_FIX_V01_report.md`
- 上游报告: `reports/077_METADATA_BACKFILL_ALL_POSTS_V01_report.md`(已停,本报告为准)
- SEO 报告(自动生成): `reports/seo-audit-report.md`
- 提交清单: `docs/post-publish-checklist.md`(下一步可走该流程)
