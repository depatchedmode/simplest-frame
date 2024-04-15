import frames from '../src/frames/index.js';
import { Frame, FrameActionDataParsed, GetFrameHtmlOptions, getFrameHtml } from "frames.js";
import landingPage from '../src/landing-page.js';
import { objectToURLSearchParams } from '../modules/utils.js';
import { isFrameStolen } from './antitheft.js';

/**
 * Determines the next frame to display based on the context and message of the current frame.
 * 
 * @param frameContext Contains context information about the current frame, such as the source frame.
 * @param frameMessage An object containing the parsed data for the frame action.
 * @returns A promise that resolves to the response for displaying the next frame.
 */
export default async (frameContext, frameMessage: FrameActionDataParsed) => {
  let nextFrameName = 'poster';
  const prevFrame = frames[frameContext.searchParams?.get('frame')];

  if (prevFrame && typeof prevFrame.handleInteraction === 'function') {
    nextFrameName = await prevFrame.handleInteraction(frameMessage, frameContext);
  }

  if (await isFrameStolen(frameMessage)) {
    nextFrameName = 'stolen';
  }

  const nextFrame = await frames[nextFrameName].render(frameMessage);

  // TODO: not yet handling redirects
  if (nextFrame) {
    return await respondWithFrame(nextFrameName, nextFrame, frameMessage);
  } else {
    console.error(`Unknown frame requested: ${nextFrameName}`);
  }
}

// const respondWithRedirect = (redirectURL) => {
//   const internalRedirectURL = new URL(`${process.env.URL}/redirect`) 
//   internalRedirectURL.searchParams.set('redirectURL',redirectURL);
//   return new Response('<div>redirect</div>', 
//     {
//       status: 302,
//       headers: { 
//         'Location': internalRedirectURL.toString(),
//       },
//     }
//   );
// }

/**
 * Constructs and responds with the HTML for a given frame based on the simpleFrame object and a frame message.
 * 
 * @param simpleFrame The frame object containing minimal information needed to construct the full frame.
 * @param message An object containing the parsed data for the frame action.
 * @returns A promise that resolves to a Response object containing the HTML for the frame.
 */
const respondWithFrame = async (
  name,
  simpleFrame, 
  message: FrameActionDataParsed
) => {
  const postVars = new URLSearchParams();
  postVars.set('frame', name);
  const host = process.env.URL;
  const frame: Frame = {
    version: 'vNext', 
    image: handleImageSource(name, simpleFrame, message),
    buttons: simpleFrame.buttons, 
    inputText: simpleFrame.inputText,
    postUrl: `${host}/?${postVars.toString()}`
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

function handleImageSource(name, frame, message):string {
  const dataUriPattern = /^data:image\/[a-zA-Z]+;base64,/;
  const absoluteUrlPattern = /^https?:\/\//;
  const host = process.env.URL;

  const { image } = frame;

  if (dataUriPattern.test(image)) {
    return `${host}/og-image?${objectToURLSearchParams({
      dataUri: image,
    })}`;
  } else if (absoluteUrlPattern.test(image)) {
    return `${host}/og-image?${objectToURLSearchParams({
      imageUrl: image,
    })}`;
  } else {
    return `${host}/og-image?${objectToURLSearchParams({
      t: new Date().valueOf(), // Current timestamp for cache busting.
      frameName: name || '', 
      message
    })}`;
  }
}
