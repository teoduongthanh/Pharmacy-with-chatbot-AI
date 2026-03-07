'use client';

import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const features = [
{
  id: 'drug-info',
  icon: 'BeakerIcon',
  iconColor: '#0EA5A0',
  iconBg: '#E6F7F7',
  title: 'Tra cứu thông tin thuốc',
  description: 'Tìm hiểu chi tiết về bất kỳ loại thuốc nào: thành phần, công dụng, chống chỉ định và cách bảo quản.',
  badge: 'Phổ biến nhất',
  badgeColor: '#0EA5A0',
  size: 'large',
  image: "https://images.unsplash.com/photo-1699726193409-b040a9dd734a",
  stats: [
  { value: '15,000+', label: 'Loại thuốc' },
  { value: '99%', label: 'Độ chính xác' }]

},
{
  id: 'interactions',
  icon: 'ArrowsRightLeftIcon',
  iconColor: '#6366F1',
  iconBg: '#EEF0FF',
  title: 'Kiểm tra tương tác thuốc',
  description: 'Phát hiện các tương tác nguy hiểm giữa nhiều loại thuốc trước khi uống cùng nhau.',
  badge: 'Quan trọng',
  badgeColor: '#FF6B6B',
  size: 'small'
},
{
  id: 'dosage',
  icon: 'CalculatorIcon',
  iconColor: '#F59E0B',
  iconBg: '#FFF8E6',
  title: 'Hướng dẫn liều dùng',
  description: 'Tính liều phù hợp theo cân nặng, tuổi tác và tình trạng sức khỏe cụ thể.',
  badge: 'Chính xác',
  badgeColor: '#F59E0B',
  size: 'small'
},
{
  id: 'side-effects',
  icon: 'ExclamationTriangleIcon',
  iconColor: '#FF6B6B',
  iconBg: '#FFF0F0',
  title: 'Tác dụng phụ & cảnh báo',
  description: 'Hiểu rõ các tác dụng phụ có thể gặp và khi nào cần liên hệ bác sĩ ngay.',
  badge: 'An toàn',
  badgeColor: '#FF6B6B',
  size: 'medium',
  image: "https://images.unsplash.com/photo-1586436009179-082b96f4407e"
},
{
  id: 'alternatives',
  icon: 'ArrowPathIcon',
  iconColor: '#0EA5A0',
  iconBg: '#E6F7F7',
  title: 'Thuốc thay thế',
  description: 'Tìm các thuốc tương đương khi không có sẵn thuốc bạn cần.',
  badge: 'Tiết kiệm',
  badgeColor: '#0EA5A0',
  size: 'medium'
}];


function FeatureCard({ feature, delay = 0 }: {feature: (typeof features)[0];delay?: number;}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  if (feature.size === 'large') {
    return (
      <div
        ref={cardRef}
        className="reveal-hidden-scale col-span-1 md:col-span-2 rounded-4xl overflow-hidden feature-card card-shine"
        style={{
          background: 'white',
          border: '1px solid #D1EAE9',
          boxShadow: '0 4px 24px rgba(14,165,160,0.08)',
          transitionDelay: `${delay}s`
        }}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[280px]">
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div
                className="pill-badge mb-4 w-fit"
                style={{ background: '#E6F7F7', color: '#0EA5A0' }}>
                
                <Icon name={feature.icon as any} size={12} />
                {feature.badge}
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: feature.iconBg }}>
                
                <Icon name={feature.icon as any} size={24} style={{ color: feature.iconColor }} />
              </div>
              <h3
                className="text-xl font-bold font-jakarta mb-3"
                style={{ color: '#1A2E35' }}>
                
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#5A7A82' }}>
                {feature.description}
              </p>
            </div>
            {feature.stats &&
            <div className="flex gap-6 mt-6">
                {feature.stats.map((stat) =>
              <div key={stat.label}>
                    <p className="text-2xl font-bold font-jakarta" style={{ color: '#0EA5A0' }}>
                      {stat.value}
                    </p>
                    <p className="text-xs" style={{ color: '#8AACB4' }}>
                      {stat.label}
                    </p>
                  </div>
              )}
              </div>
            }
          </div>
          <div className="relative overflow-hidden">
            <AppImage
              src={feature.image!}
              alt={`Tính năng ${feature.title} - người dùng tra cứu thông tin thuốc trên điện thoại`}
              fill
              className="object-cover" />
            
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, white 0%, transparent 30%)'
              }} />
            
          </div>
        </div>
      </div>);

  }

  if (feature.size === 'medium') {
    return (
      <div
        ref={cardRef}
        className="reveal-hidden col-span-1 rounded-4xl overflow-hidden feature-card card-shine flex flex-col"
        style={{
          background: 'white',
          border: '1px solid #D1EAE9',
          boxShadow: '0 4px 24px rgba(14,165,160,0.08)',
          minHeight: '240px',
          transitionDelay: `${delay}s`
        }}>
        
        {feature.image &&
        <div className="relative h-32 overflow-hidden">
            <AppImage
            src={feature.image}
            alt={`Tính năng ${feature.title} - minh họa tác dụng phụ thuốc`}
            fill
            className="object-cover" />
          
            <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, white)' }} />
          
          </div>
        }
        <div className="p-6 flex flex-col flex-1">
          <div
            className="pill-badge mb-3 w-fit text-xs"
            style={{ background: `${feature.iconBg}`, color: feature.iconColor }}>
            
            {feature.badge}
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: feature.iconBg }}>
            
            <Icon name={feature.icon as any} size={20} style={{ color: feature.iconColor }} />
          </div>
          <h3 className="text-base font-bold font-jakarta mb-2" style={{ color: '#1A2E35' }}>
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: '#5A7A82' }}>
            {feature.description}
          </p>
        </div>
      </div>);

  }

  // small
  return (
    <div
      ref={cardRef}
      className="reveal-hidden col-span-1 rounded-4xl p-6 feature-card card-shine flex flex-col"
      style={{
        background: 'white',
        border: '1px solid #D1EAE9',
        boxShadow: '0 4px 24px rgba(14,165,160,0.08)',
        transitionDelay: `${delay}s`
      }}>
      
      <div
        className="pill-badge mb-4 w-fit text-xs"
        style={{ background: feature.iconBg, color: feature.iconColor }}>
        
        {feature.badge}
      </div>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: feature.iconBg }}>
        
        <Icon name={feature.icon as any} size={20} style={{ color: feature.iconColor }} />
      </div>
      <h3 className="text-base font-bold font-jakarta mb-2" style={{ color: '#1A2E35' }}>
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#5A7A82' }}>
        {feature.description}
      </p>
      <div className="mt-auto pt-4">
        <button
          className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
          style={{ color: feature.iconColor }}>
          
          Tìm hiểu thêm
          <Icon name="ArrowRightIcon" size={14} />
        </button>
      </div>
    </div>);

}

export default function FeaturesSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.15 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="Tính năng"
      className="w-full py-20 md:py-28"
      style={{ background: '#F0FAFA' }}>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={titleRef} className="reveal-hidden text-center mb-14">
          <div
            className="pill-badge mx-auto mb-4 w-fit"
            style={{ background: '#E6F7F7', color: '#0EA5A0' }}>
            
            <Icon name="SparklesIcon" size={12} />
            Tính năng nổi bật
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-jakarta mb-4"
            style={{ color: '#1A2E35', letterSpacing: '-0.02em' }}>
            
            Mọi thứ bạn cần biết{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0EA5A0, #14C8C2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              
              về thuốc
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#5A7A82' }}>
            Từ tra cứu thông tin đến kiểm tra tương tác — MediChat AI giúp bạn hiểu đúng và dùng thuốc an toàn.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1: large card (2 cols) + small card */}
          <FeatureCard feature={features[0]} delay={0.1} />
          <FeatureCard feature={features[1]} delay={0.2} />

          {/* Row 2: small + medium + medium */}
          <FeatureCard feature={features[2]} delay={0.1} />
          <FeatureCard feature={features[3]} delay={0.2} />
          <FeatureCard feature={features[4]} delay={0.3} />
        </div>
      </div>
    </section>);

}