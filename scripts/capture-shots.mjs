// Capture device screenshots of each demo for the project showcase.
//
// Usage:
//   1. Start the dev server:  npm run dev   (serves /demos/* from /public)
//   2. In another terminal:   npm run capture
//
// Writes PNGs to public/projects/<id>/{desktop,tablet,mobile}.png — the paths
// referenced by `preview` in src/content/projects.ts.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "../public");
const BASE = process.env.BASE_URL || "http://localhost:3000";

// project id (output folder) -> demo URL path. The la-isla folder differs from
// the project id, so it is mapped explicitly.
// `action` runs after load to reach the real app (e.g. past a login screen).
const enterApp = async (page) => {
  const btn = page.locator('button:has-text("Ingresar")').first();
  if (await btn.count()) {
    await btn.click().catch(() => {});
    await page.waitForTimeout(3500);
  }
};

const TARGETS = [
  { id: "la-isla-digital", path: "/demos/la-isla/index.html", wait: 6500 },
  { id: "container-os", path: "/demos/container-os/index.html", wait: 4500, action: enterApp },
  { id: "gestion-sindicato", path: "/demos/gestion-sindicato/index.html", wait: 5000 },
  { id: "ashley-lips", path: "/demos/ashley-lips/index.html", wait: 4500 },
  { id: "studio-gym", path: "/demos/studio-gym/index.html", wait: 5000 },
];

const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;

const DEVICES = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
try {
  for (const target of TARGETS) {
    if (ONLY && !ONLY.includes(target.id)) continue;
    const outDir = resolve(PUBLIC, "projects", target.id);
    await mkdir(outDir, { recursive: true });
    for (const device of DEVICES) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      const url = BASE + target.path;
      try {
        await page.goto(url, { waitUntil: "load", timeout: 60000 });
        await page.waitForTimeout(target.wait);
        if (target.action) await target.action(page);
        const file = resolve(outDir, `${device.name}.png`);
        await page.screenshot({ path: file });
        console.log(`✓ ${target.id} / ${device.name}`);
      } catch (err) {
        console.error(`✗ ${target.id} / ${device.name}:`, err.message);
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
