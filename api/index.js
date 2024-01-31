import { getStore } from "@netlify/blobs";

async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString('utf8');
}

const parseRequest = async(req) => {
    const contentType = req.headers.get('content-type');
    const method = req.method;
    let data;
    if (method === 'POST' && contentType === 'application/json') {
        const body = await streamToString(req.body);
        data = JSON.parse(body);
    }
    return data
}

const getCount = async() => {
    const store = getStore('frameState');
    let rawCount = await store.get('count');
    let count = parseInt(rawCount);
    if (Number.isNaN(count)) count = 0;
    return count;
}

const getFramer = async() => {
    const store = getStore('frameState');
    const framerId = await store.get('framer');
    const request = await fetch(`https://protocol.wield.co/farcaster/v2/user?fid=${framerId}`, {
        method: "GET",
        headers: { "API-KEY": process.env.WIELD_API_KEY }
      });
    const body = await streamToString(request.body);
    const data = JSON.parse(body);
    console.debug(data);
    const username = data.result.user.username;
    return username;
}

const incrementCount = async(currentCount, fid) => {
    const store = getStore('frameState');
    const newCount = currentCount+1;
    await store.set('count', newCount);
    await store.set('framer', fid);
}

export default async (req, context) => {
    
    const count = await getCount();
    const lastFramerUsername = await getFramer() || '';
    const data = await parseRequest(req);
    console.debug(lastFramerUsername);
    if (data) {
        incrementCount(count, data.untrustedData.fid);
    }

    const host = process.env.URL;
    const imagePath = `${host}/og-image?count=${count}&username=${lastFramerUsername}`;
    const html = String.raw;
    const markup = html`
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
        </body>
        </html>
    `
    
    return new Response(markup, 
        {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
        }
    );
}

export const config = {
    path: "/"
};
