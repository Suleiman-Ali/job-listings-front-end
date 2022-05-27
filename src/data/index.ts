export type ListingType = {
  _id: string;
  ownerId: string;
  jobTitle: string;
  jobDate: string;
  jobType: string;
  jobRegion: string;
  jobTimezones: string[];
  jobCategory: string;
  companyName: string;
  companyWebsite: string;
  jobApplicationLink: string;
  jobDescription: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
};

export const JobTypes = [
  'Full-Time',
  'Part-Time',
  'Contract',
  'Volunteer',
  'Internship',
  'Temporary',
];

export const filterKeywordOnly = (listings: ListingType[], keyword: string) => {
  if (!keyword) return listings;
  return listings.filter((listing) =>
    listing.jobTitle.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const filterSelectedTypeOnly = (
  listings: ListingType[],
  selected: string
) => {
  if (selected === 'All-Jobs') return listings;
  return listings.filter((listing) => listing.jobType === selected);
};
