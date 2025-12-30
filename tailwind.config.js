module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e293b', // dark blue-gray bg
        secondary: '#0f172a',
        accent: '#3b82f6',  // blue-500
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}
