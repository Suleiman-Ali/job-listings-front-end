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
