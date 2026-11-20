// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、速度計の目盛りと針。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <g fill="none" stroke-linecap="round"><path d="M18 68 A34 34 0 0 1 82 68" stroke="#fffdf7" stroke-width="8"/><path d="M50 66 L72 38" stroke="#f6d77a" stroke-width="7"/></g><circle cx="50" cy="66" r="7" fill="#7fc4ef"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
