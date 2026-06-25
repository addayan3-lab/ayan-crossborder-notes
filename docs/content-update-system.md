# 内容更新与定期复核机制

## 目标

阿岩跨境笔记包含平台规则、AI 搜索、Listing、PPC、Review 和工具模板内容，其中一部分会随 Amazon 政策、卖家后台功能和 AI 购物入口变化而过期。本机制用于把“什么时候该更新、谁先更新、怎么验证”固定下来。

## frontmatter 更新字段

高时效文章优先补齐以下字段：

```yaml
updateType: policy-sensitive
updateStatus: current
lastReviewed: "2026-06-25"
nextReviewDue: "2026-09-25"
reviewCadenceDays: 90
updateNote: "复核 Amazon 官方来源和站内应对建议。"
sourceUrls:
  - https://example.com/official-source
```

字段说明：

| 字段 | 说明 |
|---|---|
| `updateType` | 内容类型：`evergreen`、`policy-sensitive`、`platform-update`、`news-brief` |
| `updateStatus` | 当前状态：`current`、`watching`、`needs-review`、`outdated` |
| `lastReviewed` | 最近一次人工复核日期 |
| `nextReviewDue` | 下一次必须复核日期 |
| `reviewCadenceDays` | 常规复核间隔 |
| `updateNote` | 本文为什么需要复核、复核重点是什么 |
| `sourceUrls` | 官方来源、平台公告或长期参考页 |

## 类型与复核节奏

| updateType | 适用内容 | 默认节奏 |
|---|---|---|
| `evergreen` | 方法论、案例复盘、基础 SOP | 180 天 |
| `policy-sensitive` | 平台规则、合规、标题、Review、账号健康 | 90 天 |
| `platform-update` | Rufus、Alexa for Shopping、AI 搜索、广告后台功能 | 90 天 |
| `news-brief` | 重点简报、近期公告、明确生效日期的规则变化 | 30 天 |

## 更新状态规则

- `current`：已复核，当前结论可继续使用。
- `watching`：已有明确变化或未来生效日期，需要在生效日前后再次跟踪。
- `needs-review`：超过复核周期，或官方来源出现变化，需要人工确认。
- `outdated`：正文结论已不适用，必须更新后再推广。

## 审计命令

```powershell
npm run content:update-audit
```

输出：

```text
reports/content-update-audit-report.md
```

审计结果分三类：

1. `已过复核日期`：优先处理。
2. `需要补标记或补来源`：高时效文章还没有更新字段或官方来源。
3. `14 天内到期`：本周期内需要安排复核。

## 重点简报流程

1. 从 `docs/news-brief-topic-pool.md` 选择候选。
2. 确认是否有官方来源；没有官方来源，不发“重点简报”，只放入观察。
3. 新建或更新文章，设置：
   - `category: "重点简报"`
   - `updateType: news-brief`
   - `updateStatus: watching`
   - `lastReviewed`
   - `nextReviewDue`
   - `sourceUrls`
4. 正文必须包含：
   - 发生了什么
   - 生效时间或观察时间
   - 影响哪些卖家
   - 和站内已有内容怎么配合
   - 3-7 天可执行清单
5. 发布后运行：
   - `npm run build`
   - `npm run seo:audit`
   - `npm run images:check`
   - `npm run content:update-audit`

## 季度复核流程

每季度最后一周执行：

1. 运行 `npm run content:update-audit`。
2. 先处理已过期的 `news-brief` 和 `policy-sensitive`。
3. 再处理 `platform-update`，尤其是 AI 搜索、Rufus、Alexa for Shopping、广告后台变化。
4. 抽样复核每个专题至少 2 篇核心文章。
5. 更新 `lastReviewed`、`nextReviewDue` 和 `updateNote`。
6. 将结论写入当批 `reports/`。

## 不做的事

- 不为所有文章强行频繁更新。
- 不用非官方传闻直接改规则结论。
- 不把“重点简报”变成普通新闻搬运。
- 不批量改 URL。
- 不因为脚本提示缺字段就机械改正文。
