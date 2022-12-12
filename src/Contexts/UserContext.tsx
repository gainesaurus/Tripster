import { User } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase';

interface AuthUser {
  uid: string;
  email: string | null;
  token: string;
}

export const UserContext = createContext<Context | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context) return context;
  else throw new Error('useUserContext was used outside of its Provider');
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const formatAuthUser = async (user: User) => {
    const token = await user.getIdToken();
    const authUser: AuthUser = {
      uid: user.uid,
      email: user.email,
      token,
    };
    return authUser;
  };

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formated = await formatAuthUser(authState);
    setAuthUser(formated);
    setLoading(false);
    console.log('AuthUser', authUser);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const value = {
    authUser,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

type Context = {
  authUser: AuthUser | null;
  loading: boolean;
};
