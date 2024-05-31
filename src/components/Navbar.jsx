"use client";

import UserContext from '@/context/userContext';
import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      await axios.post('/api/logout'); // Calling the logout endpoint to clear the auth token
      setUser(undefined); // Clear user context
      router.push('/login'); // Redirect to login page
      // console.log(user.name);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">
          Work Manager
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>
        {user && (
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
        )}
      </div>
      <div className="flex space-x-4 items-center">
        {user ? (
          <>
            <div className="hover:text-gray-400">
              {user.name}
            </div>
            <button onClick={handleLogout} className="hover:text-gray-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link href="/signUp" className="hover:text-gray-400">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
