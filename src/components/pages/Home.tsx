import Context from '../../context';
import Footer from '../Footer';
import Listings from '../Listings';
import Navbar from '../Navbar';
import Search from '../Search';
import ReactLoading from 'react-loading';
import { useContext } from 'react';
import { filterKeywordOnly, filterSelectedTypeOnly } from '../../data';

function Home(): JSX.Element {
  const { keyword, listings, selectedJobType, loadingHome } =
    useContext(Context);

  // prettier-ignore
  let listingsView = filterSelectedTypeOnly(filterKeywordOnly(listings, keyword), selectedJobType);

  return (
    <div className="home">
      <Navbar />
      <main className="home__main">
        <Search />
        {loadingHome && (
          <ReactLoading
            type="cylon"
            color="#e5844a"
            width="90px"
            className="loading"
          />
        )}
        {!loadingHome && <Listings listings={listingsView} />}
      </main>
      <Footer />
    </div>
  );
}

export default Home;

// TODO: Pagination?
// TODO: Refactor
// TODO: Not found page
// TODO: Protect Routes
// TODO: Make sure the app is secure
// TODO: Make sure its responsive
