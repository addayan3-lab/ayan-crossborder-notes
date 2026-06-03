import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, "src", "data", "image-manifest.json");
const publicDir = path.join(root, "public");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

let missing = 0;
let duplicates = 0;
let orphan = 0;
const seen = new Set();
const referencedPaths = new Set();

for (const item of manifest) {
  if (!item.id) {
    console.log(`[ERR] manifest item missing id: ${JSON.stringify(item)}`);
    continue;
  }
  if (seen.has(item.id)) {
    console.log(`[ERR] duplicate id in manifest: ${item.id}`);
    duplicates++;
  }
  seen.add(item.id);

  if (!item.path) {
    console.log(`[ERR] manifest item missing path: ${item.id}`);
    continue;
  }

  const cleanPath = item.path.replace(/^\//, "");
  const absolute = path.join(publicDir, cleanPath);
  referencedPaths.add(absolute);

  if (!fs.existsSync(absolute)) {
    console.log(`[MISS] file not found: ${item.path} (id=${item.id})`);
    missing++;
  }
}

function walk(dir) {
  const out = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (/\.(svg|png|jpg|jpeg|webp)$/i.test(item)) out.push(full);
  }
  return out;
}

const imagesDir = path.join(publicDir, "images");
if (fs.existsSync(imagesDir)) {
  for (const file of walk(imagesDir)) {
    if (!referencedPaths.has(file)) {
      const rel = path.relative(publicDir, file).replace(/\\/g, "/");
      console.log(`[ORPHAN] asset not in manifest: /${rel}`);
      orphan++;
    }
  }
}

console.log("");
console.log(`image-manifest check complete.`);
console.log(`  manifest items: ${manifest.length}`);
console.log(`  missing files: ${missing}`);
console.log(`  duplicate ids: ${duplicates}`);
console.log(`  orphan assets: ${orphan}`);

if (missing > 0 || duplicates > 0) {
  process.exit(1);
}
