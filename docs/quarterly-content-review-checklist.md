# 季度内容复核清单

## 执行时间

每季度最后一周执行一次。遇到 P0 规则变化，不等季度复核，按重点简报流程立即处理。

## 1. 运行脚本

```powershell
npm run content:update-audit
```

检查：

- `已过复核日期` 是否为 0。
- `需要补标记或补来源` 是否逐步下降。
- 高时效文章是否都有 `sourceUrls`。

## 2. 复核重点文章

优先级从高到低：

1. `updateType: news-brief`
2. `updateType: policy-sensitive`
3. `updateType: platform-update`
4. 首页推荐、专题学习路径、公开课承接文章
5. 普通 evergreen 方法文章

## 3. 每篇文章复核步骤

1. 打开 frontmatter，确认 `updateType` 和 `updateStatus` 是否合理。
2. 打开 `sourceUrls`，确认官方来源是否仍然有效。
3. 检查正文里的日期、规则描述、功能名称和建议动作是否过期。
4. 检查站内链接是否仍然指向更合适的内容。
5. 必要时更新正文中的提示语、应对清单和资料包推荐。
6. 更新：

```yaml
lastReviewed: "YYYY-MM-DD"
nextReviewDue: "YYYY-MM-DD"
updateStatus: current
updateNote: "本季度已复核官方来源和站内建议。"
```

## 4. 专题抽样要求

每季度每个专题至少抽样 2 篇：

- `keyword`
- `listing`
- `ppc`
- `review`
- `selection`
- `ai-search`
- `tools`

抽样优先看：

- 首页或专题页入口文章
- 最近新增文章
- 有高转化资料包入口的文章
- 引用平台功能或规则的文章

## 5. 验证命令

复核并修改后运行：

```powershell
npm run build
npm run seo:audit
npm run images:check
npm run content:update-audit
git status --short
git diff --stat
```

## 6. 报告要求

在 `reports/` 新增季度报告，至少包含：

1. 本季度复核日期
2. 复核文章列表
3. 已更新文章
4. 未更新但确认有效的文章
5. 发现的过期风险
6. 下季度待跟踪选题
7. 验证结果
8. 给 GPT 的回填摘要

## 7. 判断标准

可以不改正文的情况：

- 官方来源没有变化。
- 正文没有具体时间承诺。
- 建议仍然适合新手卖家。
- 站内链接仍然准确。

必须更新正文的情况：

- 生效日期已经过去，但文章还写“即将”。
- Amazon 功能名称、入口或适用范围变化。
- 文章建议与官方规则冲突。
- 重点简报已有后续结果，但正文没有补结论。
- 站内推荐内容已经有更新、更准确的文章。
