import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';
import { useContext } from 'react';
import Search from '../Search';
import { filterKeywordOnly, filterSelectedTypeOnly } from '../../data';

function Home(): JSX.Element {
  const { keyword, listings, selectedJobType } = useContext(Context);

  // prettier-ignore
  let listingsView = filterSelectedTypeOnly(filterKeywordOnly(listings, keyword), selectedJobType);

  return (
    <div className="home">
      <Navbar />
      <main className="home__main">
        <Search />
        <Listings listings={listingsView} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;

// TODO: Better Design
// TODO: Pagination?
// TODO: Refactor
// TODO: Not found page
// TODO: Protect Routes
// TODO: Make sure the app is secure
