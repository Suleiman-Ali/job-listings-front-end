import jwtDecode from 'jwt-decode';
import { ReactNode } from 'react';
import { createContext, useState, useEffect } from 'react';
import api from '../api';
import { ListingType, UserType } from '../data';

interface ContextValues {
  listings: ListingType[];
  userListings: ListingType[];
  user: UserType | undefined;
  userSetter: (user: UserType | undefined) => void;
  listingsSetter: (newListing: ListingType) => void;
  userListingsSetter: (newListing: ListingType) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextValues>(undefined!);

export function ContextProvider({
  children,
}: ContextProviderProps): JSX.Element {
  const [listings, setListings] = useState<ListingType[]>([]);
  const [userListings, setUserListings] = useState<ListingType[]>([]);
  const userInput: UserType | undefined = localStorage.getItem('LIST_JWT')
    ? jwtDecode<UserType>(localStorage.getItem('LIST_JWT') as string)
    : undefined;
  const [user, setUser] = useState<UserType | undefined>(userInput);

  const userSetter = (user: UserType | undefined) => setUser(user);
  const listingsSetter = (newListing: ListingType) =>
    setListings((listings) => [newListing, ...listings]);
  const userListingsSetter = (newListing: ListingType) =>
    setUserListings((listings) => [newListing, ...listings]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/listings');
      setListings(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const token = localStorage.getItem('LIST_JWT');
      const config = {
        headers: { 'x-auth-token': token as string },
      };
      const data = (await api.get(`/listings/${user._id}`, config)).data;
      setUserListings(data);
    })();
  }, [user]);

  return (
    <Context.Provider
      value={{
        listings,
        user,
        userSetter,
        listingsSetter,
        userListings,
        userListingsSetter,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
