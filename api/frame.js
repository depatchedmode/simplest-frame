import { frames } from "../src/frames";
import { URLSearchParamsToObject } from '../src/modules/utils';

export default async (req, context) => {
    const url = new URL(req.url);
    const frameData = URLSearchParamsToObject(url.searchParams);
    const frame = frames[frameData.targetFrame];
    const markup = await frame.build(frameData);

    return new Response(markup,
        {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        }
    );
}

export const config = {
    path: "/frame"
};
