import { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import api from '../api';
import { ListingType } from '../data';

interface ContextValues {
  listings: ListingType[];
}

interface ContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextValues>(undefined!);

export function ContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [listings, setListings] = useState<ListingType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/listings');
      setListings(data);
    })();
  }, []);

  return <Context.Provider value={{ listings }}>{children}</Context.Provider>;
}

export default Context;
