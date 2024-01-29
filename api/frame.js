export default async (req, context) => {
    const url = new URL(req.url);
    const count = url.searchParams.get('count') || 0;

    const font = {
        file: 'Redaction-Regular.woff2',
        name: 'Redaction'
    };

    const html = `
        <html>
        <head>
        <style>
            @font-face {
                font-family: "${font.name}";
                src:
                    local("Trickster"),
                    url("/fonts/${font.file}") format("woff2");
                }
            body {
                margin: 0;
                padding: 0;
            }
            fc-frame {
                font-family: "${font.name}";
                display: flex;
                width: 100vw;
                height: 100vh;
                color: white;
                background: black;
                align-items: center;
                justify-content: center;
                font-size: 5em;
                line-height: 1;
            }
        </style>
        </head>
        <body>
        <fc-frame>
            i've been framed ${count} times
        </fc-frame>
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
    path: "/frame"
};
