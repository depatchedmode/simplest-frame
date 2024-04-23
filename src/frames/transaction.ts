import { FrameActionDataParsed } from 'frames.js';
const html = String.raw;

export default {
    name: 'transaction',
    render: async () => {
        return {
            image: html`
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
                gap: 1rem;
            ">
                <div style="font-size: 5em;">
                   Count Onchain
                </div>
                <div style="font-size: 2em;">
                   Visit the contract to see the current count
                </div>
            </div>`,
            buttons: [
                {
                    action: 'post',
                    label: '⬅ Back'
                },
                {
                    action: 'tx',
                    target: `${process.env.URL}/txdata`,
                    label: '⬆ Higher'
                },
                {
                    action: 'link',
                    target: 'https://basescan.org/address/0x8ca328f83387519eb8b18ea23fc01bbe92de2adc',
                    label: 'View Contract'
                }
            ]
        } 
    },
    handleInteraction: async (msg: FrameActionDataParsed) => {
        switch (msg.buttonIndex) {
            case 1:
                return `poster`;
            case 2:
                return `transaction`;
        }
    },
}