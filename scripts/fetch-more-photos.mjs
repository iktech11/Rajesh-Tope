import fs from 'fs';
import path from 'path';

// Let's test a curated list of reliable direct image URLs for Rajesh Tope from official news reporting:
const candidateUrls = [
  {
    name: 'rajesh-tope-press-conference.jpg',
    url: 'https://images.indianexpress.com/2021/04/Rajesh-Tope-1200.jpg'
  },
  {
    name: 'rajesh-tope-assembly.jpg',
    url: 'https://images.hindustantimes.com/img/2021/04/23/1600x900/4c379a12-8bb0-11eb-a6b1-a675febe4d9c_1619177893922.jpg'
  },
  {
    name: 'rajesh-tope-health-review.jpg',
    url: 'https://images.indianexpress.com/2021/05/Rajesh-Tope-1.jpg'
  },
  {
    name: 'rajesh-tope-jalna-rally.jpg',
    url: 'https://images.indianexpress.com/2020/03/rajesh-tope-759.jpg'
  },
  {
    name: 'rajesh-tope-cabinet.jpg',
    url: 'https://img.theweek.in/content/dam/week/news/india/images/2020/4/11/rajesh-tope-health-minister.jpg'
  }
];

const publicImagesDir = path.resolve('public', 'images');

async function testDownload(item) {
  try {
    const res = await fetch(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://www.google.com/'
      }
    });
    console.log(item.name, 'Status:', res.status, res.headers.get('content-type'));
    if (res.ok && res.headers.get('content-type')?.includes('image')) {
      const buf = await res.arrayBuffer();
      const dest = path.join(publicImagesDir, item.name);
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`Saved ${item.name} (${buf.byteLength} bytes)`);
      return true;
    }
  } catch (err) {
    console.log(item.name, 'Error:', err.message);
  }
  return false;
}

async function run() {
  for (const item of candidateUrls) {
    await testDownload(item);
  }
}

run();

