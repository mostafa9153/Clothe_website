import { chromium } from "playwright-core";
import * as fs from "fs";
import * as path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const WIDTHS = [360, 390, 768, 1024, 1180, 1280, 1366, 1440, 1536, 1920, 2560];
const ZOOM_LEVELS = [1.0, 1.1, 1.25, 1.5];

interface CheckResult {
  width: number;
  zoom: number;
  passed: boolean;
  horizontalOverflow: boolean;
  navLogoCollision: boolean;
  logoIconsCollision: boolean;
  details: string;
}

async function runHeaderTest() {
  console.log("=== HEADER RESPONSIVE & COLLISION VERIFICATION ===");
  console.log(`Connecting to Chrome at: ${CHROME_PATH}`);

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox'],
  });

  const results: CheckResult[] = [];
  let totalTests = 0;
  let passedTests = 0;

  const port = process.env.PORT || "3001";

  for (const width of WIDTHS) {
    for (const zoom of ZOOM_LEVELS) {
      totalTests++;
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        deviceScaleFactor: 1,
      });

      const page = await context.newPage();
      try {
        await page.goto(`http://localhost:${port}`, { waitUntil: "domcontentloaded", timeout: 15000 });

        // Apply zoom level to body
        if (zoom !== 1.0) {
          await page.evaluate((z) => {
            (document.body.style as any).zoom = String(z);
          }, zoom);
          await page.waitForTimeout(200);
        }

        const metrics = await page.evaluate(() => {
          const nav = document.getElementById("header-nav-container");
          const logo = document.getElementById("header-logo-container");
          const icons = document.getElementById("header-icons-container");

          const scrollWidth = document.documentElement.scrollWidth;
          const clientWidth = document.documentElement.clientWidth;
          const windowWidth = window.innerWidth;
          const hasHorizontalOverflow = scrollWidth > windowWidth + 2;

          if (!nav || !logo || !icons) {
            return {
              found: false,
              hasHorizontalOverflow,
              navRect: null,
              logoRect: null,
              iconsRect: null,
            };
          }

          const navRect = nav.getBoundingClientRect();
          const logoRect = logo.getBoundingClientRect();
          const iconsRect = icons.getBoundingClientRect();

          return {
            found: true,
            hasHorizontalOverflow,
            navRect: { left: navRect.left, right: navRect.right, width: navRect.width },
            logoRect: { left: logoRect.left, right: logoRect.right, width: logoRect.width },
            iconsRect: { left: iconsRect.left, right: iconsRect.right, width: iconsRect.width },
          };
        });

        if (!metrics.found) {
          results.push({
            width,
            zoom,
            passed: false,
            horizontalOverflow: metrics.hasHorizontalOverflow,
            navLogoCollision: true,
            logoIconsCollision: true,
            details: "Header elements not located in DOM",
          });
          continue;
        }

        // Bounding box collision checks:
        // Nav right must be <= Logo left (with 0.5px tolerance for subpixel rendering)
        // Logo right must be <= Icons left (with 0.5px tolerance)
        const navLogoCollision = (metrics.navRect?.right ?? 0) > (metrics.logoRect?.left ?? 0) + 0.5;
        const logoIconsCollision = (metrics.logoRect?.right ?? 0) > (metrics.iconsRect?.left ?? 0) + 0.5;
        const hasOverflow = metrics.hasHorizontalOverflow;

        const isSuccess = !navLogoCollision && !logoIconsCollision && !hasOverflow;
        if (isSuccess) passedTests++;

        results.push({
          width,
          zoom,
          passed: isSuccess,
          horizontalOverflow: hasOverflow,
          navLogoCollision,
          logoIconsCollision,
          details: `Nav[${Math.round(metrics.navRect?.left ?? 0)}-${Math.round(metrics.navRect?.right ?? 0)}] | Logo[${Math.round(metrics.logoRect?.left ?? 0)}-${Math.round(metrics.logoRect?.right ?? 0)}] | Icons[${Math.round(metrics.iconsRect?.left ?? 0)}-${Math.round(metrics.iconsRect?.right ?? 0)}]`,
        });

        // Save representative screenshots
        if (zoom === 1.0 && [390, 1180, 1440].includes(width)) {
          await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, `header-responsive-${width}px.png`),
          });
        }
      } catch (err: any) {
        results.push({
          width,
          zoom,
          passed: false,
          horizontalOverflow: true,
          navLogoCollision: false,
          logoIconsCollision: false,
          details: `Error: ${err.message}`,
        });
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();

  console.log("\n=================== VERIFICATION RESULTS ===================");
  console.table(
    results.map((r) => ({
      Viewport: `${r.width}px @ ${(r.zoom * 100).toFixed(0)}%`,
      Passed: r.passed ? "✅ PASS" : "❌ FAIL",
      "No Overflow": !r.horizontalOverflow ? "YES" : "NO",
      "Nav-Logo Collision": r.navLogoCollision ? "COLLISION" : "NONE",
      "Logo-Icons Collision": r.logoIconsCollision ? "COLLISION" : "NONE",
      Details: r.details,
    }))
  );

  console.log(`\nFinal Score: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);

  if (passedTests !== totalTests) {
    console.error("FAIL: Some header responsive configurations failed collision check.");
    process.exit(1);
  } else {
    console.log("SUCCESS: 100% of header configurations passed collision & overflow verification!");
    process.exit(0);
  }
}

runHeaderTest();
