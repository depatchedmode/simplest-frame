import { streamToString } from '../../modules/utils.js';

const getCast = async(castHash) => {
    const request = await fetch(`https://protocol.wield.co/farcaster/v2/cast?hash=${castHash}`, {
        method: "GET",
        headers: { "API-KEY": process.env.WIELD_API_KEY }
    });

    const body = await streamToString(request.body);
    const data = JSON.parse(body);
    return data.result.cast;
}

export {
    getCast,
}