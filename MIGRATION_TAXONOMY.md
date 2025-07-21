# 📁 Seer.ai Migration File Taxonomy

## 🔥 Critical Files - Require Backend Integration

### API Routes (src/app/api/)
- **`src/app/api/chat/route.ts`** - AI chat endpoint
  - 🔄 Connect to retrieval agent pipeline
  - 🔄 Add OpenAI/Anthropic integration
  - 🔄 Implement conversation context management

- **`src/app/api/feed/route.ts`** - Personalized content feed
  - 🔄 Connect to content ingestion pipeline  
  - 🔄 Add personalization engine
  - 🔄 Implement filtering and search

- **`src/app/api/user/onboard/route.ts`** - User onboarding
  - 🔄 Save user preferences to database
  - 🔄 Initialize personalization profiles
  - 🔄 Connect to user management system

- **`src/app/api/feedback/route.ts`** - User interaction tracking
  - 🔄 Record clicks, saves, shares for ML training
  - 🔄 Feed into personalization algorithms

- **`src/app/api/ingest/route.ts`** - Content ingestion pipeline
  - 🔄 Connect to content sources (RSS, APIs, web scraping)
  - 🔄 Add content processing and classification

### Page Components (src/app/)
- **`src/app/page.tsx`** - Main feed page
  - 🔄 Replace mockStories with real API calls
  - 🔄 Add real-time updates and pagination
  - 🔄 Implement proper error handling

- **`src/app/chat/page.tsx`** - Chat interface
  - 🔄 Connect to WebSocket for real-time chat
  - 🔄 Add conversation history persistence

### Provider Components (src/components/providers/)
- **`src/components/providers/query-provider.tsx`**
  - 🔄 Add React Query dev tools
  - 🔄 Configure cache policies for different data types

## 🎯 High Priority Components - UI & Business Logic

### Feed Components (src/components/feed/)
- **`src/components/feed/filters.tsx`** - Content filtering
  - 🔄 Connect filter state to API queries
  - 🔄 Add advanced search functionality
  - 🔄 Implement filter persistence

- **`src/components/feed/feed-header.tsx`** - Feed header and actions
  - 🔄 Add real refresh functionality
  - 🔄 Show real story counts and user data

- **`src/components/feed/story-card.tsx`** - Individual story display
  - 🔄 Add bookmark/save functionality  
  - 🔄 Implement sharing with social metadata
  - 🔄 Add click tracking for personalization

### Onboarding Components (src/components/onboarding/)
- **`src/components/onboarding/role-selection.tsx`**
  - 🔄 Connect to user profile creation
  - 🔄 Add role-based content suggestions

- **`src/components/onboarding/tech-interests.tsx`**
  - 🔄 Load interests from content taxonomy
  - 🔄 Save selections to user preferences

- **`src/components/onboarding/projects-priorities.tsx`**
  - 🔄 Parse and categorize project descriptions
  - 🔄 Generate content recommendations

### Page Components (src/components/pages/)
- **`src/components/pages/chat-page.tsx`** - Chat functionality
  - 🔄 Implement real chat interface
  - 🔄 Add message history and context

- **`src/components/pages/settings-page.tsx`** - User settings
  - 🔄 Add preference management
  - 🔄 Implement account settings

## 🎨 Medium Priority - UI Enhancement

### Layout Components (src/components/layout/)
- **`src/components/layout/app-layout.tsx`** - Main app layout
  - ✅ Ready to use (minimal changes needed)
  - 🔄 Add user authentication state
  - 🔄 Add navigation breadcrumbs

- **`src/components/layout/sidebar.tsx`** - Navigation sidebar  
  - ✅ Ready to use (working navigation)
  - 🔄 Add user avatar and profile link
  - 🔄 Show active page indicator

### UI Components (src/components/ui/)
- **All shadcn components** - Design system
  - ✅ Ready to use as-is
  - 🔄 Customize themes if needed

## 📝 Configuration Files

### Core Config (Root Level)
- **`next.config.js`** - Next.js configuration
  - 🔄 Add environment-specific settings
  - 🔄 Configure image optimization domains
  - 🔄 Add security headers

- **`tailwind.config.ts`** - Styling configuration  
  - ✅ Ready to use (Geist fonts configured)
  - 🔄 Add custom design tokens if needed

- **`src/app/layout.tsx`** - Root layout
  - ✅ Ready to use (providers configured)
  - 🔄 Add meta tags and SEO

## 🗄️ Data Architecture Requirements

### Database Schema (Required Tables)
```sql
-- Users and profiles
users (id, email, preferences, onboarded_at)
user_preferences (user_id, role, interests, projects)

-- Content management  
stories (id, title, summary, content, source_id, published_at)
sources (id, name, url, logo, category)
categories (id, name, description)

-- Personalization
user_interactions (user_id, story_id, action, timestamp)
user_feed (user_id, story_id, relevance_score, shown_at)

-- Chat and conversations
conversations (id, user_id, created_at)
messages (id, conversation_id, role, content, timestamp)
```

### External Services Integration
- **OpenAI/Anthropic API** - Chat functionality
- **Vector Database** - Semantic search (Pinecone/Weaviate)
- **Content APIs** - RSS feeds, news APIs
- **Analytics** - User interaction tracking
- **CDN** - Image and static asset delivery

## 🚀 Migration Priority Order

1. **Database & Auth Setup** - Core data layer
2. **User Onboarding API** - Profile creation 
3. **Content Ingestion** - Story data pipeline
4. **Feed Personalization** - AI-powered recommendations
5. **Chat Integration** - Retrieval agent connection
6. **Real-time Features** - WebSockets, live updates
7. **Analytics & Optimization** - Performance monitoring