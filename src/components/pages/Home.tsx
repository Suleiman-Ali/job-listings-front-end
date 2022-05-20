import { useContext } from 'react';
import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';

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

// TODO: CRUD
// TODO: Protect Routes
// TODO: Refactor
// TODO: Other Stuff..
