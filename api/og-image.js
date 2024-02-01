import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";
import fonts from "../src/fonts";

export default async (req, context) => {
    const inboundUrl = new URL(req.url);
    const host = process.env.URL;

    const frameUrl = `${host}/frame?${inboundUrl.searchParams}`;
    const htmlResponse = await fetch(frameUrl);
    const markup = await htmlResponse.text();

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
            headers: { 'Content-Type': 'image/png' }
        }
    );
}

export const config = {
    path: "/og-image"
};
