import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '../../lib/firebase/config';

export const UserMenu: React.FC = () => {
  const { user, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) {
    return (
      <div className="flex gap-4">
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      const auth = getFirebaseAuth();
      if (auth) {
        await signOut(auth);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <a
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="px-4 py-2 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors"
        >
          Sign up
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <span className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-lg font-medium">
          {user.email?.[0].toUpperCase()}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.email?.split('@')[0]}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <a
            href="/my-memorials"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            My Memorials
          </a>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};