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
- [ ] add theme
- [ ] add auth
- [ ] ~~add analytics/posthog~~ not working for now, maybe other product
- [ ] add redis/upstash rate limit
- [ ] add logging/sentry
- [ ] sitemap