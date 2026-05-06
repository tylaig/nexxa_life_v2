import { streamText } from 'ai';
const result = streamText({} as any);
console.log(typeof result.toUIMessageStreamResponse);
console.log(typeof result.toDataStreamResponse);
