import { FrameActionDataParsed } from "frames.js";

export default {
    name: 'poster',
    render: () => {
        return {
            image: `${process.env.URL}/images/poster-animated.gif`,
            buttons: [
                {
                    action: 'post',
                    label: '🔳 State Demo'
                },
                {
                    action: 'post',
                    label: '🔳 Mint Demo'
                },
                {
                    action: 'link',
                    target: 'https://github.com/depatchedmode/simplest-frame',
                    label: 'Github'
                }
            ]
        }
    },
    handleInteraction: (msg: FrameActionDataParsed) => {
        if (msg.buttonIndex == 1) {
            return `count`
        } else if (msg.buttonIndex == 2) {
            return `mint`
        }
    },
};
