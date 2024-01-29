![image](https://github.com/depatchedmode/simplest-frame/assets/84613835/3737bb31-1c06-4d8d-abd0-1fdf3e94fc40)
## A zero-cost, zero-framework, dynamic Farcaster Frame template

### My needs for starting this were:
1. **🚱 Zero Framework:** Didn't want a framework baked in, and most options default to Next.js/React
2. **🆓 Zero Cost:** Frames are for experiments! Experimenting is more fruitful when it's free.
3. **🧱 Stable:** The domain and its attached state should be reasonably stable over the horizon of an experiment. Replit can only give you this at cost (see above)
4. **🤸 Dynamic Generation:** You can get all the above pretty easy with static files, but let's be real: we want dynamism!
5. **🤤 Small:** and hopefully easy. Nobody to impress here.
6. **😎 Cool Tech:** We want to be at the 🤬 edge here, people!

### Getting started

1. Clone the repo
2. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/)
3. `npm install`
4. `netlify dev`

... and deploying 

### Testing

1. Run `netlify dev --live` will give [proxy your local machine](https://docs.netlify.com/cli/local-development/#share-a-live-development-server) to the *world* *wide* *web*.
2. Test that link in the Warpcast Embed UI: https://warpcast.com/~/developers/embeds

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
