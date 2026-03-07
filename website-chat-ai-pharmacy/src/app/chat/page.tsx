import type { Metadata } from 'next';
import ChatPageClient from './components/ChatPageClient';

export const metadata: Metadata = {
  title: 'MediChat AI — Hỏi về thuốc',
  description: 'Trò chuyện trực tiếp với AI dược học MediChat. Hỏi về liều dùng, tương tác thuốc, tác dụng phụ và nhiều hơn nữa.',
};

export default function ChatPage() {
  return (
    <main className="h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #F0FAFA 0%, #E6F7F7 35%, #F5F0FF 70%, #FFF5F5 100%)' }}>
      <ChatPageClient />
    </main>
  );
}
