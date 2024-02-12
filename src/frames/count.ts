import { getFramer, setFramer } from '../data/framer.js';
import { getCount, incrementCount } from '../data/count.js';
import { FrameActionDataParsed } from 'frames.js';
const html = String.raw;

export default {
    name: 'count',
    logic: async (frameMessage: FrameActionDataParsed) => {
        switch (frameMessage.buttonIndex) {
            case 2:
                return `credits`;
            default: 
                await incrementCount();
                await setFramer(frameMessage.requesterFid, frameMessage.inputText);
                return `count`;
        }
    },
    content: async () => {
        const count = await getCount();
        const { username, taunt } = await getFramer() || {};
        return html`
            <frame-image layout="main">
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
                </div>
            </frame-image>
            <frame-input text="text" />
            <frame-button>
                🫵 Frame me!
            </frame-button>
            <frame-button>
                🎬 View credits
            </frame-button>
        `;
    },
}