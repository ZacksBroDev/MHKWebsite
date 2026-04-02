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
import { Link } from 'react-router-dom';

/**
 * Contact Component - Contact form page
 * @returns {JSX.Element} Contact page with submission form
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [inquiryType, setInquiryType] = useState('member-support');

  const inquiryPresets = {
    'member-support': {
      label: 'Member Support',
      subject: 'Member Support Request'
    },
    'schedule-help': {
      label: 'Schedule Help',
      subject: 'Schedule Assistance Needed'
    },
    'training-question': {
      label: 'Training Question',
      subject: 'Training Path Question'
    },
    'new-student': {
      label: 'New Student',
      subject: 'New Student Inquiry'
    }
  };
  
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
      const enteredSubject = e.target.subject.value.trim();
      await submit({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        subject: enteredSubject || inquiryPresets[inquiryType].subject,
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
    <section className="contact-page">
      <div className="contact-shell">
        <section className="contact-hero">
          <div className="contact-copy">
            <p className="contact-kicker">Academy Support</p>
            <h1>Talk to the academy without fighting the interface.</h1>
            <p>
              Use the support form for member questions, schedule issues, training guidance, or new-student inquiries. The page now routes the conversation with clearer intent and a more credible presentation.
            </p>
          </div>

          <div className="contact-cards">
            <article className="contact-card">
              <span>Response Window</span>
              <strong>Within 1 business day</strong>
              <p>Operational questions and member support requests are prioritized first.</p>
            </article>
            <article className="contact-card">
              <span>Academy Desk</span>
              <strong>(555) 123-KICK</strong>
              <p>Best for urgent schedule or attendance questions during operating hours.</p>
            </article>
            <article className="contact-card">
              <span>Visit</span>
              <strong>3979 E 120th Ave</strong>
              <p>Thornton, CO 80233. Stop in for front-desk help or program guidance.</p>
            </article>
          </div>
        </section>

        <section className="contact-content">
          <aside className="contact-sidebar">
            <h2>Choose your inquiry lane</h2>
            <div className="inquiry-options">
              {Object.entries(inquiryPresets).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  className={`inquiry-pill ${inquiryType === key ? 'active' : ''}`}
                  onClick={() => setInquiryType(key)}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="support-notes">
              <h3>What to include</h3>
              <ul>
                <li>Your full name and best callback number.</li>
                <li>The class, lesson, or account issue you need help with.</li>
                <li>Any time-sensitive detail that affects attendance or progression.</li>
              </ul>
            </div>
          </aside>

          <div className="contact-form-panel">
            {submitStatus === 'success' ? (
              <div className="contact-success-state">
                <p className="success-kicker">Message Delivered</p>
                <h3>Request sent to academy support.</h3>
                <p>
                  A team member will review your request and respond within one business day. If this issue affects today&apos;s attendance, call the front desk directly.
                </p>

                <div className="success-quick-facts">
                  <div>
                    <span>Contact Line</span>
                    <strong>(555) 123-KICK</strong>
                  </div>
                  <div>
                    <span>Response Window</span>
                    <strong>1 business day</strong>
                  </div>
                </div>

                <div className="success-actions">
                  <button
                    type="button"
                    className="success-secondary"
                    onClick={() => setSubmitStatus('')}
                  >
                    Send Another Message
                  </button>
                  <Link className="success-primary" to="/schedule">
                    Return to Schedule
                  </Link>
                </div>
              </div>
            ) : (
            <>
            {submitStatus === 'error' && (
              <div className="error-message">
                There was a problem sending your message. Try again or contact the academy desk directly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="field field-name">
                <label htmlFor="name">Full Name</label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="field field-email">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="field field-phone">
                <label htmlFor="phone">Phone</label>
                <input
                  name="phone"
                  id="phone"
                  type="tel"
                  placeholder="Your Phone"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="field field-subject">
                <label htmlFor="subject">Subject</label>
                <input
                  name="subject"
                  id="subject"
                  type="text"
                  placeholder={inquiryPresets[inquiryType].subject}
                  disabled={isSubmitting}
                />
              </div>

              <div className="field field-message">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Tell the academy what you need, what class or training path it affects, and how to best help you."
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                id="submit"
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Request...' : 'Send to Academy'}
              </button>
            </form>
            </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};
export default Contact;