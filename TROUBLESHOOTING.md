# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 🚨 Case Sensitivity Compilation Error

**Problem**: TypeScript reports file name casing conflicts
```
File name 'Home.jsx' differs from already included file name 'home.jsx' only in casing
```

**Solutions**:
1. **Clear All Caches**:
   ```bash
   rm -rf node_modules/.vite
   rm -rf .vite
   rm -rf dist
   npm run dev
   ```

2. **Restart VS Code**: Close and reopen VS Code completely

3. **Force Restart TypeScript**: In VS Code, `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### 🔄 Development Server Issues

**Problem**: Server won't start or shows port conflicts

**Solutions**:
1. **Kill All Node Processes**:
   ```bash
   pkill -f node
   pkill -f vite
   ```

2. **Clear Dependencies**:
   ```bash
   rm -rf node_modules
   npm install
   ```

### 🔐 Authentication Errors

**Problem**: Users can't log in or session expires

**Built-in Handling**:
- ✅ Automatic token validation
- ✅ Session expiration detection
- ✅ Network error retry
- ✅ Clear error messages

### 🌐 Network/API Errors

**Problem**: API calls fail or timeout

**Built-in Handling**:
- ✅ Comprehensive error boundaries
- ✅ Loading states during requests
- ✅ User-friendly error messages
- ✅ Retry functionality

### 📱 Form Submission Issues

**Problem**: Contact form or other forms fail

**Built-in Handling**:
- ✅ Form validation
- ✅ Submission error handling
- ✅ Success/error feedback
- ✅ Loading states

## Error Monitoring

### In Development
- Check browser console for detailed errors
- ErrorBoundary shows stack traces in development
- Network tab for API call issues

### In Production
- ErrorBoundary logs errors to console
- User sees friendly error messages
- Reload functionality available

## Quick Fixes

### 1. Component Not Loading
```jsx
// Check if component is properly exported
export default ComponentName;

// Check import path
import ComponentName from './path/to/Component';
```

### 2. Authentication Issues
```jsx
// Check token in localStorage
localStorage.getItem('mhk_token')

// Clear auth state
localStorage.removeItem('mhk_token')
```

### 3. API Connectivity
```javascript
// Test API endpoint
fetch('http://localhost:3001/api/health')
  .then(r => r.json())
  .then(console.log)
```

## Getting Help

1. **Check Error Messages**: The app provides specific error messages
2. **Use Browser DevTools**: Console, Network, and Application tabs
3. **Check This Guide**: Common solutions are documented here
4. **Error Boundary**: Will catch and display most errors gracefully

## Prevention

- ✅ Error boundaries prevent app crashes
- ✅ Comprehensive error handling built-in
- ✅ Loading states prevent user confusion
- ✅ Clear feedback for all user actions

Your app is designed to handle errors gracefully and provide clear feedback to users!
