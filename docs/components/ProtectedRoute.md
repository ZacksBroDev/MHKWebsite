# ProtectedRoute Component

## Overview

`ProtectedRoute` is a wrapper component that handles route-level authentication. It ensures only authenticated users can access protected pages and provides loading states during authentication checks.

## Location
`src/components/ProtectedRoute.jsx`

## Purpose

- **Route Protection**: Prevents unauthenticated access to protected pages
- **Loading Management**: Shows loading state while checking authentication
- **Automatic Redirection**: Can redirect to login page (if implemented)
- **Role-Based Access**: Can be extended for role-based route protection

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | Yes | - | The component/page to render if authenticated |
| `requiredRole` | `string` | No | - | Required user role (future enhancement) |

## Usage Examples

### Basic Usage
```jsx
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboard from '../pages/admin/AdminDashboard';

function App() {
  return (
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } 
    />
  );
}
```

### With Role-Based Access (Future Enhancement)
```jsx
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Multiple Protected Routes
```jsx
// In your router configuration
<Routes>
  <Route path="/login" element={<AuthForm />} />
  <Route path="/schedule" element={
    <ProtectedRoute>
      <Schedule />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

## Component Logic

### Authentication Flow
1. **Check Loading State**: While auth context is loading, show spinner
2. **Check Authentication**: If no user is authenticated, show login message
3. **Render Children**: If authenticated, render the protected component

### Loading States
- Shows `LoadingSpinner` while authentication status is being determined
- Prevents flash of unauthorized content
- Provides smooth user experience during route transitions

## Implementation Details

### Current Implementation
```jsx
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="auth-required">
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return children;
};
```

### Dependencies
- **AuthContext**: Uses `useAuth` hook for authentication state
- **LoadingSpinner**: Shows loading state during auth checks
- **React**: Uses functional component pattern

## Styling

### CSS Classes
- `.auth-required` - Container for unauthorized access message
- Inherits styling from `LoadingSpinner` component

### Responsive Design
- Works with all screen sizes
- Loading spinner centers appropriately
- Message text is readable on all devices

## Integration Points

### Router Integration
- Wraps route elements in React Router
- Works with `BrowserRouter` and route components
- Can be nested within other route wrappers

### Auth Context Integration
- Consumes authentication state from `AuthContext`
- Responds to authentication changes automatically
- Handles token expiration scenarios

## Future Enhancements

### Role-Based Access Control
```jsx
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  
  if (!user) return <div>Please log in</div>;
  
  if (requiredRole && user.role !== requiredRole) {
    return <div>Insufficient permissions</div>;
  }

  return children;
};
```

### Redirect Functionality
```jsx
const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(redirectTo);
    }
  }, [user, loading, navigate, redirectTo]);

  // ... rest of component
};
```

### Multiple Role Support
```jsx
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (!user) return <div>Please log in</div>;
  
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <div>Access denied</div>;
  }

  return children;
};
```

## Testing Considerations

### Test Scenarios
- **Authenticated User**: Should render children
- **Unauthenticated User**: Should show login message
- **Loading State**: Should show loading spinner
- **Role Restrictions**: Should handle role-based access

### Mock Requirements
- Mock `AuthContext` with different user states
- Mock `LoadingSpinner` component
- Test component rendering in different auth states

## Common Issues

### Flash of Content
- **Problem**: Brief flash of unauthorized content before redirect
- **Solution**: Always check loading state first

### Infinite Loading
- **Problem**: Loading state never resolves
- **Solution**: Ensure auth context properly sets loading to false

### Route Conflicts
- **Problem**: Protected routes conflict with public routes
- **Solution**: Organize route hierarchy carefully

## Related Components

- **AuthContext**: Provides authentication state
- **LoadingSpinner**: Shows loading indicator
- **AuthForm**: Login/registration form
- **NavBar**: Navigation with auth-aware links
