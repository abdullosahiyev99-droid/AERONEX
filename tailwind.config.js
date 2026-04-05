/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink:    'var(--bg)',
        ink1:   'var(--bg1)',
        ink2:   'var(--bg2)',
        ink3:   'var(--bg3)',
        gold:   '#c9a84c',
        gold2:  '#e8c96a',
        gold3:  '#f5e6b0',
        rblue:  '#073590',
        rblue2: '#041f6e',
        sky:    '#1a9fff',
        sky2:   '#5bc4ff',
        agreen: '#2dcc8f',
        amber:  '#f5a623',
        text:   'var(--text)',
        text2:  'var(--text2)',
        text3:  'var(--text3)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
