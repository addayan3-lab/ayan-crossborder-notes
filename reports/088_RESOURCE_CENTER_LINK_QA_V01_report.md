# 088 · /resources/ 链接与数据 QA v0.1 报告

> 任务:审计 082 上线的 `/resources/` 资源中心, 检查 28 卡片 / 7 分类 / 链接有效性 / 微信关键词唯一性
> 状态: ✅ 完成 / 0 修复
> 报告时间: 2026-06-03

---

## 1. 任务范围

### 1.1 审计目标
- 28 资源卡数量 / 7 分类 / 6 字段 / 5 (PDF) 学习路径
- 28 文章 slug 链接全部 resolve
- 6 学习路径链接 (5 PDF + 1 tools) 全部 resolve
- 28 微信关键词全部唯一
- 0 错链 / 0 空链 / 0 重复关键词

### 1.2 不做的事情
- ❌ 不改资源中心结构
- ❌ 不动 28 篇文章
- ❌ 不动 082 数据数组
- ❌ 不动部署配置

---

## 2. 审计结果

### 2.1 数据完整性 (源文件 `src/pages/resources/index.astro`)

| 检查项 | 期望 | 实际 | 结果 |
|---|---|---|---|
| 资源卡数量 | 28 | 28 | ✅ |
| 分类数 (category name:) | 7 | 7 | ✅ |
| 每卡字段数 | 6 (name / slug / wechatKeyword / audience / publicClassScene / content) | 6 | ✅ |
| slug 字段数 | 28 | 28 | ✅ |
| wechatKeyword 字段数 | 28 | 28 | ✅ |
| audience 字段数 | 28 | 28 | ✅ |
| publicClassScene 字段数 | 28 | 28 | ✅ |
| content 字段数 | 28 + 5 (learningPath content) = 33 | 33 | ✅ |
| name 字段数 | 7 (category) + 28 (resource) = 35 | 35 | ✅ |
| learningPath: 非 null | 6 (选品 = null 设计如此) | 6 | ✅ |
| (PDF) 学习路径卡 | 5 | 5 (关键词 / Listing / PPC / Review / AI 搜索) | ✅ |

### 2.2 链接有效性

#### 28 文章 slug 全部 resolve
- 28 个 slug 与 dist/articles/[slug]/ 1:1 对应
- `Compare-Object` 结果: 0 missing
- 所有 `/articles/${r.slug}/` 链接 200

#### 6 学习路径 href 全部 resolve
- `ai-search-learning-path` ✓
- `keyword-learning-path` ✓
- `listing-learning-path` ✓
- `ppc-learning-path` ✓
- `review-learning-path` ✓
- `tools-learning-path` ✓
- 选品 (null) 设计如此, 资源中心目录里 082 已隐藏 learningPath 区

### 2.3 微信关键词唯一性 (28/28 unique)

| 序号 | 关键词 | 所属分类 |
|---|---|---|
| 1 | 规则 | 新手规则 |
| 2 | 矩阵 | 选品 |
| 3 | 反推 | 选品 |
| 4 | 容量 | 选品 |
| 5 | K路径 | 关键词 |
| 6 | 词表 | 关键词 |
| 7 | 清洗 | 关键词 |
| 8 | 4源 | 关键词 |
| 9 | 陷阱 | 关键词 |
| 10 | L路径 | Listing |
| 11 | L重写 | Listing |
| 12 | 五点 | Listing |
| 13 | 自检 | Listing |
| 14 | P路径 | PPC |
| 15 | SP | PPC |
| 16 | 首周 | PPC |
| 17 | 报表 | PPC |
| 18 | R路径 | Review |
| 19 | R矩阵 | Review |
| 20 | 痛点 | Review |
| 21 | 差评 | Review |
| 22 | AI路径 | AI 工具 |
| 23 | 全景 | AI 工具 |
| 24 | AI评测 | AI 工具 |
| 25 | AI工具 | AI 工具 |
| 26 | 工具包 | AI 工具 |
| 27 | Rufus | AI 工具 |
| 28 | C搜索 | AI 工具 |

**与 080 leadMagnet 1:1 对应:** 28 leadMagnet 与 28 wechatHook 配对完全一致 (085 已确认)。

### 2.4 错链/空链/重复关键词

- 错链: 0
- 空链: 0
- 重复关键词: 0
- 漂移 (资源卡 name 与文章 leadMagnet 不一致): 0 (085 已修复 5 学习路径 (PDF) 漂移)

---

## 3. 验收

- [x] 28 资源卡
- [x] 7 分类
- [x] 6 字段/卡
- [x] 28 链接全部 resolve
- [x] 6 学习路径链接全部 resolve (1 null 设计)
- [x] 5 (PDF) 学习路径卡与 080/085 一致
- [x] 28 微信关键词 100% 唯一
- [x] 0 错链
- [x] 0 空链
- [x] 0 重复关键词
- [x] 0 修复 (本次纯审计, 082 数据已 OK)

---

## 4. 后续衔接

- 089: 28 文章 CTA QA (frontmatter + 渲染 + 过度营销)
- 091: /resources/[slug]/ 详情页规划 (会引用 088 数据结构)
- 093: 资源详情页 MVP (会用 088 验证的 slug 列表生成静态路径)

---

**报告结束。** 088 任务完成, 0 修复, 资源中心数据已 100% 干净。
