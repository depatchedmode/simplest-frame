import mainLayout from '../layouts/main.js';
import { getFramer, setFramer } from '../data/framer.js';
import { getCount, incrementCount } from '../data/count.js';

const build = async (frameMessage) => {
    let count = await getCount();
    
    if (frameMessage.from == 'count') {
        count = await incrementCount(count);
        const tauntInput = frameMessage.inputText;
        await setFramer(frameMessage.requesterFid, tauntInput);
    }

    const { username, taunt } = await getFramer() || {};

    const tauntOutput = taunt ? `
        <div style="font-size: 2em; line-height: 1.3; color: #cacaca; margin-top: 1em; padding: 0 2rem; text-align: center;">
            "${taunt}"
        </div>
        ` : '';

    const html = String.raw;
    const frameHTML = html`
        <fc-frame>
            <div style="display: flex; gap: 1rem; font-size: 5em;">
                i've been framed <span style="font-family:'Redaction-100'">${count || 0}</span> times
            </div>
            <div style="font-size: 2em; margin-top: 1em">
                last framed by @${username || ''}
            </div>
            ${tauntOutput}
        </fc-frame>
    `;

    return mainLayout(frameMessage, frameHTML);
}

export const inputText = "Enter a taunt...";

export const buttons = [
    { 
        label: '🫵 Frame me!',
        goTo: 'count',
    },
    { 
        label: '🎬 View credits',
        goTo: 'credits',
    }
]

export default {
    name: 'count',
    build,
    buttons,
    inputText
};