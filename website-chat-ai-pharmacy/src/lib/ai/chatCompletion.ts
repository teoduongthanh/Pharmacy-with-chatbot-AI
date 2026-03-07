import { callAIEndpoint } from './aiClient';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'developer';
  content: string | unknown[];
}

export interface ChatParameters {
  max_completion_tokens?: number;
  max_tokens?: number;
  temperature?: number;
  reasoning_effort?: string;
  [key: string]: unknown;
}

export async function getChatCompletion(
  provider: string,
  model: string,
  messages: ChatMessage[],
  parameters: ChatParameters = {}
): Promise<unknown> {
  let res = await callAIEndpoint('/api/ai/chat-completion', {
    provider,
    model,
    messages,
    stream: false,
    parameters,
  }) as Response;
  return res.json();
}

export async function getStreamingChatCompletion(
  provider: string,
  model: string,
  messages: ChatMessage[],
  onChunk: (chunk: unknown) => void,
  onComplete: () => void,
  onError: (error: Error) => void,
  parameters: ChatParameters = {}
): Promise<void> {
  let res: Response;
  try {
    res = await callAIEndpoint('/api/ai/chat-completion', {
      provider,
      model,
      messages,
      stream: true,
      parameters,
    }) as Response;
  } catch (err) {
    onError(err as Error);
    return;
  }

  const reader = res.body?.getReader();
  if (!reader) {
    onError(new Error('No response body'));
    return;
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === 'error') {
            onError(new Error(parsed.error || 'Streaming error'));
            return;
          }
          if (parsed.type === 'chunk') {
            onChunk(parsed.chunk);
          }
        } catch {
          // skip malformed lines
        }
      }
    }
    onComplete();
  } catch (err) {
    onError(err as Error);
  } finally {
    reader.releaseLock();
  }
}
