# Quick Start Guide

Get up and running with the website development in 5 minutes.

## 🎯 For Content Writers

### Writing a New Blog Post

1. **Read the guidelines first:**
   ```bash
   cat _guide/blog/writing-guidelines.md
   ```

2. **Create your post:**
   ```bash
   # Create file in _posts/
   touch _posts/YYYY-MM-DD-your-post-title.md
   ```

3. **Use the template:**
   ```markdown
   ---
   layout: post-detail
   title: "Your Post Title (50-60 chars)"
   date: YYYY-MM-DD
   category: "Category Name"
   tags: ["tag1", "tag2", "tag3"]
   image: "/assets/images/posts/your-hero-image.svg"
   excerpt: "SEO description 150-160 characters"
   author: "Your Name"
   ---
   
   # Your Post Title
   
   Your content here...
   ```

4. **Add tooltips for technical terms:**
   ```html
   <span class="term-tooltip group relative inline cursor-help border-b border-dotted border-blue-600">
     Technical Term
     <span class="tooltip-content invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] max-w-[90vw] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 border border-gray-300 dark:border-gray-600 rounded-sm shadow-md transition-all duration-200 z-50">
       Brief definition here.
       <span class="tooltip-arrow"></span>
     </span>
   </span>
   ```

5. **Test locally:**
   ```bash
   bundle exec jekyll serve
   # Visit http://localhost:4000
   ```

---

## 💻 For Developers

### Setting Up Development Environment

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/yourrepo.git
   cd yourrepo
   ```

2. **Install dependencies:**
   ```bash
   bundle install
   ```

3. **Run development server:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Access the site:**
   ```
   http://localhost:4000
   ```

### Adding a New Component

1. **Create the component:**
   ```bash
   # Add CSS if needed
   touch assets/css/your-component.css
   
   # Add JS if needed
   touch assets/js/your-component.js
   ```

2. **Document it:**
   ```bash
   # Create documentation
   touch _guide/components/your-component-usage.md
   ```

3. **Update the index:**
   - Add to `_guide/README.md`
   - Add to `_guide/INDEX.md`

---

## 🔍 For SEO Optimization

### Optimizing a Page

1. **Check current status:**
   ```bash
   # View sitemap
   curl http://localhost:4000/sitemap.xml
   
   # Check robots.txt
   curl http://localhost:4000/robots.txt
   ```

2. **Add meta tags:**
   ```html
   <meta name="description" content="Your 150-160 char description">
   <meta name="keywords" content="keyword1, keyword2, keyword3">
   <link rel="canonical" href="https://yourdomain.com/page">
   ```

3. **Add schema markup:**
   ```html
   <script type="application/ld+json">
   {
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": "Your Article Title",
     "author": {
       "@type": "Person",
       "name": "Your Name"
     },
     "datePublished": "2026-03-22"
   }
   </script>
   ```

4. **Test performance:**
   - Visit [PageSpeed Insights](https://pagespeed.web.dev/)
   - Enter your URL
   - Fix issues

---

## 📝 Common Tasks

### Creating SVG Diagrams

```html
<svg role="img" aria-labelledby="title desc" viewBox="0 0 1200 600">
  <title id="title">Diagram Title</title>
  <desc id="desc">Detailed description</desc>
  <!-- Your SVG content -->
</svg>
```

**Requirements:**
- Include `title` and `desc` for accessibility
- Use `viewBox` for responsiveness
- High contrast colors (4.5:1 ratio)
- Minimum 14px font size

### Adding Internal Links

```markdown
Check out my [other post](/blog/2026/03/22/other-post-title.html)
```

### Adding External Links

```markdown
Learn more at [External Site](https://example.com){:target="_blank" rel="noopener"}
```

### Adding Images

```markdown
![Alt text](/assets/images/your-image.png)
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf _site .jekyll-cache

# Reinstall dependencies
bundle install

# Rebuild
bundle exec jekyll build
```

### Styles Not Loading

1. Check file path in `<head>`
2. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)
3. Verify CSS file exists in `assets/css/`

### Tooltip Not Working

1. Ensure `tooltip.css` is loaded
2. Check Tailwind CSS is available
3. Verify HTML structure matches documentation

### Images Not Showing

1. Check path is relative to root: `/assets/images/...`
2. Verify file exists in `assets/images/`
3. Check file extension matches (case-sensitive)

---

## 📚 Essential Reading

**Before you start:**
1. [Blog Writing Guidelines](_guide/blog/writing-guidelines.md) - **MUST READ**
2. [Tooltip Usage](_guide/components/tooltip-usage.md)
3. [SEO Guide](_guide/seo/crawling-guide.md)

**Reference:**
- [Quick Index](_guide/INDEX.md) - Code snippets
- [Main README](_guide/README.md) - Full documentation

---

## 🚀 Deployment

### Automatic Deployment (GitHub Pages)

```bash
# Commit your changes
git add .
git commit -m "Your commit message"

# Push to main branch
git push origin main

# GitHub Actions will automatically build and deploy
```

### Manual Build

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Output is in _site/ directory
```

---

## 💡 Pro Tips

1. **Use tooltips sparingly** - Only for truly technical terms
2. **Write for humans first** - SEO second
3. **Test on mobile** - Most users are on mobile devices
4. **Keep it simple** - Don't over-engineer
5. **Document everything** - Future you will thank you

---

## 🆘 Need Help?

- **Documentation:** Check `_guide/` folder
- **Issues:** Open a GitHub issue
- **Questions:** Contact the maintainer

---

**Ready to start?** Pick your role above and follow the steps! 🎉
