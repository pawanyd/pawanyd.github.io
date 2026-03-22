# GitHub Pages Project Memory & Setup Guide

**Project**: pawanyd.github.io  
**Hosting**: GitHub Pages (Jekyll-based static site)  
**Repository**: GitHub Pages repository  
**Domain**: pawanyd.github.io (GitHub Pages domain)  
**Date Created**: January 25, 2026

---

## GitHub Pages Fundamentals

### What We're Working With
- **Static Site Generator**: Jekyll (configured in _config.yml)
- **Build Process**: Automatic Jekyll build on every push to main/master branch
- **Deployment**: Automatic - pushes to GitHub Pages are live within seconds
- **Build Environment**: GitHub's hosted Jekyll environment (ruby + gems)
- **Serves From**: /site or root directory (check _config.yml for build destination)

### Key Constraints
1. **Limited Jekyll Plugins**: Only GitHub Pages-approved plugins work
2. **No Custom Build Scripts**: Can't run arbitrary npm/custom build tools
3. **Build Time Limit**: ~10 minutes per build
4. **Storage Limit**: 1GB soft limit per repository
5. **No Server-Side Code**: Static only (no Node.js, Python, PHP, etc.)
6. **No Database**: Everything must be data files (YAML, JSON, Markdown)
7. **HTTPS Enforced**: Automatic, no HTTP access
8. **Custom Domain**: CNAME file required (already present)

---

## Current Project Architecture

### File Structure
```
pawanyd.github.io/
├── _config.yml              # Jekyll configuration
├── _layouts/                # HTML templates (default, post, profile, etc.)
├── _includes/               # Reusable components (header, footer, etc.)
├── _posts/                  # Blog posts in Markdown
├── _data/                   # YAML data files (projects.yml, blog.yml, etc.)
├── _sass/                   # SCSS files
├── assets/                  # Images, CSS, JS
├── blog/                    # Blog page (Jekyll generates from _posts)
├── projects/                # Projects page (static HTML generated)
├── contact.html             # Contact form page
├── index.html               # Homepage
├── about.md                 # About page (converted to HTML via layout)
├── sitemap.xml              # XML sitemap
├── robots.txt               # Search engine directives
├── sw.js                    # Service worker
├── manifest.json            # PWA manifest
├── Gemfile                  # Ruby dependencies
└── _site/                   # Generated static site (don't edit!)
```

### Key Configuration (from _config.yml)
```yaml
title: Pawan Yadav
baseurl: ""
url: "https://pawanyd.github.io"
permalink: /blog/:year/:month/:day/:title.html
paginate: 3
plugins:
  - jekyll-feed
  - jekyll-paginate
  - jekyll-postcss
```

---

## GitHub Pages Approved Jekyll Plugins

### Currently Enabled (WORKING ✅)
- `jekyll-feed` - Generates RSS feed
- `jekyll-paginate` - Pagination for blog
- `jekyll-postcss` - PostCSS processing

### Available for Use
- `jekyll-gist` - Embed GitHub gists
- `jekyll-mentions` - @mentions in posts
- `jekyll-redirect-from` - Redirect old URLs
- `jekyll-relative-links` - Relative link handling
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-sitemap` - Sitemap generation
- `jekyll-github-metadata` - GitHub data
- `jekyll-commonmark-ghpages` - Markdown processor

### NOT AVAILABLE ❌
- Custom Ruby plugins
- Anything requiring special build scripts
- npm-based build tools (must be pre-built)

---

## Development & Deployment Workflow

### Local Development
```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Server runs at: http://localhost:4000
# Auto-reloads on file changes
```

### Making Changes
1. **Edit files locally** in workspace
2. **Test with `jekyll serve`** on localhost
3. **Push to GitHub** (`git push origin main`)
4. **GitHub auto-builds** Jekyll
5. **Live in seconds** at pawanyd.github.io

### CI/CD Process
- GitHub Actions (if configured) or automatic GitHub Pages build
- Build artifacts go to `_site/` (don't commit this!)
- Only source files should be committed

---

## What We CAN Do ✅

### Content Updates
- ✅ Add/edit blog posts in `_posts/` (Markdown)
- ✅ Update `_data/*.yml` files
- ✅ Modify `_layouts/` templates
- ✅ Add/edit includes in `_includes/`
- ✅ Write SCSS in `_sass/`
- ✅ Add static pages (HTML or Markdown)
- ✅ Update `_config.yml` settings
- ✅ Add approved Jekyll plugins

### Frontend Features
- ✅ HTML/CSS/JavaScript (all vanilla or CDN)
- ✅ Form handling (via external service like Formspree)
- ✅ Service Workers (sw.js)
- ✅ PWA features (manifest.json)
- ✅ Client-side JavaScript (no Node.js required)
- ✅ Embedded content (iframes, external scripts)
- ✅ Analytics/tracking (Google Tag Manager, etc.)

### Static Content
- ✅ Images (PNG, JPG, WebP, SVG)
- ✅ Videos (embedded from external sources)
- ✅ PDF downloads
- ✅ JSON/YAML data files
- ✅ XML feeds (RSS, sitemap)

---

## What We CANNOT Do ❌

### Server-Side Features
- ❌ Node.js scripts or npm build pipelines
- ❌ Database connections
- ❌ Server-side authentication
- ❌ Custom API endpoints
- ❌ Server-side form processing (must use external service)
- ❌ Custom Docker containers
- ❌ Python or other server-side languages

### Build Tools
- ❌ Custom build scripts
- ❌ Webpack/Vite bundling (pre-build locally if needed)
- ❌ Jest/complex test frameworks
- ❌ Custom Ruby gems (unless approved)
- ❌ npm post-install scripts

### Dynamic Features
- ❌ Server-side pagination
- ❌ Real-time updates
- ❌ Server-side search
- ❌ Dynamic content generation
- ❌ WebSocket connections
- ❌ Server sessions

---

## Implementation Strategy for Improvements

### For Content Tasks ✅ STRAIGHTFORWARD
- Blog posts: Add to `_posts/` with frontmatter
- Project updates: Modify `_data/projects.yml`
- Skills/experience: Update `_data/about.yml`
- Navigation: Edit `_data/navigation.yml`
- Social links: Update `_data/social.yml`

### For Feature Tasks ⚠️ NEEDS PLANNING
1. **Search** (Currently NOT possible server-side)
   - Solution: Use Lunr.js (client-side) or embed Algolia search
   - Implementation: Add JavaScript to search page

2. **Comments** (Not built-in)
   - Solution: Use Giscus (GitHub-based), Disqus, or Utterances
   - Implementation: Add script to post footer

3. **Related Posts** (Not automatic)
   - Solution: Use Liquid templating to find related by tags/categories
   - Implementation: Modify `_includes/post-footer.html`

4. **GitHub Widget** (Requires API calls)
   - Solution: Use external service or client-side API calls
   - Implementation: Add JavaScript with GitHub API calls

5. **RSS Feed** (WORKING ✅)
   - Already enabled via jekyll-feed plugin
   - Located at: /feed.xml

### For Design/Performance Tasks ⚠️ BUILD LOCALLY FIRST
1. **CSS Optimization** (Tailwind CSS)
   - Built with Tailwind v3 (already working via jekyll-postcss)
   - Edits to tailwind.config.js rebuild on push

2. **Image Optimization** (Must do locally)
   - Convert images to WebP locally
   - Create srcset variations locally
   - Then commit optimized versions

3. **JavaScript Enhancement**
   - Add vanilla JS (no npm packages)
   - Or link to CDN libraries
   - Test on localhost first

---

## Git Workflow for This Project

### Before Making Changes
```bash
# Update from remote
git pull origin main

# Create feature branch (optional but recommended)
git checkout -b feature/github-integration
```

### Making Changes
```bash
# Edit files locally
# Test with: bundle exec jekyll serve

# Check what changed
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add: GitHub contributions widget to homepage"

# Push to repository
git push origin feature/github-integration
# OR push to main
git push origin main
```

### Testing Before Push
```bash
# Install gems
bundle install

# Start local server
bundle exec jekyll serve

# Visit http://localhost:4000
# Test all changes before committing
```

---

## Important Files to NEVER Commit

```
# Auto-generated
_site/                    # Build output (generated by Jekyll)
.jekyll-cache/           # Cache files
.bundle/                 # Bundle cache

# Local development
.DS_Store                # macOS files
*.log                    # Log files
node_modules/            # If you ever install npm packages

# Optional
.env                     # Environment variables (if used)
*.swp, *.swo            # Editor temp files
```

### .gitignore Should Include
```
_site
.jekyll-cache
.bundle
.DS_Store
Gemfile.lock (sometimes, check project's current setting)
```

---

## Common GitHub Pages Issues & Solutions

### Issue: Build Failed Notification
**Problem**: GitHub Pages build failed  
**Solution**:
1. Check GitHub Actions logs (Settings → Pages)
2. Common causes:
   - Invalid YAML in `_config.yml` or `_data/`
   - Unsupported Jekyll plugin
   - Missing Gemfile
3. Fix locally: `bundle exec jekyll build`

### Issue: RSS Feed Not Generating
**Problem**: `/feed.xml` is 404  
**Solution**:
1. Ensure `jekyll-feed` plugin in `_config.yml`
2. Run `bundle install`
3. Check Gemfile includes jekyll-feed
4. Local test: `bundle exec jekyll serve`

### Issue: Images Not Showing
**Problem**: Image links broken  
**Solution**:
1. Check image paths (use relative or baseurl)
2. Verify images in `/assets/images/`
3. Check file extensions match
4. Use: `{{ '/assets/images/file.jpg' | relative_url }}`

### Issue: CSS Not Updating
**Problem**: Old CSS cached  
**Solution**:
1. Hard refresh browser (Cmd+Shift+R)
2. Clear browser cache
3. Check CSS compiles locally
4. Verify Tailwind config file

### Issue: Custom Domain Not Working
**Problem**: Domain not resolving  
**Solution**:
1. Check CNAME file contains correct domain
2. Verify DNS records point to GitHub Pages
3. Check Settings → Pages for custom domain
4. Wait 24 hours for DNS propagation

---

## Development Environment Checklist

### Required
- [ ] Ruby 2.7+ installed (`ruby --version`)
- [ ] Bundler installed (`gem install bundler`)
- [ ] Git configured
- [ ] Text editor (VS Code recommended)

### Setup Steps
```bash
# Clone repository
git clone https://github.com/pawanyd/pawanyd.github.io.git
cd pawanyd.github.io

# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Open browser to http://localhost:4000
```

### Verify Setup
- Homepage loads correctly
- Blog posts display
- Projects page works
- No build errors in terminal
- CSS/styling applies

---

## Deployment Checklist for Each Change

Before pushing to GitHub:
- [ ] Local test with `jekyll serve` works
- [ ] No console errors in browser
- [ ] All links work (relative paths correct)
- [ ] Images display correctly
- [ ] No uncommitted changes beyond intended edits
- [ ] YAML files are valid (no syntax errors)
- [ ] New blog posts have correct frontmatter
- [ ] No `_site/` folder committed

---

## Key Constraints for Improvement Tasks

### Blog Content Tasks ✅
- Add blog posts in Markdown to `_posts/`
- Update blog metadata in `_data/blog.yml`
- All posts must have frontmatter (title, date, layout)
- Markdown syntax fully supported

### Project Showcase Tasks ✅
- Update `_data/projects.yml` with new data
- Replace placeholder images in `/assets/images/posts/`
- Update project cards in `projects.html`
- Links must be relative or use {{ site.baseurl }}

### Feature Enhancement Tasks ⚠️ CONDITIONAL
- **GitHub Integration**: Requires external API calls (JavaScript + GitHub API)
- **Search**: Requires Lunr.js (client-side JavaScript)
- **Comments**: Requires Giscus/Disqus embed script
- **Related Posts**: Requires Liquid template logic (Jekyll-native ✅)
- **Newsletter**: Requires external service embed

### Performance Optimization Tasks ⚠️ HYBRID
- **Image Optimization**: Prepare locally, commit optimized versions
- **Minification**: Tailwind/CSS handled by jekyll-postcss
- **Caching**: Service worker (sw.js) is vanilla JavaScript ✅

### Accessibility Tasks ✅
- ARIA attributes: Add to HTML/Liquid templates
- Focus styles: CSS in main.scss
- Semantic HTML: Edit layouts and includes
- All pure HTML/CSS enhancements

---

## Next Steps for Implementation

1. **Verify Local Setup**
   ```bash
   bundle install
   bundle exec jekyll serve
   # Should run without errors
   ```

2. **Branch Strategy**
   - Create feature branches for major changes
   - Use descriptive branch names: `feature/github-widget`, `content/blog-posts`
   - Merge to main when tested locally

3. **Content First Approach**
   - Phase 1 focuses on content (blog posts, project images) - Easy ✅
   - Then features (filtering, search, comments) - Medium ⚠️
   - Finally optimizations (images, CSS, performance) - Involves build ⚠️

4. **Testing Each Change**
   - Local: `bundle exec jekyll serve`
   - Visual check at http://localhost:4000
   - Open console for JS errors
   - Push only when locally verified

---

## Resources & References

### GitHub Pages Documentation
- [GitHub Pages Official Docs](https://docs.github.com/en/pages)
- [Supported Jekyll Plugins](https://pages.github.com/versions/)
- [Configuring Jekyll](https://jekyllrb.com/docs/configuration/)

### Jekyll Documentation
- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Liquid Templating](https://shopify.github.io/liquid/)
- [Jekyll Collections](https://jekyllrb.com/docs/collections/)

### Your Current Setup
- **Main Branch**: Check GitHub repo settings for source branch
- **Build Settings**: Settings → Pages (should show "GitHub Pages" active)
- **Custom Domain**: CNAME file already present
- **SSL Certificate**: Automatic (GitHub-managed)

