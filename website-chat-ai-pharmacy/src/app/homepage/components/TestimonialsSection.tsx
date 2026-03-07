'use client';

import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  id: 1,
  name: 'Nguyễn Thị Lan',
  role: 'Bệnh nhân tiểu đường',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1027e87ce-1771961372424.png",
  rating: 5,
  text: 'MediChat giúp tôi hiểu rõ hơn về Metformin và Glipizide. Trước đây tôi cứ lo lắng về tương tác thuốc, giờ tôi tự tin hơn nhiều khi uống thuốc đúng giờ.',
  tag: 'Tương tác thuốc'
},
{
  id: 2,
  name: 'Trần Văn Minh',
  role: 'Kỹ sư phần mềm',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_115b47405-1765244722348.png",
  rating: 5,
  text: 'Lúc 2 giờ sáng con tôi sốt cao, tôi hỏi MediChat về liều Paracetamol cho trẻ 8kg. Câu trả lời rõ ràng và nhanh hơn bất kỳ website nào tôi từng dùng.',
  tag: 'Liều dùng'
},
{
  id: 3,
  name: 'Lê Thị Hoa',
  role: 'Giáo viên tiểu học',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cadd7426-1766570888342.png",
  rating: 5,
  text: 'Tôi bị dị ứng thuốc và luôn lo lắng khi dùng thuốc mới. MediChat kiểm tra tương tác rất chi tiết, giúp tôi yên tâm hơn nhiều.',
  tag: 'Dị ứng thuốc'
},
{
  id: 4,
  name: 'Phạm Đức Hùng',
  role: 'Dược sĩ tại TP.HCM',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f17741ee-1765984216511.png",
  rating: 5,
  text: 'Dù là dược sĩ nhưng tôi vẫn dùng MediChat để tra nhanh khi cần. Thông tin cập nhật, nguồn đáng tin cậy. Tôi còn giới thiệu cho bệnh nhân của mình.',
  tag: 'Chuyên nghiệp'
},
{
  id: 5,
  name: 'Võ Thị Mai',
  role: 'Nội trợ, Hà Nội',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f492ef3c-1769353338275.png",
  rating: 5,
  text: 'Ông xã tôi uống thuốc huyết áp, tôi luôn hỏi MediChat trước khi cho ông ấy dùng thêm thuốc gì. An tâm lắm!',
  tag: 'Huyết áp'
},
{
  id: 6,
  name: 'Đinh Quang Thành',
  role: 'Sinh viên y khoa',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15c451a2c-1771447724015.png",
  rating: 5,
  text: 'Công cụ học tập tuyệt vời! MediChat giải thích cơ chế tác dụng của thuốc rất dễ hiểu, giúp tôi ôn thi dược lý hiệu quả hơn nhiều.',
  tag: 'Học tập'
},
{
  id: 7,
  name: 'Bùi Thị Thu',
  role: 'Y tá bệnh viện',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b23643b6-1766570889155.png",
  rating: 5,
  text: 'MediChat giúp tôi trả lời nhanh các câu hỏi của bệnh nhân về thuốc trong ca trực. Thông tin chính xác và dễ hiểu cho cả người không chuyên.',
  tag: 'Y tế'
},
{
  id: 8,
  name: 'Ngô Văn Tùng',
  role: 'Người cao tuổi, 68 tuổi',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12379136e-1766842959733.png",
  rating: 5,
  text: 'Tôi uống nhiều thuốc lắm, hay quên và nhầm lẫn. MediChat giải thích đơn giản, dễ hiểu dù tôi không rành công nghệ. Con cái tôi cài cho và tôi thích lắm!',
  tag: 'Người cao tuổi'
}];


function TestimonialCard({ testimonial }: {testimonial: (typeof testimonials)[0];}) {
  return (
    <div
      className="flex-shrink-0 w-[320px] md:w-[360px] rounded-4xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-default"
      style={{
        background: 'white',
        border: '1px solid #D1EAE9',
        boxShadow: '0 4px 20px rgba(14,165,160,0.06)'
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(14,165,160,0.15)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(14,165,160,0.06)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}>
      
      {/* Tag */}
      <div
        className="pill-badge w-fit text-xs"
        style={{ background: '#E6F7F7', color: '#0EA5A0' }}>
        
        {testimonial.tag}
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) =>
        <Icon key={i} name="StarIcon" size={14} variant="solid" style={{ color: '#F59E0B' }} />
        )}
      </div>

      {/* Text */}
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#5A7A82' }}>
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid #D1EAE9' }}>
        <AppImage
          src={testimonial.avatar}
          alt={`Ảnh đại diện của ${testimonial.name} - người dùng MediChat`}
          width={40}
          height={40}
          className="rounded-full object-cover flex-shrink-0" />
        
        <div>
          <p className="text-sm font-semibold" style={{ color: '#1A2E35' }}>
            {testimonial.name}
          </p>
          <p className="text-xs" style={{ color: '#8AACB4' }}>
            {testimonial.role}
          </p>
        </div>
        <div className="ml-auto">
          <Icon name="CheckBadgeIcon" size={18} style={{ color: '#0EA5A0' }} variant="solid" />
        </div>
      </div>
    </div>);

}

export default function TestimonialsSection() {
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

  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section
      id="Đánh giá"
      className="w-full py-20 md:py-28 overflow-hidden"
      style={{ background: '#F0FAFA' }}>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div ref={titleRef} className="reveal-hidden text-center">
          <div
            className="pill-badge mx-auto mb-4 w-fit"
            style={{ background: '#FFF0F0', color: '#FF6B6B' }}>
            
            <Icon name="HeartIcon" size={12} />
            Người dùng yêu thích
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-jakarta mb-4"
            style={{ color: '#1A2E35', letterSpacing: '-0.02em' }}>
            
            Hàng ngàn người{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
              
              tin tưởng
            </span>{' '}
            MediChat
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#5A7A82' }}>
            Từ bệnh nhân đến dược sĩ chuyên nghiệp — mọi người đều tìm thấy giá trị với MediChat.
          </p>

          {/* Aggregate stats */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) =>
                <Icon key={s} name="StarIcon" size={18} variant="solid" style={{ color: '#F59E0B' }} />
                )}
              </div>
              <span className="font-bold text-lg" style={{ color: '#1A2E35' }}>4.9</span>
              <span className="text-sm" style={{ color: '#8AACB4' }}>/ 5.0</span>
            </div>
            <div
              className="w-px h-6"
              style={{ background: '#D1EAE9' }} />
            
            <span className="text-sm" style={{ color: '#5A7A82' }}>
              Từ <strong style={{ color: '#1A2E35' }}>3,200+</strong> đánh giá
            </span>
          </div>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="marquee-container flex flex-col gap-5">
        {/* Row 1: left */}
        <div className="flex overflow-hidden">
          <div className="flex gap-5 animate-marquee">
            {[...firstRow, ...firstRow].map((t, i) =>
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
            )}
          </div>
        </div>

        {/* Row 2: right (reversed direction) */}
        <div className="flex overflow-hidden">
          <div
            className="flex gap-5"
            style={{ animation: 'marquee-left 25s linear infinite reverse' }}>
            
            {[...secondRow, ...secondRow].map((t, i) =>
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
            )}
          </div>
        </div>
      </div>
    </section>);

}