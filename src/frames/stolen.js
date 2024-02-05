export default {
    name: 'stolen',
    image: `/images/stolen.png`,
    buttons: [
        {
            label: '👩‍🎤 View original cast',
            url: `${process.env.STOLEN_REDIRECT_URL}`
        }
    ]
};