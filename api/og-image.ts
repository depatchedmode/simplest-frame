import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import fonts from "../src/fonts.js";
import frames from "../src/frames/index.js";
import mainLayout from "../src/layouts/main.js";
import { URLSearchParamsToObject } from '../modules/utils.js';

export default async (req) => {
  
  const url = new URL(req.url);
  const params = URLSearchParamsToObject(url.searchParams);
  const { message, frameName } = params;

  let imageBase64;

  if (frameName && message) {
    const targetFrame = frames[frameName];
    const frame = await targetFrame.render(message);
    const frameMarkupInLayout = mainLayout(frame.imageMarkup, message)

    const svg = await satori(
      html(frameMarkupInLayout), 
      {
        width: 1200,
        height: 630,
        fonts: fonts,
      }
    );
    const svgBuffer = Buffer.from(svg);
    const imgOutput = sharp(svgBuffer).webp();
    const imageBuffer = await imgOutput.toBuffer();
    imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } else {
    throw new Error("Insufficient parameters provided for image generation.");
  }

  return new Response(imageBase64,
    {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Netlify-Vary': 'query',
      }
    }
  );
}

// Assuming `fetch` is already available in your environment
const fetchExternalImage = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    // Use .arrayBuffer() and convert it to a Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    console.error('Error fetching external image:', error);
    return null;
  }
};

export const config = {
  path: "/og-image"
};