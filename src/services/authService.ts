import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  User,
  AuthError
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { SSO_CONFIG } from '../config/sso';

export interface AuthErrorType {
  code: string;
  message: string;
}

export interface UserData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain?: string;
  microAppDomain?: string;
}

export interface SSOTokenData {
  uid: string;
  email: string;
  name: string;
  yearOfStudy: string;
  role: string;
  isAdmin: boolean;
  shellDomain: string;
  microAppDomain: string;
  iat: number;
  exp: number;
  firebaseToken?: string;
}

export class AuthService {
  private static readonly USER_KEY = 'user_data';
  private static readonly SSO_USER_KEY = 'sso_user_data';

  /**
   * Validate JWT token from shell application (SSO)
   */
  static validateTokenFromShell(): UserData | null {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isSSO = urlParams.get('sso') === 'true';

    if (!token || !isSSO) {
      return null;
    }

    try {
      const tokenData: SSOTokenData = JSON.parse(decodeURIComponent(token));
      
      // Validate required fields
      if (!tokenData.uid || !tokenData.email) {
        console.error('Invalid token: missing required fields');
        return null;
      }

      // Check token expiration
      if (tokenData.exp < Math.floor(Date.now() / 1000)) {
        console.error('Token has expired');
        return null;
      }

      // Validate micro app domain matches current domain
      const currentDomain = window.location.origin;
      if (tokenData.microAppDomain && tokenData.microAppDomain !== currentDomain) {
        console.error('Token micro app domain mismatch');
        return null;
      }

      const userData: UserData = {
        uid: tokenData.uid,
        email: tokenData.email,
        name: tokenData.name,
        yearOfStudy: tokenData.yearOfStudy,
        role: tokenData.role,
        isAdmin: tokenData.isAdmin,
        shellDomain: tokenData.shellDomain,
        microAppDomain: tokenData.microAppDomain
      };

      // Store SSO user data
      localStorage.setItem(this.SSO_USER_KEY, JSON.stringify(userData));
      this.cleanUrl();
      
      console.log('✅ SSO Login successful:', userData);
      return userData;
    } catch (error) {
      console.error('Error validating SSO token:', error);
      return null;
    }
  }

  /**
   * Get SSO user data from localStorage
   */
  static getSSOUserData(): UserData | null {
    const userData = localStorage.getItem(this.SSO_USER_KEY);
    if (!userData) return null;

    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated via SSO
   */
  static isSSOAuthenticated(): boolean {
    return this.getSSOUserData() !== null;
  }

  /**
   * SSO logout - redirect to shell application
   */
  static ssoLogout(): void {
    localStorage.removeItem(this.SSO_USER_KEY);
    
    const userData = this.getSSOUserData();
    const shellDomain = userData?.shellDomain || 
                       new URLSearchParams(window.location.search).get('shell') || 
                       SSO_CONFIG.SHELL_DOMAIN;
    
    window.location.href = shellDomain;
  }

  /**
   * Clean URL parameters after SSO authentication
   */
  private static cleanUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('sso');
    url.searchParams.delete('shell');
    window.history.replaceState({}, document.title, url.toString());
  }

  /**
   * Sign in with email and password
   */
  static async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Get the current user
   */
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  /**
   * Send password reset email
   */
  static async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin,
        handleCodeInApp: false
      });
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  /**
   * Handle Firebase Auth errors and convert them to user-friendly messages
   */
  private static handleAuthError(error: AuthError): AuthErrorType {
    let message = 'An error occurred during authentication.';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address format.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Sign-in popup was closed. Please try again.';
        break;
      case 'auth/cancelled-popup-request':
        message = 'Sign-in was cancelled. Please try again.';
        break;
      case 'auth/popup-blocked':
        message = 'Sign-in popup was blocked. Please allow popups and try again.';
        break;
      case 'auth/account-exists-with-different-credential':
        message = 'An account already exists with this email but different sign-in method.';
        break;
      case 'auth/email-already-in-use':
        message = 'An account already exists with this email address.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid credentials. Please check your email and password.';
        break;
      default:
        message = error.message || 'An unexpected error occurred.';
    }

    return {
      code: error.code,
      message
    };
  }
}
