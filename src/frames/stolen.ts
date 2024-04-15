const html = String.raw;

export default {
    name: 'poster',
    render: () => html`
        <frame-image src="/images/poster-animated.gif" />
        <frame-button>
            🔳 Try Demo
        </frame-button>
        <frame-button action="link" target="${process.env.STOLEN_REDIRECT_URL}">
            👩‍🎤 View original cast
        </frame-button>
    `,
    handleInteraction: () => null,
};
