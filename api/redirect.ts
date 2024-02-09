// GET /redirect
// Redirects to an external URL based on buttonIndex parameter. Used to work
// around the same origin policy  on frames, which is being removed soon.
export default async (req, context) => {
    const requestURL = new URL(req.url);
    const redirectURL = requestURL.searchParams.get('redirectURL');
    
    return new Response('<div>redirect</div>', 
        {
            status: 302,
            headers: { 
                'Location': redirectURL,
            },
        }
    );
}

export const config = {
    path: "/redirect"
};