## TanStack Start on Workers v0

An experimental starter template that brings together modern web development building blocks using [TanStack Start](https://github.com/TanStack/start), deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

## 🚀 Demo  
https://tanstack-start-on-workers-v0.tuxi.workers.dev/

---

## ✅ Features & Progress

### Completed

- **UI & Styling**
  - Integrated `shadcn/ui` for component styling
  - Dark/light theme support

- **Authentication**
  - Powered by [`Better-Auth`](https://github.com/StefanJee/better-auth) 
  - Login/logout functionality
  - Protected API routes and pages
  - Auth middleware
  - Login/Signup pages
  - Role-based access control

- **Data Layer**
  - **Database**: PostgreSQL via [Neon](https://neon.tech/)
  - **ORM**: Type-safe queries using [Drizzle ORM](https://orm.drizzle.team/)
  - **Caching & Storage**:
    - Redis via Upstash
    - Cloudflare KV

- **Requests & Validation**
  - **Data fetching** and **caching** via [TanStack Query](https://tanstack.com/query)
  - **Schema validation** with [Zod](https://zod.dev)

- **Observability**
  - Integrated logging and error tracking via Sentry

- **Deployment**
  - Fully deployed on [Cloudflare Workers](https://workers.cloudflare.com/) using Wrangler

### In Progress / Planned

- **AI Integration**
  - ⚠️ Currently blocked due to network issues in mainland China (This one only applies if you live inside China mainland)
    Will use official OpenAI APIs instead of Vercel's AI SDK

- **Sitemap Generation**

- **Analytics**
  - PostHog not working reliably — looking into alternatives

---

## 🛠️ Fixes & Improvements

- Fixed theme loading: now uses local storage instead of server-side rendering
- Fixed admin role assignment issue in auth

---

## 📝 Notes

- **Environment & Secrets**
  - Use `.dev.vars` and `.dev.vars.production` instead of `.env`/`.env.local`  
    _(Cloudflare Workers doesn’t load `.env` files. Use Wrangler to set secrets.)_

- **Cloudflare KV**
  - Easy to bind and use in routes/functions

- **Shadcn/UI Integration**
  - Install `@tanstack/start` first before using the `shadcn` CLI  
    Reference: https://github.com/shadcn-ui/ui/issues/7391#issuecomment-2906796401

---

## ⚠️ Known Issues

- **API routes break on hard refresh in Cloudflare Workers SSR**  
  See `src/routes/user/-index-deprecated.tsx`  
  Related issue: https://github.com/TanStack/router/issues/4255

---

## 🙌 Acknowledgements

Thanks to the TanStack, Better-Auth, Cloudflare, and open-source communities — learned a lot!

PRs, feedback, and ideas are welcome!

---

Have fun! ✨
