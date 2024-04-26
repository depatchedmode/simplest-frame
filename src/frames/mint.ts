import { FrameActionDataParsed } from 'frames.js';
import { getTokenUrl } from 'frames.js';
import { zora } from 'viem/chains';

export default {
    name: 'mint',
    render: async () => {
        return {
            image: 'images/poster-animated.gif',
            buttons: [
                {
                    action: 'post',
                    label: '⬅ Back'
                },
                {
                    action: 'mint',
                    label: 'Mint',
                    target: getTokenUrl({
                        address: '0xc6d4848c9f01d649dfba170c65a964940a93dca5',
                        chain: zora,
                        tokenId: '1',
                    })
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
                return {
                    frame: 'mint'
                };
        }
    },
}