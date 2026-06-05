# Command: verify

**用途：** 固定验证入口。在修改后运行，确认没有引入新问题。

## 步骤

1. 读 `package.json` scripts，确定可用验证命令
2. 依次运行：
   ```powershell
   npm run build
   npm run seo:audit
   npm run images:check
   ```
3. 运行 git 检查：
   ```powershell
   git status --short
   git diff --stat
   ```
4. 汇总结果并输出

## 输出格式

| Check | Status |
|-------|--------|
| build | ✅/❌ N pages |
| SEO | ✅/❌ pass/fail |
| images:check | ✅/❌ items/missing/duplicate/orphan |
| git status | ✅/❌ 说明 |

## 如果命令不存在

先读 `package.json`，使用项目实际定义的脚本名。
