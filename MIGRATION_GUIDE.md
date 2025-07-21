# 📁 Seer.ai Project File Taxonomy & Migration Guide

## 🎯 **CRITICAL FILES TO UPDATE FOR REAL IMPLEMENTATION**

### **📊 Core Data & API Integration**
```
src/pages/Index.tsx
├── Line 16-50: Replace mockStories with real API calls
├── Line 88-106: Implement real onboarding API call to /api/feed
├── Line 174-200: Wire filters to trigger real API calls
└── 🔄 API Endpoints Needed: POST /api/feed, GET /api/stories

src/pages/Chat.tsx  
├── Line 9-17: Replace sample prompts with dynamic ones
├── Line 26-50: Implement real chat API call to /api/chat
└── 🔄 API Endpoints Needed: POST /api/chat, GET /api/conversations

src/pages/Settings.tsx
├── Line 19-35: Replace hardcoded user data with real profile API
├── Line 45-70: Wire notification switches to settings API
├── Line 142-153: Implement data export/clear functionality  
├── Line 167-176: Wire API key generation
└── 🔄 API Endpoints Needed: GET/PUT /api/user/profile, POST /api/user/export
```

### **🧩 Component Data Integration**
```
src/components/feed/story-card.tsx
├── Line 118-139: Wire bookmark, comment, and analytics tracking
└── 🔄 API Endpoints Needed: POST /api/bookmarks, POST /api/analytics

src/components/feed/feed-header.tsx
├── Line 18-26: Wire refresh button to real feed API
└── 🔄 Add real user profile data integration

src/components/feed/filters.tsx
├── All filter changes should trigger API calls
└── 🔄 Wire to search/filter endpoints
```

## 📋 **FILE CLASSIFICATION BY PRIORITY**

### **🔴 HIGH PRIORITY - Core Functionality**
```
1. src/pages/Index.tsx - Main feed logic & onboarding
2. src/pages/Chat.tsx - AI chat functionality  
3. src/pages/Settings.tsx - User preferences & profile
4. src/components/feed/story-card.tsx - Story interactions
```

### **🟡 MEDIUM PRIORITY - Features & UX**
```
5. src/components/feed/filters.tsx - Search & filtering
6. src/components/feed/feed-header.tsx - Feed controls
7. src/components/onboarding/ - User onboarding flow
```

### **🟢 LOW PRIORITY - UI & Visual**
```
8. src/components/layout/ - Layout components (minimal changes)
9. src/components/ui/ - UI components (no data changes needed)
10. Design system files (src/index.css, tailwind.config.ts) - Ready to use
```

## 🔌 **API ENDPOINTS TO IMPLEMENT**

### **User & Profile Management**
```
POST /api/user/onboard - Save onboarding data
GET /api/user/profile - Get user profile
PUT /api/user/profile - Update user profile  
GET /api/user/preferences - Get notification settings
PUT /api/user/preferences - Update notification settings
POST /api/user/export - Export user data
DELETE /api/user/data - Clear user history
```

### **Content & Feed**
```
POST /api/feed - Get personalized feed (with user context)
GET /api/stories - Get filtered stories
POST /api/search - Search stories
POST /api/bookmarks - Bookmark stories
GET /api/bookmarks - Get user bookmarks
```

### **AI Chat**
```
POST /api/chat - Send message to AI
GET /api/conversations - Get chat history
POST /api/conversations - Create new conversation
```

### **Analytics & Interactions** 
```
POST /api/analytics - Track user interactions
POST /api/feedback - Submit user feedback
```

## 🛠️ **CONFIGURATION TO UPDATE**

### **Environment Variables Needed**
```
NEXT_PUBLIC_API_BASE_URL - Your API base URL
OPENAI_API_KEY - For chat functionality
DATABASE_URL - Your database connection
JWT_SECRET - For authentication
ANALYTICS_KEY - For tracking (optional)
```

### **Package.json Dependencies to Add**
```bash
# For API calls
npm install axios swr

# For authentication (if needed)
npm install next-auth

# For database (choose one)
npm install prisma @prisma/client
# OR
npm install mongodb mongoose

# For real-time features
npm install socket.io-client
```

## 📝 **MIGRATION CHECKLIST**

- [ ] Replace all mock data with real API calls
- [ ] Implement user authentication system
- [ ] Set up database schema for users, stories, bookmarks
- [ ] Create backend API endpoints
- [ ] Wire all form submissions to real APIs
- [ ] Implement real-time features (optional)
- [ ] Add error handling and loading states
- [ ] Set up analytics tracking
- [ ] Configure environment variables
- [ ] Test all user flows end-to-end

## 🎨 **FILES READY TO USE AS-IS**
```
✅ All UI components in src/components/ui/
✅ Layout components (sidebar, navigation)
✅ Design system (CSS, Tailwind config)
✅ Visual effects (animations, backgrounds)
✅ TypeScript interfaces (can be extended)
```

All placeholder content is now clearly marked with `🔄 MIGRATION TODO` comments for easy identification and replacement!