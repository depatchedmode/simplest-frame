import frames from "../src/frames";
import { URLSearchParamsToObject } from '../modules/utils';

export default async (req, context) => {
    const url = new URL(req.url);
    const params = URLSearchParamsToObject(url.searchParams);
    const targetFrameSrc = frames[params.targetFrameName];

    if (targetFrameSrc.image) {
        const image = `${process.env.URL}${targetFrameSrc.image}`
        return new Response(image,
            {
                status: 200,
                headers: { 'Content-Type': 'image/png' },
            }
        );
    } else if (targetFrameSrc.build) {
        const markup = await targetFrameSrc.build(params);
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
