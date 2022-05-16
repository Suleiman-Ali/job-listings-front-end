import { Link } from 'react-router-dom';
import { ListingType } from '../data';

interface ListingProps {
  listing: ListingType;
}

function Listing({ listing }: ListingProps): JSX.Element {
  const {
    companyName,
    jobTitle,
    jobType,
    jobRegion,
    jobTimezones,
    jobDate,
    jobCategory,
  } = listing;

  let date: string | string[] = new Date(jobDate).toDateString().split(' ');
  date = `${date[1]} ${date[2]}`;

  return (
    <Link to={`/listings/${listing._id}`} className="listing" state={listing}>
      <div className="listing__innerBox">
        <p className="listing__companyName">{companyName}</p>
        <p className="listing__date ">{date}</p>
      </div>

      <p className="listing__title">{jobTitle}</p>

      <div className="listing__innerBox">
        <p className="listing__info">{jobType}</p>
        <p className="listing__info">{jobRegion}</p>
        <p className="listing__info">{jobTimezones[0]}</p>
        <p className="listing__info">{jobCategory}</p>
      </div>
    </Link>
  );
}

export default Listing;
