import { computeScoreForTopic } from "../lib/ayan-assistant-match"

export interface AssistantTopic {
  id: string
  label: string
  triggerKeywords: string[]
  strongKeywords: string[]
  steps: string[]
  articles: { title: string; slug: string; desc: string }[]
  resources: { title: string; slug: string; desc: string; wechatHook: string }[]
  openClasses: { title: string; slug: string; desc: string }[]
  wechatKeyword: string
  suggestion: string
}

export const assistantTopics: AssistantTopic[] = [
  {
    id: "keyword",
    label: "关键词",
    triggerKeywords: ["关键词", "找词", "词表", "搜索量", "清洗", "出单词"],
    strongKeywords: ["词表", "搜索量", "清洗", "出单词", "找词"],
    steps: [
      "先搞清楚关键词从哪里来，4 类来源各有不同价值。",
      "收到词后做清洗：去重、归一、聚类、排序。",
      "不要只看搜索量，结合相关性、竞争度和转化意图综合判断。",
      "把最终词表同步到 Listing 和广告中测试。"
    ],
    articles: [
      { title: "关键词第 1 篇：关键词的 4 类来源", slug: "keyword-source-4-types", desc: "关键词的 4 类来源及收集方法。" },
      { title: "关键词第 2 篇：关键词清洗方法", slug: "keyword-cleaning-method", desc: "去重、归一、聚类、排序四步清洗流程。" },
      { title: "关键词第 3 篇：关键词表不能只看搜索量", slug: "keyword-search-volume-trap", desc: "搜索量的真实用法与局限。" }
    ],
    resources: [
      { title: "关键词清洗 SOP 模板", slug: "keyword-cleaning-sheet", desc: "关键词清洗的标准化操作表。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "从关键词到 Listing 的快速上手课", slug: "keyword-to-listing", desc: "找词、清洗、写标题、开广告的完整流程。" }
    ],
    wechatKeyword: "清洗",
    suggestion: "建议从关键词来源入手，先建立对词表的系统认知。"
  },
  {
    id: "listing",
    label: "Listing",
    triggerKeywords: ["Listing", "五点", "标题", "优化", "转化率", "A+", "文案"],
    strongKeywords: ["五点", "标题", "A+", "文案"],
    steps: [
      "先梳理产品的核心卖点和用户场景。",
      "五点按功能点、场景点、信任点三类信息有序排列。",
      "用 AI 生成候选文案后人工筛选，不要完全依赖 AI。",
      "发布前用检查清单逐项核对标题、五点、图片和关键词。"
    ],
    articles: [
      { title: "Listing 第 1 篇：五点写法", slug: "listing-five-bullets", desc: "五点不是 5 个卖点，是 3 类信息的有序组合。" },
      { title: "Listing 第 2 篇：优化检查清单", slug: "listing-checklist", desc: "发布前逐项检查标题、五点、图片和转化要素。" },
      { title: "Listing 第 3 篇：AI 时代 Listing 应该怎么写", slug: "ai-listing-optimization", desc: "AI 能帮什么、不能替代什么的实操框架。" }
    ],
    resources: [
      { title: "Listing 自检清单", slug: "listing-checklist", desc: "Listing 发布前逐项检查表。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "Listing 转化检查课", slug: "listing-conversion-check", desc: "Listing 转化率检查与优化。" }
    ],
    wechatKeyword: "自检",
    suggestion: "建议从五点写法入手，这是 Listing 转化最相关但最容易被低估的字段。"
  },
  {
    id: "ppc",
    label: "广告 PPC",
    triggerKeywords: ["PPC", "广告", "ACOS", "竞价", "预算", "否词", "报表", "SP"],
    strongKeywords: ["PPC", "ACOS", "TACOS", "搜索词报告", "否词", "预算", "竞价", "报表", "SP", "广告"],
    steps: [
      "新品第一周不要追 ACOS，目标是拿测试数据。",
      "SP 广告分自动、精准、词组、竞品四类，分工不同。",
      "每 3-7 天做一次报表复盘，不只盯 ACOS。",
      "用 AI 辅助分析搜索词、花费和转化，判断下一步动作。"
    ],
    articles: [
      { title: "PPC 第 1 篇：新品广告第一周怎么开", slug: "new-product-ppc-week-one", desc: "新品期第一周广告测试框架。" },
      { title: "PPC 第 2 篇：SP 广告结构怎么分工", slug: "sp-ad-structure", desc: "四类广告的分工逻辑与预算分配。" },
      { title: "PPC 第 3 篇：用 AI 复盘广告报表", slug: "ai-ppc-report-review", desc: "ACOS、TACOS、CTR、CVR 综合判断。" }
    ],
    resources: [
      { title: "PPC 报表诊断模板", slug: "ppc-weekly-review", desc: "广告报表复盘标准化模板。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "新品 PPC 第一周实战课", slug: "ppc-week-one", desc: "新品第一周广告怎么开、预算怎么分。" }
    ],
    wechatKeyword: "报表",
    suggestion: "建议从新品第一周开始，先建立广告测试节奏感。"
  },
  {
    id: "review",
    label: "Review",
    triggerKeywords: ["Review", "评价", "差评", "好评", "评论", "反馈", "评分"],
    strongKeywords: ["Review", "差评", "评价", "好评", "评论", "Q&A", "QA", "痛点"],
    steps: [
      "差评不是终点，是下一版 Listing 的需求文档。",
      "把差评分类：产品问题 vs 页面问题 vs 期望差。",
      "好评里藏着用户场景词和购买理由，可以用来优化 Listing。",
      "竞品反馈里藏着差异化机会，值得单独分析。"
    ],
    articles: [
      { title: "Review 第 1 篇：用 AI 分析 Review 找到卖点", slug: "ai-review-analysis", desc: "用 AI 对竞品 Review 进行分类和分析。" },
      { title: "Review 第 2 篇：Review 分析矩阵", slug: "review-analysis-matrix", desc: "三类 Review 数据的矩阵分析。" },
      { title: "Review 第 3 篇：差评改 Listing", slug: "negative-review-listing-fix", desc: "系统性地把差评翻译成 Listing 改动。" }
    ],
    resources: [
      { title: "Review 痛点分析表", slug: "review-pain-analysis", desc: "Review 痛点提取和分析模板。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "Review 反推选品逻辑课", slug: "review-to-selection", desc: "从差评和好评里找产品改进方向。" }
    ],
    wechatKeyword: "痛点",
    suggestion: "建议从差评改 Listing 入手，这是最直接能产生效果的切入点。"
  },
  {
    id: "selection",
    label: "选品",
    triggerKeywords: ["选品", "市场容量", "竞品", "痛点", "蓝海", "品类", "选赛道"],
    strongKeywords: ["选品", "竞品", "市场容量", "能不能做", "品类", "痛点反推"],
    steps: [
      "先用关键词搜索量聚合推算品类天花板。",
      "把 Top 20 竞品按价格、卖点、人群、痛点四张矩阵拆解。",
      "从差评和 Q&A 里挖未被满足的需求。",
      "综合判断市场规模、竞争格局和差异化空间。"
    ],
    articles: [
      { title: "选品第 1 篇：AI 估算市场容量", slug: "ai-market-size-estimate", desc: "用 AI 辅助做市场容量判断的方法。" },
      { title: "选品第 2 篇：用 AI 做竞品矩阵拆解", slug: "ai-competitor-matrix", desc: "竞品拆成价格、卖点、人群、痛点四张矩阵。" },
      { title: "选品第 3 篇：痛点反推选品", slug: "selection-pain-reverse", desc: "从竞品差评和问答里挖出选品机会。" }
    ],
    resources: [
      { title: "竞品矩阵拆解表", slug: "competitor-selection-matrix", desc: "竞品四维矩阵分析模板。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "竞品选品矩阵搭建课", slug: "competitor-selection-matrix", desc: "把竞品从流量、卖点、价格和评价四个维度拆开。" }
    ],
    wechatKeyword: "矩阵",
    suggestion: "建议从市场容量判断开始，先确认赛道天花板再深入。"
  },
  {
    id: "ai-search",
    label: "AI 搜索",
    triggerKeywords: ["AI 搜索", "Rufus", "Alexa", "AI 工具", "人工智能", "搜索变化", "消费者搜索"],
    strongKeywords: ["AI 搜索", "Rufus", "Alexa", "AI 工具", "人工智能"],
    steps: [
      "了解消费者如何使用 Amazon AI 搜索产品。",
      "关注 Rufus 和 Alexa for Shopping 对流量分配的影响。",
      "将 AI 工具整合到日常运营流程中。"
    ],
    articles: [
      { title: "消费者如何用 Amazon AI 搜索产品", slug: "consumer-ai-search-amazon", desc: "AI 搜索如何改变消费者购物路径。" },
      { title: "Amazon Rufus / Alexa for Shopping 对卖家意味着什么", slug: "amazon-rufus-alexa-shopping", desc: "新搜索工具对卖家的影响与应对。" },
      { title: "2026 年亚马逊卖家如何利用 AI 提升运营效率", slug: "2026-amazon-ai-operations", desc: "AI 在运营全流程中的应用。" }
    ],
    resources: [
      { title: "AI 工具评测与选择表", slug: "ai-tools-review-sheet", desc: "亚马逊 AI 工具评测对比表。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "AI 工具在亚马逊运营中的实战课", slug: "ai-tools-for-amazon", desc: "AI 工具在亚马逊运营中的实战应用。" }
    ],
    wechatKeyword: "AI 工具",
    suggestion: "建议从消费者搜索行为变化入手，理解底层逻辑后再看工具。"
  },
  {
    id: "tools",
    label: "工具模板",
    triggerKeywords: ["工具", "模板", "表格", "SOP", "检查表", "资料包", "资源"],
    strongKeywords: ["模板", "SOP", "检查表", "资料包"],
    steps: [
      "先了解有哪些可用的工具和模板。",
      "根据自己的运营环节选择对应的模板。",
      "把模板整合到日常 SOP 中，形成习惯。"
    ],
    articles: [
      { title: "亚马逊 AI 工具评测:哪些适合运营", slug: "amazon-ai-tools-review", desc: "亚马逊 AI 工具的评测与选择。" },
      { title: "亚马逊工具资料学习路径", slug: "tools-learning-path", desc: "工具和资料的分类与使用路径。" }
    ],
    resources: [
      { title: "AI 工具评测与选择表", slug: "ai-tools-review-sheet", desc: "AI 工具评测对比表。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [],
    wechatKeyword: "工具",
    suggestion: "先浏览工具资料学习路径，了解有哪些资源后再按需领取。"
  },
  {
    id: "platform-rules",
    label: "平台规则",
    triggerKeywords: ["规则", "违规", "封号", "政策", "合规", "平台", "Listing 下架", "警告"],
    strongKeywords: ["违规", "合规", "索评", "侵权", "变体"],
    steps: [
      "了解亚马逊平台的核心规则和禁区。",
      "检查自己的 Listing 是否踩了常见违规坑。",
      "建立规则检查清单，每次上架前核对。"
    ],
    articles: [
      { title: "亚马逊平台规则入门:新手最容易踩的 10 个坑", slug: "amazon-platform-rules-beginner", desc: "新手卖家常踩的平台规则坑。" }
    ],
    resources: [
      { title: "平台规则检查清单", slug: "platform-rules-checklist", desc: "亚马逊平台规则自检清单。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "新手平台规则避坑课", slug: "platform-rules-beginner", desc: "帮新手建立平台规则边界。" }
    ],
    wechatKeyword: "规则",
    suggestion: "建议先阅读平台规则入门文章，再用手册自查。"
  },
  {
    id: "beginner",
    label: "新手入门",
    triggerKeywords: ["新手", "入门", "开始", "第一步", "从哪里", "怎么学", "0基础", "零基础"],
    strongKeywords: ["新手", "入门", "0基础", "零基础"],
    steps: [
      "按专题学习比按工具学习更高效。",
      "建议从关键词专题开始，这是运营的基础。",
      "先跑通一个最小闭环：找词 → 清洗 → 写 Listing → 开广告。"
    ],
    articles: [
      { title: "亚马逊关键词学习路径", slug: "keyword-learning-path", desc: "从找词、清洗到布局的完整路径。" },
      { title: "亚马逊 PPC 广告学习路径", slug: "ppc-learning-path", desc: "从结构搭建到数据判断的路径。" },
      { title: "亚马逊 Listing 优化学习路径", slug: "listing-learning-path", desc: "从卖点提炼到转化表达的路径。" }
    ],
    resources: [
      { title: "关键词清洗 SOP 模板", slug: "keyword-cleaning-sheet", desc: "新手第一个可用的模板。", wechatHook: "资料领取方式以资料详情页说明为准。" }
    ],
    openClasses: [
      { title: "从关键词到 Listing 的快速上手课", slug: "keyword-to-listing", desc: "找词、清洗、写标题、开广告的完整流程。" }
    ],
    wechatKeyword: "清洗",
    suggestion: "建议先选一个专题跑通最小闭环：找词 → 写 Listing → 开广告 → 看数据。"
  }
]

export function matchTopic(query: string): AssistantTopic {
  const q = query.toLowerCase()
  let best: AssistantTopic | null = null
  let bestScore = 0
  for (const topic of assistantTopics) {
    const score = computeScoreForTopic(q, topic.triggerKeywords, topic.strongKeywords)
    if (score > bestScore) {
      bestScore = score
      best = topic
    }
  }
  return best || assistantTopics.find((t) => t.id === "beginner")!
}
