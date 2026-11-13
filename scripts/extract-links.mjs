import fs from 'fs';
import path from 'path';

async function main() {
  const publicDir = path.resolve('public', 'images');
  
  // Test some known news image URLs
  const urls = [
    {
      name: 'rajesh-tope-presser.jpg',
      url: 'https://images.indianexpress.com/2021/05/Rajesh-Tope-1.jpg?w=640'
    },
    {
      name: 'rajesh-tope-speech.jpg',
      url: 'https://static.toiimg.com/thumb/msid-82283086,width-1280,height-720,resizemode-4/.jpg'
    },
    {
      name: 'rajesh-tope-covid-briefing.jpg',
      url: 'https://images.livemint.com/img/2020/09/03/600x338/20200827_DLI-MN_MN-COVID_01_1599147178330_1599147209355.jpg'
    },
    {
      name: 'rajesh-tope-mantralaya.jpg',
      url: 'https://images.indianexpress.com/2022/03/Rajesh-Tope.jpg'
    },
    {
      name: 'ghansawangi-constituency.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jalna_in_Maharashtra_%28India%29.svg/800px-Jalna_in_Maharashtra_%28India%29.svg.png'
    }
  ];

  for (const item of urls) {
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      console.log(item.name, res.status, res.headers.get('content-type'));
      if (res.ok && res.headers.get('content-type')?.includes('image')) {
        const buf = await res.arrayBuffer();
        fs.writeFileSync(path.join(publicDir, item.name), Buffer.from(buf));
        console.log('Saved:', item.name, buf.byteLength);
      }
    } catch (e) {
      console.log('Failed:', item.name, e.message);
    }
  }
}

main();

