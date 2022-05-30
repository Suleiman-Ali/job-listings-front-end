import jwtDecode from 'jwt-decode';
import { ReactNode } from 'react';
import api from '../api';
import { createContext, useState, useEffect } from 'react';
import { ListingType, UserType } from '../data';

interface ContextValues {
  listings: ListingType[];
  userListings: ListingType[];
  user: UserType | undefined;
  keyword: string;
  selectedJobType: string;
  loadingHome: boolean;
  loadingUserPage: boolean;
  userSetter: (user: UserType | undefined) => void;
  addListing: (newListing: ListingType) => void;
  deleteListing: (listing: ListingType) => void;
  updateListing: (listing: ListingType) => void;
  keywordSetter: (keyword: string) => void;
  selectedJobTypeSetter: (type: string) => void;
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
  const [keyword, setKeyword] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('All-Jobs');
  const [loadingHome, setLoadingHome] = useState<boolean>(true);
  const [loadingUserPage, setLoadingUserPage] = useState<boolean>(true);

  const keywordSetter = (keyword: string) => setKeyword(keyword);
  const selectedJobTypeSetter = (type: string) => setSelectedJobType(type);

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
      setLoadingHome(false);
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
      setLoadingUserPage(false);
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
        keyword,
        keywordSetter,
        selectedJobType,
        selectedJobTypeSetter,
        loadingHome,
        loadingUserPage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
