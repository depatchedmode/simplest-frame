export default {
    name: 'stolen',
    render: () => { 
        return {
            image: 'images/stolen.png',
            buttons: [
                {
                    action: 'post',
                    label: '🔳 Try Demo'
                },
                {
                    action: 'link',
                    target: `${process.env.STOLEN_REDIRECT_URL}`,
                    label: '👩‍🎤 View original cast'
                }
            ]
        }
    },
    handleInteraction: () => null,
};
