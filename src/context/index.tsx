import jwtDecode from 'jwt-decode';
import { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import api from '../api';
import { ListingType, UserType } from '../data';

interface ContextValues {
  listings: ListingType[];
  user: UserType | undefined;
  userSetter: (user: UserType | undefined) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextValues>(undefined!);

export function ContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [listings, setListings] = useState<ListingType[]>([]);
  const userInput: UserType | undefined = localStorage.getItem('LIST_JWT')
    ? jwtDecode<UserType>(localStorage.getItem('LIST_JWT') as string)
    : undefined;
  const [user, setUser] = useState<UserType | undefined>(userInput);

  const userSetter = (user: UserType | undefined) => setUser(user);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/listings');
      setListings(data);
    })();
  }, []);

  return (
    <Context.Provider value={{ listings, user, userSetter }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
