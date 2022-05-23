import ListingPageInfo from '../ListingPageInfo';
import ListingPageLink from '../ListingPageLink';
import Footer from '../Footer';
import Navbar from '../Navbar';
import parse from 'html-react-parser';
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
      <Navbar />
      <div className="listingPageBox">
        <p className="listingPageBox__date">{date}</p>
        <p className="listingPageBox__title">{listing.jobTitle}</p>

        <div className="listingPageBox__grid">
          <ListingPageInfo text={listing.jobCategory} />
          <ListingPageInfo text={listing.jobType} />
          <ListingPageInfo text={listing.jobRegion} />
          {listing.jobTimezones.map((zone) => (
            <ListingPageInfo text={zone} key={zone} />
          ))}
        </div>

        <div className="listingPageBox__flex">
          <ListingPageLink
            href={prefixLink(listing.companyWebsite)}
            text={`${listing.companyName} website`}
          />
          <ListingPageLink
            href={prefixLink(listing.jobApplicationLink)}
            text="Apply for the job"
          />
        </div>

        <p className="listingPageBox__description">
          {parse(listing.jobDescription)}
        </p>

        <ListingPageLink
          href={prefixLink(listing.jobApplicationLink)}
          text="Apply for the job"
        />
      </div>
      <Footer />
    </div>
  );
}

export default ListingPage;
