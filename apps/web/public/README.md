# Public Assets Organization

This directory contains all static assets for the VirtualAssist AI web application.

## Directory Structure

```
public/
├── images/
│   ├── logos/           # Company logos, brand assets
│   ├── icons/           # SVG icons, favicons
│   ├── backgrounds/     # Background images, patterns
│   ├── team/            # Team member photos
│   └── products/        # Product screenshots, mockups
├── fonts/               # Custom web fonts (if not using CDN)
├── documents/           # PDFs, downloadable resources
├── videos/              # Video files, animations
└── README.md           # This file
```

## Usage Guidelines

### Images
- **Logos**: Place all company logos and brand assets here
  - Use descriptive names: `logo-primary.svg`, `logo-white.svg`
  - Keep multiple formats: SVG (preferred), PNG, WebP

- **Icons**: SVG icons and favicon files
  - Use consistent naming: `icon-[name].svg`
  - Include favicon.ico in root

- **Backgrounds**: Hero images, section backgrounds
  - Optimize for web (use WebP when possible)
  - Naming: `bg-[section]-[variant].webp`

- **Team**: Team member photos
  - Naming: `team-[firstname-lastname].jpg`
  - Recommended size: 400x400px minimum

- **Products**: Product screenshots, feature images
  - Naming: `product-[feature-name].png`
  - Use high-quality images, optimize file size

### Fonts
- Place custom font files here if not using Google Fonts CDN
- Include all necessary formats: woff2, woff, ttf
- Naming: `[font-name]-[weight].woff2`

### Documents
- PDFs, whitepapers, case studies
- Naming: `[type]-[name]-[date].pdf`
- Example: `whitepaper-ai-automation-2024.pdf`

### Videos
- Product demos, testimonial videos
- Use MP4 format for best compatibility
- Optimize file size, consider hosting on CDN for large files

## Best Practices

1. **Optimization**
   - Compress all images before uploading
   - Use WebP for images when possible
   - Use SVG for logos and icons

2. **Naming Conventions**
   - Use lowercase
   - Use hyphens for spaces
   - Be descriptive but concise
   - Include dimensions for multiple sizes: `logo-primary-200w.png`

3. **Organization**
   - Keep related assets together
   - Create subdirectories if a category grows large
   - Remove unused assets regularly

4. **Accessibility**
   - Provide alt text in code
   - Ensure sufficient contrast for text overlays
   - Test images at different screen sizes

## File Size Limits

- Images: < 500KB (optimize larger files)
- Videos: < 5MB (use external hosting for larger)
- Documents: < 2MB
- Fonts: < 100KB per file

## Next.js Image Optimization

When using images in Next.js components, use the `<Image>` component:

```tsx
import Image from 'next/image';

<Image 
  src="/images/logos/logo-primary.svg" 
  alt="VirtualAssist AI Logo"
  width={200}
  height={50}
/>
```

This enables automatic optimization, lazy loading, and responsive images.
