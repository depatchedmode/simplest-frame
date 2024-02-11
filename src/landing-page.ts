export default async (frameContent) => {

    const html = String.raw;
    const markup = html`
        <!doctype html>
        <html>
        <head>
            <style>
                @font-face {
                    font-family: "Redaction";
                    src:
                        local("Redaction"),
                        url("/fonts/Redaction-Regular") format("woff2");
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
                    font-family: "Redaction";
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
            </style>
            
            <meta property="og:image" content="${frameContent.image}" />
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:post_url" content="${frameContent.postURL}" />
            <meta property="fc:frame:image" content="${frameContent.image}" />
            ${frameContent.buttons}
            ${frameContent.inputs}

            <title>🔳 The Simplest Frame</title>
        </head>
        <body>
            <h1>🔳 The Simplest Frame</h1>
            <figure>
                <img width="600" src="${frameContent.image}" />
            </figure>
        </body>
        </html>
        `
    return markup;
}