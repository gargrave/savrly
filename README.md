# SAVRLY

[![Netlify Status](https://api.netlify.com/api/v1/badges/78689779-b6da-44bf-9b4c-b12a07bb26da/deploy-status)](https://app.netlify.com/sites/chipper-kulfi-bbf2e1/deploys)

## What is this?

It's a kind of bookmark saving app, VERY heavily inspired by [RainDrop.io](https://raindrop.io/). This kind of came from one of those "I like this app, but I want it built differently" moments, where I just wanted my own version of the app that works exactly how I want it. So here it is.

I need it to work it reliably both on Mac and iOS, so one design aspect that I have focused on is not just making it responsive, but building controls that translate across any device. e.g. This means no relying on hover state, multi-touch, etc. for key functionality.

## The Things

If you're interested in what tools/libraries I used, here you go:

- Core Stuff
  - [NextJS](https://nextjs.org/) as the core stack
  - [Netlify](https://www.netlify.com/) for easy hosting & deployment
  - [Supabase](https://supabase.com/) for auth and DB
- Styling
  - [Tailwind](https://tailwindcss.com/) for base styling
  - [Chakra UI](https://chakra-ui.com/) for general components
    - This is nice UI library, but the hit to your bundle is probably not worth it. I don't mind for a silly side project, but I would be hesitant to use this in a proper production app.
  - [React Icons](https://react-icons.github.io/) for, well... for icons
- Other Stuff
  - [Zustand](https://github.com/pmndrs/zustand) for global state management
  - [Immer](https://immerjs.github.io/immer/) for helping with said state management
