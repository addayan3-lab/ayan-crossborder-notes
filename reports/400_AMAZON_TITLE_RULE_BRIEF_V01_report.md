# 400 亚马逊标题规则重点简报执行报告

## 一、任务名称

亚马逊标题规则变化重点简报新增

## 二、执行结论

已新增一篇“重点简报”文章，围绕 2026-07-27 亚马逊标题 75 字符规则变化，结合站内 Listing 自检、平台规则、AI Listing 和 Rufus 相关文章给出应对方案。同步新增文章封面并补充 AI 阿岩助手匹配规则。未删除文件，未修改部署配置。

## 三、修改文件

新增：
- `src/content/posts/amazon-title-rule-75-characters-2026.md`
- `public/images/articles/amazon-title-rule-75-characters-2026/cover.svg`
- `reports/400_AMAZON_TITLE_RULE_BRIEF_V01_report.md`

修改：
- `src/data/image-manifest.json`
- `src/data/ayan-assistant-rules.ts`

## 四、具体改动

- 新增文章使用 `category: "重点简报"`、`hookType: 政策解读`、`topic: listing`，可在文章列表和政策解读筛选中展示。
- 文章引用亚马逊卖家论坛官方公告，说明 2026-07-27、75 字符、Item Highlights、AI 推荐、14 天审核窗口等重点。
- 正文提供标题压缩结构、字段重新分配表、7 天应对清单和站内延伸阅读。
- 新增 SVG 封面并登记到 `image-manifest.json`。
- AI 阿岩助手的 Listing 和平台规则匹配中加入“75字符”“Item Highlights”“标题规则”等关键词，并优先推荐该简报。

## 五、验证结果

- `npm run build`：通过，构建 130 页，新文章 `/articles/amazon-title-rule-75-characters-2026/` 已生成；Pagefind 索引 130 页。
- `npm run seo:audit`：未全站通过，131 页中 1020 项通过 / 28 项失败；新简报页面本身通过，失败项来自历史文章 H1 数量异常和历史验证页元信息缺失。
- `npm run images:check`：通过核心检查，manifest 61 项、missing files 0、duplicate ids 0；仍有 20 个历史 orphan 图片提示，非本次新增。
- `git status --short`：显示本次新增文章、封面、报告及两处数据文件修改；另有既有未跟踪 `kaif.zip`，未处理。
- `git diff --stat`：已检查改动规模。

## 六、风险

- 亚马逊政策执行可能按站点、类目或后台通知存在差异，文章已提示以卖家后台、类目和官方最新通知为准。
- Item Highlights 字段在不同卖家后台的可见性和开放节奏可能不同，需要后续持续观察。
- 标题缩短可能影响点击率、转化率和广告搜索词承接，文章建议先用核心 ASIN 小批量测试。

## 七、下一步建议

1. 后续可补一篇配套教程：`75 字符标题改写 Prompt 和检查表`。
2. 如果后台实际开放 Item Highlights，可再更新资源页或 Listing 自检清单，加入该字段检查项。
3. 可在首页或 Listing 专题页增加“重点简报”入口，让重大政策更新更容易被看见。

## 八、给 GPT 的回填摘要

### 执行内容
- 新增 `amazon-title-rule-75-characters-2026` 重点简报文章。
- 新增对应 SVG 封面并写入图片 manifest。
- 更新 AI 阿岩助手规则，让标题规则、75 字符、Item Highlights 相关问题优先命中新简报。

### 关键决策点
- 文章定位为 `重点简报` + `政策解读`，但仍归入 `topic: listing`，因为主要影响 Listing 标题和页面字段分工。
- 不只写新闻摘要，而是结合站内 Listing 自检清单、平台规则入门、Rufus Listing 写法和 AI 风险检查给出执行顺序。
- 未新增重型依赖，未改运行层，未改部署配置。

### 验证
- build 通过，130 页生成。
- 新简报 SEO 项通过；全站 SEO 仍有历史 28 项失败。
- 图片检查 missing files 0、duplicate ids 0；历史 orphan 图片 20 项。

### 未完成 / 待办
- 等验证完成后回填最终结果。
