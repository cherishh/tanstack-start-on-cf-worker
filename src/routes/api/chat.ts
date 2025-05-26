import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';
import { streamText, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

// export const APIRoute = createAPIFileRoute('/api/chat')({
//   POST: async ({ request, params }) => {
//     const { messages } = await request.json();
//     const stream = streamText({
//       model: google('gemini-2.5-flash-preview-04-17'),
//       messages,
//     });
//     return stream.toDataStreamResponse();
//   },
// });

export const APIRoute = createAPIFileRoute('/api/chat')({
  POST: async ({ request, params }) => {
    console.log('req', request);
    const client = new OpenAI({
      // httpAgent: new SocksProxyAgent('socks5h://127.0.0.1:1086'),
      httpAgent: new HttpsProxyAgent('http://127.0.0.1:1087'),
    });

    const res = await client.responses.create({
      model: 'gpt-4.1',
      input: 'Write a one-sentence bedtime story about a unicorn.',
    });

    console.log(res, 'response');
    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
});
