import { frames } from "../src/frames";
import { URLSearchParamsToObject } from '../src/modules/utils';

export default async (req, context) => {
    const url = new URL(req.url);
    const frameData = URLSearchParamsToObject(url.searchParams);
    const buildFrame = frames[frameData.targetFrame];
    const frame = await buildFrame(frameData);

    return new Response(frame.markup, 
        {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        }
    );
}

export const config = {
    path: "/frame"
};
