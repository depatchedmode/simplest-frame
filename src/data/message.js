const validateMessage = async(messageBytes) => {
    if (!process.env.FARCASTER_HUB) throw new Error("FARCASTER_HUB is not set");
    if (!messageBytes) throw new Error("No data provided");

    return await fetch(`${process.env.FARCASTER_HUB}/v1/validateMessage`,{
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream"
        },
        body: Buffer.from(messageBytes, 'hex'),
    })
        .then(response => response.json() )
        .catch(error => console.error('Error:', error));
}

export {
    validateMessage,
}
