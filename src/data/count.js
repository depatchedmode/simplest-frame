import { getStore } from '@netlify/blobs';

const getCount = async() => {
    const store = getStore('frameState');
    let rawCount = await store.get('count');
    let count = parseInt(rawCount);
    if (Number.isNaN(count)) count = 0;
    return count;
}

const incrementCount = async(currentCount) => {
    console.log("count", currentCount);
    const store = getStore('frameState');
    const newCount = currentCount+1;
    await store.set('count', newCount);
}

export {
    getCount,
    incrementCount
}