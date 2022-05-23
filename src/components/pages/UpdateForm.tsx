import Context from '../../context';
import Navbar from '../Navbar';
import FormInputChange from '../FormInputChange';
import FormLabel from '../FormLabel';
import FormOption from '../FormOption';
import Footer from '../Footer';
import api from '../../api';
import {
  ChangeEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { JobTypes, ListingType } from '../../data';
import FormButtons from '../FormButtons';

function UpdateForm(): JSX.Element | null {
  const { updateListing, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state as ListingType;
  const [selectedType, setSelectedType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [websiteLink, setWebsiteLink] = useState<string>('');
  const [applicationLink, setApplicationLink] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [timezones, setTimezones] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (user) {
      setSelectedType(listing.jobType);
      setTitle(listing.jobTitle);
      setCompanyName(listing.companyName);
      setWebsiteLink(listing.companyWebsite);
      setApplicationLink(listing.jobApplicationLink);
      setCategory(listing.jobCategory);
      setRegion(listing.jobRegion);
      setTimezones(listing.jobTimezones);
      setDescription(listing.jobDescription);
    }
  }, []);

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const l: ListingType = {
      _id: listing._id,
      ownerId: listing.ownerId,
      jobDate: listing.jobDate,
      jobTitle: title,
      jobType: selectedType,
      jobRegion: region,
      jobTimezones: timezones,
      jobCategory: category,
      companyName: companyName,
      companyWebsite: websiteLink,
      jobApplicationLink: applicationLink,
      jobDescription: description,
    };
    updateListing(l);

    const token = localStorage.getItem('LIST_JWT');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    await api.put(`/listings/${l._id}`, l, config);

    setTitle('');
    setCompanyName('');
    setWebsiteLink('');
    setApplicationLink('');
    setCategory('');
    setRegion('');
    setDescription('');
    setTimezones([]);
    setSelectedType('');

    navigate(`/user/account/${user?.name}`, { replace: true });
  };

  const titleChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const companyNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setCompanyName(e.target.value);

  const websiteLinkChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setWebsiteLink(e.target.value);

  const applicationLinkChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setApplicationLink(e.target.value);

  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setCategory(e.target.value);

  const regionChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setRegion(e.target.value);

  const timezonesChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTimezones(e.target.value.replaceAll(' ', '').split(','));

  const textAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value.replaceAll('\n', '<br/>'));

  return (
    <div className="AddForm">
      <Navbar />
      <form className="AddForm__form" onSubmit={submitHandler}>
        <div className="AddForm__sideBySideBox">
          <div className="AddForm__inputBox">
            <FormLabel text="Job Title" />
            <FormInputChange
              min={0}
              max={30}
              value={title}
              onChange={titleChangeHandler}
            />
          </div>

          <div className="AddForm__inputBox">
            <FormLabel text="Company Name" />
            <FormInputChange
              min={0}
              max={30}
              value={companyName}
              onChange={companyNameChangeHandler}
            />
          </div>
        </div>

        <div className="AddForm__sideBySideBox">
          <div className="AddForm__inputBox">
            <FormLabel text="Company Website Link" />
            <FormInputChange
              min={0}
              max={30}
              value={websiteLink}
              onChange={websiteLinkChangeHandler}
            />
          </div>

          <div className="AddForm__inputBox">
            <FormLabel text="Job Application Link" />
            <FormInputChange
              min={0}
              max={30}
              value={applicationLink}
              onChange={applicationLinkChangeHandler}
            />
          </div>
        </div>

        <div className="AddForm__inputBox">
          <FormLabel text="Job Type" />
          <div className="AddForm__optionsBox">
            {JobTypes.map((jobType) => (
              <FormOption
                condition={jobType === selectedType}
                text={jobType}
                onClick={() => setSelectedType(jobType)}
                key={jobType}
              />
            ))}
          </div>
        </div>

        <div className="AddForm__3SideBySideBox">
          <div className="AddForm__inputBox">
            <FormLabel text="Job Category" />
            <FormInputChange
              min={0}
              max={30}
              value={category}
              onChange={categoryChangeHandler}
            />
          </div>

          <div className="AddForm__inputBox">
            <FormLabel text="Job Region" />
            <FormInputChange
              min={0}
              max={30}
              value={region}
              onChange={regionChangeHandler}
            />
          </div>

          <div className="AddForm__inputBox">
            <FormLabel text="Job Timezones" />
            <FormInputChange
              min={0}
              max={30}
              value={timezones.toString().replaceAll(',', ', ')}
              onChange={timezonesChangeHandler}
            />
          </div>
        </div>

        <div className="AddForm__inputBox">
          <FormLabel text="Job Description" />
          <textarea
            className="AddForm__textarea"
            minLength={300}
            value={description.replaceAll('<br/>', '\n')}
            onChange={textAreaChangeHandler}
          />
        </div>

        <FormButtons />
      </form>

      <Footer />
    </div>
  );
}

export default UpdateForm;
