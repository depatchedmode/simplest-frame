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
    const framer = await store.get('framer');
    return framer;
}

const incrementCount = async(currentCount, fid) => {
    const store = getStore('frameState');
    const newCount = currentCount+1;
    await store.set('count', newCount);
    await store.set('framer', fid);
}

export default async (req, context) => {
    
    const count = await getCount();
    const lastFramerFID = await getFramer() || '';
    const data = await parseRequest(req);

    if (data) {
        incrementCount(count, data.untrustedData.fid);
    }

    const host = process.env.URL;
    const imagePath = `${host}/og-image?count=${count}&fid=${lastFramerFID}`;
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
            <!-- Form for POST request -->
            <form action="/" method="post">
                <input type="submit" value="Frame me!" /> ${count}
            </form>
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
