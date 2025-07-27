/**
 * Input Component
 * 
 * Reusable input component with validation states and different types.
 * Supports various input types, validation, and accessibility features.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {'text'|'email'|'password'|'tel'|'number'|'date'|'time'|'textarea'} [props.type='text'] - Input type
 * @param {string} [props.label] - Input label text
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string|number} [props.value] - Input value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {Function} [props.onFocus] - Focus handler
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {string} [props.error] - Error message to display
 * @param {string} [props.helpText] - Help text to display
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Input size
 * @param {boolean} [props.fullWidth=false] - Whether input takes full width
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.name] - Input name attribute
 * @param {string} [props.id] - Input id attribute
 * @param {number} [props.rows=4] - Number of rows for textarea
 * @param {number} [props.minLength] - Minimum length
 * @param {number} [props.maxLength] - Maximum length
 * @param {string|number} [props.min] - Minimum value for number/date inputs
 * @param {string|number} [props.max] - Maximum value for number/date inputs
 * @param {string|number} [props.step] - Step value for number inputs
 * @returns {JSX.Element} Input component
 * 
 * @example
 * // Basic text input
 * <Input
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   required
 * />
 * 
 * @example
 * // Input with validation
 * <Input
 *   label="Password"
 *   type="password"
 *   value={password}
 *   onChange={handlePasswordChange}
 *   error={passwordError}
 *   helpText="Password must be at least 6 characters"
 * />
 */

import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  required = false,
  disabled = false,
  error,
  helpText,
  size = 'medium',
  fullWidth = false,
  className = '',
  name,
  id,
  rows = 4,
  minLength,
  maxLength,
  min,
  max,
  step,
  ...props
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const inputClasses = [
    'input',
    `input--${size}`,
    fullWidth && 'input--full-width',
    error && 'input--error',
    disabled && 'input--disabled',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'input-container',
    fullWidth && 'input-container--full-width'
  ].filter(Boolean).join(' ');

  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      required,
      disabled,
      className: inputClasses,
      minLength,
      maxLength,
      min,
      max,
      step,
      ...props
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={rows}
        />
      );
    }

    return (
      <input
        type={type}
        {...commonProps}
      />
    );
  };

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      
      <div className="input__wrapper">
        {renderInput()}
      </div>
      
      {error && (
        <div className="input__error" role="alert">
          {error}
        </div>
      )}
      
      {helpText && !error && (
        <div className="input__help">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default Input;
