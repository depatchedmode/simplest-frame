import { FrameActionDataParsed } from "frames.js";
const html = String.raw;

export default {
    name: 'credits',
    render: () => html`
        <frame-image src="/images/credits.png" />
        <frame-button>
            ⬅️ Back
        </frame-button>
        <frame-button action="link" target="https://github.com/depatchedmode/simplest-frame">
            {😺} View on Github
        </frame-button>
    `,
    handleInteraction: (message: FrameActionDataParsed) => {
        if (message.buttonIndex == 1) {
            return `count`
        }
    },
};
