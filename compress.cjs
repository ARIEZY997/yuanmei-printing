const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = "C:\\Users\\Administrator\\yuanmei-printing-site\\public\\images-backup";
const dst = "C:\\Users\\Administrator\\yuanmei-printing-site\\public\\images";

if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });

const files = fs.readdirSync(src).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

async function convertAll() {
  for (const f of files) {
    const srcPath = path.join(src, f);
    const dstName = f.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const dstPath = path.join(dst, dstName);
    const origSize = (fs.statSync(srcPath).size / 1024).toFixed(1);

    await sharp(srcPath)
      .webp({ quality: 80 })
      .toFile(dstPath);

    const newSize = (fs.statSync(dstPath).size / 1024).toFixed(1);
    console.log(`${f} → ${dstName}  (${origSize}KB → ${newSize}KB)`);
  }
  console.log(`\nDone! ${files.length} images compressed.`);
}

convertAll().catch(e => console.error(e));
