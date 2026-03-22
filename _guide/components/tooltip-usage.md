# Tooltip System Usage Guide

## Overview
The tooltip system provides Wikipedia-style tooltips for technical terms across the website. It's designed to be simple, accessible, and support both light and dark modes.

## Quick Start

### Simple Way (Recommended)
Use the Jekyll include component:

```liquid
{% include tooltip.html term="Chaos Monkey" definition="A tool by Netflix that randomly kills servers." link="https://netflix.github.io/chaosmonkey/" %}
```

### Parameters
- `term` (required): The term to display with dotted underline
- `definition` (required): The tooltip content/definition
- `link` (optional): URL for "Learn more" link

## Examples

### With Link
```liquid
{% include tooltip.html term="Chaos Monkey" definition="A tool developed by Netflix that randomly terminates instances in production to test system resilience." link="https://netflix.github.io/chaosmonkey/" %}
```

### Without Link
```liquid
{% include tooltip.html term="Microservices" definition="An architectural style that structures an application as a collection of loosely coupled services." %}
```

### In a Sentence
```markdown
Netflix's {% include tooltip.html term="Chaos Monkey" definition="A tool that randomly kills servers to test resilience." link="https://netflix.github.io/chaosmonkey/" %} helps test system reliability.
```

## Features
- ✅ Clean Wikipedia-style design
- ✅ Automatic light/dark mode support
- ✅ Smooth fade-in animation
- ✅ Mobile-friendly (responsive width)
- ✅ Keyboard accessible (focus state)
- ✅ Optional "Learn more" link
- ✅ Dotted blue underline
- ✅ Help cursor on hover

## Best Practices

1. **Keep definitions short**: 2-3 sentences maximum
2. **Use for technical terms**: Terms that readers might not know
3. **Add links when helpful**: Link to official docs or authoritative sources
4. **Don't overuse**: Only tooltip terms that truly need explanation
5. **Test on mobile**: Ensure tooltips are readable on small screens

## File Locations
- Component: `_includes/tooltip.html`
- Styles: `assets/css/tooltip.css`
- CSS Include: `_includes/css.html`

## Troubleshooting

**Tooltip not appearing?**
- Check that `tooltip.css` is loaded in `_includes/css.html`
- Verify the term has the correct classes
- Test on different browsers

**Styling issues?**
- Ensure Tailwind CSS is loaded before tooltip.css
- Check for CSS conflicts with other styles
- Verify dark mode classes are working

## Advanced: Manual HTML (Not Recommended)

If you need custom styling, you can use the raw HTML:

```html
<span class="term-tooltip relative inline cursor-help border-b border-dotted border-blue-600">
  Term Name
  <span class="tooltip-content absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50">
    Definition here...
    <span class="tooltip-arrow"></span>
  </span>
</span>
```

But the include method is much cleaner and easier to maintain!
