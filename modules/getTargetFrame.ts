const DEFAULT_FRAME = 'poster';
import frames from '../src/frames/index.js';
import { isFrameStolen } from './antitheft.js';

export default async (frameMessage) => {
    const frameIsStolen = await isFrameStolen(frameMessage);
    let targetFrameName = DEFAULT_FRAME;
    let redirectURL = null;
    console.log('getTargetFrame:frameIsStolen', frameIsStolen);
    if (frameIsStolen) {
        targetFrameName = 'stolen';
    } else if (frameMessage.buttonIndex) {
        const originFrame = frames[frameMessage.from];
        const button = originFrame.buttons[frameMessage.buttonIndex-1];
        targetFrameName = button.goTo;
        redirectURL = button.url;
    } 
    
    return {
        targetFrame: frames[targetFrameName],
        redirectURL
    }
}