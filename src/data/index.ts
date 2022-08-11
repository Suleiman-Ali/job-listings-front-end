export const listings = [
  {
    _id: '62d59d49af248458a96b130c',
    ownerId: '62d31b965e802d57fba7778f',
    jobTitle: 'Sr. Front End Developer',
    jobDescription: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br/><br/>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.<br/><br/>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.<br/><br/>`,
    jobType: 'Full-Time',
    jobDate: '2022-07-18T17:48:47.515+00:00',
    jobRegion: 'USA',
    jobTimezones: ['UTC'],
    jobCategory: 'Web Development',
    companyName: 'Google',
    companyWebsite: 'https://google.com',
    jobApplicationLink: 'https://google.com',
  },
  {
    _id: '62d59da1af248458a96b130e',
    ownerId: '62d31b965e802d57fba7778f',
    jobTitle: 'JR. Back End Developer ',
    jobDescription: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br/><br/>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.<br/><br/>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.<br/><br/>`,
    jobType: 'Part-Time',
    jobDate: '2022-07-18T17:48:47.515+00:00',
    jobRegion: 'UK',
    jobTimezones: ['UTC'],
    jobCategory: 'Web Development',
    companyName: 'Youtube',
    companyWebsite: 'https://youtube.com/',
    jobApplicationLink: 'https://youtube.com/',
  },
  {
    _id: '62d59defaf248458a96b1310',
    ownerId: '62d31b965e802d57fba7778f',
    jobTitle: 'Graphic Designer',
    jobDescription: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.<br/><br/>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.<br/><br/>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.<br/><br/>`,
    jobType: 'Contract',
    jobDate: '2022-07-18T17:48:47.515+00:00',
    jobRegion: 'Canada',
    jobTimezones: ['UTC'],
    jobCategory: 'Design',
    companyName: 'Adobe',
    companyWebsite: 'https://www.adobe.com/',
    jobApplicationLink: 'https://www.adobe.com/',
  },
];

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

export const sortByDate = (listings: ListingType[]) =>
  listings.sort(
    (l1, l2) => new Date(l1.jobDate).getDay() - new Date(l2.jobDate).getDay()
  );
