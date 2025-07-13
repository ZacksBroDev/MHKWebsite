import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send SMS message
 * @param {string} to - Phone number to send to (e.g., "+1234567890")
 * @param {string} message - Message content
 * @returns {Promise} - Twilio message object
 */
export const sendSMS = async (to, message) => {
  try {
    // Development mode - simulate SMS without actually sending
    if (process.env.SMS_DEVELOPMENT_MODE === "true") {
      console.log(`🧪 [DEV MODE] SMS Simulation:`);
      console.log(`📱 To: ${to}`);
      console.log(`📝 Message: ${message}`);
      console.log(`✅ SMS simulated successfully (development mode)`);

      // Return a mock response similar to Twilio's
      return {
        sid: "SM" + Math.random().toString(36).substr(2, 32),
        status: "delivered",
        to: to,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: message,
      };
    }

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      throw new Error("Twilio credentials not configured");
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    console.log(`✅ SMS sent successfully to ${to}. SID: ${result.sid}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${to}:`, error.message);
    throw error;
  }
};

/**
 * Send access code via SMS
 * @param {string} phoneNumber - User's phone number
 * @param {string} accessCode - Access code to send
 * @param {string} userName - User's name (optional)
 * @returns {Promise} - Twilio message object
 */
export const sendAccessCodeSMS = async (
  phoneNumber,
  accessCode,
  userName = ""
) => {
  const message = `
🥋 Mile High Karate - Access Code

Hi ${userName}!

Your access code: ${accessCode}

Use this code to create your account at: [Your Website URL]

Questions? Reply to this message or call us.

- MHK Team
  `.trim();

  return await sendSMS(phoneNumber, message);
};

/**
 * Send welcome SMS after successful signup
 * @param {string} phoneNumber - User's phone number
 * @param {string} userName - User's name
 * @returns {Promise} - Twilio message object
 */
export const sendWelcomeSMS = async (phoneNumber, userName) => {
  const message = `
🥋 Welcome to Mile High Karate, ${userName}!

Your account has been created successfully. You can now:
• View class schedules
• Register for events
• Track your progress

Welcome to the dojo!

- MHK Team
  `.trim();

  return await sendSMS(phoneNumber, message);
};

/**
 * Send class reminder SMS
 * @param {string} phoneNumber - User's phone number
 * @param {string} userName - User's name
 * @param {string} className - Name of the class
 * @param {string} classTime - Class time
 * @param {string} classDate - Class date
 * @returns {Promise} - Twilio message object
 */
export const sendClassReminderSMS = async (
  phoneNumber,
  userName,
  className,
  classTime,
  classDate
) => {
  const message = `
🥋 Class Reminder - Mile High Karate

Hi ${userName},

Reminder: ${className}
📅 ${classDate}
🕐 ${classTime}
📍 Mile High Karate Dojo

See you on the mat!

- MHK Team
  `.trim();

  return await sendSMS(phoneNumber, message);
};

export default {
  sendSMS,
  sendAccessCodeSMS,
  sendWelcomeSMS,
  sendClassReminderSMS,
};
