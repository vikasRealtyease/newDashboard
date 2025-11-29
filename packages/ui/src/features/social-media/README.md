# Social Media Management Components

This folder contains all components related to social media content management, scheduling, and analytics for RealtyEaseAI.

## Components

### 1. ContentCalendar
**File**: `ContentCalendar.tsx`

A comprehensive content calendar for managing social media posts across multiple platforms.

**Features**:
- 📅 Visual calendar view (month-based)
- 📋 List view for detailed post management
- 🎯 Multi-platform support (Facebook, Instagram, LinkedIn, Twitter, TikTok)
- 📊 Post status tracking (draft, pending approval, approved, scheduled, published, failed)
- 📈 Quick stats overview
- 🔍 Filter and search capabilities

**Usage**:
```tsx
import { ContentCalendar } from '@realtyeaseai/ui';

function SocialMediaPage() {
  return <ContentCalendar />;
}
```

---

### 2. PostCreator
**File**: `PostCreator.tsx`

A powerful post creation interface with multi-platform support and AI assistance.

**Features**:
- 🎨 Platform selection (Facebook, Instagram, LinkedIn, Twitter, TikTok)
- ✍️ Caption editor with character count per platform
- #️⃣ Hashtag management
- 📸 Media upload (images/videos)
- 📅 Scheduling with date/time picker
- 👁️ Live preview for each platform
- ✨ AI content assistance (caption generation, hashtag suggestions, image creation)
- 💾 Save as draft functionality

**Usage**:
```tsx
import { PostCreator } from '@realtyeaseai/ui';

function CreatePostPage() {
  return <PostCreator />;
}
```

**AI Features**:
- Generate Caption
- Suggest Hashtags
- Improve Copy
- Create Image (AI-generated)

---

### 3. SocialMediaAnalytics
**File**: `SocialMediaAnalytics.tsx`

Analytics dashboard for tracking social media performance across all platforms.

**Features**:
- 📊 Overall performance metrics
  - Total Followers
  - Engagement Rate
  - Total Reach
  - Posts Published
- 📱 Platform-specific breakdowns
- 🏆 Top performing posts
- 📈 Trend indicators
- 💬 Engagement metrics (likes, comments, shares, reach)
- 📉 Growth charts (placeholder for future integration)

**Usage**:
```tsx
import { SocialMediaAnalytics } from '@realtyeaseai/ui';

function AnalyticsPage() {
  return <SocialMediaAnalytics />;
}
```

---

## Integration Points

### Future API Integrations

#### Social Media Publishing
- **Buffer API** - Post scheduling and publishing
- **Hootsuite API** - Alternative scheduling platform
- **Meta Business Suite API** - Direct Facebook/Instagram posting
- **LinkedIn API** - Professional network posting
- **Twitter API** - Tweet publishing
- **TikTok API** - Short-form video posting

#### Analytics
- **Meta Insights API** - Facebook/Instagram analytics
- **LinkedIn Analytics API** - Professional network metrics
- **Twitter Analytics API** - Tweet performance
- **Google Analytics** - Website traffic from social

#### AI Tools
- **OpenAI API** - Caption generation, content improvement
- **Anthropic Claude API** - Alternative AI content generation
- **DALL-E / Midjourney** - AI image generation
- **Canva API** - Design templates

---

## Data Models

### Post Interface
```typescript
interface Post {
  id: string;
  title: string;
  platform: string[];  // ['facebook', 'instagram', 'linkedin', 'twitter', 'tiktok']
  scheduledDate: Date;
  status: 'draft' | 'pending_approval' | 'approved' | 'scheduled' | 'published' | 'failed';
  caption: string;
  mediaUrl?: string;
  hashtags: string[];
  createdBy: string;  // VA ID
  clientId: string;
  approvedBy?: string;
  approvedAt?: Date;
  publishedAt?: Date;
  platformPostIds?: Record<string, string>;  // { facebook: '123', instagram: '456' }
  analytics?: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    impressions: number;
  };
}
```

### Platform Interface
```typescript
interface Platform {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  characterLimit?: number;
  connected: boolean;
  accessToken?: string;
  accountId?: string;
}
```

---

## Workflow

### Content Creation & Approval Flow

```
1. VA Creates Post (PostCreator)
   ↓
2. Save as Draft
   ↓
3. Submit for Client Approval
   ↓
4. Client Reviews (ContentCalendar)
   ↓
5. Client Approves/Requests Changes
   ↓
6. VA Schedules Post (if approved)
   ↓
7. Post Published (via API integration)
   ↓
8. Analytics Tracked (SocialMediaAnalytics)
```

---

## Styling & Theming

All components use the shared design system:
- **Colors**: Brand colors from `globals.css`
- **Components**: shadcn/ui primitives
- **Icons**: Lucide React + Emoji
- **Animations**: Framer Motion (where applicable)

---

## Future Enhancements

### Phase 1 (Current)
- ✅ Content Calendar UI
- ✅ Post Creator UI
- ✅ Analytics Dashboard UI

### Phase 2 (Next)
- 🔨 Buffer/Hootsuite API integration
- 🔨 Real-time post publishing
- 🔨 Approval workflow backend
- 🔨 Database schema implementation

### Phase 3 (Future)
- 🔨 AI content generation integration
- 🔨 Advanced analytics with charts
- 🔨 Bulk scheduling
- 🔨 Content library/templates
- 🔨 Competitor analysis
- 🔨 Best time to post recommendations
- 🔨 Hashtag performance tracking

### Phase 4 (Advanced)
- 🔨 Social listening
- 🔨 Influencer collaboration
- 🔨 Ad campaign management
- 🔨 ROI tracking
- 🔨 White-label options

---

## Best Practices

### For VAs
1. Always add relevant hashtags
2. Schedule posts during optimal times
3. Include high-quality media
4. Write platform-specific captions
5. Submit for approval 24h before scheduled time

### For Clients
1. Review posts within 24 hours
2. Provide clear feedback on revisions
3. Approve posts at least 12h before scheduled time
4. Check analytics weekly
5. Communicate brand guidelines clearly

---

## Support & Documentation

For questions or issues:
1. Check component props and interfaces
2. Review usage examples above
3. Consult PRODUCT_STRATEGY.md for integration details
4. Contact development team

---

*Last Updated: 2025-11-28*
*Version: 1.0.0*
