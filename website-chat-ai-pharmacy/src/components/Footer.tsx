import AppLogo from './ui/AppLogo';
import Icon from './ui/AppIcon';

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: '#1A2E35', color: '#8AACB4' }}
    >
      <div
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        {/* Logo + tagline */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="text-lg font-bold font-jakarta text-white">MediChat</span>
          </div>
          <p className="text-sm max-w-xs" style={{ color: '#5A7A82', lineHeight: 1.6 }}>
            AI dược học thế hệ mới — giúp mọi người hiểu đúng và dùng thuốc an toàn.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 flex-wrap text-sm" style={{ color: '#5A7A82' }}>
          {['Tính năng', 'Cách dùng', 'Đánh giá', 'Liên hệ'].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="transition-colors duration-200"
              onMouseEnter={(e) => (e.currentTarget.style.color = '#14C8C2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#5A7A82')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Social + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-3">
            {[
              { icon: 'EnvelopeIcon', label: 'Email' },
              { icon: 'PhoneIcon', label: 'Hotline' },
            ].map((social) => (
              <button
                key={social.label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#0EA5A0';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#0EA5A0';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
                aria-label={social.label}
              >
                <Icon name={social.icon as any} size={16} style={{ color: '#8AACB4' }} />
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#3A5A62' }}>
            © 2026 MediChat · Bảo mật · Điều khoản
          </p>
        </div>
      </div>
    </footer>
  );
}