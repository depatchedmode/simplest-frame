import { FrameActionDataParsed } from "frames.js";

export default {
    name: 'poster',
    render: () => {
        return {
            image: `${process.env.URL}/images/poster-animated.gif`,
            buttons: [
                {
                    action: 'post',
                    label: '🔳 State'
                },
                {
                    action: 'post',
                    label: '🔳 Tx'
                },
                {
                    action: 'post',
                    label: '🔳 Mint'
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
        switch (msg.buttonIndex) {
            case 1:
                return `count`;
            case 2:
                return `transaction`;
            case 3:
                return `mint`;
        }
    },
};
