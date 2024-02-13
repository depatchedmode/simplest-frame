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
  const { message, frameName, dataUri, externalImageUrl } = params;

  let responseBuffer;

  // Case 1: Handle data URI
  if (dataUri) {
    const base64Data = dataUri.split(',')[1];
    responseBuffer = Buffer.from(base64Data, 'base64');
  }
  // Case 2: Proxy an externally loaded image
  else if (externalImageUrl) {
    // Fetch and process the external image
    responseBuffer = await fetchExternalImage(externalImageUrl);
  }
  // Default case: Generate image based on frame name and message
  else if (frameName && message) {
    const targetFrame = frames[frameName];
    const frameMarkup = await targetFrame.content(message);
    const frameMarkupInLayout = mainLayout(frameMarkup, message)

    const svg = await satori(
      html(frameMarkupInLayout), 
      {
        width: 1200,
        height: 630,
        fonts: fonts,
      }
    );
    const svgBuffer = Buffer.from(svg);
    const png = sharp(svgBuffer).png();
    responseBuffer = await png.toBuffer();
  } else {
    throw new Error("Insufficient parameters provided for image generation.");
  }

  return new Response(responseBuffer,
    {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000'
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