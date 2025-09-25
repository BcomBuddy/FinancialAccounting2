# Firebase Email Configuration

To ensure password reset emails are delivered to the primary inbox and avoid spam filters, configure the following in your Firebase Console:

## Email Template Configuration

### Password Reset Email Template

**From Name:** Financial Accounting-2 Simulator Support  
**From Email:** no-reply@bcombuddy.com  
**Subject:** Reset your Financial Accounting-2 Simulator password

### Email Content Template

```
Subject: Reset your Financial Accounting-2 Simulator password

Hello,

You requested to reset your password for the Financial Accounting-2 Simulator.

Click the link below to reset your password:
[Reset Password Link]

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
Financial Accounting-2 Simulator Support Team

---
This email was sent from Financial Accounting-2 Simulator
```

## Firebase Console Setup Steps

1. Go to Firebase Console → Authentication → Templates
2. Select "Password reset" template
3. Update the following settings:
   - **From name:** Financial Accounting-2 Simulator Support
   - **From email:** no-reply@bcombuddy.com
   - **Subject:** Reset your Financial Accounting-2 Simulator password
   - **Email body:** Use the template above

## Additional Email Deliverability Tips

1. **SPF Record:** Add Firebase's IP ranges to your domain's SPF record
2. **DKIM:** Enable DKIM signing in Firebase Console
3. **DMARC:** Set up DMARC policy for your domain
4. **Sender Reputation:** Use a consistent sender name and email
5. **Avoid Spam Triggers:** 
   - No excessive exclamation marks
   - No "URGENT" or "ACT NOW" language
   - Professional tone and formatting
   - Clear unsubscribe information

## Testing

Test the email delivery by:
1. Using a test email address
2. Checking spam/junk folders
3. Verifying email headers show proper sender information
4. Testing with different email providers (Gmail, Outlook, Yahoo)
