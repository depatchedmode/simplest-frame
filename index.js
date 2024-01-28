import express from "express";
import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

const frameSource = await fs.readFile(join(__dirname, 'views', 'frameSource.html'), 'utf8');
let frameCount = 0;

app.get('/image.raw', async (req, res, next) => {
  res.send(frameSource);
});

app.get('/image.png', async (req, res, next) => {
  const markup = await html(frameSource.replace(/\${count}/g, frameCount));
  const font = {
    fileName: 'Redaction-Regular.otf',
    cssName: 'Redaction'
  }
  // Font file path
  const fontPath = join(__dirname, 'public', 'fonts', font.fileName);
  const fontData = await fs.readFile(fontPath);
  const svg = await satori(markup, {
    width: 1200,
    height: 800,
    fonts: [
      {
        name: font.cssName,
        data: fontData,
        weight: 400,
        style: "normal",
      },
    ],
  });
  const png = sharp(Buffer.from(svg)).png();
  const response = await png.toBuffer();
  res.setHeader('Content-Type', 'image/png');
  res.send(response);
});

const handleIndexResponse = async (req, res) => {
  try {
    if (req.method === 'POST') {
      // Process POST request data from req.body
      console.log('POST data:', req.body);
      frameCount++;
      console.log('framed:',frameCount);
    }
    const host = req.get('host');
    const indexHtml = await fs.readFile(join(__dirname, 'views', 'index.html'), 'utf8');
    res.status(200).send(indexHtml.replace(/\${host}/g, host).replace(/\${count}/g, frameCount));
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred');
  }
};

app.get('/', handleIndexResponse);
app.post('/', handleIndexResponse);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
