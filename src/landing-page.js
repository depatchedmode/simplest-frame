import { decideNextFrame } from './frames';
import fonts from './fonts';
import { objectToURLSearchParams } from './modules/utils';

export default async (frameData) => {
    const { request } = frameData;
    const host = process.env.URL;
    const debug = process.env.DEBUG_MODE;

    const posterImage = `${host}/images/poster.png`;
    let frameImage = posterImage;

    if (debug) console.debug(frameData);

    if (request) {
        frameData.targetFrame = decideNextFrame(frameData);
        const searchParams = objectToURLSearchParams(frameData);
        frameImage = `${host}/og-image?${searchParams}`
    } 

    const fontFile = fonts[0].file; // TODO: we'll have more than 1 font at some point
    const fontName = fonts[0].name;

    const html = String.raw;
    const markup = html`
        <!doctype html>
        <html>
        <head>
            <style>
                @font-face {
                    font-family: "${fontName}";
                    src:
                        local("${fontName}"),
                        url("/fonts/${fontFile}") format("woff2");
                }
                :root {
                    --background: white;
                    --text: black;
                }
                @media (prefers-color-scheme: dark) {
                    :root {
                        --background: black;
                        --text: white;
                    }
                }
                body {
                    padding: 2rem;
                    font-family: "${fontName}";
                    background: var(--background);
                    color: var(--text);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                figure {
                    display: inline-block;
                    margin: 0;
                    max-width: 100%;
                }
                img {
                    max-width: 100%;
                    border: 4px inset var(--text);
                }
                .buttons {
                    display: flex;
                }
                .buttons form {
                    flex-grow: 1;
                }
                input[type=submit] {
                    font-family: "${fontName}";
                    padding: 1rem;
                    display: block;
                }
            </style>
            <meta property="og:image" content="${posterImage}" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="${frameImage}" />
            <meta property="fc:frame:button:1" content="Begin" />
            <title>🔳 The Simplest Frame</title>
        </head>
        <body>
            <h1>🔳 The Simplest Frame</h1>
            <figure>
                <img width="600" src="${frameImage}" />
            </figure>
        </body>
        </html>
        `
    return markup;
}