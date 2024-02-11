import mainLayout from '../layouts/main.js';
import { getFramer, setFramer } from '../data/framer.js';
import { getCount, incrementCount } from '../data/count.js';
import { FrameActionDataParsed } from 'frames.js';

const onClick = async (frameMessage: FrameActionDataParsed) => {
    switch (frameMessage.buttonIndex) {
        case 2:
            return `credits`;
        default: 
            await incrementCount();
            await setFramer(frameMessage.requesterFid, frameMessage.inputText);
            return `count`;
    }
}

export const inputText = "Enter a taunt...";
export const buttons = [
    { 
        label: '🫵 Frame me!',
    },
    { 
        label: '🎬 View credits',
    }
];

const build = async (frameMessage: FrameActionDataParsed) => {
    const count = await getCount();
    const { username, taunt } = await getFramer() || {};
    const html = String.raw;
    const frameHTML = html`
        <fc-frame>
            <div style="display: flex; gap: 1rem; font-size: 5em;">
                i've been framed <span style="font-family:'Redaction-100'">${count || 0}</span> times
            </div>
            <div style="font-size: 2em; margin-top: 1em">
                last framed by @${username || ''}
            </div>
            ${ taunt ? `
                <div style="font-size: 2em; line-height: 1.3; color: #cacaca; margin-top: 1em; padding: 0 2rem; text-align: center;">
                    "${taunt}"
                </div>
            ` : '' }
        </fc-frame>
    `;

    return mainLayout(frameMessage, frameHTML);
}

export default {
    name: 'count',
    build,
    buttons,
    inputText,
    onClick
};