# Component Library Guide

## Overview
This folder contains all reusable components organized by functionality and purpose. Each component is self-contained with its own folder including the component file, styles, and index.js for clean imports.

## Folder Structure

```
src/components/
├── index.js                 # Central export file for all components
├── COMPONENT_GUIDE.md       # This guide
├── auth/                    # Authentication-related components
│   ├── AuthForm/           # Login/signup form component
│   └── ProtectedRoute/     # Route protection wrapper
├── events/                  # Event-related components
│   └── EventCard/          # Individual event display card
├── layout/                  # Layout and navigation components
│   ├── NavBar/             # Main navigation bar
│   └── Footer/             # Site footer
└── ui/                     # Reusable UI components
    ├── Button/             # Button component with variants
    ├── Form/               # Form wrapper with validation
    ├── Input/              # Input field with validation
    ├── LoadingSpinner/     # Loading indicator
    └── Message/            # Alert/message component
```

## Component Categories

### 🔐 Authentication (`auth/`)
Components related to user authentication and authorization.

- **AuthForm**: Handles login and signup functionality
- **ProtectedRoute**: Wraps routes that require authentication

### 📅 Events (`events/`)
Components for displaying and managing events.

- **EventCard**: Displays individual event information

### 🎨 Layout (`layout/`)
Structural components that define the overall page layout.

- **NavBar**: Main site navigation with responsive mobile menu
- **Footer**: Site footer with contact information

### 🧩 UI (`ui/`)
Reusable UI components that follow consistent design patterns.

- **Button**: Multi-variant button component with loading states
- **Form**: Form wrapper with error handling and validation
- **Input**: Styled input fields with validation feedback
- **LoadingSpinner**: Consistent loading indicator
- **Message**: Alert and notification messages

## Usage Patterns

### Import Components
```jsx
// Import from central index (recommended)
import { Button, Input, Form } from '../components';

// Or import directly
import Button from '../components/ui/Button';
```

### Component Props
All components are fully documented with JSDoc comments including:
- Component description and purpose
- Props with types and defaults
- Usage examples
- Feature lists

### Styling
- Each component has its own CSS file
- Uses CSS custom properties for theming
- Responsive design patterns included
- BEM methodology for CSS classes

## Best Practices

1. **Consistent API**: All similar components follow the same prop patterns
2. **Accessibility**: Components include proper ARIA attributes
3. **Error Handling**: Components gracefully handle invalid props
4. **Loading States**: Interactive components support loading states
5. **Responsive Design**: All components work on mobile and desktop

## Adding New Components

1. Create a new folder in the appropriate category
2. Include: `ComponentName.jsx`, `ComponentName.css`, `index.js`
3. Add JSDoc documentation
4. Export from category index and main index
5. Add to this guide

## Documentation
Each component includes comprehensive JSDoc documentation with:
- Component description
- Parameter documentation
- Return type information
- Usage examples
- Feature lists

For more details, see individual component files.
