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
1. **`GET /api/feed?query={row-name}`**
   - Currently returns mock data
   - NEEDS: Query-specific content fetching
   - NEEDS: Ranking algorithm implementation

2. **`POST /api/user/onboard`**
   - Currently logs to console
   - NEEDS: Database persistence
   - NEEDS: User profile creation/update

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
- localStorage for client-side preference persistence
- useEffect hooks for preference loading and feed adaptation

### Performance Considerations
- Horizontal scrolling with virtualization ready
- Lazy loading for off-screen content (TODO)
- Caching mechanism for API responses (TODO)

### Error Handling
- Graceful fallback to public mode if preferences corrupt
- API failure handling with cached content (TODO)
- User feedback for personalization actions

## Migration Checklist

### ✅ Completed
- [x] Netflix-style feed layout implementation
- [x] Onboarding flow relocation to /personalize
- [x] Client-side preference storage and retrieval
- [x] Routing updates for new structure
- [x] Sidebar navigation updates
- [x] Basic feed mode switching logic

### 🚧 TODO - Backend Integration
- [ ] Replace mock data with actual API calls
- [ ] Implement query-specific content fetching
- [ ] Vector similarity ranking for personalized content
- [ ] User profile database persistence
- [ ] Content caching and refresh mechanisms
- [ ] Analytics tracking for feed interactions

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

## Breaking Changes
- Previous `/` route behavior changed (no onboarding gate)
- localStorage schema introduced for preferences
- API response format expectations may change with backend updates

## Backward Compatibility
- Existing story card functionality preserved
- Filter components maintained for compatibility
- API endpoints remain functional with mock responses