import { ListingType } from '../data';
import Listing from './Listing';

interface ListingsProps {
  listings: ListingType[];
  currentPageUser?: boolean;
}

function Listings({ listings, currentPageUser }: ListingsProps): JSX.Element {
  return (
    <div className="listings">
      {listings.map((listing, index) => (
        <Listing
          listing={listing}
          key={listing._id}
          currentPageUser={currentPageUser}
        />
      ))}
    </div>
  );
}

export default Listings;
