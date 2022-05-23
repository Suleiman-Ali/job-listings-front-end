interface ListingPageLinkProps {
  text: string;
  href: string;
}

function ListingPageLink({ text, href }: ListingPageLinkProps): JSX.Element {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="listingPageBox__link"
    >
      {text}
    </a>
  );
}

export default ListingPageLink;
