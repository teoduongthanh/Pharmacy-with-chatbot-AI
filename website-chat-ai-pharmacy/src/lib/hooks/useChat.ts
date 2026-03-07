'use client';

import { useState, useCallback } from 'react';
import { getStreamingChatCompletion, getChatCompletion, ChatMessage, ChatParameters } from '../ai/chatCompletion';

interface UseChatReturn {
  response: string;
  fullResponse: unknown[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (messages: ChatMessage[], parameters?: ChatParameters) => void;
}

export function useChat(
  provider: string,
  model: string,
  streaming: boolean = false
): UseChatReturn {
  const [response, setResponse] = useState<string>('');
  const [fullResponse, setFullResponse] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    (messages: ChatMessage[], parameters: ChatParameters = {}) => {
      setIsLoading(true);
      setError(null);
      setResponse('');
      setFullResponse([]);

      if (streaming) {
        let accumulated = '';
        const chunks: unknown[] = [];

        getStreamingChatCompletion(
          provider,
          model,
          messages,
          (chunk) => {
            chunks.push(chunk);
            setFullResponse([...chunks]);
            const chunkObj = chunk as { choices?: Array<{ delta?: { content?: string } }> };
            const content = chunkObj?.choices?.[0]?.delta?.content || '';
            if (content) {
              accumulated += content;
              setResponse(accumulated);
            }
          },
          () => {
            setIsLoading(false);
          },
          (err) => {
            setError(err);
            setIsLoading(false);
          },
          parameters
        );
      } else {
        getChatCompletion(provider, model, messages, parameters)
          .then((res) => {
            const result = res as { choices?: Array<{ message?: { content?: string } }> };
            const content = result?.choices?.[0]?.message?.content || '';
            setResponse(content);
            setFullResponse([result]);
            setIsLoading(false);
          })
          .catch((err: Error) => {
            setError(err);
            setIsLoading(false);
          });
      }
    },
    [provider, model, streaming]
  );

  return { response, fullResponse, isLoading, error, sendMessage };
}
