import { getStore } from '@netlify/blobs';
import { streamToString } from '../../modules/utils';

const wieldKey = process.env.WIELD_API_KEY;
const wieldAPIBase = 'https://protocol.wield.co/farcaster/v2';

const getFramer = async() => {
    const store = getStore('gameState');
    const framerId = await store.get('framer');

    const request = await fetch(`${wieldAPIBase}/user?fid=${framerId}`, {
        method: "GET",
        headers: { "API-KEY": wieldKey }
    });

    const body = await streamToString(request.body);
    const data = JSON.parse(body);
    const username = data.result.user.username;
    return username;
}

const setFramer = async(fid) => {
    const store = getStore('gameState');
    await store.set('framer', fid);
}

export {
    getFramer,
    setFramer
}