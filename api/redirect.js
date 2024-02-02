// GET /redirect
// Redirects to an external URL based on buttonIndex parameter. Used to work
// around the same origin policy  on frames, which is being removed soon.
export default async (req, context) => {
    const requestUrl = new URL(req.url);
    const redirectUrl = requestUrl.searchParams.get('redirectUrl');
    
    return new Response('<div>redirect</div>', 
        {
            status: 302,
            headers: { 
                'Location': redirectUrl,
            },
        }
    );
}

export const config = {
    path: "/redirect"
};