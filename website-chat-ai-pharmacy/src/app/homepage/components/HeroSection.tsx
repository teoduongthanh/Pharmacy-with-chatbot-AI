'use client';

import { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const chatMessages = [
  {
    id: 1,
    role: 'user',
    text: 'Paracetamol có thể uống cùng Ibuprofen không?',
    delay: 0,
  },
  {
    id: 2,
    role: 'ai',
    text: 'Có thể kết hợp Paracetamol và Ibuprofen một cách an toàn vì chúng hoạt động theo cơ chế khác nhau. Liều khuyến nghị: Paracetamol 500–1000mg mỗi 4–6 giờ, Ibuprofen 200–400mg mỗi 6–8 giờ. Uống cùng bữa ăn để giảm kích ứng dạ dày.',
    delay: 1200,
  },
  {
    id: 3,
    role: 'user',
    text: 'Liều tối đa mỗi ngày của Paracetamol là bao nhiêu?',
    delay: 3000,
  },
  {
    id: 4,
    role: 'ai',
    text: 'Liều tối đa Paracetamol cho người lớn là **4000mg/ngày** (8 viên 500mg). Không vượt quá 1000mg mỗi lần. Người có bệnh gan nên giảm còn 2000mg/ngày.',
    delay: 4200,
  },
];

const floatingBadges = [
  { icon: 'ShieldCheckIcon', label: 'Thông tin đáng tin cậy', color: '#0EA5A0', bg: '#E6F7F7', top: '12%', right: '-5%' },
  { icon: 'BoltIcon', label: 'Phản hồi tức thì', color: '#6366F1', bg: '#EEF0FF', top: '60%', left: '-8%' },
  { icon: 'HeartIcon', label: '50,000+ người dùng', color: '#FF6B6B', bg: '#FFF0F0', bottom: '10%', right: '2%' },
];

export default function HeroSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFor, setTypingFor] = useState<number | null>(null);

  useEffect(() => {
    chatMessages.forEach((msg) => {
      const timer = setTimeout(() => {
        if (msg.role === 'ai') {
          setTypingFor(msg.id);
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setTypingFor(null);
            setVisibleMessages((prev) => [...prev, msg.id]);
          }, 900);
        } else {
          setVisibleMessages((prev) => [...prev, msg.id]);
        }
      }, msg.delay);
      return () => clearTimeout(timer);
    });
  }, []);

  const formatText = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F0FAFA 0%, #E6F7F7 35%, #F5F0FF 70%, #FFF5F5 100%)' }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,160,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,107,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #0EA5A040 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Navigation */}
      <nav className="relative z-20 w-full px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AppLogo size={36} />
          <span
            className="text-xl font-bold font-jakarta"
            style={{ color: '#1A2E35' }}
          >
            MediChat
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Tính năng', 'Cách dùng', 'Đánh giá', 'Liên hệ'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: '#5A7A82' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0EA5A0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5A7A82')}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden md:block text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200"
            style={{ color: '#0EA5A0', border: '1.5px solid #0EA5A0' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#0EA5A0';
              (e.currentTarget as HTMLButtonElement).style.color = 'white';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#0EA5A0';
            }}
          >
            Đăng nhập
          </button>
          <button
            className="text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)',
              boxShadow: '0 4px 16px rgba(14,165,160,0.35)',
            }}
          >
            Dùng miễn phí
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          {/* Left: Copy */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit">
              <div
                className="pill-badge"
                style={{ background: '#E6F7F7', color: '#0EA5A0' }}
              >
                <span className="w-2 h-2 rounded-full bg-primary-DEFAULT animate-pulse" style={{ background: '#0EA5A0' }} />
                AI Dược học thế hệ mới
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-jakarta leading-tight"
              style={{ color: '#1A2E35', letterSpacing: '-0.02em' }}
            >
              Hỏi về thuốc{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0EA5A0 0%, #14C8C2 50%, #6366F1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                bất kỳ lúc nào
              </span>
              ,{' '}
              <br className="hidden md:block" />
              nhận câu trả lời{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                tức thì
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl leading-relaxed max-w-lg"
              style={{ color: '#5A7A82', fontWeight: 400 }}
            >
              MediChat sử dụng AI tiên tiến để giải thích về thuốc, liều dùng, tương tác thuốc và tác dụng phụ — chính xác, dễ hiểu, an toàn.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 flex-wrap">
              {[
                { value: '50K+', label: 'Người dùng' },
                { value: '200K+', label: 'Câu hỏi đã trả lời' },
                { value: '98%', label: 'Độ chính xác' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-bold font-jakarta"
                    style={{ color: '#0EA5A0' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs" style={{ color: '#8AACB4' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                className="flex items-center gap-2.5 text-base font-semibold px-7 py-4 rounded-2xl text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)',
                  boxShadow: '0 8px 32px rgba(14,165,160,0.4)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(14,165,160,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(14,165,160,0.4)';
                }}
              >
                <Icon name="ChatBubbleLeftRightIcon" size={20} />
                Bắt đầu chat ngay
              </button>
              <button
                className="flex items-center gap-2 text-base font-medium px-6 py-4 rounded-2xl transition-all duration-200"
                style={{ color: '#1A2E35', background: 'rgba(255,255,255,0.8)', border: '1.5px solid #D1EAE9' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#0EA5A0';
                  (e.currentTarget as HTMLButtonElement).style.color = '#0EA5A0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#D1EAE9';
                  (e.currentTarget as HTMLButtonElement).style.color = '#1A2E35';
                }}
              >
                <Icon name="PlayCircleIcon" size={20} />
                Xem demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {[
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=60&h=60&fit=crop',
                  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=60&h=60&fit=crop',
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`User ${i + 1}`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    style={{ zIndex: 4 - i }}
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="StarIcon" size={14} variant="solid" className="text-amber-400" style={{ color: '#F59E0B' }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: '#8AACB4' }}>
                  4.9/5 từ 3,200+ đánh giá
                </p>
              </div>
            </div>
          </div>

          {/* Right: Chat Preview */}
          <div className="relative flex items-center justify-center">
            {/* Floating badges */}
            {floatingBadges.map((badge, i) => (
              <div
                key={i}
                className="absolute z-20 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-teal-sm animate-float hide-mobile"
                style={{
                  top: badge.top,
                  right: badge.right,
                  left: badge.left,
                  bottom: badge.bottom,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + i}s`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: badge.bg }}
                >
                  <Icon name={badge.icon as any} size={14} style={{ color: badge.color }} />
                </div>
                <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#1A2E35' }}>
                  {badge.label}
                </span>
              </div>
            ))}

            {/* Main chat card */}
            <div
              className="relative w-full max-w-[420px] rounded-4xl overflow-hidden"
              style={{
                background: 'white',
                boxShadow: '0 24px 80px rgba(14,165,160,0.2), 0 8px 32px rgba(26,46,53,0.08)',
                border: '1px solid rgba(209,234,233,0.8)',
              }}
            >
              {/* Chat header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <Icon name="SparklesIcon" size={20} className="text-white" style={{ color: 'white' }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">MediChat AI</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    <span className="text-xs text-white/80">Đang trực tuyến</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                </div>
              </div>

              {/* Chat messages */}
              <div className="p-4 flex flex-col gap-3 min-h-[280px] max-h-[320px] overflow-y-auto" style={{ background: '#FAFEFF' }}>
                {/* Welcome message */}
                <div className="flex items-start gap-2">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                  >
                    <Icon name="SparklesIcon" size={12} style={{ color: 'white' }} />
                  </div>
                  <div className="chat-bubble-ai px-3.5 py-2.5 text-sm max-w-[85%]" style={{ lineHeight: 1.6 }}>
                    Xin chào! Tôi là MediChat AI. Bạn có thể hỏi tôi về bất kỳ loại thuốc nào — liều dùng, tác dụng phụ, tương tác thuốc và nhiều hơn nữa. 💊
                  </div>
                </div>

                {chatMessages.map((msg) => {
                  const isVisible = visibleMessages.includes(msg.id);
                  const showTyping = isTyping && typingFor === msg.id;

                  if (!isVisible && !showTyping) return null;

                  return (
                    <div key={msg.id}>
                      {msg.role === 'user' ? (
                        <div className="flex justify-end">
                          <div
                            className="chat-bubble-user px-3.5 py-2.5 text-sm max-w-[85%]"
                            style={{ lineHeight: 1.6 }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <div
                            className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                          >
                            <Icon name="SparklesIcon" size={12} style={{ color: 'white' }} />
                          </div>
                          {showTyping ? (
                            <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
                              {[0, 1, 2].map((d) => (
                                <span
                                  key={d}
                                  className="typing-dot w-2 h-2 rounded-full inline-block"
                                  style={{ background: '#0EA5A0', animationDelay: `${d * 0.2}s` }}
                                />
                              ))}
                            </div>
                          ) : (
                            <div
                              className="chat-bubble-ai px-3.5 py-2.5 text-sm max-w-[85%]"
                              style={{ lineHeight: 1.6 }}
                              dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Chat input */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ background: 'white', borderTop: '1px solid #D1EAE9' }}
              >
                <div
                  className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm"
                  style={{ background: '#F0FAFA', border: '1.5px solid #D1EAE9', color: '#8AACB4' }}
                >
                  <Icon name="MagnifyingGlassIcon" size={16} style={{ color: '#8AACB4' }} />
                  Hỏi về bất kỳ loại thuốc nào...
                </div>
                <button
                  className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
                >
                  <Icon name="PaperAirplaneIcon" size={16} style={{ color: 'white' }} />
                </button>
              </div>
            </div>

            {/* Decorative pill shape */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-16 rounded-full opacity-20 animate-float-slow hide-mobile"
              style={{ background: 'linear-gradient(135deg, #0EA5A0, #6366F1)' }}
            />
            <div
              className="absolute -top-6 -left-6 w-20 h-20 rounded-full opacity-15 animate-float hide-mobile"
              style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFB347)', animationDelay: '2s' }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div
          className="flex flex-col items-center gap-2 animate-bounce"
          style={{ color: '#8AACB4' }}
        >
          <span className="text-xs font-medium">Cuộn xuống</span>
          <Icon name="ChevronDownIcon" size={20} />
        </div>
      </div>
    </section>
  );
}