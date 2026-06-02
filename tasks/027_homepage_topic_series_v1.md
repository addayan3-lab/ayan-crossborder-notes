# 027｜内容站运营首页优化：专题学习路径 V1

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
把首页从普通文章列表，优化成“专题学习路径”结构，让用户一进入首页就知道：

1. 这是亚马逊 AI 运营知识站
2. 可以按专题学习
3. 每个专题后续可以持续连载
4. 站点不是杂乱博客，而是体系化运营笔记

---

## 修改范围

优先修改：

- src/pages/index.astro

如确有必要，可以只读参考：

- src/content/posts/
- src/layouts/BaseLayout.astro

不要修改：

- 搜索页
- 文章详情页
- Tally 表单
- 站点 SEO 结构
- 已经完成的 JSON-LD / Analytics / sitemap / robots

---

## 首页结构要求

### 1. 保留当前首屏核心风格

保留当前首页整体高级感和人物形象区域，不要推翻设计。

可以微调文案，但不要大改视觉基调。

---

### 2. 把文章区域改成“专题学习路径”

新增或替换文章展示区为 6 个专题卡片：

#### 专题 1：关键词表系列
说明：
从关键词来源、AI 清洗、字段设计，到 Listing 和 PPC 使用。

当前文章：
- 如何用 AI 做亚马逊关键词表

后续预告：
- 为什么关键词表不能只看搜索量
- 关键词从哪里来
- AI 如何清洗关键词

链接：
/articles/ai-keyword-table/

#### 专题 2：Listing 优化系列
说明：
围绕标题、五点、A+、图片表达和转化逻辑。

当前文章：
- AI 时代亚马逊 Listing 应该怎么写
- 亚马逊 Listing 优化检查清单

链接：
/articles/ai-listing-optimization/
/articles/listing-checklist/

#### 专题 3：广告 PPC 系列
说明：
围绕广告报表复盘、ACOS、搜索词、否词和预算分配。

当前文章：
- 如何用 AI 复盘亚马逊广告报表
- 新品广告第一周怎么开：预算、关键词和否词

链接：
/articles/ai-ppc-report-review/
/articles/new-product-ppc-week-one/

#### 专题 4：Review 分析系列
说明：
从评论里提炼用户痛点、卖点、场景词和产品改进机会。

当前文章：
- 如何用 AI 分析 Review 找到产品卖点

链接：
/articles/ai-review-analysis/

#### 专题 5：AI 搜索与消费者变化
说明：
理解 Amazon Rufus、Alexa for Shopping、AI 搜索和推荐变化。

当前文章：
- Amazon Rufus / Alexa for Shopping 对卖家意味着什么
- 消费者如何用 Amazon AI 搜索产品

链接：
/articles/amazon-rufus-alexa-shopping/
/articles/consumer-ai-search-amazon/

#### 专题 6：工具模板与资料包
说明：
领取 AI 运营检查表、Listing Prompt、PPC 复盘表和 Review 分析模板。

当前入口：
- /lead/
- /tools/

---

## 视觉要求

1. 专题卡片要高级、干净、专业
2. 颜色统一蓝白灰
3. 可以用少量 emoji 或图标，但不要花哨
4. 每个专题卡片包含：
   - 专题名称
   - 一句话说明
   - 已有文章链接
   - 后续预告
   - “进入专题”或“从这里开始”按钮
5. 首页首屏不要被挤得太长，专题区要比普通文章列表更清晰

---

## 文案风格

不要太 AI 味。  
要像一个做过亚马逊运营培训的老师在安排学习路径。

示例语气：

“如果你刚开始用 AI 做亚马逊运营，不建议先追工具。先按专题把问题拆开：关键词、Listing、广告、Review、选品，每个环节先解决一个最小动作。”

---

## 验收标准

完成后运行：

npm run build
npm run seo:audit

要求：

1. build 通过
2. seo:audit Fail: 0
3. 首页能正常打开
4. 首页文章区变成专题学习路径
5. 不破坏顶部导航、资料领取、搜索、文章详情页
6. git status 显示合理改动，不能生成根目录临时任务文件

---

## 输出报告

请输出：

1. 修改了哪些文件
2. 首页结构如何变化
3. 是否保留首屏
4. build 结果
5. seo:audit 结果