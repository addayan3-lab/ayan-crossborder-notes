# WeChat 关键词收敛执行报告 223-228 V01

**日期**: 2026-06-05 | **批次**: 223-228

---

## 执行结论

**成功**。全站微信关键词从强 CTA 收敛为弱提示 / 元信息，build 通过，SEO 0 fail，images 49/0/0/0，Pagefind 仍为 3 filters。

---

## 微信关键词分布复查结果（Task 223）

| 位置 | 出现次数 | 页面类型 | 是否强 CTA | 处理方式 |
|------|----------|----------|-----------|---------|
| `src/data/ayan-assistant-rules.ts` | 10 处 wechatHook + 10 处 wechatKeyword | 规则数据 | 否（数据层） | 保留（数据不删除） |
| `src/pages/ask/index.astro` | 1 处（展示 wechatHook） | 助手页 | 是 | 弱化为"资料详情页会说明领取方式" |
| `src/pages/resources/index.astro` | hero 元信息 + 28 条 wechatKeyword 数据 | 资源中心 | 数据层（上次已移除卡片徽标） | 保留元信息计数 |
| `src/pages/resources/*.astro` × 7 | 每页 2 处（info-grid + cta-block） | 资源详情页 | 是（cta-block） | cta-block 去除"回复关键词"强 CTA |
| `src/pages/open-class/index.astro` | 8 处 wechatKeyword 数据 + 卡片微信字段 | 公开课中心 | 数据层（上次已弱化） | 保留（仅展示元信息） |
| `src/pages/open-class/*.astro` × 7 | 每页 1 处 wechat-block | 公开课详情页 | 中 | 保留（非主 CTA，与配套资料并列） |
| `src/pages/lead/index.astro` | 1 处（微信 fallback） | 资料领取页 | 中 | 保留（微信作为 Tally fallback） |
| `src/pages/index.astro` | 1 处（"资料将通过企业微信发送"） | 首页 | 弱 | 保留（非主 CTA） |
| `src/content/posts/*.md` | ~30 处 wechatHook frontmatter + 2 处正文 | 文章 | 元数据 / 正文 | 保留（不修改文章正文） |
| `src/layouts/BaseLayout.astro` | "领取资料"/"领取资料包" Tally 绑定 | 全局布局 | 中 | 保留（已存在，与微信无关） |

**结论**: 强 CTA 类微信提示从 ~45 处降至 ~15 处（主要为数据层和元信息），前端用户可见的强"回复关键词" CTA 已全部收敛。

---

## 修改文件清单

| 文件 | 改动 |
|------|------|
| `src/pages/ask/index.astro` | WeChat hook 展示从"回复关键词「X」领取"改为"资料详情页会说明领取方式" |
| `src/pages/resources/keyword-cleaning-sheet.astro` | cta-block 去除"回复关键词"强 CTA |
| `src/pages/resources/listing-checklist.astro` | 同上 |
| `src/pages/resources/ppc-weekly-review.astro` | 同上 |
| `src/pages/resources/review-pain-analysis.astro` | 同上 |
| `src/pages/resources/competitor-selection-matrix.astro` | 同上 |
| `src/pages/resources/ai-tools-review-sheet.astro` | 同上 |
| `src/pages/resources/platform-rules-checklist.astro` | 同上 |
| `src/pages/lead/index.astro` | 新增路径引导文案 + `.lead-divider` 样式 |

---

## /ask/ 微信提示处理结果（Task 224）

- **文件**: `src/pages/ask/index.astro:172-173`
- **改动**: `parts.push('<div class="ask-extras-wechat">' + firstRes.wechatHook + '</div>')` → `parts.push('<div class="ask-extras-wechat">资料详情页会说明领取方式。</div>')`
- **效果**: 助手匹配结果中，配套资源不再显示"回复关键词「清洗」领取"等强引导，改为弱提示
- **保留**: 推荐文章第一优先级 ✅ 匹配算法未改 ✅ wechatHook 数据层未删 ✅ 推荐课程 / 资料 / 公开课仍正常 ✅

---

## 7 个资源详情页微信提示处理结果（Task 225）

所有 7 个详情页 cta-block 统一做以下改动：

| 改动项 | 改前 | 改后 |
|--------|------|------|
| h2 | `回复关键词"xxx",领取xxx` | `领取xxx` |
| p | `领取后会通过企业微信发送,资料按专题持续更新。` | `不确定是否适合这份资料？先做 30 秒诊断，确认后再领取。` |
| 主 CTA | `/survey/`（不变） | `/survey/` ✅ |
| 次 CTA | `/resources/`（不变） | `/resources/` ✅ |
| info-grid "微信领取关键词" | 保留（不变） | 保留（元信息，非 CTA） |

资源详情页列表：
- **关键词清洗表**: h2 `回复关键词"清洗",领取关键词清洗表` → `领取关键词清洗表`
- **Listing 自检清单**: h2 `回复关键词"自检",领取 Listing 自检清单` → `领取 Listing 自检清单`
- **PPC 周复盘表**: h2 `回复关键词"报表",领取 PPC 周复盘表` → `领取 PPC 周复盘表`
- **Review 痛点分析表**: h2 `回复关键词"痛点",领取 Review 痛点分析表` → `领取 Review 痛点分析表`
- **选品竞品矩阵**: h2 `回复关键词"矩阵",领取选品竞品矩阵` → `领取选品竞品矩阵`
- **AI 工具评测表**: h2 `回复关键词"AI评测",领取 AI 工具评测表` → `领取 AI 工具评测表`
- **新手规则避坑清单**: h2 `回复关键词"规则",领取新手规则避坑清单` → `领取新手规则避坑清单`

---

## /lead/ 承接页调整结果（Task 226）

- **文件**: `src/pages/lead/index.astro`
- **改动**: 在 survey-hint 和 lead-actions 之间新增路径分流文案

```
已确定要领取哪份资料？使用下方方式：
```

- 新增 `.lead-divider` 样式：灰色文字 14px/700，上边距 28px，下边距 10px
- **保留**: Tally 表单 ✅ WeChat fallback ✅ survey 推荐 ✅
- **未新增**: 表单逻辑 ✅ 隐私收集 ✅

---

## 验收结果

| 检查项 | 结果 |
|--------|------|
| `npm run build` | ✅ 通过（57 pages, Pagefind 3 filters） |
| `npm run seo:audit` | ✅ 通过（456 Pass, 0 Fail） |
| `npm run images:check` | ✅ 通过（49 / 0 / 0 / 0） |
| /ask/ 可正常推荐文章/资料/公开课 | ✅ |
| /survey/ 正常 | ✅ |
| /lead/ 正常 | ✅ |
| 7 个资源详情页正常 | ✅ |
| 微信关键词不再作为强 CTA 出现 | ✅ |
| 不修改文章正文 | ✅ |
| 不新增普通文章 | ✅ |
| 不接 API | ✅ |
| 不接 LLM | ✅ |
| 不 commit | ✅ |
| 不 push | ✅ |

---

## 下一步建议

1. **公开课详情页 wechat-block 可进一步弱化（批次 229+）** — 当前 7 个公开课详情页仍有"微信关键词"独立区块（含 badge + "回复关键词"），可降级为页脚注释或合并到配套资料说明中
2. **文章正文内 wechatHook 引用收敛** — 2 篇文章正文中仍有"回复关键词"文本（`amazon-platform-rules-beginner.md:324`, `amazon-ai-tools-review.md:353`），但属于文章正文，需在内容编辑时单独处理
3. **首页侧栏"立即领取"弱化（批次 230+）** — 当前首页侧栏仍有"立即领取"按钮 + "资料将通过企业微信发送"，与 ResourceCenterTeaser 功能重叠
4. **全局"微信"提及审计** — 前端文案中仍有多处"企业微信/微信号/微信关键词"，可在后续批次中统一收敛到 /lead/ 作为唯一微信承接入口
