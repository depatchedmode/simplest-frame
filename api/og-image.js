import { join } from 'path';
import { promises as fs } from 'fs';
import satori from "satori";
import sharp from "sharp";
import { html } from "satori-html";

export default async (req, context) => {
    const inboundUrl = new URL(req.url);
    const host = process.env.URL;
    const frameUrl = `${host}/frame?${inboundUrl.searchParams}`;

    const htmlResponse = await fetch(frameUrl);
    const markup = await htmlResponse.text();

    const font = {
        path: '/public/fonts/Redaction-Regular.otf',
        cssName: 'Redaction'
    };
    // Determine the path to the font file relative to the current file
    const fontPath = join(process.cwd(), '', font.path);
    
    // Read the font file from disk
    const fontData = await fs.readFile(fontPath);

    const svg = await satori(
    html(markup), 
    {
        width: 1200,
        height: 630,
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
