import { ListingType } from '../data';
import Listing from './Listing';

interface ListingsProps {
  listings: ListingType[];
}

function Listings({ listings }: ListingsProps): JSX.Element {
  return (
    <div className="listings">
      {listings.map((listing) => (
        <Listing listing={listing} key={listing._id} />
      ))}
    </div>
  );
}

export default Listings;
