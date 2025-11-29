# Project Structure Documentation

## Overview
This document outlines the organization of the VirtualAssist AI web application for scalability and maintainability.

## Directory Structure

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (routes)/
│   │   ├── about/               # About page
│   │   ├── careers/             # Careers page
│   │   ├── contact/             # Contact page
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── onboarding/          # Onboarding flow
│   │   ├── pricing/             # Pricing page
│   │   ├── product/             # Product page
│   │   └── services/            # Services pages
│   │       ├── [slug]/          # Dynamic service pages
│   │       ├── data.tsx         # Services data
│   │       └── page.tsx         # Services overview
│   ├── components/              # App-level components
│   │   ├── AnimatedSection.tsx
│   │   └── GradientBlob.tsx
│   ├── lib/                     # Utility functions
│   ├── ui/                      # Subframe UI components
│   │   └── components/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── favicon.ico              # Favicon
├── components/                   # Shared components
│   ├── AboutSection.tsx
│   ├── BackgroundPatterns.tsx
│   ├── ContactSection.tsx
│   ├── EnterpriseCards.tsx      # Reusable card components
│   ├── EnterpriseComponents.tsx # Reusable UI components
│   ├── Footer.tsx
│   ├── LoginForm.tsx
│   ├── Navbar.tsx
│   ├── NewOnboardingFlow.tsx
│   ├── OnboardingFlow.tsx
│   ├── PricingSection.tsx
│   ├── ProductSection.tsx
│   └── SignupForm.tsx
├── public/                       # Static assets
│   ├── images/
│   │   ├── logos/
│   │   ├── icons/
│   │   ├── backgrounds/
│   │   ├── team/
│   │   └── products/
│   ├── fonts/
│   ├── documents/
│   └── videos/
├── .subframe/                    # Subframe configuration
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Component Organization

### App Components (`app/components/`)
- Components specific to app router functionality
- Utility components used across multiple routes
- Examples: AnimatedSection, GradientBlob

### Shared Components (`components/`)
- Reusable components used across the application
- Page sections (AboutSection, ContactSection, etc.)
- Forms (LoginForm, SignupForm, OnboardingFlow)
- Layout components (Navbar, Footer)
- Enterprise components (EnterpriseCards, EnterpriseComponents)

### UI Components (`app/ui/components/`)
- Subframe-generated UI components
- Base components (Button, Badge, etc.)
- Should not be manually edited

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `EnterpriseCards.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Styles**: kebab-case (e.g., `globals.css`)

### Components
- **Sections**: `[Name]Section` (e.g., `AboutSection`)
- **Forms**: `[Name]Form` (e.g., `LoginForm`)
- **Cards**: `[Type]Card` (e.g., `TestimonialCard`)
- **Layouts**: `[Name]` (e.g., `Navbar`, `Footer`)

## Code Organization Best Practices

### 1. Component Structure
```tsx
// Imports
import { ... } from '...';

// Types/Interfaces
interface ComponentProps {
  ...
}

// Constants
const CONSTANT_VALUE = ...;

// Component
export function Component({ props }: ComponentProps) {
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return (...);
}
```

### 2. File Organization
- Keep related components together
- Extract reusable logic into hooks
- Use barrel exports (index.ts) for cleaner imports
- Limit file size to ~300 lines

### 3. Styling
- Use Tailwind CSS utility classes
- Create custom utilities in `globals.css` for repeated patterns
- Use CSS modules for component-specific styles if needed

## Data Management

### Services Data (`app/services/data.tsx`)
- Centralized data for all services
- Type-safe with TypeScript
- Easy to extend and maintain

### Future Considerations
- Move to CMS for content management
- Add API routes for dynamic data
- Implement data fetching with React Query

## Scalability Guidelines

### Adding New Pages
1. Create folder in `app/[page-name]/`
2. Add `page.tsx` for the route
3. Create section components in `components/` if reusable
4. Update navigation in `Navbar.tsx`
5. Add to sitemap

### Adding New Components
1. Determine if app-specific or shared
2. Place in appropriate directory
3. Follow naming conventions
4. Add TypeScript types
5. Document props with JSDoc comments

### Adding New Services
1. Add service data to `app/services/data.tsx`
2. Service page auto-generates from data
3. Add to footer navigation
4. Update services overview page

## Performance Optimization

### Images
- Use Next.js Image component
- Store in `/public/images/`
- Optimize before uploading
- Use WebP format

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting (automatic with App Router)
- Lazy load below-the-fold content

### Caching
- Leverage Next.js caching
- Use ISR for semi-static pages
- Implement service worker for offline support

## Testing Structure
```
apps/web/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
```

## Environment Variables
```
.env.local          # Local development
.env.development    # Development environment
.env.production     # Production environment
```

## Deployment
- Build: `npm run build`
- Preview: `npm run start`
- Deploy: Vercel (recommended) or custom hosting

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and remove unused components
- Optimize images and assets
- Update documentation
- Run accessibility audits

### Code Quality
- ESLint for code quality
- Prettier for formatting
- TypeScript for type safety
- Husky for pre-commit hooks

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Subframe](https://www.subframe.com/docs)
