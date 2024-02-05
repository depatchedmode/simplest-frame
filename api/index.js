import landingPage from '../src/landing-page';
import frames from '../src/frames';
import { parseRequest, objectToURLSearchParams } from '../modules/utils';
import buildButtons from '../modules/buildButtons';
import buildInputs from '../modules/buildInputs';
import getTargetFrame from '../modules/getTargetFrame';
import { validateMessage } from '../src/data/message';
import { isFrameStolen } from '../src/data/antitheft';

export default async (req, context) => {
    try {
        const requestURL = new URL(req.url);
        const payload = await parseRequest(req);
        let from = requestURL.searchParams.get('frame');
        let buttonId = null;
        let frameIsStolen = false;

        if (payload) {
            payload.referringFrame = from;
            payload.validData = await validateMessage(payload.trustedData.messageBytes);
        }

        if (payload?.validData) {
            buttonId = payload.validData.data.frameActionBody.buttonIndex;
            frameIsStolen = await isFrameStolen(payload);
        }

        const { targetFrameSrc, targetFrameName, redirectUrl } = getTargetFrame(from, buttonId, frames);

        if (redirectUrl) {
            return await respondWithRedirect(redirectUrl);
        } else if (frameIsStolen) {
            return await respondWithFrame('stolen', frames['stolen'], payload);
        }   else if (targetFrameSrc) {
            return await respondWithFrame(targetFrameName, targetFrameSrc, payload);
        } else {
            console.error(`Unknown frame requested: ${targetFrameName}`);
        }
    } catch (error) {
        console.error(`Error processing request: ${error}`);
    }
};

const respondWithRedirect = (redirectUrl) => {
    const internalRedirectUrl = new URL(`${process.env.URL}/redirect`) 
    internalRedirectUrl.searchParams.set('redirectUrl',redirectUrl);
    return new Response('<div>redirect</div>', 
        {
            status: 302,
            headers: { 
                'Location': internalRedirectUrl,
            },
        }
    );
}

const respondWithFrame = async (targetFrameName, targetFrameSrc, payload) => {
    const searchParams = {
        targetFrameName,
        payload
    }
    const host = process.env.URL;
    const frameContent = {
        image: targetFrameSrc.image ? 
            `${host}/${targetFrameSrc.image}` : 
            `${host}/og-image?${objectToURLSearchParams(searchParams)}` || '',
        buttons: targetFrameSrc.buttons ? buildButtons(targetFrameSrc.buttons) : '',
        inputs: targetFrameSrc.inputs ? buildInputs(targetFrameSrc.inputs) : '',
        postURL: `${host}/?frame=${targetFrameName}`
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
