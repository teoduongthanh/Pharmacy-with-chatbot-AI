/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#0EA5A0',
          light: '#14C8C2',
          dark: '#0A7A76',
          50: '#F0FAFA',
          100: '#CCEFEE',
          200: '#99DFDE',
          300: '#66CFCD',
          400: '#33BFBC',
          500: '#0EA5A0',
          600: '#0A7A76',
          700: '#075552',
          800: '#042F2E',
          900: '#021A1A',
        },
        accent: {
          DEFAULT: '#FF6B6B',
          light: '#FF8E8E',
          dark: '#E54545',
        },
        indigo: {
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        surface: '#FFFFFF',
        muted: '#5A7A82',
        border: '#D1EAE9',
        bg: '#F0FAFA',
        text: {
          DEFAULT: '#1A2E35',
          muted: '#5A7A82',
          light: '#8AACB4',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'teal-sm': '0 4px 16px rgba(14, 165, 160, 0.12)',
        'teal-md': '0 8px 32px rgba(14, 165, 160, 0.18)',
        'teal-lg': '0 16px 64px rgba(14, 165, 160, 0.22)',
        'teal-xl': '0 24px 80px rgba(14, 165, 160, 0.28)',
        'accent-sm': '0 4px 16px rgba(255, 107, 107, 0.15)',
        'card': '0 2px 20px rgba(26, 46, 53, 0.06)',
        'card-hover': '0 12px 48px rgba(26, 46, 53, 0.12)',
      },
      animation: {
        'float': 'float-up-down 4s ease-in-out infinite',
        'float-slow': 'float-up-down-slow 6s ease-in-out infinite',
        'marquee': 'marquee-left 30s linear infinite',
        'marquee-fast': 'marquee-left 20s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-scale': 'fade-in-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'float-up-down': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-up-down-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
};