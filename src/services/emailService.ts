// Email Service using EmailJS
// This service handles sending emails from the frontend without requiring a backend
// 
// SETUP INSTRUCTIONS:
// 1. Create a free account at https://www.emailjs.com/
// 2. Create an Email Service (Gmail, Outlook, etc.)
// 3. Create an Email Template with the following variables:
//    - {{to_email}} - recipient email
//    - {{to_name}} - recipient name
//    - {{subject}} - email subject
//    - {{message}} - email body content
//    - {{from_name}} - sender name (your app name)
// 4. Copy your Service ID, Template ID, and Public Key
// 5. Add them to your .env file:
//    REACT_APP_EMAILJS_SERVICE_ID=your_service_id
//    REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
//    REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '',
};

// Check if EmailJS is configured
export const isEmailJSConfigured = (): boolean => {
  return !!(
    EMAILJS_CONFIG.SERVICE_ID &&
    EMAILJS_CONFIG.TEMPLATE_ID &&
    EMAILJS_CONFIG.PUBLIC_KEY
  );
};

// Initialize EmailJS
export const initEmailJS = (): void => {
  if (EMAILJS_CONFIG.PUBLIC_KEY) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
};

// Email template parameters interface
interface EmailTemplateParams {
  to_email: string;
  to_name?: string;
  subject: string;
  message: string;
  from_name?: string;
}

// Send email using EmailJS
export const sendEmail = async (params: EmailTemplateParams): Promise<{ success: boolean; message: string }> => {
  // Check if EmailJS is configured
  if (!isEmailJSConfigured()) {
    console.warn('EmailJS is not configured. Please set up your EmailJS credentials in .env file.');
    return {
      success: false,
      message: 'Email service not configured. Please contact support.',
    };
  }

  try {
    const templateParams = {
      to_email: params.to_email,
      to_name: params.to_name || params.to_email.split('@')[0],
      subject: params.subject,
      message: params.message,
      from_name: params.from_name || 'Eagle AI',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (response.status === 200) {
      return {
        success: true,
        message: `Email sent successfully to ${params.to_email}`,
      };
    } else {
      return {
        success: false,
        message: `Failed to send email: ${response.text}`,
      };
    }
  } catch (error: any) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: error?.text || error?.message || 'Failed to send email. Please try again.',
    };
  }
};

// Send transcript email
export const sendTranscriptEmail = async (
  recipientEmail: string,
  subject: string,
  content: string,
  recipientName?: string
): Promise<{ success: boolean; message: string }> => {
  return sendEmail({
    to_email: recipientEmail,
    to_name: recipientName,
    subject: subject,
    message: content,
    from_name: 'Eagle AI Transcription',
  });
};

// Send intelligence report email
export const sendIntelligenceEmail = async (
  recipientEmail: string,
  subject: string,
  content: string,
  recipientName?: string
): Promise<{ success: boolean; message: string }> => {
  return sendEmail({
    to_email: recipientEmail,
    to_name: recipientName,
    subject: subject,
    message: content,
    from_name: 'Eagle AI Intelligence',
  });
};

// Fallback: Open mailto link with pre-filled content
export const openMailtoFallback = (
  recipientEmail: string,
  subject: string,
  body: string
): void => {
  const mailtoSubject = encodeURIComponent(subject);
  const mailtoBody = encodeURIComponent(body);
  window.open(`mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
};

// Download and email fallback
// Downloads the content as a file and opens email client with instructions
export const downloadAndEmailFallback = (
  content: string,
  fileName: string,
  recipientEmail: string,
  subject: string
): void => {
  // Download the file
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Open email with instructions
  const emailBody = `Hi,

Please find the attached file "${fileName}".

Note: The file has been downloaded to your device. Please attach it to this email before sending.

Best regards,
Eagle AI`;

  openMailtoFallback(recipientEmail, subject, emailBody);
};

// Debug and test functions
export const getEmailJSConfig = () => {
  return {
    serviceId: EMAILJS_CONFIG.SERVICE_ID ? `${EMAILJS_CONFIG.SERVICE_ID.substring(0, 8)}...` : 'NOT SET',
    templateId: EMAILJS_CONFIG.TEMPLATE_ID ? `${EMAILJS_CONFIG.TEMPLATE_ID.substring(0, 8)}...` : 'NOT SET',
    publicKey: EMAILJS_CONFIG.PUBLIC_KEY ? `${EMAILJS_CONFIG.PUBLIC_KEY.substring(0, 8)}...` : 'NOT SET',
    isConfigured: isEmailJSConfigured(),
  };
};

// Test EmailJS connection and send a test email
export const testEmailJS = async (testEmail: string): Promise<{
  configStatus: any;
  testResult: { success: boolean; message: string; details?: any };
}> => {
  console.log('🔍 Testing EmailJS Configuration...');
  console.log('='.repeat(50));
  
  const configStatus = {
    serviceId: EMAILJS_CONFIG.SERVICE_ID || 'NOT SET',
    templateId: EMAILJS_CONFIG.TEMPLATE_ID || 'NOT SET',
    publicKey: EMAILJS_CONFIG.PUBLIC_KEY || 'NOT SET',
    isConfigured: isEmailJSConfigured(),
  };
  
  console.log('📋 Configuration Status:');
  console.log(`   Service ID: ${configStatus.serviceId ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Template ID: ${configStatus.templateId ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Public Key: ${configStatus.publicKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`   Is Configured: ${configStatus.isConfigured ? '✅ Yes' : '❌ No'}`);
  
  if (!isEmailJSConfigured()) {
    const errorMsg = 'EmailJS is not properly configured. Check your .env file.';
    console.error('❌', errorMsg);
    return {
      configStatus,
      testResult: {
        success: false,
        message: errorMsg,
        details: {
          hint: 'Make sure you have set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, and REACT_APP_EMAILJS_PUBLIC_KEY in your .env file',
          restart: 'After adding env variables, restart your development server (npm start)',
        },
      },
    };
  }
  
  console.log('\n📧 Sending test email to:', testEmail);
  
  try {
    // Initialize EmailJS first
    initEmailJS();
    
    const templateParams = {
      to_email: testEmail,
      to_name: 'Test User',
      subject: 'Eagle AI - EmailJS Test',
      message: `This is a test email from Eagle AI.

If you receive this email, your EmailJS configuration is working correctly!

Timestamp: ${new Date().toISOString()}
Service ID: ${EMAILJS_CONFIG.SERVICE_ID}
Template ID: ${EMAILJS_CONFIG.TEMPLATE_ID}`,
      from_name: 'Eagle AI Test',
    };
    
    console.log('📤 Sending with params:', { ...templateParams, message: '[content hidden]' });
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log('📬 EmailJS Response:', response);
    
    if (response.status === 200) {
      console.log('✅ Test email sent successfully!');
      return {
        configStatus,
        testResult: {
          success: true,
          message: `Test email sent successfully to ${testEmail}! Check your inbox.`,
          details: { status: response.status, text: response.text },
        },
      };
    } else {
      console.error('❌ Unexpected response status:', response.status);
      return {
        configStatus,
        testResult: {
          success: false,
          message: `Unexpected response: ${response.text}`,
          details: response,
        },
      };
    }
  } catch (error: any) {
    console.error('❌ EmailJS Error:', error);
    
    let errorMessage = 'Unknown error';
    let errorDetails: any = { rawError: error };
    
    if (error?.text) {
      errorMessage = error.text;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    // Common error hints
    if (errorMessage.includes('service_id')) {
      errorDetails.hint = 'Invalid Service ID. Check your EmailJS dashboard for the correct Service ID.';
    } else if (errorMessage.includes('template_id')) {
      errorDetails.hint = 'Invalid Template ID. Check your EmailJS dashboard for the correct Template ID.';
    } else if (errorMessage.includes('user_id') || errorMessage.includes('public_key')) {
      errorDetails.hint = 'Invalid Public Key. Check your EmailJS account settings for the correct Public Key.';
    } else if (errorMessage.includes('gmail') || errorMessage.includes('quota')) {
      errorDetails.hint = 'Gmail quota exceeded or email service not properly connected. Check your EmailJS email service settings.';
    }
    
    return {
      configStatus,
      testResult: {
        success: false,
        message: errorMessage,
        details: errorDetails,
      },
    };
  }
};

// Quick test from browser console
export const quickTest = async (email: string) => {
  const result = await testEmailJS(email);
  console.log('\n📊 Test Result:', result);
  return result;
};

export default {
  initEmailJS,
  isEmailJSConfigured,
  sendEmail,
  sendTranscriptEmail,
  sendIntelligenceEmail,
  openMailtoFallback,
  downloadAndEmailFallback,
  getEmailJSConfig,
  testEmailJS,
  quickTest,
};

