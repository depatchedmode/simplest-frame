export default {
    name: 'credits',
    image: `/images/credits.png`,
    buttons: [
        { 
            label: '⬅️ Back',
            goTo: 'count',
        },
        {
            label: '{😺} View on Github',
            action: 'link',
            target: 'https://github.com/depatchedmode/simplest-frame'
        }
    ]
};