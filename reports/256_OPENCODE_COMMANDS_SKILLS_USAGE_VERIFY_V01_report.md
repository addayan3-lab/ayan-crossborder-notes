# 256: OpenCode Commands & Skills Usage Verify

## 执行结论

**通过 — 建议进入下一批业务修复**

## 逐项检查

### 1. 4 个 SKILL.md 是否短小、明确、可执行

| Skill | 行数 | 结论 | 说明 |
|-------|------|------|------|
| `ayan-content-ops` | 40 | ✅ | frontmatter 字段、内链规则、修改后检查清单、适用任务均明确。 |
| `ayan-conversion-qa` | 46 | ✅ | 资源领取优先级、推荐顺序、选品入口保护、CTA 检查清单均具体。 |
| `ayan-assistant-rules` | 55 | ✅ | 无 LLM/API 约束、话题分类顺序、推荐顺序、回归检查清单均清晰。 |
| `ayan-release-check` | 52 | ✅ | 具体命令、通过条件、排除文件列表、报告要求均清晰。 |

**结论：** 4 个 Skill 均短小（40-55 行）、结构一致（前置检查 → 规则 → 修改后检查 → 适用任务），没有写成另一份 AGENTS.md。

### 2. 3 个 commands 是否能作为固定入口

| Command | 行数 | 结论 | 说明 |
|---------|------|------|------|
| `audit.md` | 22 | ✅ | 只读审计，明确禁止修改文件/创建文件/commit/push。步骤和输出格式清晰。 |
| `verify.md` | 32 | ✅ | 固定验证命令，含输出表格格式，处理脚本不存在的情况。 |
| `report.md` | 55 | ✅ | 固定报告模板，信息收集项和输出格式明确。 |

**结论：** 3 个 Command 均可作为固定入口使用，没有歧义。

### 3. 是否存在诱导风险

检查每份文件是否有语言可能导致：

| 风险类型 | 是否存在 | 说明 |
|----------|----------|------|
| 诱导大规模重构 | 否 | 所有 Skill 都限定在具体文件或路径范围内 |
| 诱导自动上线 | 否 | `ayan-release-check` 明确"不修改代码" |
| 诱导批量改 URL | 否 | 无 URL 重写规则 |
| 诱导接入 LLM/API | 否 | `ayan-assistant-rules` 明确"无 LLM/无 API/无付费 API" |
| 诱导覆盖 frontmatter | 否 | `ayan-content-ops` 要求对齐同类文章，不随意创造字段 |
| 诱导全站跳微信 | 否 | `ayan-conversion-qa` 要求优先问卷/资料说明 |
| 诱导误提交敏感文件 | 否 | `ayan-release-check` 有明确的排除文件列表 |

**结论：** 7 份文件均没有诱导批量修改、重构、自动上线、接入外部服务的语言。

### 4. 修正建议

1. **ayan-content-ops**（建议级）：缺乏图片生产 SOP 参考。建议在"前置检查"中增加 `docs/image-naming-and-manifest-rules.md` 的阅读步骤，因为新文章通常需要配图。

2. **ayan-assistant-rules**（建议级）："用典型 query 回归"缺乏具体列表。建议增加一个具体的回归测试 query 表格，例如：

   | 测试 query | 期望结果 topic |
   |---|---|
   | "广告 ACOS 太高怎么办" | ppc |
   | "不知道怎么找关键词" | keyword |
   | "Listing 转化差" | listing |
   | "怎么分析差评" | review |
   | "想判断一个产品能不能做" | selection |
   | "AI 搜索怎么用" | ai-search |
   | "新手从哪开始" | beginner |

3. **ayan-release-check**（建议级）：可在"输出报告"前增加一条检查："不合并、不部署、不推送未经过验收的代码"。虽然这不是发布 Skill 的职责，但增加一道防护没有坏处。

## 下一步建议

**建议进入下一批业务修复。** 当前 7 份 OpenCode 脚手架文件已通过只读审计，没有发现需要回滚或紧急修复的问题。建议在下一批实际业务任务（如新增文章、修复 CTA、更新助手规则）中首次调用相关 Skill，验证实际效果，然后根据真实反馈迭代。

## 给 GPT 的回填摘要

只读审计了 254 批创建的 7 个 OpenCode 脚手架文件（4 skills + 3 commands）。所有文件短小（22-55 行）、明确、可执行，无诱导大规模重构/自动上线/接入 LLM 的风险。给出了 3 条建议级修正（content-ops 加图片 SOP 引用、assistant-rules 加具体回归 query 表格、release-check 加验收前禁止合并提示）。结论：建议进入下一批业务修复。
