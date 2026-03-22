module.exports = {
    content: [
      './_layouts/**/*.html',
      './_includes/**/*.html',
      './_posts/**/*.md',
      './blogs/**/*.html',
      './blogs/*.html',
      './projects/**/*.html',
      './ecosystem/**/*.html',
      './*.html',
      './*.md',
      './assets/js/**/*.js'
    ],
    safelist: [
      'bg-yellow-200',
      'font-semibold',
      'line-clamp-2',
      'active',
      'bg-blue-600',
      'text-white',
      'border-blue-600',
      'shadow-md',
      'bg-gray-50',
      'text-gray-600',
      'border-gray-200',
      'hover:border-blue-300',
      'hover:bg-blue-50',
      'hover:text-blue-600',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
};