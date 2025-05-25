## Tanstack Start on Workers v0

### notes
- drizzle + neon is ok
  - you need `.dev.vars.production` & `.dev.vars` as your `.env` & `.env.local`. (shit. why does cf has to defined a new file???)
  - you'll 
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
- [ ] add redis/upstash rate limit
- [x] add logging/sentry
- [ ] sitemap
- [ ] ~~add analytics/posthog~~ not working for now, maybe other product

#### future

- middleware 没 run？？
- signin/signup page
- why 他没有 global middleware?
- scripts 抄过来
