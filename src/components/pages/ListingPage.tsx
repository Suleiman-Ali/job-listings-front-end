import { useLocation } from 'react-router-dom';
import { ListingType } from '../../data';

function ListingPage(): JSX.Element {
  const { state } = useLocation();
  const listing = state as ListingType;

  return <div className="listingPage">{listing.jobTitle}</div>;
}

export default ListingPage;
