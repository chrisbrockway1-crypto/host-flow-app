// /lib/email.js
// This utility handles the actual email delivery using a service like SendGrid or Resend.
// Remember to set the SENDGRID_API_KEY and FROM_EMAIL in your .env.local file.

// *** PLACEHOLDER: Replace this with your actual SendGrid or Resend integration code ***

export async function sendWelcomeEmail(to, subject, htmlContent) {
    // In a real application, you would import the SendGrid client:
    // import sgMail from '@sendgrid/mail';
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: to,
        from: process.env.FROM_EMAIL || 'notifications@hostflow.com',
        subject: subject,
        html: htmlContent,
    };

    try {
        // await sgMail.send(msg); 
        console.log(`[Email Sent Mock] To: ${to}, Subject: ${subject}`);
        console.log('--- Email Content Snippet ---');
        console.log(htmlContent.substring(0, 300) + '...');
        return true;
    } catch (error) {
        console.error('Email Sending Error:', error);
        // Log the error in production, but don't crash the server
        return false;
    }
}