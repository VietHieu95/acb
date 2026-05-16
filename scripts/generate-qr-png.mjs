import QRCode from "qrcode";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const merchants = [
  ["vinbus", "VinBus"],
  ["xanhsm", "Xanh SM"],
  ["train", "Tàu hỏa"],
  ["coopmart", "Co.opmart"],
  ["bodyshop", "Body Shop"],
  ["mango", "Mango"],
  ["highlands", "Highlands"],
  ["grab", "Grab"],
  ["shell", "Shell"],
  ["vietnam-airlines", "Vietnam Airlines"],
];

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "qr");

await mkdir(outDir, { recursive: true });

for (const [id, label] of merchants) {
  const payload = `ACBECO:v1|${id}`;
  const path = join(outDir, `${id}.png`);
  await QRCode.toFile(path, payload, { width: 400, margin: 2 });
  console.log(`✓ ${label} → public/qr/${id}.png`);
}

console.log("\nDone. Open /qr-codes in app or use PNG files for print.");
