
export default {
    name: 'credits',
    render: () => { 
        return {
            image: `${process.env.URL}/images/credits.png`,
            buttons: [
                {
                    action: 'post',
                    label: '⬅️ Back'
                },
                {
                    action: 'link',
                    target: 'https://github.com/depatchedmode/simplest-frame',
                    label: '{😺} View on Github'
                }
            ]
        }
    }
};
