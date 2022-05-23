interface ListingPageInfoProps {
  text: string;
}

function ListingPageInfo({ text }: ListingPageInfoProps): JSX.Element {
  return <p className="listingPageBox__info">{text}</p>;
}

export default ListingPageInfo;
