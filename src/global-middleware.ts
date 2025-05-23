import { createMiddleware, registerGlobalMiddleware } from '@tanstack/react-start';
import { logMiddleware } from './utils/loggingMiddleware';
import * as Sentry from '@sentry/tanstackstart-react';

registerGlobalMiddleware({
  middleware: [createMiddleware().server(Sentry.sentryGlobalServerMiddlewareHandler()), logMiddleware],
});
