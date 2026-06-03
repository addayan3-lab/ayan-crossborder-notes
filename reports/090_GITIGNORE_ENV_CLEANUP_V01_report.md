# 090 · .gitignore 环境文件清理 v0.1 报告

> 任务:在 `.gitignore` 加 6 条 ignore 规则, 排除本地 agent/MCP 缓存 + opencode 备份/用量文件
> 状态: ✅ 完成 / 本地文件全部保留
> 报告时间: 2026-06-03

---

## 1. 任务范围

### 1.1 目标
- 阻止 `.serena/` / `archive/` / `reports/opencode-usage/` / `reports/opencode_config_*/` / 2 个特定 MD 报告进入 git
- 不删除本地文件 (用户本地继续用)
- 不影响正常 reports/ 跟踪 (其他 .md 报告仍可 track)

### 1.2 不做的事情
- ❌ 不删任何本地文件
- ❌ 不加 `reports/*.md` 通用规则 (避免误伤)
- ❌ 不改部署配置 / auth.json
- ❌ 不改其他已有 ignore 规则

---

## 2. 改动

### 2.1 .gitignore 前后对比

**改动前 (5 行):**
```gitignore
node_modules/
dist/
.astro/
.env
.DS_Store
```

**改动后 (15 行):**
```gitignore
node_modules/
dist/
.astro/
.env
.DS_Store

# Local agent / MCP caches
.serena/
archive/

# OpenCode usage snapshots and config backups
reports/opencode-usage/
reports/opencode_config_*/
reports/opencode_config_fix_report.md
reports/opencode_plugins_restore_report.md
```

**新增 10 行 (6 条规则 + 2 行注释):**
- `.serena/` — Serena MCP 本地缓存
- `archive/` — 历史备份目录 (含 temp-backups / .bak_030_xxx 等)
- `reports/opencode-usage/` — opencode 用量快照
- `reports/opencode_config_*/` — opencode 配置备份 (含 opencode_config_backup_20260602_170105/ 等)
- `reports/opencode_config_fix_report.md` — 配置修复报告
- `reports/opencode_plugins_restore_report.md` — 插件恢复报告

---

## 3. 验证

### 3.1 git check-ignore -v 输出

| 输入路径 | 匹配规则行 |
|---|---|
| `reports/opencode-usage` | line 12: `reports/opencode-usage/` |
| `reports/opencode_config_fix_report.md` | line 14: `reports/opencode_config_fix_report.md` |
| `reports/opencode_plugins_restore_report.md` | line 15: `reports/opencode_plugins_restore_report.md` |
| `.serena` | line 8: `.serena/` |
| `archive/temp-backups/src_content_posts_new-product-ppc-week-one.md.bak_030_20260602_120237` | line 9: `archive/` |

6 条规则全部生效。

### 3.2 git status --ignored 输出

```
!! .serena/
!! archive/temp-backups/src_content_posts_new-product-ppc-week-one.md.bak_030_20260602_120237
!! reports/opencode-usage/
!! reports/opencode_config_backup_20260602_170105/
!! reports/opencode_config_fix_report.md
!! reports/opencode_plugins_restore_report.md
```

6 个本地文件/目录被正确标记为 ignored, 但仍存在于工作区 (本地未删)。

### 3.3 仍可 track 的 reports

| 文件 | 是否可 track |
|---|---|
| `reports/086_POST_DEPLOY_LIVE_CHECK_AND_INDEXNOW_V01_report.md` | ✅ 可 track |
| `reports/086-092_POST_DEPLOY_RESOURCE_GROWTH_BATCH_V01_report.md` | ✅ 可 track |
| `reports/087_TOPIC_RESOURCE_ENTRY_V01_report.md` | ✅ 可 track |
| `reports/088_RESOURCE_CENTER_LINK_QA_V01_report.md` | ✅ 可 track |
| `reports/089_ARTICLE_RESOURCE_CTA_QA_V01_report.md` | ✅ 可 track |
| `reports/090_GITIGNORE_ENV_CLEANUP_V01_report.md` | ✅ 可 track (本报告) |
| `reports/091_RESOURCE_DETAIL_PAGES_PLAN_V01_report.md` | ✅ 可 track |
| `reports/092_NEXT_TASKS_093_110_PLAN_V01_report.md` | ✅ 可 track |
| `reports/seo-audit-report.md` (auto-regen) | ✅ 可 track |
| `reports/FINAL_PRE_DEPLOY_CHECK_AND_SYNC_V01_report.md` | ⚠ 未 track, 见下文 |

**关键保护:** 没有用 `reports/*.md` 通用规则, 仅对 2 个特定环境类报告加 ignore, 其他全部正常。

### 3.4 本地文件保留验证

- `.serena/` 本地存在 ✓
- `archive/temp-backups/*.bak_030_*` 本地存在 ✓
- `reports/opencode-usage/` 本地存在 ✓
- `reports/opencode_config_backup_20260602_170105/` 本地存在 ✓
- `reports/opencode_config_fix_report.md` 本地存在 ✓
- `reports/opencode_plugins_restore_report.md` 本地存在 ✓

---

## 4. 风险与缓解

| 风险 | 等级 | 缓解 |
|---|---|---|
| 误把 opencode_config 备份删了 | 🟢 低 | 仅 ignore, 不删本地 |
| archive/ 误伤正常 archive | 🟢 低 | archive 目录是临时备份专用, 无业务文件 |
| reports/opencode-usage 误伤 | 🟢 低 | 仅精确匹配 `reports/opencode-usage/`, 不会误伤 reports/opencode-usage-foo.md |
| reports/opencode_config_*/ 误伤 | 🟢 低 | 通配符, 匹配 `reports/opencode_config_20260601_xxx/`, 不会误伤正常报告 |
| 2 个特定 MD 误伤 | 🟢 低 | 精确文件名, 不会误伤 |

---

## 5. 与 086-092 批次的关系

- 090 是 086-092 批次唯一动 .gitignore 的任务
- 配合 086 (部署验收), 086-092 完成, 未来 commit 不会再把这些环境文件误提交
- 与 041B opencode-usage-monitor 任务配合: 用量快照仍在本地, 仅不进 git

---

**报告结束。** 090 任务完成, 6 条 ignore 规则生效, 本地文件 0 丢失。
