import mainLayout from '../layouts/main';
import { getFramer, setFramer } from '../data/framer';
import { getCount, incrementCount } from '../data/count';
import safeDecode from '../../modules/safeDecode';

const build = async (frameData) => {
    const { payload } = frameData;
    let count = await getCount();
    const validData = payload?.validData;
    const isValid = validData?.valid;
    
    if (payload && isValid && payload.referringFrame == 'count') {
        count = await incrementCount(count);
        const tauntInput = validData.message.data.frameActionBody.inputText;
        await setFramer(validData.message.data.fid, tauntInput);
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

    return mainLayout(frameData, frameHTML);
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
    build,
    buttons,
    inputs
};