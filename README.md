# DupliVerse Profile Synchronization System

A production-ready React application demonstrating comprehensive user profile synchronization with backend APIs using TypeScript, proper state management, and advanced error handling.

## 🚀 Features

### ✅ **API Integration**
- RESTful API calls with proper authentication
- Automatic retry logic with exponential backoff
- Request timeout handling
- Health check monitoring

### ✅ **State Management**
- React Context with useReducer for global state
- Custom hooks for clean component integration
- Optimistic updates for better UX
- Persistent state management

### ✅ **Error Handling**
- Comprehensive error boundaries
- User-friendly error messages
- Automatic error recovery
- Detailed logging for debugging

### ✅ **TypeScript Integration**
- Complete type safety throughout the application
- Comprehensive interface definitions
- Generic types for API responses
- Strict type checking

### ✅ **Loading States**
- Beautiful loading spinners
- Skeleton loading states
- Progress indicators
- Smart loading management

### ✅ **Auto-Synchronization**
- Automatic profile sync every 5 minutes
- Smart sync on tab focus
- Manual sync capabilities
- Sync status indicators

### ✅ **User Experience**
- Real-time notifications
- Responsive design
- Accessibility features
- Smooth animations

## 🏗️ Architecture

```
src/
├── types/           # TypeScript type definitions
├── services/        # API service layer
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── components/      # Reusable UI components
├── utils/           # Utility functions
└── App.tsx         # Main application component
```

## 🔧 Key Components

### **API Service (`src/services/api.ts`)**
- Centralized HTTP client with authentication
- Automatic retry logic and error handling
- Request/response interceptors
- Type-safe API methods

### **User Context (`src/context/UserContext.tsx`)**
- Global state management for user data
- Action-based state updates
- Automatic synchronization logic
- Error state management

### **Custom Hooks (`src/hooks/useUserProfile.ts`)**
- Clean interface for profile operations
- Advanced features like auto-sync
- Callback support for lifecycle events
- Optimized re-rendering

### **User Profile Component (`src/components/UserProfile.tsx`)**
- Complete profile management UI
- Edit mode with form validation
- Real-time sync status display
- Error handling and recovery

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run type checking
npm run type-check
```

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://api.dupliverse.com
REACT_APP_AUTH_TOKEN=your-demo-token
REACT_APP_VERSION=1.0.0
```

## 📋 Usage Examples

### Basic Profile Hook
```typescript
import { useUserProfile } from './hooks/useUserProfile';

function MyComponent() {
  const { profile, isLoading, syncProfile, updateProfile } = useUserProfile();
  
  // Component logic here
}
```

### Advanced Profile Hook with Callbacks
```typescript
const { profile, syncProfile } = useUserProfile({
  autoSync: true,
  syncInterval: 300000, // 5 minutes
  onSyncSuccess: (profile) => {
    console.log('Profile synced:', profile.email);
  },
  onSyncError: (error) => {
    console.error('Sync failed:', error);
  }
});
```

### Manual API Calls
```typescript
import apiService from './services/api';

// Fetch profile
const profile = await apiService.fetchUserProfile();

// Update profile
const updated = await apiService.updateUserProfile({
  firstName: 'John',
  lastName: 'Doe'
});
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Request Validation**: Client-side input validation
- **Error Sanitization**: Safe error message display
- **Token Management**: Automatic token refresh handling

## 🎯 Best Practices Implemented

### **React Patterns**
- Custom hooks for logic separation
- Error boundaries for error isolation
- Context for global state management
- Memoization for performance optimization

### **TypeScript Patterns**
- Strict type checking enabled
- Generic types for reusability
- Interface segregation principle
- Comprehensive type definitions

### **API Patterns**
- RESTful endpoint design
- Proper HTTP status code handling
- Request/response transformation
- Centralized error handling

### **UX Patterns**
- Loading states for all async operations
- Optimistic updates for immediate feedback
- Error recovery mechanisms
- Accessibility considerations

## 🧪 Testing Strategy

The application includes comprehensive error handling and logging for easy debugging:

- **Development Mode**: Detailed error messages and stack traces
- **Production Mode**: User-friendly error messages
- **Console Logging**: Structured logging for debugging
- **Error Boundaries**: Graceful error recovery

## 🚀 Production Deployment

### Build Optimization
```bash
npm run build
```

### Environment Configuration
- Set production API endpoints
- Configure authentication tokens
- Enable error reporting
- Set up monitoring

### Performance Considerations
- Code splitting implemented
- Lazy loading for components
- Memoization for expensive operations
- Efficient re-rendering patterns

## 📚 API Documentation

### Endpoints Used
- `GET /api/user/profile` - Fetch user profile
- `PATCH /api/user/profile` - Update user profile
- `GET /api/health` - Health check

### Authentication
All requests require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the DupliVerse ecosystem**