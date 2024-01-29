import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";

export default async (req, context) => {
    const url = new URL(req.url);
    const count = url.searchParams.get('count') || 0;

    const host = process.env.URL;
    const htmlResponse = await fetch(`${host}/frame?count=${count}`);
    const markup = await htmlResponse.text();

    const font = {
        fileName: 'Redaction-Regular.otf',
        cssName: 'Redaction'
    };
    const fontResponse = await fetch(`${host}/fonts/${font.fileName}`);
    const fontData = await fontResponse.arrayBuffer();

    const svg = await satori(
    html(markup), 
    {
        width: 1200,
        height: 800,
        fonts: [
            {
                name: font.cssName,
                data: fontData,
                weight: 400,
                style: "normal",
            },
        ],
    });
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
