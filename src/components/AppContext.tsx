import React, { createContext, ReactNode, useContext, useState } from 'react';

const AppContext = createContext<Context | undefined>(undefined);

export function useUser() {
  return useContext(AppContext);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ uid: string }>({ uid: '' });
  const value = { user, setUser };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

type Context = {
  user: {
    uid: string;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      uid: string;
    }>
  >;
};
