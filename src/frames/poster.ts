import { FrameActionDataParsed } from "frames.js";

export default {
    name: 'poster',
    image: `/images/poster-animated.gif`,
    onClick: (message: FrameActionDataParsed) => {
        if (message.buttonIndex == 1) {
            return `count`
        }
    },
    buttons: [
        { 
            label: '🔳 Try Demo',
        },
        {
            label: '{😺} View on Github',
            action: 'link',
            target: 'https://github.com/depatchedmode/simplest-frame'
        }
    ]
};