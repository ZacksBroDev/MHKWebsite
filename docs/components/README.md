# Component Documentation

## Overview

This directory contains comprehensive documentation for all React components in the MHK Karate website. Each component is documented with usage examples, props, styling information, and integration details.

## Component Categories

### Core Components
- **[AuthForm](./AuthForm.md)** - User authentication (login/register) with form validation
- **[NavBar](./NavBar.md)** - Main navigation with responsive design and auth-aware links
- **[Schedule](./Schedule.md)** - Interactive calendar with expandable days and hierarchical events

### Utility Components
- **[EventCard](./EventCard.md)** - Reusable event display with join/leave functionality
- **[LoadingSpinner](./LoadingSpinner.md)** - Reusable loading indicator with size variants
- **[Message](./Message.md)** - Reusable message component with type variants
- **[ProtectedRoute](./ProtectedRoute.md)** - Route-level authentication wrapper

### Layout Components
- **[Footer](./Footer.md)** - Site footer with contact information and links

## Documentation Standards

Each component documentation includes:

### Structure
- **Overview**: Component purpose and key features
- **Location**: File path in the project
- **Props**: Detailed prop specifications with types and examples
- **Usage Examples**: Code examples showing common use cases
- **Styling**: CSS classes, responsive design, theming
- **Integration**: How the component connects with other parts
- **Future Enhancements**: Planned improvements and extensions

### Code Examples
All documentation includes practical code examples:
- Basic usage patterns
- Advanced configuration options
- Integration with other components
- Common use cases and scenarios

### Prop Documentation
Props are documented with:
- Type information (string, boolean, object, etc.)
- Required/optional status
- Default values
- Description of purpose and usage

## Component Architecture

### Design Patterns
- **Functional Components**: All components use React hooks
- **Custom Hooks**: Shared logic extracted to custom hooks (useAuth)
- **Context API**: Global state managed through React Context
- **Component Composition**: Reusable components composed together

### State Management
- **Local State**: Component-specific state with useState
- **Global State**: Authentication state via AuthContext
- **Props**: Parent-to-child data flow
- **Event Handling**: User interactions and form submissions

### Styling Approach
- **CSS Modules**: Component-specific styles
- **Responsive Design**: Mobile-first approach
- **CSS Custom Properties**: Consistent theming
- **BEM Methodology**: Clear CSS class naming

## Integration Guide

### Adding New Components
1. Create component file in `src/components/`
2. Add corresponding CSS file
3. Create documentation in `docs/components/`
4. Add JSDoc headers to component code
5. Update this README with component listing

### Component Dependencies
- **React**: Core library for all components
- **AuthContext**: Authentication state management
- **CSS Modules**: Component styling
- **React Router**: Navigation and routing

### Testing Components
- Use React Testing Library for unit tests
- Mock external dependencies (API calls, context)
- Test user interactions and edge cases
- Ensure accessibility compliance

## Best Practices

### Component Design
- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Components are designed for reuse across pages
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Efficient rendering and state updates

### Documentation Maintenance
- Update docs when component props change
- Include new usage examples for features
- Document breaking changes and migration guides
- Keep code examples current and functional

### Naming Conventions
- **PascalCase**: Component names and files
- **camelCase**: Props and function names
- **kebab-case**: CSS classes and files
- **UPPER_CASE**: Constants and environment variables

## Development Workflow

### Component Creation Process
1. Design component interface (props, methods)
2. Implement component with TypeScript-style JSDoc
3. Create CSS module for styling
4. Write comprehensive documentation
5. Add usage examples to documentation
6. Integrate with existing components

### Documentation Updates
- Update when props or behavior changes
- Add new examples for feature additions
- Review documentation during code reviews
- Validate examples work with current codebase

## Quick Reference

### Common Props Patterns
```jsx
// Standard component props
{
  children: React.ReactNode,
  className?: string,
  onClick?: () => void,
  disabled?: boolean
}

// Event component props
{
  event: EventObject,
  onJoin?: (eventId) => void,
  onLeave?: (eventId) => void,
  variant?: 'default' | 'compact' | 'expanded'
}

// Form component props
{
  onSubmit: (data) => void,
  loading?: boolean,
  error?: string,
  initialValues?: object
}
```

### Common Component Patterns
```jsx
// Conditional rendering
{user ? <AuthenticatedContent /> : <LoginPrompt />}

// Loading states
{loading ? <LoadingSpinner /> : <Content />}

// Error handling
{error && <Message type="error" text={error} />}

// Event handling
const handleClick = useCallback(() => {
  // Handle user interaction
}, [dependencies]);
```

## Related Documentation

- **[API Documentation](../API.md)** - Backend API endpoints and data models
- **[Developer Guide](../../DEVELOPER_GUIDE.md)** - Complete project setup and architecture
- **[Quick Start](../../QUICK_START.md)** - Fast setup for development
