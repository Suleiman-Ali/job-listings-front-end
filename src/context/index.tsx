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
  addListing: (newListing: ListingType) => void;
  deleteListing: (listing: ListingType) => void;
  updateListing: (listing: ListingType) => void;
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

  const addListing = (newListing: ListingType) => {
    setListings((lists) => [newListing, ...lists]);
    setUserListings((lists) => [newListing, ...lists]);
  };

  const deleteListing = (listing: ListingType) => {
    setListings((lists) => lists.filter((l) => l._id !== listing._id));
    setUserListings((lists) => lists.filter((l) => l._id !== listing._id));
  };

  // prettier-ignore
  const updateListing = (listing: ListingType) => {
    const currentListing = listings.find((l) => l._id === listing._id);
    const newListing = { ...currentListing, ...listing };
    setListings((lists) => lists.map((l) => (l._id === listing._id ? newListing : l)));
    setUserListings((lists) => lists.map((l) => (l._id === listing._id ? newListing : l)));
  };

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
        addListing,
        userListings,
        deleteListing,
        updateListing,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
