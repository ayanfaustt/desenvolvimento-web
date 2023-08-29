import React, { createContext, useState, useContext } from "react";

interface UserContextType {
  userId: number | null;
  token: number | null;
  username: string | null;
  setUserId: (userId: number | null) => void;
  setToken: (token: number | null) => void;
  setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  token: null,
  username: null,
  setUserId: () => { },
  setToken: () => { },
  setUsername: () => { },
});


export function UserProvider(props: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, token, username, setUserId, setToken, setUsername }}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
