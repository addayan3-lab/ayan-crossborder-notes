# 069-076_INTERNAL_LINKING_FLOW_V01

## 目标

增强站内流转与文章间互相推荐：

- 069 新增相关文章组件
- 070 按 relatedTopics 自动推荐文章，优先 relatedTopics，其次 topic，禁止推荐当前文章自身
- 071 文章底部增加"下一篇该读什么"
- 072 文章底部增加回到专题学习路径
- 073 学习路径页增加当前专题文章数量统计
- 074 首页 6 个专题卡显示文章数量
- 075 独立专题页补推荐学习顺序模块
- 076 生成 reports/069-076_INTERNAL_LINKING_FLOW_V01_report.md

## 执行边界

- 不新增普通文章
- 不修改文章正文（仅在文章页底部新增模块）
- 不删除已有链接
- 不重构全站布局
- 不改部署配置
- 只做：相关文章推荐、下一篇推荐、专题回流、文章数量统计、学习顺序模块

## 当前背景

- 当前页面数：37
- 当前 SEO：296 pass / 0 fail
- 当前 image manifest：7 manifest / 0 missing
- 已有专题：keyword / listing / ppc / review / ai-search / tools
- 已有阶段 stage 取值：新手 / 进阶 / 实操
- 已有 intent 取值：学习 / 工具 / 决策 / 避坑
- 6 篇学习路径文章：
  - /articles/keyword-learning-path/
  - /articles/listing-learning-path/
  - /articles/ppc-learning-path/
  - /articles/review-learning-path/
  - /articles/ai-search-learning-path/
  - /articles/tools-learning-path/
- 5 个独立专题页：
  - /listing/ — Listing 优化
  - /ppc/ — 广告 PPC
  - /ai-amazon/ — AI 运营亚马逊
  - /selection/ — 选品指南
  - /tools/ — 工具模板
- 首页 6 个专题卡：keyword / listing / ppc / review / ai-search / tools
- 当前文章 26 篇（含 topic 字段 11 篇；含 relatedTopics 字段 6 篇）

## 验收

必须运行：

```bash
npm run build
npm run seo:audit
npm run images:check
```

报告必须写明：

- build 页面数
- SEO pass / fail
- images 检查结果
- 新增 / 修改文件
- 是否影响 Pagefind 3 filters
- 下一步建议
