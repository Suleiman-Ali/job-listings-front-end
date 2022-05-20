import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import { ListingType } from '../../data';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';

function UserPage(): JSX.Element {
  const { user, userSetter } = useContext(Context);
  const navigate = useNavigate();
  const [userListings, setUserListings] = useState<ListingType[]>([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('LIST_JWT');
      const config = {
        headers: { 'x-auth-token': token as string },
      };
      const data = (await api.get(`/listings/${user?._id}`, config)).data;
      setUserListings(data);
    })();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('LIST_JWT');
    userSetter(undefined);
    navigate('/', { replace: true });
  };

  return (
    <div className="userPage">
      <Navbar />

      <main className="userPage__main">
        <div className="userPage__headingBox">
          <h1 className="userPage__title">
            {user?.name}/{user?.email}
          </h1>
          <button className="userPage__btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>

        <div className="userPage__listingsBox">
          <p className="userPage__listingsTitle">My Listings</p>
          <Listings listings={userListings} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserPage;
