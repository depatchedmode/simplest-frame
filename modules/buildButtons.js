export default (buttons) => {
    return buttons
        .map((button, index) => {
            let buttonMarkup = `<meta property="fc:frame:button:${index + 1}" content="${button.label}" />`;
            if (button.url) {
                buttonMarkup += `\n<meta property="fc:frame:button:${index + 1}:action" content="post_redirect" />`
            }
            return buttonMarkup;
        })
        .join('\n');
}