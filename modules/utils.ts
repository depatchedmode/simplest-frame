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

const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? `${prefix}[${k}]` : k;
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            Object.assign(acc, flattenObject(obj[k], pre));
        } else {
            acc[pre] = obj[k];
        }
        return acc;
    }, {});
}

const objectToURLSearchParams = (obj) => {
    const flattened = flattenObject(obj);
    const params = new URLSearchParams();
    for (const key in flattened) {
        params.append(key, flattened[key]);
    }
    return params;
}

const URLSearchParamsToObject = (searchParams) => {
    const obj = {};
    
    for (const [key, value] of searchParams.entries()) {
        // eslint-disable-next-line no-useless-escape
        const keys = key.split(/[\[\]]/g).filter(k => k);
        let currentObj = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!currentObj[k]) {
                currentObj[k] = isNaN(parseInt(keys[i + 1])) ? {} : [];
            }
            currentObj = currentObj[k];
        }

        const lastKey = keys[keys.length - 1];
        if (Array.isArray(currentObj)) {
            if (isNaN(lastKey)) {
                currentObj.push(value);
            } else {
                currentObj[lastKey] = value;
            }
        } else {
            currentObj[lastKey] = value;
        }
    }
    
    return obj;
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
    objectToURLSearchParams,
    URLSearchParamsToObject,
    loadFont
}
