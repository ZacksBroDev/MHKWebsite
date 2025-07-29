/**
 * Email Service for Mile High Karate
 * 
 * Handles sending emails for password resets, welcome messages, etc.
 * Uses nodemailer with Gmail for actual email delivery.
 */

import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // For development, you can use a test email service like Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
    },
  });
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} resetLink - Password reset link
 * @param {string} username - User's name
 */
export const sendPasswordResetEmail = async (email, resetLink, username = '') => {
  try {
    // Always log to console for development
    console.log('\n📧 PASSWORD RESET EMAIL');
    console.log('='.repeat(50));
    console.log(`To: ${email}`);
    console.log(`Subject: Mile High Karate - Password Reset Request`);
    console.log('\nEmail Content:');
    console.log(`Hi ${username || 'there'},\n`);
    console.log('You requested a password reset for your Mile High Karate account.');
    console.log('\nClick the link below to reset your password:');
    console.log(`${resetLink}\n`);
    console.log('This link expires in 1 hour for security.');
    console.log('\nIf you did not request this reset, please ignore this email.');
    console.log('\nMile High Karate Team');
    console.log('='.repeat(50));
    
    // Try to send actual email if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
      console.log('\n🚀 Attempting to send actual email...');
      
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Mile High Karate - Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hi ${username || 'there'},</p>
            <p>You requested a password reset for your Mile High Karate account.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: #007bff; color: white; padding: 15px 30px; 
                        text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            <p><strong>This link expires in 1 hour for security.</strong></p>
            <p>If you did not request this reset, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="color: #666; font-size: 14px;">Mile High Karate Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log('📋 Email details:');
      console.log('   From:', process.env.EMAIL_USER);
      console.log('   To:', email);
      console.log('   Subject: Mile High Karate - Password Reset Request');
      return { success: true, message: 'Password reset email sent successfully' };
      
    } else {
      console.log('⚠️  Email credentials not configured - email logged to console only');
      console.log('   Set EMAIL_USER and EMAIL_APP_PASSWORD in .env to enable actual email sending');
      return { success: true, message: 'Password reset email logged to console (configure EMAIL_USER and EMAIL_APP_PASSWORD for actual sending)' };
    }
    
  } catch (error) {
    console.error('❌ Email service error:', error.message);
    
    // If email fails, at least we logged it to console
    return { 
      success: true, // Don't fail the password reset if email fails
      message: 'Password reset email logged to console (email sending failed - check server logs)' 
    };
  }
};

/**
 * Send welcome email to new users
 * @param {string} email - User email
 * @param {string} username - Username
 */
export const sendWelcomeEmail = async (email, username) => {
  try {
    console.log('\n📧 WELCOME EMAIL');
    console.log('='.repeat(50));
    console.log(`To: ${email}`);
    console.log(`Subject: Welcome to Mile High Karate!`);
    console.log('\nEmail Content:');
    console.log(`Welcome ${username}!\n`);
    console.log('Thank you for joining Mile High Karate.');
    console.log('You can now sign up for events and track your training progress.');
    console.log('\nGet started by visiting our schedule and joining an event!');
    console.log('\nMile High Karate Team');
    console.log('='.repeat(50));
    
    return { success: true, message: 'Welcome email logged to console' };
    
  } catch (error) {
    console.error('Welcome email service error:', error);
    return { success: false, error: error.message };
  }
};
