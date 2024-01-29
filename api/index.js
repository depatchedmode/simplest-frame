import { getStore } from "@netlify/blobs";
import { URLSearchParams } from 'url';

export default async (req, context) => {
    const store = getStore('frameState');
    let rawCount = await store.get('count');
    let count = parseInt(rawCount);
    if (Number.isNaN(count)) count = 0;

    if (req.method === 'POST') {
        let data;
        if (req.headers['content-type'] === 'application/json') {
            // Parse JSON body
            data = JSON.parse(req.body);
        } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            // Parse URL-encoded body
            data = Object.fromEntries(new URLSearchParams(req.body));
        }
        console.debug(data);
        const newCount = count+1;
        await store.set('count', newCount);
    }

    const host = process.env.URL;
    const imagePath = `${host}/og-image?count=${count}`;

    const html = `
        <!doctype html>
        <html>
        <head>
            <style>
                figure {
                    display: inline-block;
                    margin: 0;
                    max-width: 100%;
                }
                img {
                    max-width: 100%;
                    border: 4px inset black;
                }
            </style>
            <meta property="og:image" content="${imagePath}" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${imagePath}" />
            <meta property="fc:frame:button:1" content="Frame me!" />
            <title>Simplest Frame</title>
        </head>
        <body>
            <h1>The Simplest Frame</h1>
            <figure>
                <img width="600" src="${imagePath}" />
            </figure>
            <!-- Form for POST request -->
            <form action="/" method="post">
                <input type="submit" value="Frame me!" /> ${count}
            </form>
        </body>
        </html>
    `
    
    return new Response(html, 
        {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        }
    );
}

export const config = {
    path: "/"
};
