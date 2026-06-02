import fs from "node:fs";
import path from "node:path";

const host = "amz.hao1234.top";
const site = "https://amz.hao1234.top";
const key = "c5b70fdc01d94792b62a67aee1c5706c";
const keyLocation = site + "/" + key + ".txt";
const endpoint = "https://www.bing.com/indexnow";

const root = process.cwd();

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

const defaultUrls = [
  site + "/",
  site + "/articles/",
  site + "/articles/2026-amazon-ai-operations/",
  site + "/ai-amazon/",
  site + "/ppc/",
  site + "/listing/",
  site + "/selection/",
  site + "/tools/",
  site + "/lead/",
  site + "/search/"
];

function getUrlsFromSitemap() {
  const sitemap = path.join(root, "dist", "sitemap-0.xml");
  if (!fs.existsSync(sitemap)) return [];
  const xml = fs.readFileSync(sitemap, "utf8");
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
}

const urls = unique([...defaultUrls, ...getUrlsFromSitemap()]);

const payload = {
  host,
  key,
  keyLocation,
  urlList: urls
};

console.log("IndexNow payload:");
console.log(JSON.stringify(payload, null, 2));

const res = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(payload)
});

const text = await res.text();

console.log("IndexNow response:");
console.log("status:", res.status);
console.log("body:", text || "(empty)");

if (![200, 202].includes(res.status)) {
  process.exitCode = 1;
}