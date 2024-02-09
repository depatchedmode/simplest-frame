import { getStore } from '@netlify/blobs';

// Utility functions to abstract the fetching and setting operations
const fetchData = async (key) => {
    const store = getStore('antiTheft');
    let data = await store.get(key, { type: 'json' } ) || [];
    if (!data.length) {
        data = process.env[key] ? JSON.parse(process.env[key]) : [];
    }
    return data;
};

const setData = async (key, data) => {
    const store = getStore('antiTheft');
    await store.setJSON(key, data);
    return data;
};

// Updated getters and setters using the utility functions
const getBoundAccounts = () => fetchData('BOUND_ACCOUNT_IDS');
const getBoundCasts = () => fetchData('BOUND_CAST_HASHES');
const setBoundAccounts = (accountIDs) => setData('BOUND_ACCOUNT_IDS', accountIDs);
const setBoundCasts = (castHashes) => setData('BOUND_CAST_HASHES', castHashes);

// Modified functions to use the updated getters and setters
const addToList = async (getter, setter, item) => {
    const list = await getter();
    if (!list.includes(item)) {
        list.push(item);
        await setter(list);
    }
};

const removeFromList = async (getter, setter, item) => {
    const list = await getter();
    const index = list.indexOf(item);
    if (index > -1) {
        list.splice(index, 1);
        await setter(list);
    }
};

// Wrapper functions for specific operations
const addBoundAccount = (accountId) => addToList(getBoundAccounts, setBoundAccounts, accountId);
const removeBoundAccount = (accountId) => removeFromList(getBoundAccounts, setBoundAccounts, accountId);
const addBoundCast = (castHash) => addToList(getBoundCasts, setBoundCasts, castHash);
const removeBoundCast = (castHash) => removeFromList(getBoundCasts, setBoundCasts, castHash);

// Frame is allowed if:
// 1. The castAuthorID is in boundAccounts.
// 2. The castHash is in boundCasts.
// 3. Both boundCasts & boundAccounts are empty.
const isFrameStolen = async (frameMessage) => {
    const { castId, requestURL } = frameMessage;
    if (!castId || !requestURL) {
        return false;
    }

    const { fid: castAuthorID, hash: castHash } = castId;
    const boundCasts = await getBoundCasts();
    const boundAccounts = await getBoundAccounts();

    const isAuthorAllowed = boundAccounts.includes(castAuthorID) || boundAccounts.length === 0;
    const isCastAllowed = boundCasts.includes(castHash) || boundCasts.length === 0;
    const isFirstParty = requestURL ? requestURL.indexOf(process.env.URL) > -1 : true;

    const isStolen = !isFirstParty || !isAuthorAllowed || !isCastAllowed;

    // record the theft
    if (isStolen) {
        const store = getStore('stolenFrames');
        const stolenFrame = await store.get(castHash, { type: 'json' }) || {
            castHash,
            castAuthorID,
            views: 0,
            firstView: new Date().toUTCString(),
        };
        stolenFrame.view++;
        stolenFrame.lastView = new Date().toUTCString();
        store.setJSON(castHash, stolenFrame);
    }

    return isStolen;
};

export {
    getBoundAccounts,
    setBoundAccounts,
    addBoundAccount,
    removeBoundAccount,
    getBoundCasts,
    setBoundCasts,
    addBoundCast,
    removeBoundCast,
    isFrameStolen
};
