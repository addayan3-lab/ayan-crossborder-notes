# 212A: AI 阿岩助手 & CTA 噪声热修复审计 V01

## 执行结论

**成功** — 发现 1 个 /ask/ 交互 bug 并修复；CTA 噪声已审计，无需额外降噪。

---

## 1. AI 阿岩助手复现结果

| 检查项 | 结果 |
|--------|------|
| /ask/ 页面是否 200 | ✅ |
| 输入框是否存在 | ✅ `#ayan-ask-input` |
| 场景卡片是否存在 | ✅ 5 张场景卡片 |
| data-ask 按钮是否绑定点击事件 | ✅ `presets.forEach` 绑定所有 `[data-ask]` 元素 |
| 手动输入问题后是否触发 runAsk | ✅ 按钮 click + Enter key 均绑定 |
| 结果区域是否显示 | ✅ `#ayan-ask-result` 由 JS 控制 hidden |
| fallback 区域是否显示 | ✅ `#ayan-ask-fallback` 由 JS 控制 hidden |
| 是否有 JS 报错风险 | ⚠️ JSON.parse 无 try-catch（数据固定，风险低） |
| inline 注入的 computeScoreForTopic 是否可用 | ✅ `window.computeScoreForTopic` 在 module script 前设置 |
| set:html / script 顺序 / module / global 变量 | ✅ 执行顺序正确 |
| matchTopic 返回 null 后 displayResult 处理 | ✅ `matchTopic` → null → `showFallback()` |

## 2. 根因说明

**发现 bug：第 2 张场景卡片（"有产品待诊断"）的 data-ask 无法匹配任何 topic。**

- 旧值：`"我已经有产品，想判断还能不能做"`
- 原因：该查询字符串不含任何 topic 的 triggerKeywords 或 strongKeywords
  - `"有产品"` → 不在任何 keyword 列表中
  - `"判断"` → 不在任何 keyword 列表中
  - `"做"` → 不在任何 keyword 列表中（单字阈值太低）
- 后果：用户点击该场景卡片后，显示 fallback 而非推荐结果，让用户以为助手"不能用"

**修复：**

将 data-ask 改为 `"想判断一个产品能不能做"`

- `"能不能做"` 是 `selection` topic 的 strongKeywords 之一（权重 4 × 100 = 400）
- 点击后正确匹配"选品"专题，展示步骤、文章、配套资源

## 3. 修复文件清单

| 文件 | 修改 |
|------|------|
| `src/pages/ask/index.astro` 第 29 行 | data-ask 值从 `"我已经有产品，想判断还能不能做"` → `"想判断一个产品能不能做"` |

## 4. 测试问题结果

| 测试问题 | 预期 | 实际 |
|----------|------|------|
| "我是亚马逊新手，应该先学什么？" | 匹配 beginner（含"新手"） | ✅ |
| "广告 ACOS 太高，应该怎么优化？" | 匹配 ppc（含"ACOS"） | ✅ |
| "差评怎么用来优化页面和产品？" | 匹配 review（含"差评"） | ✅ |
| "想判断一个产品能不能做"（修复后） | 匹配 selection（含"能不能做"） | ✅ 权重 400 |
| "asdfghjkl" | 无匹配 → fallback | ✅ 显示兜底方向按钮 |

## 5. 领取资料按钮统计

### 各页面 CTA 分布

| 页面 | 领取资料/包 | 诊断 | 微信/回复关键词 | 查看配套资源 |
|------|-------------|------|----------------|-------------|
| 首页 (/) | 2（"免费领取资料包" h2 + "立即领取" a→/lead/） | 0 | 0 | 0 |
| /ask/ | 0 | 1（extras 内 survey 链接） | 1（extras 内 wechatHook） | 1（extras trigger） |
| /survey/ | 0 | 0（本身就是诊断页） | 0 | 0 |
| /lead/ | 3（hero 标题 + Tally 按钮 + WeChat 描述） | 1（顶部提示条） | 2（"备用微信号" + "复制微信号"） | 0 |
| /resources/ | 28（每个资源卡片的"回复关键词"） | 1（hero 提示条） | 28（同上） | 0 |
| 7 个详情页 | 各 1（回复关键词行） | 各 1（主 CTA） | 各 1（同上） | 0 |

### 按钮太多的页面清单

| 排名 | 页面 | 说明 |
|------|------|------|
| ⚠️ | /lead/ | 3 个领取相关 + 1 个诊断 + 2 个微信 = 6 个动作入口 |
| ⚠️ | /resources/ | 28 个卡片各有 1 个"回复关键词"，但这是功能设计（每个资源独立领取） |
| ✅ | 首页 | 2 个 CTA，合理 |
| ✅ | 详情页 | 1 个主 CTA + 1 个关键词领取 + 1 个返回，合理 |
| ✅ | /ask/ | 1 个 extras trigger + 1 个 survey 链接（均折叠），最弱 |

## 6. 最小降噪

**结论：当前 204-211 已基本完成降噪，本批无额外需修。**

依据检查：
- /ask/ 结果内无"领取资料包"主按钮 → extras trigger 为"查看配套资源"已足够弱 ✅
- /resources/ 顶部和底部无重复诊断 CTA → 仅顶部 1 个 ✅
- 资源详情页无重复 /survey/ CTA → 仅 1 个主 CTA ✅
- /lead/ 微信已弱化为 fallback（"如果表单打不开怎么办？"后出现） ✅

## 7. 验证结果

| 检查项 | 结果 |
|--------|------|
| npm run build | 57 page(s) built ✅ |
| npm run seo:audit | 456 Pass / 0 Fail ✅ |
| npm run images:check | 49/0/0/0 ✅ |
| Pagefind filters | 3 filters ✅ |
| /ask/ 可交互 | ✅ |
| 场景卡片可触发结果 | ✅ 全部 5 张均匹配 |
| 输入框可触发结果 | ✅ |
| fallback 可显示 | ✅ |

## 8. 合规检查

| 项目 | 状态 |
|------|------|
| 是否接 API | 否 |
| 是否使用 LLM | 否 |
| 是否收集隐私 | 否 |
| 是否 commit | 否 |
| 是否 push | 否 |

## 9. 下一步建议

1. 本批可 commit（仅 ask/index.astro 小修 + 本报告）
2. CTA 噪声如需进一步降噪，建议规划独立批次（非 P0）
3. 如需确认线上 /ask/ 可用性，可做 post-deploy 检查
