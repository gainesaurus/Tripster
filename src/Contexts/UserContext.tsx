import React, { createContext, ReactNode, useContext, useState } from 'react';

const UserContext = createContext<Context | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context) return context;
  else throw new Error('useUserContext was used outside of its Provider');
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState('');
  const [uid, setUid] = useState('');

  const value = {
    token,
    setToken,
    uid,
    setUid,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

type Context = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
};
