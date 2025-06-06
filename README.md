## Tanstack Start on Workers v0
Putting all mordern web dev pieces together with Tanstack-Start. Also exploring tanstack start hosting on cloudflare workers.

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
  - [ ] ~~integrate with ai sdk~~ cuz you-know-why, network issue cant solve for now. which means cant use ai sdk. have to use official apis. - this one only applies to me. I live in China mainland.
  - [ ] MCP use
- [ ] sitemap
- [ ] ~~add analytics/posthog~~ not working for now, find other product

#### fix
- [x] fix theme, use local not server
- [x] fix auth role. (cant add admin)

### notes
- secrets
  - you need `.dev.vars.production` & `.dev.vars` as your `.env` & `.env.local`. (cf doesn't use .env ¯\_(ツ)_/¯). Best just use wrangler to set secrets.
- can bind cf KV easily
- shadcn/ui
  - you need install `@tanstack/start` to make shadcn cli installation work correctly. See: https://github.com/shadcn-ui/ui/issues/7391#issuecomment-2906796401

### problem
- API ROUTE NOT WORKING WITH CF SERVER SIDE. (aka when user hard refresh api route errors). See `src/routes/user/-index-deprecated.tsx` for details.
  - see issue: https://github.com/TanStack/router/issues/4255
 
have fun:)
