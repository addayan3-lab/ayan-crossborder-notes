# ayan-content-ops

**用途：** 文章内容运营 — frontmatter、内链、学习路径、专题页。不修改业务逻辑和运行代码。

## 前置检查

- [ ] 先读 `AGENTS.md` 第 5 节 frontmatter 规则
- [ ] 先读 `docs/content-production-sop.md`
- [ ] 先读 `docs/image-naming-and-manifest-rules.md`（如存在）
- [ ] 先读同类已发布文章的 frontmatter 作为对齐参考
- [ ] 确认操作范围，不改 AI 阿岩助手运行代码和业务逻辑

## 规则

### frontmatter

- `topic`、`stage`、`intent`、`relatedTopics`、`publicLessonUse`、`leadMagnet`、`wechatHook` 必须对齐同类文章
- 不随意创造不兼容字段结构
- 修改后校验 frontmatter 完整性

### 内容

- 文章优先解决新手真实痛点，不为了专业而专业
- 不新增杂乱专题，优先维护现有学习路径
- 学习路径入口（如 `src/pages/articles/xxx-learning-path.astro`）要与文章 frontmatter 的 `stage`/`topic` 一致

### 修改后检查

- [ ] `/articles/` 列表页能正常显示文章
- [ ] 专题页链接不404
- [ ] 首页专题展示正常
- [ ] 学习路径内的文章顺序合理
- [ ] `npm run build` 通过

## 适用任务

- 新文章创建
- 文章 frontmatter 回填或修复
- 内链补充或修正
- 学习路径更新
- 专题页入口修复
