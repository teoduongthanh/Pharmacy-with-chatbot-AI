'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import ReactMarkdown from 'react-markdown';
import { getChatCompletionAction, ChatMessage } from '@/lib/ai/chatAction';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `Bạn là MediChat AI — trợ lý dược học thông minh, chuyên cung cấp thông tin về thuốc cho người dùng Việt Nam.

Nhiệm vụ của bạn:
- Giải thích công dụng, liều dùng, tác dụng phụ của thuốc
- Cảnh báo tương tác thuốc nguy hiểm
- Hướng dẫn cách dùng thuốc đúng cách
- Gợi ý khi nào cần gặp bác sĩ

Quy tắc:
- Trả lời bằng tiếng Việt, rõ ràng và dễ hiểu
- Luôn nhắc nhở người dùng tham khảo bác sĩ/dược sĩ cho các quyết định y tế quan trọng
- Không chẩn đoán bệnh, chỉ cung cấp thông tin về thuốc
- Sử dụng định dạng markdown để trình bày thông tin rõ ràng`;

const QUICK_PROMPTS = [
  { icon: '💊', text: 'Paracetamol dùng để làm gì?' },
  { icon: '⚠️', text: 'Tương tác thuốc của Ibuprofen' },
  { icon: '💉', text: 'Amoxicillin liều dùng cho người lớn' },
  { icon: '❤️', text: 'Thuốc huyết áp uống khi nào tốt nhất?' },
  { icon: '🩺', text: 'Aspirin và Ibuprofen có dùng cùng không?' },
  { icon: '🌿', text: 'Vitamin D3 liều bao nhiêu mỗi ngày?' },
];

export default function ChatPageClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const newHistory: ChatMessage[] = [...conversationHistory, { role: 'user', content: trimmed }];
    setConversationHistory(newHistory);

    const apiMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...newHistory,
    ];

    try {
      const result = await getChatCompletionAction('gpt-4o', apiMessages, { max_completion_tokens: 1024 });

      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationHistory((prev) => [...prev, { role: 'assistant', content: result.content }]);
    } catch (err) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      <Toaster position="top-right" />

      {/* Header */}
      <header
        className="flex-shrink-0 w-full px-4 md:px-6 py-3 flex items-center justify-between"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #D1EAE9',
        }}
      >
        <div className="flex items-center gap-3">
          <Link href="/homepage" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: '#E6F7F7' }}
            >
              <Icon name="ArrowLeftIcon" size={16} style={{ color: '#0EA5A0' }} />
            </div>
          </Link>
          <div className="flex items-center gap-2.5">
            <AppLogo size={30} />
            <div>
              <p className="text-sm font-bold font-jakarta" style={{ color: '#1A2E35' }}>
                MediChat AI
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs" style={{ color: '#5A7A82' }}>
                  Trực tuyến · Phản hồi tức thì
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([]);
            setConversationHistory([]);
          }}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200"
          style={{ color: '#5A7A82', background: '#F0FAFA', border: '1px solid #D1EAE9' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#0EA5A0';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#0EA5A0';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = '#5A7A82';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#D1EAE9';
          }}
        >
          <Icon name="ArrowPathIcon" size={14} />
          Cuộc trò chuyện mới
        </button>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center px-4 py-12">
            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center mb-5"
              style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)', boxShadow: '0 8px 32px rgba(14,165,160,0.35)' }}
            >
              <Icon name="SparklesIcon" size={28} style={{ color: 'white' }} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-jakarta mb-2" style={{ color: '#1A2E35' }}>
              Xin chào! Tôi là MediChat AI
            </h1>
            <p className="text-base text-center max-w-md mb-10" style={{ color: '#5A7A82' }}>
              Hỏi tôi bất kỳ điều gì về thuốc — liều dùng, tác dụng phụ, tương tác thuốc và nhiều hơn nữa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt.text)}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1.5px solid #D1EAE9',
                    boxShadow: '0 2px 12px rgba(14,165,160,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#0EA5A0';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(14,165,160,0.15)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#D1EAE9';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(14,165,160,0.06)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  }}
                >
                  <span className="text-xl flex-shrink-0">{prompt.icon}</span>
                  <span className="text-sm font-medium" style={{ color: '#1A2E35' }}>
                    {prompt.text}
                  </span>
                </button>
              ))}
            </div>

            <div
              className="flex items-start gap-2 mt-8 px-4 py-3 rounded-2xl max-w-lg"
              style={{ background: '#FFF8E6', border: '1px solid #FFE8A0' }}
            >
              <Icon name="InformationCircleIcon" size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs leading-relaxed" style={{ color: '#8A6A00' }}>
                <strong>Lưu ý:</strong> MediChat cung cấp thông tin tham khảo, không thay thế tư vấn của bác sĩ hoặc dược sĩ chuyên nghiệp.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-3'}`}
              >
                {msg.role === 'assistant' && (
                  <div
                    className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                  >
                    <Icon name="SparklesIcon" size={14} style={{ color: 'white' }} />
                  </div>
                )}
                <div
                  className={`px-4 py-3 text-sm max-w-[80%] md:max-w-[70%] ${
                    msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }`}
                  style={{ lineHeight: 1.7 }}
                >
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <span>{msg.content}</span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                >
                  <Icon name="SparklesIcon" size={14} style={{ color: 'white' }} />
                </div>
                <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot w-2 h-2 rounded-full inline-block"
                      style={{ background: '#0EA5A0' }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Fixed input bar */}
      <div
        className="flex-shrink-0 w-full px-4 py-4"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid #D1EAE9',
        }}
      >
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {!isEmpty && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {QUICK_PROMPTS.slice(0, 4).map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt.text)}
                  disabled={isLoading}
                  className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: '#E6F7F7',
                    color: '#0EA5A0',
                    border: '1px solid #B3E0DE',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#0EA5A0';
                    (e.currentTarget as HTMLButtonElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#E6F7F7';
                    (e.currentTarget as HTMLButtonElement).style.color = '#0EA5A0';
                  }}
                >
                  {prompt.icon} {prompt.text}
                </button>
              ))}
            </div>
          )}

          <div
            className="flex items-end gap-3 px-4 py-3 rounded-3xl"
            style={{
              background: 'white',
              border: '1.5px solid #D1EAE9',
              boxShadow: '0 4px 24px rgba(14,165,160,0.1)',
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi về bất kỳ loại thuốc nào... (Enter để gửi)"
              disabled={isLoading}
              rows={1}
              className="flex-1 resize-none text-sm outline-none bg-transparent"
              style={{
                color: '#1A2E35',
                lineHeight: 1.6,
                maxHeight: '120px',
                minHeight: '24px',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200"
              style={{
                background:
                  isLoading || !input.trim()
                    ? '#D1EAE9' :'linear-gradient(135deg, #0EA5A0, #14C8C2)',
                boxShadow:
                  isLoading || !input.trim()
                    ? 'none' :'0 4px 16px rgba(14,165,160,0.4)',
              }}
            >
              {isLoading ? (
                <Icon name="ArrowPathIcon" size={16} style={{ color: '#8AACB4' }} className="animate-spin" />
              ) : (
                <Icon name="PaperAirplaneIcon" size={16} style={{ color: input.trim() ? 'white' : '#8AACB4' }} />
              )}
            </button>
          </div>
          <p className="text-center text-xs mt-2" style={{ color: '#8AACB4' }}>
            MediChat AI có thể mắc lỗi. Luôn tham khảo bác sĩ cho các quyết định y tế quan trọng.
          </p>
        </form>
      </div>
    </>
  );
}
