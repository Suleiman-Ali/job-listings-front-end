import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';
import ReactLoading from 'react-loading';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function UserPage(): JSX.Element | null {
  const { user, userSetter, userListings, loadingUserPage } =
    useContext(Context);
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
          <div className="userPage__headingBoxInner">
            <i className="bi bi-person-circle userPage__icon"></i>
            <p className="userPage__title">
              {user?.name}
              <br />
              {user?.email}
            </p>
          </div>
          <i
            className="bi bi-box-arrow-right userPage__arrow"
            onClick={logoutHandler}
            title="Logout"
          ></i>
        </div>

        <div className="userPage__listingsBox">
          <div className="userPage__addBox">
            <p className="userPage__listingsTitle">My Listings</p>
            <Link to="/add-form" className="userPage__link" title="Add Listing">
              <i className="bi bi-plus userPage__linkIcon" />
            </Link>
          </div>
          {loadingUserPage && (
            <ReactLoading
              type="cylon"
              color="#e5844a"
              width="90px"
              className="loading"
            />
          )}
          {!loadingUserPage && <Listings listings={userListings} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default UserPage;
