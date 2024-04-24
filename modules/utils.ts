import fs from 'fs/promises';
import path from 'path';
import { URLSearchParams } from 'url';

const streamToString = async(stream) => {
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

    if (method === 'POST') {
        const body = await streamToString(req.body);
        
        if (contentType === 'application/json') {
            data = JSON.parse(body);
        } else if (contentType === 'application/x-www-form-urlencoded') {
            data = Object.fromEntries(new URLSearchParams(body));
        }
    }

    return data;
}

const loadFont = async (fileName) => {
    try {
        const filePath = path.join(__dirname, '../public', 'fonts', fileName);
        const fontData = await fs.readFile(filePath);
        return fontData;
    } catch (error) {
        console.error('Error reading font file:', error);
    }
}

export {
    streamToString,
    parseRequest,
    loadFont
}
