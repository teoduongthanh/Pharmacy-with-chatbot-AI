'use server';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | unknown[];
}

export interface ChatParameters {
  max_completion_tokens?: number;
  max_tokens?: number;
  temperature?: number;
  reasoning_effort?: string;
  [key: string]: unknown;
}

export async function getChatCompletionAction(
  model: string,
  messages: ChatMessage[],
  parameters: ChatParameters = {}
): Promise<{ content: string; error?: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'your-openai-api-key-here') {
    return { content: '', error: 'OpenAI API key not configured. Please add your OPENAI_API_KEY to the environment variables.' };
  }

  const requestBody: Record<string, unknown> = {
    model,
    messages,
    stream: false,
    ...parameters,
  };

  if (model?.startsWith('gpt-5') && requestBody.temperature === undefined) {
    requestBody.temperature = 1;
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({})) as { error?: { message?: string } };
      return { content: '', error: `OpenAI error ${res.status}: ${errData?.error?.message || 'Unknown error'}` };
    }

    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    const content = data?.choices?.[0]?.message?.content || '';
    return { content };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { content: '', error: message };
  }
}
