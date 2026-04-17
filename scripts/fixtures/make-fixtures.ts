import { writeFileSync } from "fs";
import { join } from "path";

const dir = __dirname;

// Minimal valid 1-page PDF (~ a few hundred bytes).
const minimalPdf = Buffer.from(
  `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]/Resources<<>>>>endobj
xref
0 4
0000000000 65535 f
0000000009 00000 n
0000000052 00000 n
0000000091 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
152
%%EOF
`,
  "utf8"
);
writeFileSync(join(dir, "sample.pdf"), minimalPdf);

// 1x1 red PNG (67 bytes).
const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==";
writeFileSync(join(dir, "sample.png"), Buffer.from(pngBase64, "base64"));

console.log("Wrote sample.pdf + sample.png into", dir);
