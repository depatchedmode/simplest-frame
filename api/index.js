import landingPage from '../src/landing-page';
import { parseRequest } from '../src/modules/utils';

export default async (req, context) => {
    const request = await parseRequest(req);
    const frameData = {
        request
    }
    
    return new Response(await landingPage(frameData), 
        {
            status: 200,
            headers: { 
                'Content-Type': 'text/html; charset=utf-8' 
            },
        }
    );
}

export const config = {
    path: "/"
};
