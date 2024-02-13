import { FrameActionDataParsed, getFrameMessage } from 'frames.js';
import { parseRequest } from '../modules/utils.js';
import processFrameRequest from '../modules/processFrameRequest.js';

export default async (req) => {
    try {
        const requestURL = new URL(req.url);
        const payload = await parseRequest(req);
        const frameMessage = payload ? await getFrameMessage(payload, {
            hubHttpUrl: process.env.FARCASTER_HUB
        }) : {} as FrameActionDataParsed;

        const frameContext = {
            searchParams: requestURL.searchParams,
            requestURL: payload?.untrustedData.url,
        }
        
        return await processFrameRequest(frameContext, frameMessage);
    } catch (error) {
        console.error(`Error processing request: ${error}`);
    }
};

export const config = {
    path: "/"
};
