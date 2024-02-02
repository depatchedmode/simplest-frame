import { getStore } from '@netlify/blobs';
import { getUsername } from './username';

const getFramer = async() => {
    const store = getStore('gameState');
    const framerId = await store.get('framer');
    const username = await getUsername(framerId);
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