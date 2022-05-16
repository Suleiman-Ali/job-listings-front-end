import { useLocation } from 'react-router-dom';
import { ListingType } from '../../data';

const prefixLink = (str: string): string => 'https://' + str;

function ListingPage(): JSX.Element {
  const { state } = useLocation();
  const listing = state as ListingType;
  let date: string | string[] = new Date(listing.jobDate)
    .toDateString()
    .split(' ');
  date = `${date[1]}/${date[2]}/${date[3]}`;

  return (
    <div className="listingPage">
      <div className="titleBox">
        <p className="titleBox__date">{date}</p>
        <p className="titleBox__title">{listing.jobTitle}</p>

        <div className="titleBox__grid">
          <p className="titleBox__info">{listing.jobCategory}</p>
          <p className="titleBox__info">{listing.jobType}</p>
          <p className="titleBox__info">{listing.jobRegion}</p>
          {listing.jobTimezones.map((zone) => (
            <p className="titleBox__info" key={zone}>
              {zone}
            </p>
          ))}
        </div>

        <div className="titleBox__flex">
          <a
            href={prefixLink(listing.companyWebsite)}
            className="titleBox__link"
            target="_blank"
            rel="noreferrer"
          >
            {listing.companyName} website
          </a>
          <a
            href={prefixLink(listing.jobApplicationLink)}
            className="titleBox__link"
            target="_blank"
            rel="noreferrer"
          >
            Apply for the job
          </a>
        </div>

        <p className="titleBox__description">{listing.jobDescription}</p>
        <a
          href={prefixLink(listing.jobApplicationLink)}
          target="_blank"
          rel="noreferrer"
          className="titleBox__link"
        >
          Apply for the job
        </a>
      </div>
    </div>
  );
}

export default ListingPage;
