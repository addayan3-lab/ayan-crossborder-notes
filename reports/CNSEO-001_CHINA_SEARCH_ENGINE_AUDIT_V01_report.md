# CNSEO-001｜国内搜索引擎接入前审计报告

生成时间：2026-06-14

站点：https://amz.hao1234.top

## 一、当前站点国内搜索接入结论

**结论：可以直接接入百度、360、搜狗、神马。**

站点基础条件良好：
- 95 个静态页面全部可被爬虫抓取
- 无 noindex、无 meta robots 屏蔽
- robots.txt 允许所有 User-agent
- sitemap-index.xml + sitemap-0.xml 正常生成，95 个 URL 全部 HTTPS、无 localhost、无重复
- 所有页面均有 canonical、title、description、og:title、og:description
- URL 结构干净，纯静态、无参数、无中文路径

唯一缺失：无国内搜索引擎验证文件，无百度主动推送脚本。

## 二、robots.txt 检查结果

**文件位置：** `public/robots.txt` → 发布到 `https://amz.hao1234.top/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://amz.hao1234.top/sitemap-index.xml
```

| 检查项 | 结果 |
|--------|------|
| 允许 Baiduspider | PASS（User-agent: * 覆盖） |
| 允许 360Spider | PASS |
| 允许 Sogou web spider | PASS |
| 允许 YisouSpider（神马） | PASS |
| 未误屏蔽 /articles/ | PASS |
| 未误屏蔽 /ai-prompts/ | PASS |
| 未误屏蔽 /cases/ | PASS |
| 未误屏蔽 /resources/ | PASS |
| 包含 Sitemap 地址 | PASS |

**建议：** 当前 robots.txt 可以保持不变。如需精细化控制，可考虑为百度单独添加规则（当前 * 已覆盖所有爬虫）。

## 三、sitemap 检查结果

**文件位置：**
- `public/` 下无 sitemap（由 `@astrojs/sitemap` 插件生成到 `dist/`）
- 线上路径：`https://amz.hao1234.top/sitemap-index.xml` → 指向 `sitemap-0.xml`

| 检查项 | 结果 |
|--------|------|
| 包含首页 `/` | PASS |
| 包含 `/articles/` | PASS |
| 包含 `/ai-prompts/` | PASS |
| 包含 `/cases/` | PASS |
| 包含 `/resources/` | PASS |
| 包含 `/open-class/` | PASS |
| 包含 `/ai-roles/` | PASS |
| 文章详情页（68 篇） | PASS |
| AI 身份文章详情页（10 篇） | PASS |
| 重复 URL | PASS（0 重复） |
| localhost URL | PASS（0 个） |
| 错误域名 | PASS（全部 amz.hao1234.top） |
| http 与 https 混用 | PASS（全部 https） |
| trailing slash 不统一 | PASS（统一使用尾斜杠） |
| 总 URL 数 | 95 |

**注意：** sitemap 由 `@astrojs/sitemap` 自动生成，路径在 `dist/` 而非 `public/`。Astro 构建时自动处理。

## 四、国内搜索验证文件应放置位置

验证文件应放在 `public/` 目录根目录下，Astro 构建时会原样复制到 `dist/`。

| 搜索引擎 | 验证文件名格式 | 放置路径 |
|----------|---------------|---------|
| 百度 | `baidu_verify_xxxxx.html` | `public/baidu_verify_xxxxx.html` |
| 360 | `360siteverify_xxxxx.html` | `public/360siteverify_xxxxx.html` |
| 搜狗 | `sogou_site_verification_xxxxx.html` | `public/sogou_site_verification_xxxxx.html` |
| 神马 | `yisou_xxxxx.html`（或平台指定格式） | `public/yisou_xxxxx.html` |

**注意事项：**
- 验证文件不要放 `src/pages/`（会被 Astro 处理）
- 验证文件不要被 Astro 改名
- 验证通过后可保留，不要删除（部分平台会定期复查）
- Cloudflare Pages 会原样发布 `public/` 下的文件

## 五、百度接入准备清单

| 步骤 | 状态 | 说明 |
|------|------|------|
| 注册百度搜索资源平台账号 | 待做 | 需手动操作 |
| 添加站点 amz.hao1234.top | 待做 | 选择"站点属性"→"HTTPS" |
| HTML 验证文件 | 待做 | 放入 `public/`，提交后 build 部署 |
| 提交 sitemap | 待做 | 提交 `https://amz.hao1234.top/sitemap-index.xml` |
| 主动推送脚本 | 待做 | 建议新增 CNSEO-003_360_SITE_VERIFY_PREP_V01 |
| 数据推送 | 待做 | 首次可批量推送全量 URL |

## 六、360 接入准备清单

| 步骤 | 状态 | 说明 |
|------|------|------|
| 注册 360 站长平台账号 | 待做 | 需手动操作 |
| 添加网站 | 待做 | 选择"HTTPS" |
| 验证文件 | 待做 | 放入 `public/` |
| 提交 sitemap | 待做 | 提交 sitemap-index.xml |
| 主动推送 | 待做 | 360 支持主动推送 API |

## 七、神马 / 搜狗后续建议

### 神马搜索
- 神马搜索主要覆盖移动端（UC 浏览器等）
- 注册神马站长平台 → 添加站点 → 验证
- 神马对 sitemap 支持有限，建议优先做主动推送
- 验证文件格式以平台指定为准

### 搜狗
- 注册搜狗资源平台 → 添加站点 → 验证
- 搜狗对 sitemap 支持较好
- 验证文件放入 `public/` 即可

## 八、是否建议新增百度主动推送脚本

**建议新增。**

当前项目已有 `scripts/submit-indexnow.mjs`（IndexNow 推送到 Bing），可以参照此模式新增百度主动推送脚本。

百度主动推送 API：
- 接口：`http://data.zz.baidu.com/urls?site=amz.hao1234.top&token=TOKEN`
- 方法：POST，逐条推送 URL
- 需要百度搜索资源平台获取 token

建议任务：
1. `CNSEO-002_BAIDU_SITE_VERIFY_PREP_V01` — 百度验证文件准备
2. `CNSEO-003_360_SITE_VERIFY_PREP_V01` — 360 验证文件准备
3. `CNSEO-004_BAIDU_URL_PUSH_SCRIPT_V01` — 百度主动推送脚本

## 九、是否发现阻碍收录的问题

**未发现阻碍收录的问题。**

所有检查项均通过：
- 无 noindex 标签
- 无 meta robots 屏蔽
- 无中文路径
- 无参数页
- 无重复内容页
- 无 localhost URL
- 无 http/https 混用
- 所有页面均为静态生成
- title、description、canonical、og 标签齐全

## 十、下一步建议任务

1. **CNSEO-002_BAIDU_SITE_VERIFY_PREP_V01** — 百度验证文件准备
2. **CNSEO-003_360_SITE_VERIFY_PREP_V01** — 360 验证文件准备
3. **CNSEO-004_BAIDU_URL_PUSH_SCRIPT_V01** — 百度主动推送脚本
4. 手动注册百度搜索资源平台、360 站长平台、神马站长平台、搜狗资源平台
5. 提交 sitemap 到各平台
6. 首次批量推送全量 URL（百度支持一次推送 2000 条）
