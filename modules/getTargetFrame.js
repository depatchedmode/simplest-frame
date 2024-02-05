const DEFAULT_FRAME = 'poster';

export default (name, buttonId, frames) => {
    let targetFrameName = DEFAULT_FRAME;
    let redirectUrl = null;
    if (name && buttonId) {
        const originFrame = frames[name];
        const button = originFrame.buttons[buttonId-1];
        targetFrameName = button.goTo;
        redirectUrl = button.url;
    }
    const targetFrameSrc = frames[targetFrameName];
    return {
        targetFrameSrc,
        targetFrameName,
        redirectUrl
    };
}