import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserPage(): JSX.Element | null {
  const { user, userSetter, userListings } = useContext(Context);
  const navigate = useNavigate();

  if (!user) {
    navigate('/sign-in');
    return null;
  }

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
          <div className="userPage__addBox">
            <p className="userPage__listingsTitle">My Listings</p>
            <Link to="/add-form" className="userPage__btn">
              Add
            </Link>
          </div>
          <Listings listings={userListings} currentPageUser={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserPage;
