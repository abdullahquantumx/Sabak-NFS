"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import { useRouter } from 'next/navigation';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/current');
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        // If there's an error (e.g., user not authenticated), you might want to redirect to login
        router.push('/login');
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or some other loading UI
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
