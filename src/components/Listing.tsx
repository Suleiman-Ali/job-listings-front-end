import ListingInfo from './ListingInfo';
import Context from '../context';
import api from '../api';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListingType } from '../data';

interface ListingProps {
  listing: ListingType;
}

function Listing({ listing }: ListingProps): JSX.Element {
  const location = useLocation();
  const { deleteListing, user } = useContext(Context);
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

  const userOwnsListing = user?._id === listing.ownerId;
  const userOnUserPage = location.pathname === `/user/account/${user?.name}`;

  const deleteHandler = async () => {
    deleteListing(listing);
    const token = localStorage.getItem('LIST_JWT');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    await api.delete(`/listings/${listing._id}`, config);
  };

  return (
    <div className="listing">
      <Link
        to={`/listings/${listing._id}`}
        className="listing__box"
        state={listing}
      >
        <div className="listing__innerBoxOne">
          <p className="listing__companyName">{companyName}</p>
          <p className="listing__date ">{date}</p>
        </div>

        <p className="listing__title">{jobTitle}</p>

        <div className="listing__innerBoxTwo">
          <ListingInfo text={jobType} />
          <ListingInfo text={jobRegion} />
          <ListingInfo text={jobTimezones[0]} />
          <ListingInfo text={jobCategory} />
        </div>
      </Link>

      {userOwnsListing && userOnUserPage && (
        <div className="listing__btns">
          <i
            className="bi bi-x-lg listing__btn"
            title="Delete"
            onClick={deleteHandler}
          ></i>
          <Link
            to="/update-form"
            className="bi bi-pen-fill listing__btn"
            title="Update"
            state={listing}
          />
        </div>
      )}
    </div>
  );
}

export default Listing;
