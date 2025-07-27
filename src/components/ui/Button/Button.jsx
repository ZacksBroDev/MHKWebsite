/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes.
 * Handles loading states, disabled states, and click events.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {'primary'|'secondary'|'success'|'danger'|'warning'|'info'} [props.variant='primary'] - Button style variant
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Button size
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button shows loading state
 * @param {string} [props.loadingText='Loading...'] - Text to show when loading
 * @param {'button'|'submit'|'reset'} [props.type='button'] - Button type
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.fullWidth=false] - Whether button takes full width
 * @param {string} [props.icon] - Icon to display (emoji or icon class)
 * @param {'left'|'right'} [props.iconPosition='left'] - Icon position
 * @returns {JSX.Element} Button component
 * 
 * @example
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * @example
 * // Loading button
 * <Button variant="success" loading={isLoading} loadingText="Saving...">
 *   Save Changes
 * </Button>
 * 
 * @example
 * // Icon button
 * <Button variant="danger" icon="🗑️" size="small">
 *   Delete
 * </Button>
 */

import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  type = 'button',
  onClick,
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled || loading) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    className
  ].filter(Boolean).join(' ');

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="btn__spinner"></span>
          {loadingText}
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <span className="btn__icon btn__icon--left">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="btn__icon btn__icon--right">{icon}</span>
        )}
      </>
    );
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
