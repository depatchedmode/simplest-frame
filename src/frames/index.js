import start from "./start-frame";

const frames = {
    start,
}

const checkFrame = (name) => {
    if (frames[name]) {
        return name;
    } else {
        console.error(`No frame found called ${name}`);
        return '';
    }
}

const decideNextFrame = (frameData) => {
    const { request } = frameData;
    const { trustedData, untrustedData } = request;
    
    if (untrustedData.buttonIndex == 1) {
        return checkFrame('start');
    } else {
        return null;
    }
}

export {
    frames,
    decideNextFrame
}