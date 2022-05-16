import { useContext } from 'react';
import Context from '../../context';
import Listings from '../Listings';

function Home(): JSX.Element {
  const { listings } = useContext(Context);

  return (
    <div className="home">
      <Listings listings={listings} />
    </div>
  );
}

export default Home;
