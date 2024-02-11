import { getStore } from '@netlify/blobs';
import { getUsername } from './username.js';
import sanitize from '../../modules/sanitize.js';

const getFramer = async() => {
    const store = getStore('gameState');
    const framerId = await store.get('framer');
    const username = await getUsername(framerId);
    const taunt = await store.get('taunt');
    return {
        username,
        taunt
    };
}

const setFramer = async(fid, taunt) => {
    const store = getStore('gameState');
    await store.set('framer', fid);
    await store.set('taunt', sanitize(taunt));
}

export {
    getFramer,
    setFramer
}