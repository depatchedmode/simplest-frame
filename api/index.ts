import { GetFrameHtmlOptions, getFrameHtml, getFrameMessage } from "frames.js";
import landingPage from '../src/landing-page.js';
import { parseRequest, objectToURLSearchParams } from '../modules/utils.js';
import getTargetFrame from '../modules/getTargetFrame.js';

export default async (req) => {
    try {
        const requestURL = new URL(req.url);
        const payload = await parseRequest(req);
        const frameMessage = payload ? await getFrameMessage(payload, {
            hubHttpUrl: process.env.FARCASTER_HUB
        }) : {};

        // extending the frames.js frameMessage object with a few things 
        // we require
        // TODO: see about refactoring this more towards the frames.js style
        frameMessage.from = requestURL.searchParams.get('frame');
        frameMessage.requestURL = payload?.untrustedData.url;

        const { targetFrame, redirectURL } = await getTargetFrame(frameMessage);

        if (redirectURL) {
            return await respondWithRedirect(redirectURL);
        } else if (targetFrame) {
            return await respondWithFrame(targetFrame, frameMessage);
        } else {
            console.error(`Unknown frame requested: ${targetFrame.name}`);
        }
    } catch (error) {
        console.error(`Error processing request: ${error}`);
    }
};

const respondWithRedirect = (redirectURL) => {
    const internalRedirectURL = new URL(`${process.env.URL}/redirect`) 
    internalRedirectURL.searchParams.set('redirectURL',redirectURL);
    return new Response('<div>redirect</div>', 
        {
            status: 302,
            headers: { 
                'Location': internalRedirectURL.toString(),
            },
        }
    );
}

const respondWithFrame = async (targetFrame, frameMessage) => {
    const searchParams = {
        t: new Date().valueOf(),
        targetFrameName: targetFrame.name, 
        frameMessage
    }
    
    const host = process.env.URL;
    const frameContent = {
        version: "vNext",
        image: targetFrame.image ? 
            `${host}/${targetFrame.image}` : 
            `${host}/og-image?${objectToURLSearchParams(searchParams)}` || '',
        buttons: targetFrame.buttons,
        inputText: targetFrame.inputText,
        postUrl: `${host}/?frame=${targetFrame.name}`
    };

    const landingPageOptions = await landingPage(frameContent);
    const frameHtmlOptions: GetFrameHtmlOptions = {
        og: {
            title: '🔳 Simplest Frame',
        },
        title: '🔳 Simplest Frame',
        htmlBody: landingPageOptions.body,
        htmlHead: landingPageOptions.head
    }
    const frameHTML = getFrameHtml(frameContent, frameHtmlOptions)
    
    return new Response(frameHTML, 
        {
            status: 200,
            headers: { 
                'Content-Type': 'text/html; charset=utf-8' 
            },
        }
    );
};

export const config = {
    path: "/"
};
