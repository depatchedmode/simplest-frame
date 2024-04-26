import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import fonts from "../src/fonts.js";
import mainLayout from "../src/layouts/main.js";
import frames from '../src/frames/index.js';
import { type Frame, type FrameActionDataParsed, type GetFrameHtmlOptions, getFrameHtml } from 'frames.js';
import landingPage from '../src/landing-page.js';
import { isFrameStolen } from './antitheft.js';

const DEFAULT_FRAME = 'poster';
const DEFAULT_STATE = {
  frame: DEFAULT_FRAME,
};

/**
 * Determines the next frame to display based on the context and message of the current frame.
 * 
 * @param prevFrameName The name of the frame 
 * @param frameData An object containing the parsed data for the frame action.
 * @returns A promise that resolves to the response for displaying the next frame.
 */
export default async (prevFrameName: string, frameData: FrameActionDataParsed) => {
  const prevFrame = prevFrameName ? frames[prevFrameName] : null;

  let nextState = DEFAULT_STATE;  
  if (prevFrame && typeof prevFrame.handleInteraction === 'function') {
    nextState = await prevFrame.handleInteraction(frameData);
  }

  if (await isFrameStolen(frameData)) {
    nextState.frame = 'stolen';
  }

  const nextFrame = frames[nextState.frame];
  frameData.state = nextFrame.state = JSON.stringify({ ...nextFrame.state, ...nextState });

  // TODO: not yet handling redirects
  if (nextFrame) {
    return await respondWithFrame(nextFrame, frameData);
  } else {
    console.error(`Unknown frame requested: ${nextState.frame}`);
  }
}

/**
 * Constructs and responds with the HTML for a given frame based on the simpleFrame object and a frame message.
 * 
 * @param renderedFrame The frame object containing minimal information needed to construct the full frame.
 * @param message An object containing the parsed data for the frame action.
 * @returns A promise that resolves to a Response object containing the HTML for the frame.
 */
const respondWithFrame = async (
  nextFrame, 
  frameData: FrameActionDataParsed
) => {
  const postVars = new URLSearchParams();
  postVars.set('currFrame', nextFrame.name);
  const renderedFrame = await nextFrame.render(frameData);
  const frame: Frame = {
    version: 'vNext', 
    image: await handleImageSource(renderedFrame.image, frameData),
    buttons: renderedFrame.buttons, 
    inputText: renderedFrame.inputText,
    postUrl: `${process.env.URL}/?${postVars.toString()}`,
    state: nextFrame.state,
  };

  const index = await landingPage(frame);
  const options: GetFrameHtmlOptions = {
    og: {
        title: '🔳 Simplest Frame', 
    },
    title: '🔳 Simplest Frame', 
    htmlBody: index.body, 
    htmlHead: index.head
  };

  const frameHTML = getFrameHtml(frame, options);
  return new Response(frameHTML, 
    {
      status: 200,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8' 
      },
    }
  );
};

async function handleImageSource(image, frameData):Promise<string> {
  const dataUriPattern = /^data:image\/[a-zA-Z]+;base64,/;
  const absoluteUrlPattern = /^https?:\/\//;
  const htmlPattern = /(<([^>]+)>)/gi;

  if (htmlPattern.test(image)) {
    const frameMarkupInLayout = mainLayout(image, frameData)
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
    return `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } 

  // data URI or external url
  else if (dataUriPattern.test(image) || absoluteUrlPattern.test(image)) {
    return image;
  }

  // local image
  else {
    return `${process.env.URL}/${image}`;
  }
}
