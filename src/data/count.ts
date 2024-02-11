import { getStore } from '@netlify/blobs';

const getCount = async() => {
    const store = getStore('gameState');
    let rawCount = await store.get('count');
    let count = parseInt(rawCount);
    if (Number.isNaN(count)) count = 0;
    return count;
}

const incrementCount = async(currentCount) => {
    const store = getStore('gameState');
    const newCount = currentCount+1;
    await store.set('count', newCount);
    return newCount;
}

export {
    getCount,
    incrementCount
}