![poster-animated](https://github.com/depatchedmode/simplest-frame/assets/84613835/7dadc2cb-7410-4e8d-b8bb-6c314655e5fc)

## A zero-cost, zero-framework, dynamic Farcaster Frame template

This is the "simplest" version of a Frame that can do all of the things a Frame should be able to do. It may be more than you need. It may be less. But it's a great place to start, IMHO. And it is indebted to all the great work by the team over at https://framesjs.org

### My needs for starting this were:

1. **🚱 Zero Framework:** Didn't want a framework baked in, and most options default to Next.js/React. No offense, but those seem like overkill.
2. **🆓 Zero Cost:** Frames are for experiments! Experimenting is more fruitful when it's free.
3. **🧱 Stable:** The domain and its attached state should be reasonably stable over the horizon of an experiment. Replit can only give you this at cost (see above)
4. **🤸 Dynamic:** You can get all the above pretty easy with static files, but let's be real: we want dynamism or something! And, as social animals, we want to act and react.
5. **🤤 Small:** and hopefully easy. Nobody to impress here. If my quite smooth brain can write this, your quite prune-like brain can understand it to.
6. **😎 Cool Tech:** We want to be at the 🤬 edge here, people! I admit this is somewhat in tension with "simplest".

### Features

+ **⑃ Flow Definition**: Define button & input behaviour within each frame file.
+ **🎇 Static & Dynamic Images**: Support for both static & dynamic frame images.
+ **🧐 Validate trustedData**: Verify the current payload's `trustedData` via Farcaster Hubs (eg. wield.co), to protect against tomfoolery.
+ **⌨️ Text inputs**: Accept that UGC with byte-level protection. Our `safeDecode` function leverages `dompurify` to give you a literal, and *helpful* purity test. The judgement of whether the content meets your standards is still up to you, though.
+ **↗️ Redirect Support:** Because frames can't do everything ... yet! And, doggonit, there's a whole *world* ~~*wide* *web*~~ out there for y'all to explore.
+ **🎟️ Mint from frame (COMING SOON):** Using Syndicate + Base, this boilerplate gives you what you need to make random interactions with your frame *unforgettable*. Is that a good idea? That sounds like a you problem.
+ **🔐 Anti-theft:** Don't bet the engagement farm! Bind your Frame to a specific cast or account so nobody else can get your likes, follows, recasts ... and respect. Capisci?

### Example

![simplest-frame](https://github.com/depatchedmode/simplest-frame/assets/84613835/1ca2f2e6-767d-497a-ab88-96e26a7cbef8)
https://warpcast.com/depatchedmode/0xecad681e

### Getting started

1. Clone the repo
2. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/)
3. Copy `sample.env` to `.env` and add:
    + your Netlify Key, for deploys: `NETLIFY_AUTH_TOKEN`
    + a [Wield Key](https://docs.wield.co/farcaster/api) for reading Farcaster state: `WIELD_API_KEY`
4. `npm install`
5. `netlify dev`

### Testing

#### Quick & easy: Proxying to the WWW
1. Run `netlify dev --live` will give [proxy your local machine](https://docs.netlify.com/cli/local-development/#share-a-live-development-server) to the *world* *wide* *web*.
2. Test that link in either:
    + The Warpcast Embed UI: https://warpcast.com/~/developers/embeds
    + The Frames.js hosted debugger: https://debugger.framesjs.org/debug

#### Local & reliable:

Follow instructions here on how to setup the Frame.js debugger locally: https://github.com/depatchedmode/simplest-frame/issues/22#issuecomment-1930909371

**Note: you'll still need to be connected to the internet for Hubs communication ... unless you run your own locally**

### Defining your Frame

We'll update with a proper docs soon*, but you'll find everything you need in the `public` and `src` directories.

To add a new frame, create a `{frameName}.js` file in `/src/frames` and add it as an import to `/src/frames/index.js`. You'll find examples of dynamic (eg. rendered HTML) and static (eg. served from the public folder) frames in that directory.

*Y'all are welcome to help me write them.

### Deploying

This should be as simple as [watching a git repo for commits](https://docs.netlify.com/site-deploys/create-deploys/).

You may encounter a 502 gateway error after deployment on the `/og-image` endpoint. This is a known issue with the `sharp` module this repo relies upon. We'll hopefully have this fixed by default, but for now there are workarounds. Follow this thread for fixes:
https://github.com/depatchedmode/simplest-frame/issues/3

### Caveats
I am a designer larping as a dev. I invite your collaboration and feedback. Please be kind.

And please! Can we make it simpler?

### Roadmap

1. Less bad
2. More better
3. Migration to the [everywhere.computer](https://everywhere.computer)
