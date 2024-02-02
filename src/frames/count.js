import mainLayout from '../layouts/main';
import { getFramer, setFramer } from '../data/framer';
import { getCount, incrementCount } from '../data/count';

const build = async (frameData) => {
    const { payload } = frameData;
    let count = await getCount();
    const validData = payload?.validData;
    const isValid = validData?.valid;

    if (payload && isValid) {
        count = await incrementCount(count);
        setFramer(validData.message.data.fid);
    }
    const lastFramerUsername = await getFramer() || '';

    const html = String.raw;
    const frameHTML = html`
        <fc-frame>
            <div style="font-size: 5em;">
                i've been framed ${count || 0} times
            </div>
            <div style="font-size: 2em; margin-top: 1em">
                last framed by @${lastFramerUsername || ''}
            </div>
        </fc-frame>
    `;

    return mainLayout(frameData, frameHTML);
}

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
    buttons
};