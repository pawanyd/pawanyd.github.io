# Tooltip System Usage Guide

## Overview
A Wikipedia-style tooltip system built with Tailwind CSS for displaying definitions and explanations of technical terms across the website.

## Features
- ✅ Built with Tailwind CSS utility classes
- ✅ Automatic light/dark mode support
- ✅ Wikipedia-style clean design
- ✅ Mobile-friendly and responsive
- ✅ Keyboard accessible
- ✅ Optional "Learn more" links
- ✅ Minimal custom CSS (only for arrow)

## Installation

### 1. Include the CSS file
Add to your layout's `<head>`:
```html
<link rel="stylesheet" href="/assets/css/tooltip.css">
```

### 2. Ensure Tailwind CSS is loaded
The tooltip uses Tailwind utility classes, so make sure Tailwind CSS is included in your project.

## Usage

### Basic Tooltip (without link)
```html
<span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">
  Term Name
  <span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
    Brief definition or explanation of the term (2-3 sentences max).
    <span class="tooltip-arrow"></span>
  </span>
</span>
```

### Tooltip with "Learn More" Link
```html
<span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">
  Chaos Monkey
  <span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
    A tool developed by Netflix that randomly terminates instances in production to test system resilience and ensure services can withstand failures.
    <a href="https://netflix.github.io/chaosmonkey/" target="_blank" rel="noopener" class="tooltip-link block mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-blue-600 dark:text-blue-400 hover:underline pointer-events-auto">
      Learn more →
    </a>
    <span class="tooltip-arrow"></span>
  </span>
</span>
```

## Tailwind Classes Breakdown

### Wrapper Classes
- `term-tooltip` - Custom class for identification
- `group` - Enables group-hover functionality
- `relative` - Positioning context
- `inline` - Inline display
- `cursor-help` - Help cursor (question mark)
- `border-b border-dotted border-blue-600` - Dotted underline

### Tooltip Content Classes
- `tooltip-content` - Custom class for identification
- `invisible group-hover:visible` - Show on hover
- `opacity-0 group-hover:opacity-100` - Fade in animation
- `absolute bottom-full left-1/2 -translate-x-1/2` - Positioning above term
- `mb-2` - Margin bottom for spacing
- `w-[300px] max-w-[90vw]` - Width with mobile fallback
- `bg-white dark:bg-gray-800` - Background (light/dark mode)
- `text-gray-900 dark:text-gray-100` - Text color (light/dark mode)
- `text-sm` - Font size
- `p-3` - Padding
- `border border-gray-300 dark:border-gray-600` - Border (light/dark mode)
- `rounded-sm` - Slight border radius
- `shadow-md` - Drop shadow
- `transition-all duration-200` - Smooth transitions
- `z-50` - High z-index
- `pointer-events-none group-hover:pointer-events-auto` - Enable clicks on hover

### Link Classes
- `tooltip-link` - Custom class for identification
- `block` - Block display
- `mt-2 pt-2` - Margin and padding top
- `border-t border-gray-200 dark:border-gray-700` - Top border separator
- `text-xs` - Small font size
- `text-blue-600 dark:text-blue-400` - Link color (light/dark mode)
- `hover:underline` - Underline on hover
- `pointer-events-auto` - Enable clicks

## Examples

### Technical Term
```html
<span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">
  Microservices
  <span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
    An architectural style that structures an application as a collection of small, independent services that communicate through APIs.
    <span class="tooltip-arrow"></span>
  </span>
</span>
```

### Database Term
```html
<span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">
  Sharding
  <span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
    A database partitioning technique that splits large datasets across multiple servers to improve performance and scalability.
    <a href="https://en.wikipedia.org/wiki/Shard_(database_architecture)" target="_blank" rel="noopener" class="tooltip-link block mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-blue-600 dark:text-blue-400 hover:underline pointer-events-auto">
      Learn more →
    </a>
    <span class="tooltip-arrow"></span>
  </span>
</span>
```

## Best Practices

1. **Keep definitions concise** - 2-3 sentences maximum
2. **Use simple language** - Avoid jargon in the definition
3. **Add links when helpful** - Link to official docs or detailed articles
4. **Don't overuse** - Only add tooltips for truly technical or unfamiliar terms
5. **Test on mobile** - Ensure tooltips don't overflow on small screens
6. **Keyboard accessible** - Tooltips work with focus for keyboard navigation

## Customization

### Change tooltip width
Modify the `w-[300px]` class:
```html
w-[400px]  <!-- Wider tooltip -->
w-[250px]  <!-- Narrower tooltip -->
```

### Change colors
Modify the color classes:
```html
<!-- Blue theme (default) -->
border-blue-600
text-blue-600 dark:text-blue-400

<!-- Green theme -->
border-green-600
text-green-600 dark:text-green-400

<!-- Purple theme -->
border-purple-600
text-purple-600 dark:text-purple-400
```

### Position tooltip below term
Change `bottom-full` to `top-full` and adjust arrow:
```html
<!-- Tooltip below -->
<span class="tooltip-content ... top-full ... mt-2">
  ...
</span>
```

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ Keyboard navigation

## Accessibility
- Dotted underline indicates interactive element
- `cursor-help` shows question mark cursor
- Works with keyboard focus (`:focus-visible`)
- Semantic HTML with proper link attributes
- High contrast in both light and dark modes

## Troubleshooting

### Tooltip not showing
- Ensure Tailwind CSS is loaded
- Check that `tooltip.css` is included
- Verify `group` class is on wrapper element

### Tooltip cut off on edges
- The `max-w-[90vw]` class prevents overflow
- For edge cases, consider positioning logic

### Dark mode not working
- Ensure your site has dark mode configured
- Check `prefers-color-scheme` media query support

## License
Free to use across the entire website.
