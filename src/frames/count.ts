import { getFramer, setFramer } from '../data/framer.js';
import { getCount, incrementCount } from '../data/count.js';
import { FrameActionDataParsed } from 'frames.js';
const html = String.raw;

export default {
    name: 'count',
    render: async (frameData: FrameActionDataParsed) => {
        const count = await getCount();
        const state = frameData.state ? JSON.parse(frameData.state) : {};
        const theme = state.theme ? state.theme : 'black';
        const bg = theme;
        const fg = bg == 'black' ? 'white' : 'black';
        const { username, taunt } = await getFramer() || {};
        return {
            image:  html`
                    <div style="
                        font-family: 'Redaction';
                        display: flex;
                        flex-direction: column;
                        width: 100vw;
                        height: 100vh;
                        color: ${fg};
                        background: ${bg};
                        align-items: center;
                        justify-content: center;
                        line-height: 1;
                    ">
                        <div style="display: flex; gap: 1rem; font-size: 5em; margin-top: 0.5em">
                            i've been framed <span style="font-family:'Redaction-100'">${count || 0}</span> times
                        </div>
                        <div style="font-size: 2em; margin-top: 1em">
                            ${ taunt ? `"${taunt}" -` : 'last framed by'} ${ username ? `@${username}` : 'unknown'}
                        </div>
                        <div style="align-items: center; display: flex; margin-top: 1em; gap: 0.5rem; flex-direction: column; font-size: 1.5em;">
                            <div>Count, username and taunt are stored via Netlify blobs.</div>
                            <div>Theme (${theme}) is stored via frame state.</div>
                        </div>
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
                {
                    action: 'post',
                    label: `${theme === 'black' ? `🏴` : `🏳️` } Invert`
                },
            ]
        } 
    },
    handleInteraction: async (frameData: FrameActionDataParsed) => {
        switch (frameData.buttonIndex) {
            case 1:
                return {
                    frame: 'poster'
                };
            case 2:
                await incrementCount();
                await setFramer(frameData.requesterFid, frameData.inputText);
                return {
                    frame: 'count'
                };
            case 3: { 
                const currState = frameData.state ? JSON.parse(frameData.state) : {};
                const currTheme = currState.theme ? currState.theme : 'black';
                const newState = {
                    frame: 'count',
                    theme: currTheme == 'black' ? 'white' : 'black',
                }
                return newState;
            }
        }
    },
}