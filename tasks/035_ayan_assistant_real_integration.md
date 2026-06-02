# 035｜阿岩助手：站内 AI 问答入口真接入

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
当前 /tools/ 页面右下角的"阿岩助手"是占位组件，文字写"站内 AI 问答入口预留中"。本任务目标：
- 接入真实问答后端（用轻量 API，比如 Cloudflare Workers AI 或直接调 OpenAI 兼容 API）
- 限定知识域：只回答阿岩已发布的文章内容
- 不做开放闲聊，避免合规风险

## 知识源
读取：
- src/content/posts/*.md
- src/pages/index.astro 里的专题介绍
- docs/content-production-sop.md

## 修改范围

### 1. 后端
- functions/api/ayan-assistant.ts（Cloudflare Pages Functions 入口）
  - 接收 POST { question }
  - 检索相关段落（简单 RAG：用关键词相似度）
  - 调用 LLM 生成基于上下文的回答
  - 返回 { answer, sources }

### 2. 前端
- src/components/AyanAssistant.astro（新建组件，从 BaseLayout 抽离）
  - 浮动按钮 + 弹出对话框
  - 输入框 + 发送
  - 显示回答 + 来源文章链接
- src/layouts/BaseLayout.astro：替换占位 ai-widget 为 AyanAssistant 组件

### 3. 配置
- astro.config.mjs：加 hybrid output 或保持 static + Functions
- wrangler.toml 或 _headers：环境变量不暴露到前端

## 不要修改
- /lead/ 表单
- 已有 SEO/Analytics/JSON-LD
- 已有文章 frontmatter

## 验收
- 部署到 Cloudflare Pages 后，问"AI 运营检查表是什么"能返回正确回答
- 问"明天天气"返回"我只能回答站内内容"
- npm run build 通过

## 输出报告
- 后端实现方案
- 知识源检索逻辑
- 前端组件改动
- API 响应样例
