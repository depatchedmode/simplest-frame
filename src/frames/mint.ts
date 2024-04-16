import { FrameActionDataParsed } from 'frames.js';
import { getTokenUrl } from 'frames.js';
import { zora } from 'viem/chains';

export default {
    name: 'mint',
    render: async () => {
        return {
            image: `${process.env.URL}/images/poster-animated.gif`,
            buttons: [
                {
                    action: 'post',
                    label: '⬅️ Back'
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
                {
                    action: 'post',
                    label: '🎬 View credits'
                }
            ]
        } 
    },
    handleInteraction: async (msg: FrameActionDataParsed) => {
        switch (msg.buttonIndex) {
            case 1:
                return `poster`;
            case 3:
                return `credits`;
        }
    },
}