import { getFramer, setFramer } from '../data/framer.js';
import { getCount, incrementCount } from '../data/count.js';
import { FrameActionDataParsed } from 'frames.js';
const html = String.raw;

export default {
    name: 'count',
    render: async () => {
        const count = await getCount();
        const { username, taunt } = await getFramer() || {};
        return {
            imageMarkup:  html`
                    <div style="
                        font-family: 'Redaction';
                        display: flex;
                        flex-direction: column;
                        width: 100vw;
                        height: 100vh;
                        color: white;
                        background: black;
                        align-items: center;
                        justify-content: center;
                        line-height: 1;
                    ">
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
                    </div>`,
            inputText: 'taunt',
            buttons: [
                {
                    action: 'post',
                    label: '⬅ Back'
                },
                {
                    action: 'post',
                    label: '🫵 Frame me!'
                },
            ]
        } 
    },
    handleInteraction: async (msg: FrameActionDataParsed) => {
        switch (msg.buttonIndex) {
            case 1:
                return `poster`;
            case 2:
                await incrementCount();
                await setFramer(msg.requesterFid, msg.inputText);
                return `count`;
        }
    },
}