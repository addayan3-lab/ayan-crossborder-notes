export interface MapResource {
  title: string;
  href: string;
}

export interface MapOpenClass {
  title: string;
  href: string;
}

export interface MapTopic {
  id: string;
  icon: string;
  title: string;
  hubHref: string;
  learningPath: { title: string; href: string };
  resources: MapResource[];
  openClasses: MapOpenClass[];
}

export const knowledgeMapTopics: MapTopic[] = [
  {
    id: "keyword",
    icon: "🧭",
    title: "关键词",
    hubHref: "/articles/keyword-learning-path/",
    learningPath: { title: "关键词学习路径", href: "/articles/keyword-learning-path/" },
    resources: [
      { title: "关键词清洗表", href: "/resources/keyword-cleaning-sheet/" },
    ],
    openClasses: [
      { title: "关键词到 Listing 实操课", href: "/open-class/keyword-to-listing/" },
    ],
  },
  {
    id: "listing",
    icon: "📄",
    title: "Listing 优化",
    hubHref: "/listing/",
    learningPath: { title: "Listing 学习路径", href: "/articles/listing-learning-path/" },
    resources: [
      { title: "Listing 自检清单", href: "/resources/listing-checklist/" },
    ],
    openClasses: [
      { title: "Listing 自检与转化表达课", href: "/open-class/listing-conversion-check/" },
    ],
  },
  {
    id: "ppc",
    icon: "🎯",
    title: "广告 PPC",
    hubHref: "/ppc/",
    learningPath: { title: "PPC 学习路径", href: "/articles/ppc-learning-path/" },
    resources: [
      { title: "PPC 周复盘表", href: "/resources/ppc-weekly-review/" },
    ],
    openClasses: [
      { title: "新品 PPC 首周广告结构课", href: "/open-class/ppc-week-one/" },
    ],
  },
  {
    id: "review",
    icon: "💬",
    title: "Review 分析",
    hubHref: "/articles/ai-review-analysis/",
    learningPath: { title: "Review 学习路径", href: "/articles/review-learning-path/" },
    resources: [
      { title: "Review 痛点分析表", href: "/resources/review-pain-analysis/" },
    ],
    openClasses: [
      { title: "Review 反推选品与页面优化课", href: "/open-class/review-to-selection/" },
    ],
  },
  {
    id: "selection",
    icon: "🛍️",
    title: "选品",
    hubHref: "/selection/",
    learningPath: { title: "选品学习路径", href: "/articles/selection-learning-path/" },
    resources: [
      { title: "竞品矩阵拆解表", href: "/resources/competitor-selection-matrix/" },
    ],
    openClasses: [
      { title: "选品竞品矩阵拆解课", href: "/open-class/competitor-selection-matrix/" },
    ],
  },
  {
    id: "ai-search",
    icon: "🤖",
    title: "AI 运营亚马逊",
    hubHref: "/ai-amazon/",
    learningPath: { title: "AI 搜索学习路径", href: "/articles/ai-search-learning-path/" },
    resources: [
      { title: "AI 工具评测表", href: "/resources/ai-tools-review-sheet/" },
    ],
    openClasses: [
      { title: "AI 工具辅助亚马逊运营课", href: "/open-class/ai-tools-for-amazon/" },
    ],
  },
  {
    id: "tools",
    icon: "🛠️",
    title: "工具模板",
    hubHref: "/tools/",
    learningPath: { title: "工具资料学习路径", href: "/articles/tools-learning-path/" },
    resources: [
      { title: "新手规则避坑清单", href: "/resources/platform-rules-checklist/" },
    ],
    openClasses: [
      { title: "新手平台规则避坑课", href: "/open-class/platform-rules-beginner/" },
      { title: "运营复盘体系课", href: "/open-class/operation-review-system/" },
    ],
  },
];

export const hookTypeLabels = ["全部", "避坑", "反常识", "数字冲击", "案例复盘", "政策解读"] as const;
