## Tanstack Start on Workers v0
exploring tanstack start on cloudflare workers.

### notes
- drizzle + neon is ok
  - you need `.dev.vars.production` & `.dev.vars` as your `.env` & `.env.local`. (cf doesn't use .env ¯\_(ツ)_/¯)
- can bind cf KV
- shadcn/ui
  - ref: https://ui.shadcn.com/docs/installation/tanstack
  - pnpm remove tailwindcss postcss(you need tw v4)
  - change postcss.config.mjs
  - ts config ~/ -> @/ (must)
  - change app.css(remove base & components, add @import "tailwindcss")
  - pnpm dlx shadcn@canary init ... may fail.
  - if fail, go with mannully install(not that hard)
  - done, pnpm dlx shadcn@canary add button


### todo
- [x] setup shadcn/ui
- [x] add theme
- [x] add auth
  - [x] login/logout function
  - [x] work with tanstack query
  - [x] authorized api
  - [x] authorized page
  - [x] auth middleware
  - [x] login/signup page
- [x] add redis/upstash
  - [x] added cloudflare KV also
- [x] add logging/sentry
- [ ] check AI stuff - having network issues now
  - [ ] ~~integrate with ai sdk~~ cuz you-know-why, network issue cant solve. which means cant use ai sdk. have to use official apis.
  - [ ] add llm page
  - [ ] add db relationship
  - [ ] MCP use
- [ ] sitemap
- [ ] ~~add analytics/posthog~~ not working for now, find other product

#### fix
- [x] fix theme, use local not server
- [x] fix auth role. (cant add admin)

### problem
- API ROUTE NOT WORKING WITH CF SERVER SIDE. (aka when user hard refresh api route errors). See `src/routes/user/-index-deprecated.tsx` for details.
  - see issue: https://github.com/TanStack/router/issues/4255