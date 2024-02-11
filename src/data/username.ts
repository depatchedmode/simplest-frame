import { streamToString } from '../../modules/utils.js';

const getUsername = async(fid) => {
    const request = await fetch(`https://protocol.wield.co/farcaster/v2/user?fid=${fid}`, {
        method: "GET",
        headers: { "API-KEY": process.env.WIELD_API_KEY }
    });

    const body = await streamToString(request.body);
    const data = JSON.parse(body);
    return data.result.user.username;
}

export {
    getUsername,
}