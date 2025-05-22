/**
 * Will only work when being accessed on the server. Obviously, CF bindings are not available in the browser.
 * @returns
 */
import type { KVNamespace } from '@cloudflare/workers-types';

interface CloudflareBindings {
  TANSTACK: KVNamespace;
}

export function getBindings() {
  if (import.meta.env.DEV) {
    const proxyPromise = import('wrangler').then(({ getPlatformProxy }) => getPlatformProxy().then(proxy => proxy.env));
    return proxyPromise as unknown as CloudflareBindings;
  }

  return process.env as unknown as CloudflareBindings;
}
