/**
 * NavBar Component Documentation
 * 
 * Purpose: Main navigation component with responsive mobile menu
 * Location: /src/components/NavBar.jsx
 * 
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - User authentication status display
 * - Role-based navigation items (admin/user)
 * - Smooth animations and transitions
 * - Logo/brand display
 * 
 * Props:
 * - None (uses AuthContext for user state)
 * 
 * State:
 * - isMobileMenuOpen: boolean - Mobile menu visibility
 * 
 * Dependencies:
 * - AuthContext: For user authentication state
 * - React Router: For navigation links
 * 
 * Usage:
 * ```jsx
 * import NavBar from './components/NavBar';
 * 
 * <NavBar />
 * ```
 * 
 * Navigation Structure:
 * Public Routes:
 * - Home: /
 * - Schedule: /schedule
 * - Contact: /contact
 * - Login: /login (when not authenticated)
 * 
 * Authenticated Routes:
 * - Profile: /profile
 * - Logout: function (when authenticated)
 * 
 * Admin Only Routes:
 * - Admin Dashboard: /admin (when user.role === 'admin')
 * 
 * Curriculum Routes:
 * - Level 1: /level1
 * - Level 2: /level2
 * - Level 3: /level3
 * - Conditionals: /conditionals
 * - Degree 1: /deg1
 * - Degree 2: /deg2
 * 
 * Mobile Features:
 * - Hamburger menu icon with animation
 * - Slide-in mobile menu overlay
 * - Touch-friendly menu items
 * - Automatic menu close on route change
 * 
 * Responsive Breakpoints:
 * - Desktop: > 768px (horizontal menu)
 * - Mobile: ≤ 768px (hamburger menu)
 * 
 * Styling Features:
 * - Glass-morphism background with blur effects
 * - Smooth hover transitions
 * - Active link highlighting
 * - Consistent branding colors
 * - Mobile-optimized touch targets
 * 
 * Accessibility:
 * - Keyboard navigation support
 * - ARIA labels for menu controls
 * - Focus management for mobile menu
 * - Semantic HTML structure
 */
