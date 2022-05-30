import Footer from '../Footer';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

function Notfound(): JSX.Element {
  return (
    <div className="notfound">
      <Navbar />
      <main className="notfound__main">
        <h1 className="notfound__title">Page Not Found 404 :(</h1>
        <Link to="/" className="notfound__btn">
          Go Back
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Notfound;
