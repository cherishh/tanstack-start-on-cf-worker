import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import * as React from 'react';
import db from '~/db';

const getUser = createServerFn(async ({ ctx }) => {
  const user = await db.select().from(users).all();
  return user;
});

export const Route = createFileRoute('/demo/$demoId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { demoId } = Route.useParams();

  return (
    <div>
      <h1>Demo {demoId}</h1>
      <Link to='/demo/$demoId/deep' params={{ demoId }}>
        Deep
      </Link>
    </div>
  );
}
