import { FrameActionDataParsed } from "frames.js";

export default {
    name: 'credits',
    image: `/images/credits.png`,
    onClick: (message: FrameActionDataParsed) => {
        if (message.buttonIndex == 1) {
            return `count`
        }
    },
    buttons: [
        { 
            label: '⬅️ Back',
        },
        {
            label: '{😺} View on Github',
            action: 'link',
            target: 'https://github.com/depatchedmode/simplest-frame'
        }
    ]
};