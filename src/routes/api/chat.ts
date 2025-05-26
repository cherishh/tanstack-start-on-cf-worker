import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const APIRoute = createAPIFileRoute('/api/chat')({
  POST: async ({ request, params }) => {
    const { messages } = await request.json();
    const stream = streamText({
      model: openai('gpt-4o'),
      messages,
    });
    return stream.toDataStreamResponse();
  },
});
