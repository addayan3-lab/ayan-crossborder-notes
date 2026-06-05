# ayan-release-check

**用途：** 发布前/后固定验收 — build、SEO、图片、git 状态、报告输出。不修改代码。

## 前置检查

- [ ] 先读 `AGENTS.md` 第 7 节验证命令
- [ ] 先读 `package.json` scripts 确认可用命令
- [ ] 确认当前 git 分支和目标分支

## 验收步骤

### 1. 运行验证命令

```powershell
npm run build
npm run seo:audit
npm run images:check
git status --short
git diff --stat
```

如果脚本不存在，先读 `package.json`，选择可用脚本代替。

### 2. 检查结果

| 检查项 | 通过条件 |
|--------|----------|
| build | 无报错，所有页面生成 |
| SEO | 0 fail |
| images:check | 0 missing / 0 duplicate / 0 orphan |
| git status | 只包含预期文件 |

### 3. 排除不应提交的文件

- `.env` 环境文件
- 本地缓存（`node_modules/`、`.astro/`）
- `reports/opencode-usage/`
- `backups/` 配置备份
- `archive/` 临时文件
- 与当前批次无关的未跟踪文件

### 4. 验收保护

- 不合并、不部署、不推送未经过以上验收的代码
- 如果任何检查项未通过，先修复再继续，不要跳过或强制提交

### 5. 输出报告

每次任务完成必须写 `reports/` 报告。报告模板参考 `AGENTS.md` 第 8 节。

## 适用任务

- 发布前检查（pre-deploy check）
- 发布后检查（post-deploy check）
- commit/push 前验收
- 构建失败定位
