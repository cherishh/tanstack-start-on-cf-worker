import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  beforeLoad: async ({ context }) => {
    console.log('before load - posts index', context);
  },
  component: PostsIndexComponent,
});

function PostsIndexComponent() {
  return <div>Select a post.</div>;
}
