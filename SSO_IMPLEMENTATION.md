# JWT-based Single Sign-On (SSO) Implementation

This implementation adds JWT-based SSO functionality to the Financial Accounting-II Simulator while preserving the existing Firebase authentication system.

## Features

### Dual Authentication Support
- **Firebase Authentication**: Traditional email/password and Google sign-in
- **JWT-based SSO**: Automatic login via tokens from BcomBuddy shell application

### SSO Flow
1. User accesses the app via BcomBuddy with SSO parameters
2. App validates JWT token from URL parameters
3. User data is extracted and stored locally
4. URL parameters are cleaned for security
5. User is automatically logged in

### URL Format
```
https://my-app.netlify.app?token=ENCODED_JWT_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

### JWT Token Structure
```json
{
  "uid": "user_id",
  "email": "user@example.com", 
  "name": "User Name",
  "yearOfStudy": "1st Year",
  "role": "student",
  "isAdmin": false,
  "shellDomain": "https://bcombuddy.netlify.app",
  "microAppDomain": "https://my-app.netlify.app",
  "iat": 1234567890,
  "exp": 1234654290,
  "firebaseToken": "firebase_jwt_token"
}
```

## Implementation Details

### Files Added/Modified

1. **src/services/authService.ts** - Extended with SSO methods
2. **src/hooks/useAuth.ts** - New hook managing both auth methods
3. **src/components/ProtectedRoute.tsx** - Route protection component
4. **src/config/sso.ts** - SSO configuration
5. **src/App.tsx** - Updated to handle both authentication methods

### Key Methods

#### AuthService
- `validateTokenFromShell()` - Validates JWT from URL parameters
- `getSSOUserData()` - Retrieves stored SSO user data
- `isSSOAuthenticated()` - Checks SSO authentication status
- `ssoLogout()` - Logs out and redirects to shell app
- `cleanUrl()` - Removes sensitive URL parameters

#### useAuth Hook
- Manages both Firebase and SSO authentication states
- Provides unified interface for authentication
- Handles automatic token validation on app load

### Security Features
- Token expiration validation
- Domain validation (microAppDomain must match current domain)
- URL parameter cleanup after authentication
- Secure logout with proper redirect

### User Experience
- Seamless SSO login without user interaction
- Fallback to Firebase authentication if SSO fails
- Clear user information display
- Appropriate logout behavior based on authentication method

## Usage

### For SSO Users
Users accessing via BcomBuddy will be automatically logged in when the URL contains valid SSO parameters.

### For Direct Users
Users accessing the app directly will see the Firebase login form and can authenticate normally.

### Development Testing
To test SSO functionality, you can simulate the URL format:
```
http://localhost:5173?token=ENCODED_TEST_TOKEN&sso=true&shell=https://bcombuddy.netlify.app
```

Where `ENCODED_TEST_TOKEN` is a URL-encoded JSON string matching the JWT structure above.

## Configuration

Update `src/config/sso.ts` to modify SSO settings:
```typescript
export const SSO_CONFIG = {
  SHELL_DOMAIN: 'https://bcombuddy.netlify.app',
  APP_TYPE: 'simulator'
} as const;
```
