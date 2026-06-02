# 081 — 资料包中心规划(只规划,不开发)

> 状态: ✅ **成功**。规划文档已生成,未触碰任何代码/文章/包配置。
> 输出文件:`docs/resource-center-plan.md`(主规划) + `reports/081_RESOURCE_CENTER_PLANNING_ONLY_V01_report.md`(本报告)

## 1. 执行结论

**成功**。只生成规划文档,未新增页面、未写代码、未改文章、未改 `package.json`、未改部署配置,符合"planning only"边界。

## 2. 规划文档结构

`docs/resource-center-plan.md` 包含 9 个章节:

| § | 章节 | 关键内容 |
|---|---|---|
| 1 | 资料包中心定位 | 一句话定位 / 4 件不做 4 件要做 / 与 28 篇文章对应关系 |
| 2 | 7 个资料包分类 | 关键词 / Listing / PPC / Review / 选品 / AI 工具 / 新手规则 + 28 个资料包完整清单 |
| 3 | 公开课场景索引 | 8 个模块(开场 + 模块 1-7) → 资料包映射表 |
| 4 | 微信关键词总表 | 28 个唯一关键词 + 资料包 + 分类 |
| 5 | 页面结构草图 | Hero / 7 分类入口 / 详情区 / 场景索引 / 流程 / FAQ / CTA |
| 6 | 暂不开发内容 | 10 项不做的清单,避免范围蔓延 |
| 7 | 下一步开发建议 | 短期 MVP(082-085) / 中期增强(086-089) / 长期生态 |
| 8 | 资料包维护守则 | 6 条长期维护规则 |
| 9 | 文章 ↔ 资源中心对应 | 可验证的对应关系审计入口 |

## 3. 资料包总数与分类分布

| 分类 | 资料包数 | 微信关键词数 |
|---|---|---|
| 新手规则 | 1 | 1 |
| 选品 | 3 | 3 |
| 关键词 | 5 | 5 |
| Listing | 4 | 4 |
| PPC | 4 | 4 |
| Review | 4 | 4 |
| AI 工具 | 7 | 7 |
| **合计** | **28** | **28** |

✅ 28 个资料包 ↔ 28 篇文章 ↔ 28 个微信关键词,**一一对应,无重复**。

## 4. 资料包与文章对应关系(可审计)

每篇文章的 `leadMagnet` 字段 = 资源中心里的一张资料包卡。每篇文章的 `wechatHook` 字段 = 资源中心里"📱 回复关键词「X」"的提示。

| 资料包 | 文章 | topic | 微信关键词 |
|---|---|---|---|
| 亚马逊新手规则避坑清单 | amazon-platform-rules-beginner | tools | 规则 |
| 市场容量三数字判断表 | ai-market-size-estimate | selection | 容量 |
| 竞品矩阵拆解表 | ai-competitor-matrix | selection | 矩阵 |
| 痛点反推选品 SOP 模板 | selection-pain-reverse | selection | 反推 |
| 关键词学习路径导图 | keyword-learning-path | keyword | K路径 |
| 8 字段关键词整理表 | ai-keyword-table | keyword | 词表 |
| 关键词清洗 SOP 模板 | keyword-cleaning-method | keyword | 清洗 |
| 4 类关键词来源拆解表 | keyword-source-4-types | keyword | 4源 |
| 搜索量陷阱检查清单 | keyword-search-volume-trap | keyword | 陷阱 |
| Listing 优化学习路径导图 | listing-learning-path | listing | L路径 |
| AI Listing 改写对比模板 | ai-listing-optimization | listing | L重写 |
| 五点重写对比模板(三品类) | listing-five-bullets | listing | 五点 |
| Listing 自检清单 | listing-checklist | listing | 自检 |
| PPC 学习路径导图 | ppc-learning-path | ppc | P路径 |
| SP 四类广告预算分配模板 | sp-ad-structure | ppc | SP |
| 新品首周 PPC 节奏表 | new-product-ppc-week-one | ppc | 首周 |
| PPC 报表诊断模板 | ai-ppc-report-review | ppc | 报表 |
| Review 学习路径导图 | review-learning-path | review | R路径 |
| Review 矩阵分析模板 | review-analysis-matrix | review | R矩阵 |
| Review 痛点分析表 | ai-review-analysis | review | 痛点 |
| 差评归因与 Listing 修复表 | negative-review-listing-fix | review | 差评 |
| AI 搜索学习路径导图 | ai-search-learning-path | ai-search | AI路径 |
| 2026 亚马逊 AI 运营全景图 | 2026-amazon-ai-operations | ai-search | 全景 |
| 亚马逊 AI 工具评测表 | amazon-ai-tools-review | ai-search | AI评测 |
| 亚马逊 AI 运营工具包 | ai-operations-resource-pack | tools | AI工具 |
| 工具资料汇总清单 | tools-learning-path | tools | 工具包 |
| Rufus 与 Alexa Shopping 对比表 | amazon-rufus-alexa-shopping | ai-search | Rufus |
| 消费者 AI 搜索问题清单 | consumer-ai-search-amazon | ai-search | C搜索 |

✅ 28 条对应关系,可在下次发版前用本表做一致性审计。

## 5. 暂不开发的内容(范围守护)

| 不做项 | 原因 |
|---|---|
| ❌ 资料包打包下载 | 与"持续更新"理念冲突 |
| ❌ 用户登录 / 会员体系 | 增加复杂度,偏离公开课转化主线 |
| ❌ 资料包评论 / 评分 | 资料包是文档不是内容,评论意义有限 |
| ❌ AI 自动推荐资料包 | 28 个资料包,手动浏览足够 |
| ❌ 跨语言版本 | 站点主语言是中文,跨境笔记面向中文运营 |
| ❌ 资料包 PDF 预览 | 多数是表格 / SOP,不适合 PDF 预览 |
| ❌ 资料包倒计时 / 限时 | 与"克制、实操"风格冲突 |
| ❌ 资料包付费墙 | 公开课转化是核心,资料包是漏斗前置 |
| ❌ 站内搜索资料包 | 7 个分类已经清晰,搜索增加复杂度 |
| ❌ 资料包分享返利 | 不在主线上 |

## 6. 严格边界自查

| 边界 | 状态 |
|---|---|
| 是否写代码 | ❌ 否(仅 markdown 文档) |
| 是否新增页面 | ❌ 否(只规划 `/resources/` 草图) |
| 是否改文章 | ❌ 否 |
| 是否改 `package.json` | ❌ 否 |
| 是否改部署配置 | ❌ 否 |
| 是否调用外部 API | ❌ 否 |
| 是否跑 build | ❌ 否(规划阶段不验证) |

## 7. 公开课场景索引(从资料反查)

8 个公开课模块 + 28 个资料包映射:

| 公开课模块 | 推荐资料包(按学习顺序) | 触发关键词 |
|---|---|---|
| 开场·风险提醒 | 规则 → 7 项发版前 checklist | 规则 |
| 模块 1·选品 | 容量 → 矩阵 → 反推 | 容量 / 矩阵 / 反推 |
| 模块 2·关键词 | K路径 → 词表 → 清洗 → 4源 → 陷阱 | K路径 / 词表 / 清洗 / 4源 / 陷阱 |
| 模块 3·Listing | L路径 → L重写 → 五点 → 自检 | L路径 / L重写 / 五点 / 自检 |
| 模块 4·PPC | P路径 → SP → 首周 → 报表 | P路径 / SP / 首周 / 报表 |
| 模块 5·Review | R路径 → R矩阵 → 痛点 → 差评 | R路径 / R矩阵 / 痛点 / 差评 |
| 模块 6·AI 运营 | AI路径 → 全景 → AI评测 → AI工具 → 工具包 | AI路径 / 全景 / AI评测 / AI工具 / 工具包 |
| 模块 7·消费者 AI 搜索 | C搜索 → Rufus | C搜索 / Rufus |

## 8. 下一步建议

### 8.1 短期 MVP(082-085)

- **082**:创建 `/resources/` 页面骨架(纯静态 markdown 渲染)
- **083**:实物 7 个高优资料包(检查表 / 模板 / 复盘表 各 1-2 个样品)
- **084**:公开课场景索引组件(可复用)
- **085**:微信关键词可视化(可点击 chip,点击复制)

### 8.2 中期增强(086-089)

- **086**:资料包更新日志
- **087**:资料包使用统计(需后端支持)
- **088**:资料包反馈表
- **089**:资料包跨专题推荐

### 8.3 长期生态

- 资料包订阅
- 资料包贡献
- 资料包案例库(脱敏)
- 资料包国际化

### 8.4 维护守则(给未来)

1. 新增文章 → 先建资料包再建文章
2. 微信关键词保持唯一(总表审计)
3. 资料包命名要具体(避免"关键词资料包"这种空泛)
4. 公开课场景必填(没有公开课场景不进资源中心)
5. 资料包每季度至少更新一次
6. 删资料包前先停微信关键词,再删资源中心条目,最后删文章

## 9. 资源中心与 077-080 系列的关系

| 系列 | 贡献 |
|---|---|
| 077A | 26 篇文章补齐 topic / stage / intent / relatedTopics |
| 078 | 046 替代稿(新手规则)落地,资源中心"新手规则"分类的种子 |
| 079 | 047 替代稿(AI 工具评测)落地,资源中心"AI 工具"分类的内容强化 |
| 080 | 28 篇 leadMagnet / wechatHook 全部统一,资源中心数据可立即使用 |
| **081** | **资源中心总规划,等用户评审** |

---

> 报告结束。下一步等用户决定是否进入 082 开发,或对 081 规划做调整。
