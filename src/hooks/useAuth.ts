import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthService, UserData } from '../services/authService';

export interface AuthState {
  user: User | null;
  ssoUser: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  isSSOAuthenticated: boolean;
  authMethod: 'firebase' | 'sso' | null;
}

export const useAuth = (): AuthState & {
  logout: () => Promise<void>;
  ssoLogout: () => void;
} => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [ssoUser, setSsoUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, try to validate SSO token from URL
    const ssoUserData = AuthService.validateTokenFromShell();
    
    if (ssoUserData) {
      setSsoUser(ssoUserData);
      console.log('✅ SSO Login successful:', ssoUserData);
    } else {
      // Check for existing SSO user data in localStorage
      const storedSSOUser = AuthService.getSSOUserData();
      if (storedSSOUser) {
        setSsoUser(storedSSOUser);
      }
    }

    // Listen for Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await AuthService.signOut();
      setFirebaseUser(null);
    } catch (error) {
      console.error('Firebase logout error:', error);
    }
  };

  const ssoLogout = () => {
    AuthService.ssoLogout();
    setSsoUser(null);
  };

  const isAuthenticated = !!firebaseUser || !!ssoUser;
  const isSSOAuthenticated = !!ssoUser;
  const authMethod = ssoUser ? 'sso' : firebaseUser ? 'firebase' : null;

  return {
    user: firebaseUser,
    ssoUser,
    loading,
    isAuthenticated,
    isSSOAuthenticated,
    authMethod,
    logout,
    ssoLogout
  };
};
