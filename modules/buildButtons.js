export default (buttons) => {
    return buttons
        .map((button, index) => `<meta property="fc:frame:button:${index + 1}" content="${button.label}" />`)
        .join('\n');
}