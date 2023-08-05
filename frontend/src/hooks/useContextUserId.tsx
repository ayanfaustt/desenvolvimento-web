import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
  userId: number | null;
  setUserId: (userId: number | null) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => { },
});


export function UserProvider(props: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
