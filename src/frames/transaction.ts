import { FrameActionDataParsed } from 'frames.js';

export default {
    name: 'transaction',
    render: async (frameData: FrameActionDataParsed) => {
        const state = frameData.state ? JSON.parse(frameData.state) : {};
        const mintQuantity = state.mintQuantity ? state.mintQuantity : 1;
        return {
            image: 'https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fmagic.decentralized-content.com%2Fipfs%2Fbafybeiclasbp3c534mmsm75slbbhp26an3iifuk2u3zvjrifh2rgg4umpi&w=1920&q=75',
            buttons: [
                {
                    action: 'post',
                    label: '⬅ Back'
                },
                {
                    action: 'post',
                    label: '⬇'
                },
                {
                    action: 'tx',
                    target: `${process.env.URL}/txdata`,
                    label: `Mint ${mintQuantity}`
                },
                {
                    action: 'post',
                    label: '⬆'
                },
            ],
            inputText: 'Add a mint comment...',
        } 
    },
    handleInteraction: async (frameData: FrameActionDataParsed) => {
        const state = frameData.state ? JSON.parse(frameData.state) : {};
        const mintQuantity = state.mintQuantity ? parseInt(state.mintQuantity) : 1;
        switch (frameData.buttonIndex) {
            case 1: {
                return {
                    frame: 'poster'
                };
            }
            case 2: {
                return {
                    frame: 'transaction',
                    mintQuantity: Math.max(1,mintQuantity-1),
                };
            }
            case 3: {
                return {
                    frame: 'transaction',
                    mintQuantity
                };
            }
            case 4: {
                return {
                    frame: 'transaction',
                    mintQuantity: Math.min(256,mintQuantity+1),
                };
            }
        }
    },
}