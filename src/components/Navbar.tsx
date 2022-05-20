import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';

function Navbar(): JSX.Element {
  const { user } = useContext(Context);
  const path = user ? `/user/account/${user.name}` : '/sign-in';
  const pathText = user ? user.name : 'Sign In';

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="navbar__title">Job Listings</p>
      </Link>

      <Link to={path} className="navbar__box">
        <i className="bi bi-person-circle navbar__icon"></i>
        <p className="navbar__to">{pathText}</p>
      </Link>
    </nav>
  );
}

export default Navbar;
