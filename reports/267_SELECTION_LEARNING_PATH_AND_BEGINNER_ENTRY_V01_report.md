# 任务 267：Selection 学习路径与新手入口承接报告

## 1. 执行结论

**成功。** 补齐了 selection 专题缺失的学习路径文章，并更新了首页入口承接。变化仅 2 个文件，最小修改。

## 2. 修改文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/content/posts/selection-learning-path.md` | 新增 | 选品学习路径文章（29 节，约 130 行） |
| `src/pages/index.astro` | 修改 | 首页选品入口从 → `ai-market-size-estimate` 改为 → `selection-learning-path` |

## 3. 学习路径结构

新增的 `selection-learning-path.md` 遵循已有学习路径的文章格式（frontmatter + 正文），内容结构：

| 章节 | 内容 |
|------|------|
| 一、本专题解决什么问题 | 选品 4 步框架：判断自己 → 市场容量 → 竞品矩阵 → 痛点反推 |
| 二、新手先学什么 | 建议先读完本篇建立框架，再读关键词表作为数据基础 |
| 三、推荐阅读顺序 | 4 步路线图，对应 3 篇现有文章（ai-market-size-estimate → ai-competitor-matrix → selection-pain-reverse） |
| 四、对应已有文章卡片 | 3 篇现有文章 + 3 篇辅助阅读 |
| 五、本周实操任务 | 7 个任务，从列出感兴趣品类到输出选品决策表 |
| 六、常见误区 | 5 个新手常犯错误 |
| 七、公开课延伸 | 选品体系 4 节课对应路径 |
| 八、资料包领取 | 4 模板 + 1 决策表 |
| 九、下一步学习建议 | 引向关键词路径或 Listing 路径 |

Frontmatter 字段：

| 字段 | 值 |
|------|-----|
| `topic` | selection |
| `stage` | 新手 |
| `intent` | 学习 |
| `relatedTopics` | review, keyword |
| `publicLessonUse` | 选品公开课开篇导览 |
| `leadMagnet` | 选品学习路径导图(PDF) |
| `wechatHook` | 资料领取方式以资料详情页说明为准 |

## 4. 首页入口承接变更

`src/pages/index.astro` 节点变更：

| 项目 | 修改前 | 修改后 |
|------|--------|--------|
| guide.title | 选品第 1 篇：AI 估算市场容量 | 亚马逊选品学习路径：从市场容量到选品决策 |
| guide.href | `/articles/ai-market-size-estimate/` | `/articles/selection-learning-path/` |
| cta.label | 从第 1 篇开始 → | 看完整学习路径 |
| cta.href | `/articles/ai-market-size-estimate/` | `/articles/selection-learning-path/` |
| previews | 新品选品框架 | 新手选品入门, 选品决策表 |

## 5. 自动承接

`RecommendedOrder` 组件自动识别 `-learning-path` 后缀，新文章会自动排在 selection 专题推荐学习顺序的第一位并标记"学习路径"标签。`selection/index.astro` 无需修改。

## 6. 验证结果

| 检查项 | 结果 |
|--------|------|
| `npm run build` | ✅ 58 pages, 0 errors（+1 新增学习路径页面） |
| `npm run seo:audit` | ✅ 464/0 (pass/fail)（+8 新页面检查项） |
| `npm run images:check` | ✅ 49/0/0/0（使用已有 og-default.svg，无新增图片） |
| `reports/seo-audit-report.md` | ✅ restored to HEAD |

## 7. 遗留问题

| 问题 | 说明 |
|------|------|
| selection 专题"新手"阶段文章仍然只有 1 篇（学习路径本身） | 学习路径是导航性质，真正解决问题的新手选品文章尚未创建 |
| selection/index.astro 的`topic-intro`区未更新 | 描述仍偏"进阶"，但学习路径已设置 stage=新手，用户在专题页看到的首篇文章将是学习路径 |
| 选品学习路径封面图为默认 OG 图 | 未创建专属 cover.svg，如需可后续补 |

## 8. 风险

- **低：** 新增文章使用 `/images/og-default.svg` 作为封面，未创建新图片资源，无需更新 image-manifest
- **低：** 首页入口指向变更后，旧链接 `/articles/ai-market-size-estimate/` 仍然可访问（通过其他入口），无死链
- **无：** 不涉及业务逻辑、部署配置、AI 阿岩助手代码

## 9. 下一步建议

1. 下一批（268）建议创建 AI 提示词文章（B01/B02），继续丰富内容资产
2. 下一阶段仍需在 selection 专题下创建"新手选品第一步"等实操文章
3. 可考虑为选品学习路径创建专属 cover.svg

## 10. 给 GPT 的回填摘要

```
执行了任务 267：Selection 学习路径与新手入口承接。

诊断问题：266 报告指出 selection 专题无学习路径、无新手文章、首页入口指向 ai-market-size-estimate 而非学习路径。

修改：
1. 新增 src/content/posts/selection-learning-path.md——选品学习路径文章
   - 按"判断自己→市场容量→竞品矩阵→痛点反推"4 步组织
   - 串起现有 3 篇 selection 文章
   - stage=新手, intent=学习, 填补了 selection 专题无新手文章的空白
   
2. 修改 src/pages/index.astro——首页选品入口
   - guide 从"选品第1篇"改为"亚马逊选品学习路径"
   - cta 从"从第1篇开始"改为"看完整学习路径"
   - 与其他专题保持一致的视觉和交互模式

自动承接：RecommendedOrder 组件自动识别 selection-learning-path，
selection/index.astro 无需修改即显示"学习路径"标签。

验证：build 58 pages/0 errors, seo 464/0, images 49/0/0/0。

下一步建议：继续创建新手选品实操文章、AI 提示词文章。
```
