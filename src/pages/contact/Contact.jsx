/**
 * Contact Component
 * 
 * Contact page with a form that integrates with Web3Forms service.
 * Allows users to send messages directly to the martial arts school.
 * Includes form validation and submission handling.
 * 
 * @component
 * @returns {JSX.Element} Contact page with form
 * 
 * Features:
 * - Web3Forms integration for email delivery
 * - Form validation (required fields)
 * - Auto-reset form after submission
 * - Responsive design
 * - Professional styling
 */

import React, { useState } from "react";
import './contact.css';
import useWeb3Forms from '@web3forms/react';

/**
 * Contact Component - Contact form page
 * @returns {JSX.Element} Contact page with submission form
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  const accessKey = 'bd3b1db0-a150-4eb9-8c61-27249b4f0d98';
  
  const { submit } = useWeb3Forms({
    access_key: accessKey,
    settings: {
      from_name: 'Mile High Karate',
      subject: 'New Contact Message from your Website',
    },
    onSuccess: (message, data) => {
      console.log('Success', message, data);
      setSubmitStatus('success');
      setIsSubmitting(false);
    },
    onError: (message, data) => {
      console.error('Error', message, data);
      setSubmitStatus('error');
      setIsSubmitting(false);
    },
  });

  /**
   * Handles form submission with error handling and user feedback
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      await submit({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        subject: e.target.subject.value, // Fixed: was e.target.phone.value
        message: e.target.message.value,
      });
      e.target.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="background">
      <h1>Contact Form</h1>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="success-message">
          ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="error-message">
          ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <input 
          name="name" 
          id="name" 
          type="text" 
          placeholder="Your Name" 
          required
          disabled={isSubmitting}
        />
        <input 
          name="email" 
          id="email" 
          type="email" 
          placeholder="Your Email" 
          required
          disabled={isSubmitting}
        />
        <input 
          name="phone" 
          id="phone" 
          type="tel" 
          placeholder="Your Phone" 
          required
          disabled={isSubmitting}
        />
        <input 
          name="subject" 
          id="subject" 
          type="text" 
          placeholder="Subject" 
          required
          disabled={isSubmitting}
        />
        <textarea 
          name="message" 
          id="message" 
          placeholder="Your Message" 
          required
          disabled={isSubmitting}
        ></textarea>
        <button 
          id="submit" 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'SENDING...' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
};
export default Contact;