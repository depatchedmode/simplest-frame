import frames from "../src/frames";
import { URLSearchParamsToObject } from '../modules/utils';

export default async (req, context) => {
    const url = new URL(req.url);
    const frameData = URLSearchParamsToObject(url.searchParams);
    const frameSrc = frames[frameData.name];

    if (frameSrc.image) {
        const image = `${process.env.URL}${frameSrc.image}`
        return new Response(image,
            {
                status: 200,
                headers: { 'Content-Type': 'image/png' },
            }
        );
    } else if (frameSrc.build) {
        const markup = await frameSrc.build(frameData);
        return new Response(markup,
            {
                status: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
            }
        );
    }
}

export const config = {
    path: "/frame"
};
