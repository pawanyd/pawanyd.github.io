# Quick Start Guide

Get up and running with the website features in 5 minutes.

## Tooltip System

Add tooltips to technical terms in your blog posts:

```liquid
{% include tooltip.html term="Chaos Monkey" definition="A tool by Netflix that randomly kills servers." link="https://netflix.github.io/chaosmonkey/" %}
```

**Parameters:**
- `term`: The word to show
- `definition`: Tooltip text
- `link`: Optional URL

## Writing Blog Posts

1. Create file: `_posts/YYYY-MM-DD-title.md`
2. Add front matter:
```yaml
---
layout: post
title: "Your Title"
date: YYYY-MM-DD
categories: [category1, category2]
---
```
3. Write content in Markdown
4. Add tooltips for technical terms
5. Test locally: `bundle exec jekyll serve`

## GitHub Pages Deployment

Push to main branch - automatic deployment via GitHub Actions.

## Documentation Structure

- `_guide/components/` - Component usage guides
- `_guide/blog/` - Blog writing guidelines
- `_guide/seo/` - SEO optimization
- `_guide/development/` - Setup and deployment

## Need Help?

Check the full documentation in `_guide/README.md`
