
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/user';
import { UserContext } from '../contexts/UserContext';
import { fetchUser, isAuthenticated } from '../services/authService';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      if (isAuthenticated()) {
        const fetchedUser = await fetchUser();
        setUser(fetchedUser);
      }
      setLoading(false);
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
