import mainLayout from '../layouts/main';
import { getFramer, setFramer } from '../data/framer';
import { getCount, incrementCount } from '../data/count';

const build = async (frameData) => {
    const { payload } = frameData;
    const count = await getCount();
    const lastFramerUsername = await getFramer() || '';

    if (payload) {
        incrementCount(count);
        setFramer(payload.untrustedData.fid);
    }

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