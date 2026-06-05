# CTA 降噪执行报告 219-222 V01

**日期**: 2026-06-05 | **批次**: 219-222

---

## 执行结论

**成功**。4 个任务全部完成，build 通过，SEO 0 fail，images 49/0/0/0，Pagefind 仍为 3 filters。

---

## 修改文件清单

| 文件 | 改动 |
|------|------|
| `src/pages/articles/[slug].astro` | 移除侧栏 `toc-cta` 区块（立即领取）；`RelatedArticles max={4}` → `max={2}` |
| `src/pages/resources/index.astro` | 资源卡片 CTA 从 3 个降为 1-2 个；移除微信关键词徽标 |
| `src/components/RelatedArticles.astro` | 默认 `max=4` → `max=2`；hint 文案统一为"相关补充阅读" |
| `src/pages/open-class/index.astro` | "查看配套资料"从按钮降为文字链接；新增 `.course-cta-text` 样式 |

---

## 文章侧栏 CTA 处理结果

- **文件**: `src/pages/articles/[slug].astro`
- **处理**: 移除了侧栏 `toc-cta` 区块（第 160-164 行），该区块显示"免费资料包/领取 AI 运营检查表.../立即领取"
- **保留**: NextUp ✅ BackToLearningPath ✅ ArticleNavHints ✅ RelatedArticles ✅ 文章底部 CTA ✅
- **未恢复**: ArticleResourceCTA ✅
- **结果**: 每篇文章现在仅底部保留 1 个"领取 AI 运营资料包"按钮，不再与侧栏重复

---

## 资源中心 CTA 降噪结果

- **文件**: `src/pages/resources/index.astro`
- **改动**:
  - 每张资源卡片从 **3 个 CTA**（查看文章 + 查看资料详情 + 微信关键词）降为 **1-2 个**
  - 移除所有资源卡片的微信关键词徽标（`resource-card-keyword` div）
  - 有详情页的资源：主 CTA 为"查看资料详情"，次 CTA 为"配套文章"文字链接
  - 无详情页的资源：主 CTA 为"查看文章"
- **效果**: 28 张卡片从 **84 个 CTA** 降至约 **50 个**（每张 1-2 个）
- **未破坏**: 资源分类结构 ✅ 详情页链接 ✅ 无 404 ✅

---

## RelatedArticles 显示数量变化

- **文件**: `src/components/RelatedArticles.astro` + `src/pages/articles/[slug].astro`
- **改动**:
  - `max` 默认值: `4` → `2`
  - `[slug].astro` 传入值: `max={4}` → `max={2}`
  - 文案: "你可能也想读/按相关专题推荐/同专题其他文章" → 统一为"相关补充阅读"
- **效果**: 文章底部推荐从最多 4 篇降至最多 2 篇，减少阅读干扰

---

## 公开课卡片 CTA 处理结果

- **文件**: `src/pages/open-class/index.astro`
- **改动**:
  - "查看课程详情"：保持为主 CTA 按钮（`course-cta course-cta-detail`）✅
  - "查看配套资料"：从按钮（`course-cta`）降为文字链接（`course-cta-text`）
  - 新增 `.course-cta-text` 样式：灰色文字、hover 变蓝加下划线
- **效果**: 每节公开课卡片仅 1 个强按钮，配套资料作为辅助文字链接
- **未改动**: 公开课详情页 ✅ 核心文案 ✅ 链接可用 ✅

---

## 验收结果

| 检查项 | 结果 |
|--------|------|
| `npm run build` | ✅ 通过（57 pages, Pagefind 3 filters） |
| `npm run seo:audit` | ✅ 通过（456 Pass, 0 Fail） |
| `npm run images:check` | ✅ 通过（49 / 0 / 0 / 0） |
| 文章侧栏重复强资料 CTA | ✅ 已移除 |
| 资源中心卡片 CTA 明显减少 | ✅ 28 卡片 × 3 → 28 卡片 × 1-2 |
| RelatedArticles 最多 2 篇 | ✅ 默认 2，传入 2 |
| 公开课卡片最多 1 个强 CTA | ✅ 配套资料降为文字链接 |
| 不修改文章正文 | ✅ |
| 不新增普通文章 | ✅ |
| 不接 API | ✅ |
| 不接 LLM | ✅ |
| 不 commit | ✅ |
| 不 push | ✅ |

---

## 下一步建议

1. **批次 223+：全站微信 CTA 收敛** — 资源详情页和公开课详情页的微信关键词可进一步降级
2. **资源详情页 CTA 统一** — 7 个详情页当前仍有"学习路径"/"公开课"/"做 30 秒诊断"/"返回资源中心"多个出口，可合并为 2-3 个
3. **首页侧栏"立即领取"弱化** — 当前首页侧栏仍有"立即领取"按钮，与 ResourceCenterTeaser 功能重叠，可考虑弱化或合并
