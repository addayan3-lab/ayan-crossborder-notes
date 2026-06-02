import { spawnSync } from "node:child_process";

function run(command, args, options = {}) {
  console.log("");
  console.log(">", [command, ...args].join(" "));

  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options
  });

  if (result.status !== 0) {
    console.error("");
    console.error(`命令失败：${command} ${args.join(" ")}`);
    process.exit(result.status || 1);
  }
}

console.log("022｜内容发布流水线开始");

run("npm", ["run", "infographics:generate"]);
run("npm", ["run", "build"]);
run("npm", ["run", "seo:audit"]);
run("npm", ["run", "indexnow:submit"]);
run("git", ["status"]);

console.log("");
console.log("内容发布流水线完成。");
console.log("");
console.log("确认页面没问题后执行：");
console.log('git add .');
console.log('git commit -m "publish content update"');
console.log('git push');