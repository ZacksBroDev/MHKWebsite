/**
 * Form Component
 * 
 * Reusable form wrapper component that handles submission, validation, and layout.
 * Provides consistent styling and error handling across all forms.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form content (inputs, buttons, etc.)
 * @param {Function} props.onSubmit - Form submission handler
 * @param {boolean} [props.loading=false] - Whether form is in loading state
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.success] - Success message to display
 * @param {string} [props.title] - Form title
 * @param {string} [props.subtitle] - Form subtitle/description
 * @param {string} [props.className] - Additional CSS classes
 * @param {'vertical'|'horizontal'|'grid'} [props.layout='vertical'] - Form layout
 * @param {boolean} [props.noValidate=false] - Whether to disable HTML5 validation
 * @param {string} [props.method='POST'] - Form method
 * @param {string} [props.action] - Form action URL
 * @returns {JSX.Element} Form component
 * 
 * @example
 * // Basic form with validation
 * <Form
 *   title="Login"
 *   onSubmit={handleLogin}
 *   loading={isLoading}
 *   error={error}
 * >
 *   <Input label="Email" type="email" value={email} onChange={setEmail} />
 *   <Input label="Password" type="password" value={password} onChange={setPassword} />
 *   <Button type="submit" variant="primary" loading={isLoading}>
 *     Login
 *   </Button>
 * </Form>
 */

import React from 'react';
// Direct import - cleaner than barrel exports
import Message from '../Message/Message.jsx';
import './Form.css';

const Form = ({
  children,
  onSubmit,
  loading = false,
  error,
  success,
  title,
  subtitle,
  className = '',
  layout = 'vertical',
  noValidate = false,
  method = 'POST',
  action,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const formClasses = [
    'form',
    `form--${layout}`,
    loading && 'form--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-container">
      {(title || subtitle) && (
        <div className="form__header">
          {title && <h2 className="form__title">{title}</h2>}
          {subtitle && <p className="form__subtitle">{subtitle}</p>}
        </div>
      )}

      {error && (
        <Message type="error" text={error} />
      )}

      {success && (
        <Message type="success" text={success} />
      )}

      <form
        className={formClasses}
        onSubmit={handleSubmit}
        noValidate={noValidate}
        method={method}
        action={action}
        {...props}
      >
        {children}
      </form>
    </div>
  );
};

export default Form;
