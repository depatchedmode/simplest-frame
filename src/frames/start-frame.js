import mainLayout from './main-layout';
import { getFramer, setFramer } from '../data/framer';
import { getCount, incrementCount } from '../data/count';

const html = String.raw;

const build = async (frameData) => {
    const { request } = frameData;
    const count = await getCount();
    const lastFramerUsername = await getFramer() || '';

    if (request) {
        incrementCount(count);
        setFramer(request.untrustedData.fid);
    }

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

export const buttons = html`
    <meta property="fc:frame:button:1" content="Frame me!" />
`;

export default {
    build,
    buttons
};