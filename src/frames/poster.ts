import { FrameActionDataParsed } from "frames.js";

export default {
    name: 'poster',
    render: () => {
        return {
            image: 'images/poster-animated.gif',
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
    handleInteraction: (frameData: FrameActionDataParsed) => {
        switch (frameData.buttonIndex) {
            case 1: 
                return {
                    frame: 'count',
                };
            case 2:
                return {
                    frame: 'transaction'
                };
            case 3:
                return {
                    frame: 'mint',
                };
        }
    },
};
