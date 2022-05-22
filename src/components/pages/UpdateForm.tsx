import { ChangeEvent, FormEventHandler, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import { JobTypes, ListingType } from '../../data';
import Footer from '../Footer';
import Navbar from '../Navbar';

function UpdateForm(): JSX.Element {
  const { updateListing, user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state as ListingType;
  const [selectedType, setSelectedType] = useState<string>(listing.jobType);
  const [title, setTitle] = useState<string>(listing.jobTitle);
  const [companyName, setCompanyName] = useState<string>(listing.companyName);
  const [websiteLink, setWebsiteLink] = useState<string>(
    listing.companyWebsite
  );
  const [applicationLink, setApplicationLink] = useState<string>(
    listing.jobApplicationLink
  );
  const [category, setCategory] = useState<string>(listing.jobCategory);
  const [region, setRegion] = useState<string>(listing.jobRegion);
  const [timezones, setTimezones] = useState<string[]>(listing.jobTimezones);
  const [description, setDescription] = useState<string>(
    listing.jobDescription
  );

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

  return (
    <div className="AddForm">
      <Navbar />
      <form className="AddForm__form" onSubmit={submitHandler}>
        <div className="AddForm__sideBySideBox">
          <div className="AddForm__inputBox">
            <label className="AddForm__label">Job Title</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="AddForm__inputBox">
            <label className="AddForm__label">Company Name</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={companyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCompanyName(e.target.value)
              }
            />
          </div>
        </div>

        <div className="AddForm__sideBySideBox">
          <div className="AddForm__inputBox">
            <label className="AddForm__label">Company Website Link</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={websiteLink}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWebsiteLink(e.target.value)
              }
            />
          </div>

          <div className="AddForm__inputBox">
            <label className="AddForm__label">Job Application Link</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={applicationLink}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setApplicationLink(e.target.value)
              }
            />
          </div>
        </div>

        <div className="AddForm__inputBox">
          <label className="AddForm__label">Job Type</label>
          <div className="AddForm__optionsBox">
            {JobTypes.map((jobType) => (
              <p
                className={`AddForm__option ${
                  jobType === selectedType && 'selectedOption'
                }`}
                key={jobType}
                onClick={() => setSelectedType(jobType)}
              >
                {jobType}
              </p>
            ))}
          </div>
        </div>

        <div className="AddForm__3SideBySideBox">
          <div className="AddForm__inputBox">
            <label className="AddForm__label">Job Category</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={category}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
            />
          </div>

          <div className="AddForm__inputBox">
            <label className="AddForm__label">Job Region</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={region}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRegion(e.target.value)
              }
            />
          </div>

          <div className="AddForm__inputBox">
            <label className="AddForm__label">Job Timezone</label>
            <input
              className="AddForm__input"
              type="text"
              min={0}
              max={30}
              required
              value={timezones.toString().replaceAll(',', ', ')}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTimezones(e.target.value.replaceAll(' ', '').split(','))
              }
            />
          </div>
        </div>

        <div className="AddForm__inputBox">
          <label className="AddForm__label">Job Description</label>
          <textarea
            className="AddForm__textarea"
            minLength={300}
            value={description.replaceAll('<br/>', '\n')}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value.replaceAll('\n', '<br/>'))
            }
          ></textarea>
        </div>

        <div className="AddForm__btns">
          <button className="AddForm__btn" type="submit">
            Save
          </button>
          <Link to="/" className="AddForm__btn">
            Cancel
          </Link>
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default UpdateForm;
