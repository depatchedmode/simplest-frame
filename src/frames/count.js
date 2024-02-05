import mainLayout from '../layouts/main';
import { getFramer, setFramer } from '../data/framer';
import { getCount, incrementCount } from '../data/count';
import safeDecode from '../../modules/safeDecode';

const build = async (payload) => {
    let count = await getCount();
    const validData = payload?.validData;
    
    if (payload.validData && payload.referringFrame == 'count') {
        count = await incrementCount(count);
        const tauntInput = validData.data.frameActionBody.inputText;
        await setFramer(validData.data.fid, tauntInput);
    }

    const { username, taunt } = await getFramer() || '';

    let tauntOutput;
    tauntOutput = taunt ? `
        <div style="font-size: 2em; line-height: 1.3; color: #cacaca; margin-top: 1em; padding: 0 2rem; text-align: center;">
            "${safeDecode(taunt)}"
        </div>
        ` : '';

    const html = String.raw;
    const frameHTML = html`
        <fc-frame>
            <div style="font-size: 5em;">
                i've been framed ${count || 0} times
            </div>
            <div style="font-size: 2em; margin-top: 1em">
                last framed by @${username || ''}
            </div>
            ${tauntOutput}
        </fc-frame>
    `;

    return mainLayout(payload, frameHTML);
}

export const inputs = [
    {
        type: 'text',
        content: 'Enter a taunt...',
    }
]

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
    name: 'stolen',
    build,
    buttons,
    inputs
};