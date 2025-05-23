import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import { cloudflare } from 'unenv';
import nitroCloudflareBindings from 'nitro-cloudflare-dev';

export default defineConfig({
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
