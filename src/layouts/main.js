import fonts from '../fonts';

export default (frameData, frameHTML) => {
    const fontFile = fonts[0].file; // TODO: eventually we'll have more than one font
    const fontName = fonts[0].name;
    const html = String.raw;
    const markup = html`
        <html>
        <head>
            <style>
                @font-face {
                    font-family: "${fontName}";
                    src:
                        local("${fontName}"),
                        url("/fonts/${fontFile}") format("woff2");
                }
                body {
                    margin: 0;
                    padding: 0;
                    font-family: "${fontName}";
                    background: black;
                }
                fc-frame {
                    display: flex;
                    flex-direction: column;
                    width: 100vw;
                    height: 100vh;
                    color: white;
                    background: black;
                    align-items: center;
                    justify-content: center;
                    line-height: 1;
                    border: 2em solid #232323;
                }
            </style>
        </head>
        <body>
            ${frameHTML}
        </body>
    </html>
    `
    
    return markup;
}