import landingPage from '../src/landing-page';
import frames from '../src/frames';
import { parseRequest, objectToURLSearchParams } from '../modules/utils';
import buildButtons from '../modules/buildButtons';
import getTargetFrame from '../modules/getTargetFrame';
import { validateMessage } from '../src/data/message';

export default async (req, context) => {
    let from = 'poster';
    let buttonId = null;
    const payload = await parseRequest(req);
    let isOriginal = true;

    if (payload) {
        const requestURL = new URL(req.url);
        from = requestURL.searchParams.get('frame');
        buttonId = payload.untrustedData?.buttonIndex;
        isOriginal = isOriginalCast(payload.untrustedData.castId.hash);
        payload.validData = await validateMessage(payload.trustedData.messageBytes);
    }

    let { frameSrc, frameName, redirectUrl } = getTargetFrame(from,buttonId,frames);
    if (!isOriginal) {
        frameName = 'stolen';
        frameSrc = frames[frameName];
    }

    if (redirectUrl) {
        return await respondWithRedirect(redirectUrl);
    } else if (frameSrc) {
        return await respondWithFrame(frameName, frameSrc, payload);
    } else {
        console.error(`🤷🏻`)
    }
}

const isOriginalCast = (currHash) => {
    const ogHash = process.env.BOUND_CAST_HASH;
    return ogHash ? currHash == ogHash : true;
}

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

const respondWithFrame = async (frameName, frameSrc, payload) => {
    const debug = process.env.DEBUG_MODE;
    const host = process.env.URL;

    const frameContent = {
        image: ``,
        buttons: buildButtons(frameSrc.buttons),
        postURL: `${host}?frame=${frameName}`
    }

    const frameData = {
        name: frameName,
        server: {
            host,
            debug
        },
        payload,
    }

    if (frameSrc.image) {
        frameContent.image = `${host}${frameSrc.image}`;
    } else if (frameSrc.build) {
        const searchParams = objectToURLSearchParams(frameData);
        frameContent.image = `${host}/og-image?${searchParams}`;
    } else {
        console.error(`Each frame requires an image path or a build function`)
    }
    
    return new Response(await landingPage(frameContent), 
        {
            status: 200,
            headers: { 
                'Content-Type': 'text/html; charset=utf-8' 
            },
        }
    );
}

export const config = {
    path: "/"
};
