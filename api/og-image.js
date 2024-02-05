import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import fonts from "../src/fonts";
import frames from "../src/frames";
import { URLSearchParamsToObject } from '../modules/utils';

export default async (req, context) => {
    const url = new URL(req.url);
    const params = URLSearchParamsToObject(url.searchParams);
    const targetFrameSrc = frames[params.targetFrameName];
    const markup = await targetFrameSrc.build(params.payload);

    const svg = await satori(
        html(markup), 
        {
            width: 1200,
            height: 630,
            fonts
        }
    );
    const svgBuffer = Buffer.from(svg);
    const png = sharp(svgBuffer).png();
    const response = await png.toBuffer();

    return new Response(response,
        {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000'
            }
        }
    );
}

export const config = {
    path: "/og-image"
};
