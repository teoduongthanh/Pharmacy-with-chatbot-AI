'use client';

import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="w-full py-20 md:py-28 overflow-hidden"
      style={{ background: '#F0FAFA' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          ref={sectionRef}
          className="reveal-hidden-scale relative rounded-[2.5rem] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0A7A76 0%, #0EA5A0 40%, #14C8C2 70%, #6366F1 100%)',
            padding: '4px',
          }}
        >
          <div
            className="relative rounded-[2.25rem] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0A7A76 0%, #0EA5A0 40%, #14C8C2 70%, #6366F1 100%)',
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)',
                transform: 'translate(30%, -30%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
                transform: 'translate(-30%, 30%)',
              }}
            />

            {/* Dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-10 md:p-16">
              {/* Left */}
              <div className="flex flex-col gap-6 text-center lg:text-left max-w-2xl">
                <div
                  className="pill-badge mx-auto lg:mx-0 w-fit"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
                >
                  <Icon name="RocketLaunchIcon" size={12} />
                  Bắt đầu miễn phí hôm nay
                </div>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold font-jakarta text-white"
                  style={{ letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  Dùng thuốc đúng cách, <br />
                  <span style={{ opacity: 0.85 }}>sống khỏe mỗi ngày</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed">
                  Tham gia cùng 50,000+ người Việt đang sử dụng MediChat để hiểu đúng về thuốc và bảo vệ sức khỏe của mình.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300"
                    style={{
                      background: 'white',
                      color: '#0EA5A0',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
                    }}
                  >
                    <Icon name="ChatBubbleLeftRightIcon" size={20} />
                    Dùng miễn phí ngay
                  </button>
                  <button
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl font-medium text-base text-white transition-all duration-200"
                    style={{ border: '1.5px solid rgba(255,255,255,0.4)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    }}
                  >
                    Xem tính năng
                    <Icon name="ArrowRightIcon" size={18} />
                  </button>
                </div>

                {/* Mini social proof */}
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {[
                      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face',
                      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face',
                      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=40&h=40&fit=crop&crop=face',
                    ].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Người dùng ${i + 1}`}
                        className="w-8 h-8 rounded-full object-cover border-2"
                        style={{ borderColor: 'rgba(255,255,255,0.4)', zIndex: 3 - i }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-white/80">
                    <strong className="text-white">2,400+</strong> người mới tham gia tuần này
                  </p>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-2 gap-4 flex-shrink-0">
                {[
                  { value: '50K+', label: 'Người dùng hoạt động', icon: 'UsersIcon' },
                  { value: '200K+', label: 'Câu hỏi đã giải đáp', icon: 'ChatBubbleBottomCenterTextIcon' },
                  { value: '15K+', label: 'Loại thuốc trong CSDL', icon: 'BeakerIcon' },
                  { value: '< 2s', label: 'Thời gian phản hồi TB', icon: 'BoltIcon' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-3xl p-5 flex flex-col gap-2 transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.12)';
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                    >
                      <Icon name={stat.icon as any} size={18} style={{ color: 'white' }} />
                    </div>
                    <p className="text-2xl font-bold font-jakarta text-white">{stat.value}</p>
                    <p className="text-xs text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}