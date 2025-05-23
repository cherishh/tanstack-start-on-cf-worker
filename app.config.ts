import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import { cloudflare } from 'unenv';
import nitroCloudflareBindings from 'nitro-cloudflare-dev';
import { wrapVinxiConfigWithSentry } from '@sentry/tanstackstart-react';

const config = defineConfig({
  server: {
    // prerender: {
    //   routes: ['/', '/posts'],
    //   crawlLinks: true,
    // },
    preset: 'cloudflare-module',
    unenv: cloudflare,
    modules: [nitroCloudflareBindings],
  },
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
});

export default wrapVinxiConfigWithSentry(config, {
  org: 'just-me-9r',
  project: 'javascript-tanstackstart-react',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
});
