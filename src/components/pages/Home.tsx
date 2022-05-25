import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';
import { useContext } from 'react';

function Home(): JSX.Element {
  const { listings } = useContext(Context);

  return (
    <div className="home">
      <Navbar />
      <Listings listings={listings} />
      <Footer />
    </div>
  );
}

export default Home;

// TODO: Search
// TODO: Better Design
// TODO: Pagination?
// TODO: Refactor
// TODO: Not found page
// TODO: Protect Routes
// TODO: Make sure the app is secure
