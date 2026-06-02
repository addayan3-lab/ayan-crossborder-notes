# 034｜工具资料包 v2：把"AI 运营检查表"做成可下载 PDF

## 执行者
OpenCode

## 模式
write

## 项目路径
C:\rpg\ayan-crossborder-notes

## 目标
把 /tools/ 页面里的"AI 运营检查表 / Listing Prompt / 广告复盘表"从占位说明升级到 v2 实际可下载的 PDF。

第一版先做"AI 运营检查表"：
- 10 个判断维度
- 每个维度 1-5 分
- 总分 + 决策建议

## 修改范围

### 1. 新增 PDF 生成
- src/data/checklist-v2.json（结构化定义检查表内容）
- scripts/generate-checklist-pdf.mjs（生成 PDF，可使用 pdfkit 或 puppeteer）
- public/downloads/ai-ops-checklist-v2.pdf（生成产物）

### 2. 工具页更新
- src/pages/tools/index.astro：把占位卡换成实际下载卡
  - 文件大小
  - 下载次数（用 view count 占位）
  - "下载 PDF" 按钮

### 3. SOP 文档
- docs/content-production-sop.md 增加"工具资料包发布"段落

## 不要修改
- /lead/ 表单
- 已有图片资源
- BaseLayout.astro

## 验收
- npm run build 通过
- seo:audit Fail: 0
- /tools/ 页面下载链接有效
- PDF 体积 < 2MB

## 输出报告
- PDF 实际生成方式（pdfkit / puppeteer / 其他）
- 检查表 10 个维度具体内容
- /tools/ 页面改动
