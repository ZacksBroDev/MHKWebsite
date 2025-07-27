# Components Directory

This directory contains all reusable React components organized by purpose and functionality.

## Structure

### 📁 auth/
Authentication-related components
- **AuthForm/** - Login/signup form with validation and access code support
- **ProtectedRoute/** - Higher-order component for route protection

### 📁 layout/
Layout and navigation components
- **NavBar/** - Responsive navigation with mobile hamburger menu
- **Footer/** - Site footer with contact information

### 📁 events/
Event-related components
- **EventCard/** - Reusable event display with join/leave functionality

### 📁 ui/
Reusable UI components (design system)
- **Button/** - Flexible button with multiple variants and states
- **Input/** - Input component with validation and different types
- **Form/** - Form wrapper with validation and error handling
- **LoadingSpinner/** - Loading indicator with size variants
- **Message/** - Alert/notification component with type variants

## Usage

### Import from Central Index
```jsx
import { Button, Input, Form, Message } from '../components';
```

### Import Specific Components
```jsx
import Button from '../components/ui/Button';
import { AuthForm } from '../components/auth/AuthForm';
```

## Component Standards

### 1. File Structure
Each component has its own folder containing:
- `ComponentName.jsx` - Main component file
- `ComponentName.css` - Component-specific styles
- `index.js` - Export file for clean imports

### 2. Documentation
- JSDoc headers with comprehensive prop documentation
- Usage examples in component comments
- Prop types and descriptions
- Accessibility considerations

### 3. Props Pattern
```jsx
const Component = ({
  // Required props first
  requiredProp,
  
  // Optional props with defaults
  optionalProp = 'default',
  variant = 'primary',
  size = 'medium',
  
  // Event handlers
  onClick,
  onChange,
  
  // Style props
  className = '',
  
  // Spread remaining props
  ...props
}) => {
  // Component logic
};
```

### 4. CSS Organization
- BEM methodology for class naming
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Accessibility considerations (focus, contrast, etc.)

## Adding New Components

1. **Create Component Folder**
   ```
   components/category/ComponentName/
   ├── ComponentName.jsx
   ├── ComponentName.css
   └── index.js
   ```

2. **Follow JSDoc Pattern**
   ```jsx
   /**
    * ComponentName
    * 
    * Brief description of component purpose
    * 
    * @component
    * @param {Object} props - Component props
    * @param {string} props.requiredProp - Description
    * @returns {JSX.Element} Component JSX
    */
   ```

3. **Add to Central Index**
   Update `components/index.js` to export your component

4. **Create Documentation**
   Add component documentation to `docs/components/`

## Best Practices

- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Design for reuse across different contexts
- **Accessibility**: Include ARIA labels, keyboard navigation
- **Performance**: Avoid unnecessary re-renders
- **Testing**: Write unit tests for component behavior
- **Consistency**: Follow established patterns and naming conventions

## Related Documentation

- [Developer Guide](../../DEVELOPER_GUIDE.md) - Complete project overview
- [Component Documentation](../../docs/components/) - Individual component docs
- [Quick Start](../../QUICK_START.md) - Setup and development guide
