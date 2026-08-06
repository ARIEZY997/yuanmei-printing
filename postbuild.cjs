const fs = require("fs");
const path = require("path");
// Copy CMS JS after build to avoid Vercel OOM
const src = path.join(__dirname, "cms-js", "decap-cms.js");
const dst = path.join(__dirname, "dist", "admin", "decap-cms.js");
if (fs.existsSync(src)) {
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  console.log("CMS copied to dist");
}
