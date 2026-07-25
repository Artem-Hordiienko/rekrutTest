/** Wygenerowane z Zadanie_rekrutacyjne.fig - wartosci odczytane z wezlow, nie z oka. */
export default {
  content: ['./index.html', './app.js'],
  theme: {
    // siatka projektu: 1440, marginesy 89, gutter 64
    container: { center: true, padding: '89px', screens: { '2xl': '1440px' } },
    extend: {
      colors: {
        green: '#1B5B31',
        ink: '#111111',
        beige: '#DCC1AB',
        cream: '#F5F0EC',
        note: '#FFE6C0',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        eyebrow: ['0.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        body: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        h4: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.05em' }],
        h3: ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.05rem' }],
        h2: ['3rem', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        h1: ['3.75rem', { lineHeight: '70px', letterSpacing: '0' }],
      },
      borderRadius: {
        card: '28px',
        pill: '200px',
      },
      maxWidth: {
        content: '1262px', // 12 kolumn
        narrow: '1040px',  // kolumny 2-11
      },
      spacing: {
        gutter: '64px',
        margin: '89px',
        gallery: '42px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
      },
    },
  },
  plugins: [],
}
