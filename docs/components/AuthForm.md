/**
 * AuthForm Component Documentation
 * 
 * Purpose: Handles user authentication (login/signup) with form validation
 * Location: /src/components/AuthForm.jsx
 * 
 * Features:
 * - Toggle between login and signup modes
 * - Form validation with error display
 * - Access code validation for signup
 * - Admin signup with admin password
 * - Integration with AuthContext for state management
 * 
 * Props:
 * - None (self-contained component)
 * 
 * State:
 * - isLogin: boolean - Toggle between login/signup mode
 * - formData: object - Form input values
 * - errors: object - Validation errors
 * - loading: boolean - Loading state during submission
 * 
 * Dependencies:
 * - AuthContext: For login/signup functions
 * - API endpoints: For authentication requests
 * 
 * Usage:
 * ```jsx
 * import AuthForm from './components/AuthForm';
 * 
 * <AuthForm />
 * ```
 * 
 * Form Fields:
 * Login Mode:
 * - username: string (required)
 * - password: string (required)
 * 
 * Signup Mode:
 * - firstName: string (required)
 * - lastName: string (required)
 * - username: string (required)
 * - email: string (required, email format)
 * - phone: string (required)
 * - password: string (required, min 6 chars)
 * - confirmPassword: string (required, must match password)
 * - accessCode: string (required for regular users)
 * - adminPassword: string (required for admin signup)
 * 
 * Validation Rules:
 * - Email must be valid format
 * - Password minimum 6 characters
 * - Passwords must match
 * - Phone number required for signup
 * - Access code required for regular user signup
 * - Admin password required for admin signup
 * 
 * Error Handling:
 * - Client-side validation with immediate feedback
 * - Server error display with user-friendly messages
 * - Loading states prevent double submission
 * 
 * Styling:
 * - Responsive design with mobile-first approach
 * - Glass-morphism design consistent with site theme
 * - Smooth transitions and hover effects
 * - Accessible form controls with proper labeling
 */
