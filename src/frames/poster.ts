import { FrameActionDataParsed } from "frames.js";

export default {
    name: 'poster',
    render: () => {
        return {
            image: `${process.env.URL}/images/poster-animated.gif`,
            buttons: [
                {
                    action: 'post',
                    label: '🔳 Try Demo'
                },
                {
                    action: 'link',
                    target: 'https://github.com/depatchedmode/simplest-frame',
                    label: '{😺} View on Github'
                }
            ]
        }
    },
    handleInteraction: (message: FrameActionDataParsed) => {
        if (message.buttonIndex == 1) {
            return `count`
        }
    },
};
