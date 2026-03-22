# Quick Reference Index

## 🎨 Components

### Tooltip System
**File:** [components/tooltip-usage.md](components/tooltip-usage.md)

**Quick Usage:**
```html
<span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">
  Term Name
  <span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50">
    Definition here...
    <span class="tooltip-arrow"></span>
  </span>
</span>
```

**CSS File:** `assets/css/tooltip.css`

---

## ✍️ Blog Writing

### Writing Guidelines
**File:** [blog/writing-guidelines.md](blog/writing-guidelines.md)

**Key Points:**
- Write like a human, not AI
- Include 5+ real-world company examples
- Create custom SVG diagrams
- No code blocks (use algorithm snippets)
- Keep paragraphs 2-4 sentences max
- SEO optimize: title 50-60 chars, description 150-160 chars

**Algorithm Snippet Usage:**
```html
<span data-algorithm="algorithm_key">Algorithm Name</span>
```

**SVG Requirements:**
- Include `<title>` and `<desc>` for accessibility
- Use proper viewBox dimensions
- High contrast colors (4.5:1 minimum)
- Readable font sizes (14px minimum)

---

## 🔍 SEO

### Crawling Guide
**File:** [seo/crawling-guide.md](seo/crawling-guide.md)

**Essential Checks:**
- ✅ Sitemap.xml present and valid
- ✅ Robots.txt configured
- ✅ Meta descriptions on all pages
- ✅ Canonical URLs set
- ✅ Schema markup added
- ✅ Page speed optimized

**Quick Commands:**
```bash
# Test sitemap
curl https://yourdomain.com/sitemap.xml

# Check robots.txt
curl https://yourdomain.com/robots.txt

# Validate HTML
validator https://yourdomain.com
```

---

## 🚀 Development

### GitHub Pages Setup
**File:** [development/github-pages-setup.md](development/github-pages-setup.md)

**Quick Setup:**
```bash
# Install dependencies
bundle install

# Build site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve

# Deploy (automatic on push to main)
git push origin main
```

**Important Files:**
- `_config.yml` - Jekyll configuration
- `Gemfile` - Ruby dependencies
- `.nojekyll` - Disable Jekyll processing (if needed)

---

## 📋 Checklists

### New Blog Post Checklist
- [ ] Read writing guidelines
- [ ] Create outline
- [ ] Write content (human voice)
- [ ] Add 5+ company examples
- [ ] Create SVG diagrams
- [ ] Add algorithm snippets (if DSA)
- [ ] Optimize SEO (title, description, keywords)
- [ ] Add internal links
- [ ] Proofread
- [ ] Test on mobile
- [ ] Check accessibility
- [ ] Verify all links work

### New Component Checklist
- [ ] Create component file
- [ ] Write documentation
- [ ] Add usage examples
- [ ] Test light/dark mode
- [ ] Test responsive design
- [ ] Check accessibility
- [ ] Add to this index
- [ ] Update main README

### SEO Optimization Checklist
- [ ] Add meta description
- [ ] Set canonical URL
- [ ] Add schema markup
- [ ] Optimize images (WebP, lazy load)
- [ ] Minify CSS/JS
- [ ] Test page speed
- [ ] Submit to Google Search Console
- [ ] Check mobile-friendliness

---

## 🔗 External Resources

### Design & UI
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [SVG Accessibility](https://www.w3.org/WAI/tutorials/images/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### SEO & Performance
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)

### Development
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

---

## 🆘 Common Issues

### Tooltip not showing
**Solution:** Ensure `tooltip.css` is loaded and Tailwind CSS is available

### Blog images not loading
**Solution:** Check image path is relative to site root: `/assets/images/...`

### Jekyll build fails
**Solution:** Run `bundle install` and check `_config.yml` syntax

### SEO not working
**Solution:** Verify sitemap.xml, robots.txt, and meta tags are present

---

**Quick Links:**
- [Main README](./)
- [Components](components/)
- [Blog](blog/)
- [SEO](seo/)
- [Development](development/)
