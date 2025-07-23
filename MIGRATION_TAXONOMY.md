# Migration Taxonomy - Seer.ai Feed Restructure

## Overview
This document outlines the migration from the original onboarding-based feed to a Netflix-style feed layout with personalization.

## Architecture Changes

### 1. Routing Structure
- **OLD**: `/` (Index with onboarding) → personalized feed
- **NEW**: `/` → `/feed` (landing page with Netflix-style rows)
- **NEW**: `/personalize` → onboarding flow for feed customization

### 2. Feed Layout Migration
- **FROM**: Single column story list with filters
- **TO**: Horizontal scrollable rows (Netflix-style) with story cards

### 3. Personalization Flow
- **FROM**: Mandatory onboarding before feed access
- **TO**: Optional personalization with public feed as default

## Component Changes

### New Components Created
1. **`FeedRow`** (`src/components/feed/feed-row.tsx`)
   - Horizontally scrollable story cards
   - Maintains all original story card elements
   - Responsive design with scroll indicators

2. **`Feed`** (`src/pages/Feed.tsx`)
   - Netflix-style layout with multiple rows
   - Context-aware personalization based on localStorage
   - Default public rows vs. personalized rows

3. **`Personalize`** (`src/pages/Personalize.tsx`)
   - Relocated onboarding flow
   - Saves to localStorage.user_preferences
   - Redirects to /feed after completion

### Modified Components
1. **`Sidebar`** - Added "Personalize" navigation link
2. **`App.tsx`** - Updated routing to use Feed as landing page
3. **`FeedHeader`** - Compatible with both modes
4. **`Filters`** - Maintained for existing functionality

## Data Flow

### User Preferences Storage
```javascript
// localStorage.user_preferences structure
{
  role: string,
  interests: string[],
  projects: string,
  timestamp: string
}
```

### Feed Modes
1. **Public Mode** (no user_preferences)
   - Default rows: Trending, Breakthroughs, Industry, Editor's Picks
   - Generic content ranking

2. **Personalized Mode** (with user_preferences)
   - Custom rows: Top Picks, Interest-based rows, Trending in Field
   - Vector relevance + recency ranking (TODO)

## Backend Integration TODO

### API Endpoints to Update
1. **`GET /api/feed?query={row-name}&mode={public|personalized}&userId={id?}`**
   - Currently returns mock data in Feed.tsx (lines 10-107)
   - NEEDS: Query-specific content fetching based on mode
   - NEEDS: Vector similarity ranking for personalized mode
   - NEEDS: User preference integration from localStorage
   - Response format: `{ stories: Story[], total: number, hasMore: boolean }`

2. **`POST /api/user/onboard`** 
   - Currently logs to console in Personalize.tsx
   - NEEDS: Database persistence of user preferences
   - NEEDS: User profile creation/update
   - NEEDS: Return personalized feed configuration

3. **`POST /api/feed/refresh`**
   - New endpoint needed for feed refresh functionality
   - NEEDS: Cache invalidation and content re-ranking
   - NEEDS: Real-time content updates

### Feed Query Types
- `trending` - Popular content across all categories
- `breakthroughs` - High-impact recent developments  
- `industry` - Industry-specific news
- `editors-picks` - Curated content
- `personalized-{role}` - Role-specific personalized content
- `{interest}` - Interest-specific content (e.g., "computer-vision")
- `trending-{role}` - Trending content in user's field

### Ranking Algorithm TODO
1. **Public Mode**: Time-based + popularity scoring
2. **Personalized Mode**: Vector similarity + recency + user interaction history

## Content Organization

### Row Strategy
- **Row 1**: High-relevance personalized content or trending
- **Row 2-4**: Interest/role-specific content  
- **Row 5+**: Broader context (industry, general trending)

### Story Card Enhancements
- Maintained all original elements (title, summary, source, impact, etc.)
- Added hover states and improved interaction patterns
- Responsive design for horizontal scrolling

## Technical Implementation Notes

### State Management
- Uses React Context for feed mode switching
- localStorage for client-side preference persistence (key: 'user_preferences')
- useEffect hooks for preference loading and feed adaptation
- Feed mode detection in Feed.tsx determines public vs personalized content

### Next.js/Vercel Configuration
- Configured for Vite + React deployment on Vercel
- vercel.json created for SPA routing support
- All API routes follow Next.js App Router pattern
- Environment ready for production deployment

### Performance Considerations
- Horizontal scrolling with virtualization ready (FeedRow.tsx)
- Lazy loading for off-screen content (TODO)
- Caching mechanism for API responses (TODO)
- Optimized story card rendering with proper line-clamping

### Error Handling
- Graceful fallback to public mode if preferences corrupt
- API failure handling with cached content (TODO)
- User feedback for personalization actions via toast notifications

### Placeholder Content Documentation
- All mock data clearly marked with 🔄 PLACEHOLDER comments
- Story card components annotated for API integration points
- Feed modes explicitly documented for backend implementation

## Migration Checklist

### ✅ Completed
- [x] Netflix-style feed layout implementation
- [x] Onboarding flow relocation to /personalize
- [x] Client-side preference storage and retrieval
- [x] Routing updates for new structure
- [x] Sidebar navigation updates
- [x] Basic feed mode switching logic

### 🚧 TODO - Backend Integration
- [ ] Replace mock data with actual API calls (Feed.tsx lines 10-107)
- [ ] Implement query-specific content fetching for both feed modes
- [ ] Vector similarity ranking for personalized content based on user preferences
- [ ] User profile database persistence (Personalize.tsx integration)
- [ ] Content caching and refresh mechanisms
- [ ] Analytics tracking for feed interactions
- [ ] Real-time content updates and notifications
- [ ] Article image extraction and thumbnail generation
- [ ] ML-powered content categorization and tagging

### 🚧 TODO - Performance & UX
- [ ] Implement content virtualization for large datasets
- [ ] Add loading states for individual rows
- [ ] Implement real-time content updates
- [ ] Add feed refresh rate limiting
- [ ] User feedback/rating system for content quality
- [ ] A/B testing framework for feed layouts

### 🚧 TODO - Advanced Features
- [ ] Cross-device preference synchronization
- [ ] Feed export/sharing functionality
- [ ] Advanced filtering within rows
- [ ] Content source management
- [ ] Feed analytics dashboard
- [ ] Mobile-optimized touch interactions

## Backend Implementation Guide

### Database Schema Requirements
```sql
-- User profiles table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  role VARCHAR(50),
  interests TEXT[],
  projects TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Content cache table
CREATE TABLE feed_content (
  id UUID PRIMARY KEY,
  title TEXT,
  summary TEXT,
  source_name VARCHAR(100),
  source_logo TEXT,
  url TEXT,
  categories TEXT[],
  impact VARCHAR(10),
  published_at TIMESTAMP,
  relevance_vector VECTOR(1024), -- For similarity search
  cached_at TIMESTAMP
);
```

### Vector Similarity Implementation
- Use embeddings for user interests and content
- Implement cosine similarity scoring for relevance
- Consider user interaction history for ranking
- Fallback to time-based ranking for public mode

### Caching Strategy
- Redis for API response caching (15-minute TTL)
- Database materialized views for trending content
- CDN caching for static assets (story thumbnails)

## Breaking Changes
- Previous `/` route behavior changed (no onboarding gate)
- localStorage schema introduced for preferences
- API response format expectations may change with backend updates
- Vercel deployment configuration added

## Backward Compatibility
- Existing story card functionality preserved
- Filter components maintained for compatibility  
- API endpoints remain functional with mock responses
- All placeholder content clearly marked for replacement