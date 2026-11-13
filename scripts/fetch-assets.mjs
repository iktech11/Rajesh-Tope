import fs from 'fs';
import path from 'path';

const publicImagesDir = path.resolve('public', 'images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    if (!res.ok) {
      console.error(`Failed ${url}: ${res.status}`);
      return false;
    }
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Saved ${dest} (${buffer.byteLength} bytes)`);
    return true;
  } catch (err) {
    console.error(`Error ${url}:`, err.message);
    return false;
  }
}

async function main() {
  await download('https://d3pc1xvrcw35tl.cloudfront.net/images/686x514/rajesh-tope_202001350342.jpg', path.join(publicImagesDir, 'rajesh-tope-portrait.jpg'));
}

main();

