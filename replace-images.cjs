const fs = require("fs");
const path = require("path");
const srcDir = "C:\\Users\\Administrator\\yuanmei-printing-site\\src";

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(p));
    else if (/\.(astro|json)$/i.test(entry.name)) files.push(p);
  }
  return files;
}

let count = 0;
for (const f of walk(srcDir)) {
  let content = fs.readFileSync(f, "utf8");
  const before = content;
  content = content.replace(/(\/images\/[^"'\s]+)\.(jpg|png)/gi, "$1.webp");
  content = content.replace(/(\/images\/[^"'\s]+)\.(jpg|png)/gi, "$1.webp");
  if (content !== before) {
    fs.writeFileSync(f, content);
    console.log(`Updated: ${path.basename(f)}`);
    count++;
  }
}
console.log(`\nDone! ${count} files updated.`);
