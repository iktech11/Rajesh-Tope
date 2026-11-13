import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const viewports = [
  { name: '320_small_android', width: 320, height: 640 },
  { name: '360_android', width: 360, height: 740 },
  { name: '375_iphone_se', width: 375, height: 667 },
  { name: '390_iphone_14', width: 390, height: 844 },
  { name: '412_pixel', width: 412, height: 915 },
  { name: '430_iphone_promax', width: 430, height: 932 },
  { name: '480_large_mobile', width: 480, height: 854 },
  { name: '768_tablet', width: 768, height: 1024 },
  { name: '1024_laptop', width: 1024, height: 768 },
  { name: '1440_desktop', width: 1440, height: 900 }
];

const screenshotsDir = path.resolve('screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function takeScreenshot(vp) {
  const outputPath = path.join(screenshotsDir, `${vp.name}.png`);
  const args = [
    '--headless=new',
    '--disable-gpu',
    `--window-size=${vp.width},${vp.height}`,
    '--hide-scrollbars',
    `--screenshot=${outputPath}`,
    'http://localhost:4173/'
  ];

  return new Promise((resolve) => {
    const proc = spawn(chromePath, args);
    proc.on('close', (code) => {
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        console.log(`[PASS] ${vp.name} (${vp.width}x${vp.height}) => ${stats.size} bytes`);
        resolve(true);
      } else {
        console.error(`[FAIL] ${vp.name} failed to generate screenshot`);
        resolve(false);
      }
    });
  });
}

async function run() {
  console.log('Testing responsive viewports with Chrome headless...');
  for (const vp of viewports) {
    await takeScreenshot(vp);
  }
  console.log('All responsive viewport tests completed!');
}

run();

