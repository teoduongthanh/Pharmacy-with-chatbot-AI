'use client';

import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    icon: 'ChatBubbleLeftRightIcon',
    iconColor: '#0EA5A0',
    iconBg: 'linear-gradient(135deg, #E6F7F7, #CCEFEE)',
    title: 'Đặt câu hỏi',
    description: 'Gõ tên thuốc hoặc câu hỏi của bạn bằng tiếng Việt tự nhiên. Không cần biết thuật ngữ y tế phức tạp.',
    example: '"Amoxicillin uống lúc nào thì tốt nhất?"',
    color: '#0EA5A0',
  },
  {
    number: '02',
    icon: 'CpuChipIcon',
    iconColor: '#6366F1',
    iconBg: 'linear-gradient(135deg, #EEF0FF, #DDE0FF)',
    title: 'AI phân tích',
    description: 'MediChat AI tra cứu cơ sở dữ liệu dược học được cập nhật liên tục và phân tích câu hỏi của bạn.',
    example: 'Xử lý trong < 2 giây',
    color: '#6366F1',
  },
  {
    number: '03',
    icon: 'DocumentTextIcon',
    iconColor: '#F59E0B',
    iconBg: 'linear-gradient(135deg, #FFF8E6, #FFEDC0)',
    title: 'Nhận câu trả lời',
    description: 'Nhận thông tin chi tiết, dễ hiểu kèm theo cảnh báo quan trọng và gợi ý khi nào cần gặp bác sĩ.',
    example: 'Câu trả lời rõ ràng, có nguồn gốc',
    color: '#F59E0B',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="Cách dùng"
      className="w-full py-20 md:py-28 overflow-hidden"
      style={{ background: 'white' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={sectionRef} className="reveal-hidden text-center mb-16">
          <div
            className="pill-badge mx-auto mb-4 w-fit"
            style={{ background: '#EEF0FF', color: '#6366F1' }}
          >
            <Icon name="MapIcon" size={12} />
            Quy trình đơn giản
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-jakarta mb-4"
            style={{ color: '#1A2E35', letterSpacing: '-0.02em' }}
          >
            Chỉ{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6366F1, #818CF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              3 bước
            </span>{' '}
            để hiểu về thuốc
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#5A7A82' }}>
            Không cần đăng ký tài khoản. Không cần chờ đợi. Bắt đầu ngay bây giờ.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-[88px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5"
            style={{
              background: 'linear-gradient(to right, #0EA5A0, #6366F1, #F59E0B)',
              opacity: 0.3,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="reveal-hidden flex flex-col items-center text-center relative"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  {/* Outer ring */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center relative"
                    style={{ background: step.iconBg, border: `2px solid ${step.color}20` }}
                  >
                    {/* Pulse ring */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: `${step.color}15`,
                        animationDuration: `${2 + i * 0.5}s`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                    <Icon
                      name={step.icon as any}
                      size={32}
                      style={{ color: step.iconColor }}
                    />
                  </div>

                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                    style={{
                      background: step.color,
                      color: 'white',
                      boxShadow: `0 4px 12px ${step.color}40`,
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold font-jakarta mb-3"
                  style={{ color: '#1A2E35' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4 max-w-xs"
                  style={{ color: '#5A7A82' }}
                >
                  {step.description}
                </p>

                {/* Example chip */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-medium"
                  style={{
                    background: `${step.color}10`,
                    color: step.color,
                    border: `1px solid ${step.color}20`,
                  }}
                >
                  <Icon name="LightBulbIcon" size={12} />
                  {step.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          ref={(el) => { stepRefs.current[3] = el; }}
          className="reveal-hidden mt-16 text-center"
          style={{ transitionDelay: '0.4s' }}
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-4xl"
            style={{
              background: 'linear-gradient(135deg, #F0FAFA, #EEF0FF)',
              border: '1px solid #D1EAE9',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)' }}
              >
                <Icon name="LockClosedIcon" size={18} style={{ color: 'white' }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#1A2E35' }}>
                  Thông tin bảo mật 100%
                </p>
                <p className="text-xs" style={{ color: '#5A7A82' }}>
                  Câu hỏi của bạn không được lưu trữ
                </p>
              </div>
            </div>
            <div
              className="hidden sm:block w-px h-10 self-stretch"
              style={{ background: '#D1EAE9' }}
            />
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366F1, #818CF8)' }}
              >
                <Icon name="ClockIcon" size={18} style={{ color: 'white' }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#1A2E35' }}>
                  Trực tuyến 24/7
                </p>
                <p className="text-xs" style={{ color: '#5A7A82' }}>
                  Luôn sẵn sàng khi bạn cần
                </p>
              </div>
            </div>
            <div
              className="hidden sm:block w-px h-10 self-stretch"
              style={{ background: '#D1EAE9' }}
            />
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #F59E0B, #FBD038)' }}
              >
                <Icon name="AcademicCapIcon" size={18} style={{ color: 'white' }} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#1A2E35' }}>
                  Dựa trên y văn
                </p>
                <p className="text-xs" style={{ color: '#5A7A82' }}>
                  Nguồn: WHO, Bộ Y tế VN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}