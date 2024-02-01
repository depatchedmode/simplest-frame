const DEFAULT_FRAME = 'poster';

export default (name, buttonId, frames) => {
    let frameName = DEFAULT_FRAME;
    if (name && buttonId) {
        const originFrame = frames[name];
        frameName = originFrame.buttons[buttonId-1].goTo;
    }
    const frameSrc = frames[frameName];
    return {
        frameSrc,
        frameName
    };
}