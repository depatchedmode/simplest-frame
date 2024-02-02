const DEFAULT_FRAME = 'poster';

export default (name, buttonId, frames) => {
    let frameName = DEFAULT_FRAME;
    let redirectUrl = null;
    if (name && buttonId) {
        const originFrame = frames[name];
        const button = originFrame.buttons[buttonId-1];
        frameName = button.goTo;
        redirectUrl = button.url;
    }
    const frameSrc = frames[frameName];
    return {
        frameSrc,
        frameName,
        redirectUrl
    };
}