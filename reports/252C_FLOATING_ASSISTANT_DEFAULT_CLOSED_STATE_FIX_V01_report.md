# 252C: Floating Assistant Default Closed State Fix

## 执行结论

**成功**

## 默认打开根因

`src/components/FloatingAyanAssistant.astro` 第 13 行 HTML 中 panel 有 `hidden` 属性，但第 234 行 CSS 写了 `.ayan-floating-panel { display: flex; }`。Astro 编译后 scoped 选择器 `.ayan-floating-panel[data-astro-cid-...]` 的特异性 (0,2,0) 高于浏览器默认 `[hidden] { display: none }` (0,1,0)，导致 `display: flex` 覆盖了 `hidden`，panel 在页面加载时可见。

## 修改文件清单

| 文件 | 修改内容 |
|------|----------|
| `src/components/FloatingAyanAssistant.astro` | 3 处修改 |

### 修改 1：CSS — 强制 panel hidden

在 `.ayan-floating-panel { ... display: flex }` 之后新增：

```css
.ayan-floating-panel[hidden] {
  display: none !important;
}

.ayan-floating-wrap.is-open .ayan-floating-trigger {
  display: none;
}
```

### 修改 2：JS openPanel/closePanel — 改用 is-open class + aria-expanded

将 inline `trigger.style.display = "none"/""` 替换为 class 管理：

```js
function openPanel() {
  panel.hidden = false;
  wrap.classList.add("is-open");
  trigger.setAttribute("aria-expanded", "true");
  input.focus();
}

function closePanel() {
  panel.hidden = true;
  wrap.classList.remove("is-open");
  trigger.setAttribute("aria-expanded", "false");
  // ... rest same
}
```

### 修改 3：JS 提取 wrap 变量

新增 `const wrap = document.querySelector(".ayan-floating-wrap")`，避免在 document click 监听器中重复 querySelector。

## 默认收起状态修复说明

- 页面初始 HTML：panel 带 `hidden` 属性
- CSS：`.ayan-floating-panel[hidden] { display: none !important }` 确保强制隐藏
- 外层 wrap 初始无 `is-open` class
- 页面加载时不调用 `openPanel()`、无 `setTimeout`、无 localStorage

## 点击打开/关闭逻辑说明

- **打开**：点击 trigger → `openPanel()` → panel.hidden=false, wrap 加 is-open class → trigger 被 CSS 隐藏
- **关闭**：点击 × 或点击外部 → `closePanel()` → panel.hidden=true, wrap 移除 is-open class → trigger 恢复显示
- 不跳转 /tools/ /resources/ /lead/
- "打开完整助手页" → `/ask/`
- "做 30 秒资料诊断" → `/survey/`

## 旧入口残留检查

| 检查项 | 结果 |
|--------|------|
| 是否存在 `<a class="ai-widget" href="/tools/">` | 否 |
| 是否存在两个触发按钮 | 否 |
| FloatingAyanAssistant 触发按钮是否带 data-lead-cta | 否 |
| BaseLayout 是否有 blanket querySelectorAll 文本匹配重写 | 否（TALLY 脚本只匹配 `[data-lead-cta]` 和含"微信"/"领取"的 input） |

## 自动化验证

| Check | Result |
|-------|--------|
| `npm run build` | ✅ 57 pages, Pagefind 3 filters |
| `npm run seo:audit` | ✅ 456 pass / 0 fail |
| `npm run images:check` | ✅ 49 items, 0 missing, 0 duplicate, 0 orphan |

## 本地人工验收

| 验收项 | 结果 |
|--------|------|
| 页面刚打开时，弹窗不显示 | ✅ |
| 页面刚打开时，只显示右下角"阿岩助手"按钮 | ✅ |
| 点击按钮后，弹窗才出现 | ✅ |
| 弹窗出现后，右下角触发按钮隐藏 | ✅ |
| 关闭弹窗后，右下角触发按钮恢复 | ✅ |
| 输入"广告 ACOS 太高怎么办"能显示结果 | ✅ |
| /ask/ 链接正常 | ✅ |
| /survey/ 链接正常 | ✅ |

## 约束确认

| 约束 | 状态 |
|------|------|
| 是否接 API | 否 |
| 是否使用 LLM | 否 |
| 是否收集隐私 | 否 |
| 是否使用 localStorage | 否 |
| 是否修改文章正文 | 否 |
| 是否新增普通文章 | 否 |
| 是否生成图片 | 否 |
| 是否修改 package.json | 否 |
| 是否修改部署配置 | 否 |
| 是否读取 auth.json | 否 |
| 是否调用 IndexNow | 否 |
| 是否 commit | 否 |
| 是否 push | 否 |

## 下一步建议

部署到线上后做一轮 POST_DEPLOY_CHECK 确认线上行为。
