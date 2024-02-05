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
        .then(async(response) => {
            const parsedResponse = await response.json();
            return parsedResponse.valid ? parsedResponse.message : false;
        })
        .catch(error => console.error('Error:', error));
}

export {
    validateMessage,
}
