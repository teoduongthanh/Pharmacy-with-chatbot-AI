import type { Metadata } from 'next';
import HomepageInteractive from './components/HomepageInteractive';

export const metadata: Metadata = {
  title: 'MediChat — AI Dược học thế hệ mới | Hỏi về thuốc bất kỳ lúc nào',
  description:
    'MediChat sử dụng AI tiên tiến để giải thích về thuốc, liều dùng, tương tác thuốc và tác dụng phụ. Chính xác, dễ hiểu, an toàn — 24/7.',
  keywords: ['thuốc', 'dược học', 'AI chatbot', 'tương tác thuốc', 'liều dùng', 'MediChat'],
  openGraph: {
    title: 'MediChat — AI Dược học thế hệ mới',
    description: 'Hỏi về thuốc bất kỳ lúc nào, nhận câu trả lời tức thì từ AI dược học.',
    type: 'website',
  },
};

export default function HomepagePage() {
  return (
    <main className="min-h-screen font-dm">
      <HomepageInteractive />
    </main>
  );
}