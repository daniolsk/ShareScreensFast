![logo](https://github.com/daniolsk/ShareScreensFast/blob/main/public/logo.png?raw=true)

# Share Screens Fast

> The easiest and fastest way to share full-res screenshots or other images.

This is an example application made using Next.js 14 (using Server Actions, App Router, etc.) and all the technologies listed below. The main goal was to create a useful application in a SaaS model, to learn how to integrate services like Stripe Payment Processor.

App is live at: [share-screens-fast.vercel.app](https://share-screens-fast.vercel.app/)

## Features

- [x] Auth using [Clerk](https://clerk.com/)
- [x] Images upload using [Uploadthing](https://uploadthing.com/)
- [x] PostgreSQL using [Supabase](https://supabase.com/)
- [x] Subscription payments using [Stripe](https://stripe.com/en-pl)
- [x] Webhooks listening to Stripe events (to know when user subscribe)
- [x] Default demo account with limited amount of uploads
- [x] Pro plan without any limitations

And more soon...

### TODO

- [x] Delete album with all images
- [x] Fix limits
