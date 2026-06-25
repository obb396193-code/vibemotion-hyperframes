const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    recordVideo: { dir: 'out/raw', size: { width: 1920, height: 1080 } },
  });
  const page = await context.newPage();
  await page.goto('http://localhost:8777/index.html', { waitUntil: 'load' });

  // wait for the level to finish (replay button fades in at the end)
  await page.waitForFunction(
    () => {
      const r = document.getElementById('replay');
      return r && getComputedStyle(r).opacity === '1';
    },
    { timeout: 40000 }
  ).catch(() => console.log('timeout waiting for CLEAR, capturing anyway'));

  await page.waitForTimeout(1500); // hold on the CLEAR frame
  await context.close();           // flush video to disk
  await browser.close();
  console.log('done recording');
})();
