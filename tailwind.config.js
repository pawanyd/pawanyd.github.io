// tailwind.config.js
module.exports = {
    content: [
      './_layouts/**/*.html',
      './_includes/**/*.html',
      './_posts/**/*.md',
      './blog/**/*.html',
      './projects/**/*.html',
      './*.html',
      './*.md',
      './assets/js/**/*.js'
    ],
    safelist: [
      'bg-yellow-200',
      'font-semibold',
      'line-clamp-2'
    ],
    theme: {
      extend: {},
    },
    plugins: [],
};
  