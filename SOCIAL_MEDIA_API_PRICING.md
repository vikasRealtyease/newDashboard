# Social Media Analytics API Pricing Guide

## Overview
This document outlines which social media platform APIs are free vs paid for accessing analytics data.

---

## ✅ FREE Analytics APIs

### 1. **Meta (Facebook & Instagram) - Graph API**
**Cost**: FREE ✅
**What You Get**:
- Page insights (likes, reach, impressions, engagement)
- Post performance metrics
- Follower demographics
- Story insights
- Video metrics
- Best time to post data

**Requirements**:
- Facebook Business Account (Free)
- Meta Business Suite access (Free)
- App registration (Free)
- User must grant permissions

**API Endpoints**:
```
GET /{page-id}/insights
GET /{post-id}/insights
GET /{instagram-account-id}/insights
```

**Rate Limits**:
- 200 calls per hour per user
- 4800 calls per day per app

**Documentation**: https://developers.facebook.com/docs/graph-api/

---

### 2. **Instagram Business/Creator API**
**Cost**: FREE ✅
**What You Get**:
- Profile insights (followers, reach, impressions)
- Post metrics (likes, comments, saves, shares)
- Story metrics
- Reel performance
- Audience demographics
- Hashtag performance

**Requirements**:
- Instagram Business or Creator account (Free)
- Connected to Facebook Page (Free)
- Meta Graph API access (Free)

**API Endpoints**:
```
GET /{ig-user-id}/insights
GET /{ig-media-id}/insights
```

**Limitations**:
- Must be Business/Creator account (not personal)
- Data available for last 30 days for most metrics
- Some metrics require minimum follower count

---

### 3. **LinkedIn Pages API**
**Cost**: FREE ✅
**What You Get**:
- Page statistics (followers, views, clicks)
- Post analytics (impressions, clicks, engagement)
- Follower demographics
- Visitor analytics

**Requirements**:
- LinkedIn Company Page (Free)
- LinkedIn Developer App (Free)
- OAuth 2.0 authentication

**API Endpoints**:
```
GET /organizationalEntityShareStatistics
GET /organizationalEntityFollowerStatistics
```

**Rate Limits**:
- 100 requests per day per user (free tier)
- Can request higher limits

**Documentation**: https://docs.microsoft.com/en-us/linkedin/

---

### 4. **Twitter/X API v2 - Free Tier**
**Cost**: FREE (with limitations) ⚠️
**What You Get (Free Tier)**:
- Tweet metrics (likes, retweets, replies, impressions)
- Basic user metrics
- Limited to 1,500 tweets per month

**Requirements**:
- Twitter Developer Account (Free)
- App registration (Free)

**API Endpoints**:
```
GET /2/tweets/:id
GET /2/users/:id/tweets
```

**Limitations**:
- Only 1,500 tweets retrievable per month
- Limited historical data access
- No advanced analytics

**Upgrade Options**:
- **Basic**: $100/month (10,000 tweets)
- **Pro**: $5,000/month (1M tweets)

---

### 5. **TikTok Business API**
**Cost**: FREE ✅ (for organic content)
**What You Get**:
- Video views
- Likes, comments, shares
- Profile views
- Follower growth
- Video completion rate

**Requirements**:
- TikTok Business Account (Free)
- TikTok Developer Account (Free)
- OAuth authentication

**API Endpoints**:
```
GET /user/info/
GET /video/list/
```

**Limitations**:
- Only for TikTok Business accounts
- Limited historical data (90 days)
- Some advanced metrics require TikTok Ads account

---

### 6. **YouTube Analytics API**
**Cost**: FREE ✅
**What You Get**:
- Video views, watch time
- Likes, dislikes, comments
- Subscriber growth
- Traffic sources
- Audience demographics
- Revenue data (if monetized)

**Requirements**:
- YouTube Channel (Free)
- Google Cloud Project (Free)
- OAuth 2.0 authentication

**API Endpoints**:
```
GET /youtube/analytics/v2/reports
```

**Rate Limits**:
- 10,000 queries per day (free)

---

### 7. **Pinterest Analytics API**
**Cost**: FREE ✅
**What You Get**:
- Pin impressions
- Saves, clicks
- Profile visits
- Audience insights

**Requirements**:
- Pinterest Business Account (Free)
- Pinterest Developer App (Free)

**API Endpoints**:
```
GET /user_account/analytics
GET /pins/{pin_id}/analytics
```

---

## ❌ PAID Analytics APIs

### 1. **Twitter/X API v2 - Advanced**
**Cost**: $100 - $5,000/month
**Why Paid**:
- Access to more than 1,500 tweets
- Historical data access
- Advanced search
- Real-time streaming

---

### 2. **Third-Party Analytics Platforms**

#### **Sprout Social**
**Cost**: $249/month per user
**What You Get**:
- Unified analytics across all platforms
- Competitive analysis
- Custom reports
- Social listening
- Team collaboration

#### **Hootsuite Analytics**
**Cost**: $99 - $739/month
**What You Get**:
- Cross-platform analytics
- Custom reports
- ROI tracking
- Team performance

#### **Buffer Analyze**
**Cost**: $35 - $100/month
**What You Get**:
- Multi-platform analytics
- Custom reports
- Story analytics
- Hashtag tracking

---

## 💡 Recommended Strategy for RealtyEaseAI

### **Phase 1: Use FREE APIs** ✅

Build your analytics using the free platform APIs:

```typescript
// Example: Free API Integration
const platforms = {
  facebook: {
    api: 'Meta Graph API',
    cost: 'FREE',
    implementation: 'Direct integration'
  },
  instagram: {
    api: 'Instagram Business API',
    cost: 'FREE',
    implementation: 'Via Meta Graph API'
  },
  linkedin: {
    api: 'LinkedIn Pages API',
    cost: 'FREE',
    implementation: 'Direct integration'
  },
  twitter: {
    api: 'Twitter API v2 Free',
    cost: 'FREE (limited)',
    implementation: 'Direct integration',
    limitation: '1,500 tweets/month'
  },
  tiktok: {
    api: 'TikTok Business API',
    cost: 'FREE',
    implementation: 'Direct integration'
  }
};
```

### **Benefits**:
1. ✅ **Zero API costs**
2. ✅ **Direct platform data** (most accurate)
3. ✅ **Real-time updates**
4. ✅ **No middleman fees**
5. ✅ **Better profit margins**

### **Drawbacks**:
1. ❌ Need to integrate each platform separately
2. ❌ Different data formats per platform
3. ❌ Rate limits to manage
4. ❌ OAuth flows for each platform

---

## 🏗️ Implementation Architecture

### **Recommended Approach**:

```
Your Backend (Node.js/Python)
├── Meta Graph API Integration (Free)
│   ├── Facebook Page Insights
│   └── Instagram Business Insights
├── LinkedIn API Integration (Free)
│   └── Company Page Analytics
├── Twitter API Integration (Free Tier)
│   └── Tweet Analytics (1,500/month limit)
├── TikTok API Integration (Free)
│   └── Video Analytics
└── Data Aggregation Layer
    ├── Normalize data formats
    ├── Store in your database
    └── Serve to frontend
```

### **Database Schema**:

```sql
-- Store analytics data
CREATE TABLE social_analytics (
    id UUID PRIMARY KEY,
    client_id UUID,
    platform VARCHAR(50), -- facebook, instagram, linkedin, twitter, tiktok
    metric_type VARCHAR(50), -- followers, engagement, reach, impressions
    metric_value INTEGER,
    date DATE,
    post_id VARCHAR(255), -- if post-specific
    created_at TIMESTAMP DEFAULT NOW()
);

-- Store platform connections
CREATE TABLE platform_connections (
    id UUID PRIMARY KEY,
    client_id UUID,
    platform VARCHAR(50),
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP,
    account_id VARCHAR(255),
    connected_at TIMESTAMP DEFAULT NOW()
);
```

---

## 📊 Cost Comparison

### **Option 1: Build with Free APIs** (Recommended)
**Monthly Cost**: $0
**Setup Time**: 2-3 weeks
**Maintenance**: Low
**Data Accuracy**: High (direct from platforms)
**Profit Margin**: Maximum

### **Option 2: Use Sprout Social API**
**Monthly Cost**: $249/user
**Setup Time**: 1 week
**Maintenance**: Very Low
**Data Accuracy**: High
**Profit Margin**: Reduced by $249/client

### **Option 3: Use Buffer Analyze**
**Monthly Cost**: $35-100/month
**Setup Time**: 1 week
**Maintenance**: Low
**Data Accuracy**: Good
**Profit Margin**: Reduced by $35-100/client

---

## 🎯 Final Recommendation

### **For RealtyEaseAI: Use FREE Platform APIs**

**Why**:
1. **Cost**: $0 per month vs $35-249/month per client
2. **Scalability**: No per-client API costs
3. **Control**: Full control over data and features
4. **Margins**: Keep 100% of revenue
5. **Customization**: Build exactly what clients need

**Investment Required**:
- **Development Time**: 2-3 weeks
- **Developer Cost**: One-time (already have team)
- **Ongoing Maintenance**: Minimal

**ROI**:
- Save $35-249 per client per month
- With 100 clients: Save $3,500 - $24,900/month
- Annual savings: $42,000 - $298,800

---

## 🔧 Implementation Steps

### **Week 1: Meta (Facebook & Instagram)**
1. Create Meta Developer App
2. Implement OAuth flow
3. Fetch page/profile insights
4. Store in database
5. Display in dashboard

### **Week 2: LinkedIn & TikTok**
1. Set up LinkedIn Developer App
2. Implement LinkedIn OAuth
3. Set up TikTok Developer Account
4. Implement TikTok OAuth
5. Fetch and store analytics

### **Week 3: Twitter & Aggregation**
1. Set up Twitter Developer Account
2. Implement Twitter OAuth (with free tier limits)
3. Build data aggregation layer
4. Create unified analytics dashboard
5. Add caching for rate limit management

---

## 📝 Code Example: Meta Graph API

```typescript
// Example: Fetch Facebook Page Insights (FREE)
async function getFacebookPageInsights(pageId: string, accessToken: string) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${pageId}/insights?` +
    `metric=page_impressions,page_engaged_users,page_fans&` +
    `period=day&` +
    `access_token=${accessToken}`
  );
  
  const data = await response.json();
  return data;
}

// Example: Fetch Instagram Insights (FREE)
async function getInstagramInsights(igAccountId: string, accessToken: string) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${igAccountId}/insights?` +
    `metric=impressions,reach,follower_count,profile_views&` +
    `period=day&` +
    `access_token=${accessToken}`
  );
  
  const data = await response.json();
  return data;
}
```

---

## ✅ Conclusion

**Answer**: YES, you can get social media analytics for FREE! ✅

All major platforms (Facebook, Instagram, LinkedIn, TikTok, YouTube, Pinterest) offer FREE analytics APIs. Only Twitter has limitations on the free tier (1,500 tweets/month), but that's usually sufficient for most clients.

**Recommendation**: Build your own analytics integration using free platform APIs instead of paying for third-party services. This will:
- Save $35-249 per client per month
- Give you full control
- Provide better profit margins
- Allow custom features

---

*Last Updated: 2025-11-28*
*Document Version: 1.0*
