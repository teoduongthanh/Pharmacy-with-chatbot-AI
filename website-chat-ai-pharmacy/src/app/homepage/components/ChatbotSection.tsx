'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const quickQuestions = [
  'Paracetamol liều tối đa là bao nhiêu?',
  'Amoxicillin có tác dụng phụ gì?',
  'Thuốc huyết áp uống khi nào?',
  'Ibuprofen và Aspirin có thể dùng cùng không?',
];

const aiResponses: Record<string, string> = {
  default: 'Xin chào! Tôi là MediChat AI. Hãy hỏi tôi bất kỳ điều gì về thuốc — từ liều dùng, tác dụng phụ đến tương tác thuốc. Tôi sẽ cố gắng giải thích một cách dễ hiểu nhất! 💊',
  paracetamol: '**Paracetamol (Acetaminophen):**\n\n🔹 Liều tối đa người lớn: **4.000mg/ngày** (8 viên 500mg)\n🔹 Mỗi lần uống: 500–1.000mg\n🔹 Cách nhau tối thiểu: 4–6 giờ\n\n⚠️ **Lưu ý quan trọng:**\n• Người có bệnh gan: giảm còn 2.000mg/ngày\n• Không uống rượu khi dùng thuốc\n• Trẻ em cần tính theo cân nặng (10–15mg/kg)',
  amoxicillin: '**Amoxicillin — Kháng sinh Penicillin:**\n\n🔹 Công dụng: Điều trị nhiễm khuẩn tai, họng, phổi, đường tiết niệu\n🔹 Liều thông thường: 250–500mg mỗi 8 giờ\n\n⚠️ **Tác dụng phụ thường gặp:**\n• Tiêu chảy, buồn nôn (~10%)\n• Phát ban da\n• Rối loạn tiêu hóa\n\n🚨 **Dị ứng:** Nếu bạn có tiền sử dị ứng Penicillin, báo ngay cho bác sĩ!',
  'huyet ap': '**Thuốc huyết áp — Thời điểm uống tốt nhất:**\n\n🌅 **Buổi sáng (ACE inhibitors, ARBs):**\n• Lisinopril, Enalapril, Losartan\n• Uống khi thức dậy, trước ăn sáng\n\n🌙 **Buổi tối (một số loại):**\n• Amlodipine có thể uống tối\n• Giúp kiểm soát huyết áp sáng sớm\n\n⚠️ **Không bao giờ tự ngừng thuốc đột ngột!**',
  ibuprofen: '**Ibuprofen + Aspirin — Không nên dùng cùng:**\n\n❌ Cả hai đều ức chế COX-1 và COX-2\n❌ Tăng nguy cơ chảy máu dạ dày\n❌ Giảm hiệu quả của Aspirin bảo vệ tim\n\n✅ **Thay thế an toàn:**\n• Dùng Paracetamol thay Ibuprofen khi đang uống Aspirin\n• Nếu cần cả hai, hỏi bác sĩ để được hướng dẫn cụ thể',
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('paracetamol') || lower.includes('acetaminophen')) return aiResponses.paracetamol;
  if (lower.includes('amoxicillin')) return aiResponses.amoxicillin;
  if (lower.includes('huyết áp') || lower.includes('huyet ap')) return aiResponses['huyet ap'];
  if (lower.includes('ibuprofen') || lower.includes('aspirin')) return aiResponses.ibuprofen;
  return `**Câu hỏi của bạn về: "${input}"**\n\nTôi đang tìm kiếm thông tin trong cơ sở dữ liệu dược học...\n\n💡 Để nhận câu trả lời chi tiết nhất, hãy:\n• Gõ đúng tên thuốc (VD: Paracetamol, Amoxicillin)\n• Hoặc mô tả triệu chứng/tình huống cụ thể\n\nBạn có thể thử lại với tên thuốc cụ thể hơn nhé!`;
}

function formatMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'ai',
      text: aiResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: getAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section
      className="w-full py-20 md:py-28"
      style={{ background: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div ref={sectionRef} className="reveal-hidden-left flex flex-col gap-6">
            <div
              className="pill-badge w-fit"
              style={{ background: '#E6F7F7', color: '#0EA5A0' }}
            >
              <Icon name="ChatBubbleLeftRightIcon" size={12} />
             Thử ngay miễn phí
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-jakarta"
              style={{ color: '#1A2E35', letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              Trải nghiệm{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                MediChat AI
              </span>{' '}
              ngay bây giờ
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: '#5A7A82' }}>
              Không cần đăng ký. Gõ tên thuốc hoặc câu hỏi của bạn và nhận câu trả lời ngay lập tức.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {[
                { icon: 'CheckCircleIcon', text: 'Hỗ trợ 15,000+ loại thuốc phổ biến tại Việt Nam', color: '#0EA5A0' },
                { icon: 'CheckCircleIcon', text: 'Cập nhật theo hướng dẫn của Bộ Y tế và WHO', color: '#0EA5A0' },
                { icon: 'CheckCircleIcon', text: 'Cảnh báo tương tác thuốc tức thì', color: '#0EA5A0' },
                { icon: 'CheckCircleIcon', text: 'Gợi ý khi nào cần gặp bác sĩ', color: '#0EA5A0' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon name={item.icon as any} size={20} variant="solid" style={{ color: item.color }} />
                  <span className="text-sm" style={{ color: '#5A7A82' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div
              className="flex items-start gap-3 p-4 rounded-2xl"
              style={{ background: '#FFF8E6', border: '1px solid #FFE8A0' }}
            >
              <Icon name="InformationCircleIcon" size={18} style={{ color: '#F59E0B', flexShrink: 0 }} />
              <p className="text-xs leading-relaxed" style={{ color: '#8A6A00' }}>
                <strong>Lưu ý:</strong> MediChat cung cấp thông tin tham khảo. Không thay thế tư vấn của bác sĩ hoặc dược sĩ chuyên nghiệp. Luôn tham khảo ý kiến chuyên gia y tế trước khi thay đổi phác đồ điều trị.
              </p>
            </div>
          </div>

          {/* Right: Live Chatbot */}
          <div
            className="reveal-hidden-scale rounded-4xl overflow-hidden flex flex-col"
            style={{
              background: '#FAFEFF',
              border: '1.5px solid #D1EAE9',
              boxShadow: '0 20px 64px rgba(14,165,160,0.15)',
              height: '560px',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Icon name="SparklesIcon" size={20} style={{ color: 'white' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">MediChat AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-xs text-white/80">Trực tuyến · Phản hồi ngay lập tức</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" />
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-start gap-2'}`}
                >
                  {msg.role === 'ai' && (
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                    >
                      <Icon name="SparklesIcon" size={12} style={{ color: 'white' }} />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 text-sm max-w-[85%] ${
                      msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                    }`}
                    style={{ lineHeight: 1.65 }}
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }}
                  />
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                  >
                    <Icon name="SparklesIcon" size={12} style={{ color: 'white' }} />
                  </div>
                  <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="typing-dot w-2 h-2 rounded-full"
                        style={{ background: '#0EA5A0', display: 'inline-block' }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div
              className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0"
              style={{ borderTop: '1px solid #D1EAE9', background: 'white' }}
            >
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: '#E6F7F7',
                    color: '#0EA5A0',
                    border: '1px solid #CCEFEE',
                    fontWeight: 500,
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
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 flex items-center gap-2 flex-shrink-0"
              style={{ background: 'white', borderTop: '1px solid #D1EAE9' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi về bất kỳ loại thuốc nào..."
                className="flex-1 text-sm px-4 py-2.5 rounded-2xl outline-none transition-all duration-200"
                style={{
                  background: '#F0FAFA',
                  border: '1.5px solid #D1EAE9',
                  color: '#1A2E35',
                  fontFamily: 'var(--font-body)',
                }}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#0EA5A0')}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#D1EAE9')}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  background: input.trim() && !isTyping
                    ? 'linear-gradient(135deg, #0EA5A0, #14C8C2)'
                    : '#E6F7F7',
                  cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
                }}
              >
                <Icon
                  name="PaperAirplaneIcon"
                  size={16}
                  style={{ color: input.trim() && !isTyping ? 'white' : '#8AACB4' }}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}