import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// User interface as per the object structure
interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  smuNo: string;
  userType: string;
  year: string;
}

// Context type
interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

// Creating the context
export const UserContext = createContext<UserContextType | null>(null);

interface ProviderLayoutProps {
  children?: React.ReactNode;
}

const ProviderLayout = ({ children }: ProviderLayoutProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user is found
      navigate('/login');
    }
  }, [navigate]);

  // If user is still being determined, render nothing or a loading component
  if (user === undefined) {
    return null; // or <LoadingComponent />
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet context={{ user }} />
      {children}
    </UserContext.Provider>
  );
};

export default ProviderLayout;
