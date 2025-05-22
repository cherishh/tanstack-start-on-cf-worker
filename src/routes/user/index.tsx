import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getUserById } from '../../lib/db/queries/select';

const userServerFn = createServerFn({ method: 'GET' })
  .validator((d: number) => d)
  .handler(({ data: id }) => {
    return getUserById(id);
  });

export const Route = createFileRoute('/user/')({
  loader: async () => {
    const user = await userServerFn({ data: 1 });
    return { user };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useLoaderData();
  return (
    <div>
      <h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </h2>
    </div>
  );
}
