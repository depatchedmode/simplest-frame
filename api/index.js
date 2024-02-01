import landingPage from '../src/landing-page';
import { parseRequest } from '../src/modules/utils';
import { frames, decideNextFrame } from '../src/frames';
import { objectToURLSearchParams } from '../src/modules/utils';

export default async (req, context) => {
    const debug = process.env.DEBUG_MODE;
    const host = process.env.URL;
    const request = await parseRequest(req);

    const frameData = {
        name: '',
        server: {
            host,
            debug
        },
        request,
        context,
    }

    frameData.name = decideNextFrame(frameData);
    if (debug) console.debug(frameData);

    const frameSrc = frames[frameData.name];
    const frameContent = {
        image: ``,
        buttons: frameSrc.buttons,
    }

    if (frameSrc.image) {
        frameContent.image = `${host}/${frameSrc.image}`;
    } else if (frameSrc.build) {
        const searchParams = objectToURLSearchParams(frameData);
        frameContent.image = `${host}/og-image?${searchParams}`;
    } else {
        console.error(`Each frame requires an image path or a build function`)
    }

    if (debug) console.debug(frameContent);
    
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
