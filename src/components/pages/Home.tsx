import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';
import Search from '../Search';
import Loading from '../Loading';
import NotfoundMessage from '../NotfoundMessage';
import { useContext } from 'react';
import {
  filterKeywordOnly,
  filterSelectedTypeOnly,
  sortByDate,
} from '../../data';

function Home(): JSX.Element {
  const { keyword, listings, selectedJobType, loadingHome } =
    useContext(Context);

  // prettier-ignore
  let listingsView = sortByDate(filterSelectedTypeOnly(filterKeywordOnly(listings, keyword), selectedJobType));

  return (
    <div className="home">
      <Navbar />
      <main className="home__main">
        <Search />
        {listingsView.length > 0 && <Listings listings={listingsView} />}
        {!loadingHome && listingsView.length <= 0 && <NotfoundMessage />}
        {loadingHome && <Loading />}
      </main>
      <Footer />
    </div>
  );
}

export default Home;
