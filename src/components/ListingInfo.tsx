interface ListingInfoProps {
  text: string;
}

function ListingInfo({ text }: ListingInfoProps): JSX.Element {
  return <p className="listing__info">{text}</p>;
}

export default ListingInfo;
