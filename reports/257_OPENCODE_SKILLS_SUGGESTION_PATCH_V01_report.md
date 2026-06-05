# 257: OpenCode Skills Suggestion Patch

## 执行结论

**成功**

## 修改文件

| 文件 | 修改类型 | 说明 |
|------|----------|------|
| `.opencode/skills/ayan-content-ops/SKILL.md` | 编辑 | 前置检查中增加图片 SOP 引用 |
| `.opencode/skills/ayan-assistant-rules/SKILL.md` | 编辑 | 替换笼统语句为具体回归测试表 |
| `.opencode/skills/ayan-release-check/SKILL.md` | 编辑 | 新增验收保护节 |

## 具体补丁

### 1. ayan-content-ops

前置检查新增一行（line 9）：

```markdown
- [ ] 先读 `docs/image-naming-and-manifest-rules.md`（如存在）
```

使用"如存在"修饰，避免硬编码不存在的路径。

### 2. ayan-assistant-rules

将修改后检查中笼统的：

```markdown
- [ ] 用典型 query 回归（如"广告 ACOS 太高" → PPC，"选品" → 选品）
```

替换为完整的回归测试表（7 条 query × 7 个 topic）：

| Query | 期望 topic |
|-------|-----------|
| "广告 ACOS 太高怎么办" | ppc |
| "不知道怎么找关键词" | keyword |
| "Listing 转化差怎么优化" | listing |
| "怎么分析差评" | review |
| "想判断一个产品能不能做" | selection |
| "AI 搜索怎么用" | ai-search |
| "新手从哪开始" | beginner |

### 3. ayan-release-check

在"输出报告"前新增一个"验收保护"节：

```markdown
### 4. 验收保护

- 不合并、不部署、不推送未经过以上验收的代码
- 如果任何检查项未通过，先修复再继续，不要跳过或强制提交
```

后续编号自动顺延。

## 验证结果

| Check | Result |
|-------|--------|
| `npm run build` | ✅ 57 pages, Pagefind 3 filters |
| `npm run seo:audit` | ✅ 456 pass / 0 fail |
| `npm run images:check` | ✅ 49 items, 0 missing, 0 duplicate, 0 orphan |
| `git status --short` | 仅 3 个 SKILL.md 被修改，`reports/seo-audit-report.md` 已 restore |
| `git diff --stat` | 3 files changed，+20 lines |

## 风险

1. 本次仅修改 `.opencode/skills/` 下的文档，不涉及业务代码，风险极低。
2. 回归测试表需要与实际助手规则数据（`src/data/ayan-assistant-rules.ts`）保持一致，未来修改 topic 时需同步更新此表。
3. `reports/seo-audit-report.md` 每次运行 seo:audit 都会被自动覆盖，已 restore 到 HEAD。

## 下一步建议

1. 将本批修改提交并推送。
2. 在下次实际任务（如新增文章、修改助手规则）中首次调用对应 Skill，验证 checklist 是否实用。
3. 后续可根据使用反馈继续微调 Skill 内容。

## 给 GPT 的回填摘要

根据 256 审计建议，对 3 个 OpenCode Skill 做了小范围文档补丁：content-ops 增加图片 SOP 引用（如存在）、assistant-rules 增加 7 行具体回归测试表代替笼统语句、release-check 增加不合并/不部署/不推送未验收代码的保护节。只修改 `.opencode/skills/` 下 3 个文件，不碰 src/ / package.json / AGENTS.md / 文章内容。build/SEO/images 三项验证全部通过。
