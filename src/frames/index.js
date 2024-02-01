import poster from "./poster-frame";
import start from "./start-frame";
import checkFrame from "../modules/checkFrame";

const frames = {
    start,
    poster,
}

const decideNextFrame = (frameData) => {
    const { request } = frameData;
    
    if (request?.untrustedData.buttonIndex == 1) {
        return checkFrame('start', frames);
    } else {
        return checkFrame('poster', frames);
    }
}

export {
    frames,
    decideNextFrame
}