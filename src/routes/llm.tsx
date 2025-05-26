import { createFileRoute, redirect } from '@tanstack/react-router';
import { useChat } from '@ai-sdk/react';

export const Route = createFileRoute('/llm')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    console.log('before load - dashboard layout', context);
    if (!context.user || (context.user.role !== 'admin' && context.user.role !== 'superadmin')) {
      throw redirect({ to: '/' });
    }
    return { user: context.user };
  },
});

function RouteComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div className='m-4'>
      <h2>LLM</h2>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input name='prompt' value={input} onChange={handleInputChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
