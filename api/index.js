import { getFrameMessage } from "frames.js"
import landingPage from '../src/landing-page';
import { parseRequest, objectToURLSearchParams } from '../modules/utils';
import buildButtons from '../modules/buildButtons';
import buildInputs from '../modules/buildInputs';
import getTargetFrame from '../modules/getTargetFrame';

export default async (req, context) => {
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
                'Location': internalRedirectURL,
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
        image: targetFrame.image ? 
            `${host}/${targetFrame.image}` : 
            `${host}/og-image?${objectToURLSearchParams(searchParams)}` || '',
        buttons: targetFrame.buttons ? buildButtons(targetFrame.buttons) : '',
        inputs: targetFrame.inputs ? buildInputs(targetFrame.inputs) : '',
        postURL: `${host}/?frame=${targetFrame.name}`
    };
    
    return new Response(await landingPage(frameContent), 
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
