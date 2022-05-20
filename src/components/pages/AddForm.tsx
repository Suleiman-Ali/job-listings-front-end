import { FormEventHandler, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import { JobTypes, ListingType } from '../../data';
import Footer from '../Footer';
import Navbar from '../Navbar';

function AddForm(): JSX.Element {
  const { user, listingsSetter, userListingsSetter } = useContext(Context);
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>(JobTypes[0]);
  const title = useRef() as React.MutableRefObject<HTMLInputElement>;
  const companyName = useRef() as React.MutableRefObject<HTMLInputElement>;
  const websiteLink = useRef() as React.MutableRefObject<HTMLInputElement>;
  const applicationLink = useRef() as React.MutableRefObject<HTMLInputElement>;
  const category = useRef() as React.MutableRefObject<HTMLInputElement>;
  const region = useRef() as React.MutableRefObject<HTMLInputElement>;
  const timezones = useRef() as React.MutableRefObject<HTMLInputElement>;
  const description = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const listing = {
      ownerId: user?._id,
      jobTitle: title.current.value,
      jobType: selectedType,
      jobRegion: region.current.value,
      jobTimezones: timezones.current.value.replaceAll(' ', '').split(','),
      jobCategory: category.current.value,
      companyName: companyName.current.value,
      companyWebsite: websiteLink.current.value,
      jobApplicationLink: applicationLink.current.value,
      jobDescription: description.current.value.replaceAll('\n', '<br/>'),
    };

    const token = localStorage.getItem('LIST_JWT');
    const config = {
      headers: { 'x-auth-token': token as string },
    };
    const data: ListingType = (await api.post(`/listings`, listing, config))
      .data;

    title.current.value =
      companyName.current.value =
      websiteLink.current.value =
      applicationLink.current.value =
      category.current.value =
      region.current.value =
      timezones.current.value =
      description.current.value =
        '';
    setSelectedType(JobTypes[0]);

    listingsSetter(data);
    userListingsSetter(data);
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
              placeholder="i.e Senior Front-end Developer"
              ref={title}
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
              placeholder="i.e Google"
              ref={companyName}
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
              placeholder="i.e https://google.com/"
              ref={websiteLink}
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
              placeholder="i.e https://google.com/"
              ref={applicationLink}
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
              placeholder="i.e Web Development"
              ref={category}
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
              placeholder="i.e USA"
              ref={region}
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
              placeholder="i.e UTC, ETC, ..."
              ref={timezones}
            />
          </div>
        </div>

        <div className="AddForm__inputBox">
          <label className="AddForm__label">Job Description</label>
          <textarea
            className="AddForm__textarea"
            placeholder="
          - Talk about the Role
          - Talk about the Role Responsibilities
          - Talk about the Role Requirements
          - Talk about the Role Benefits
          - Talk about other stuff..
          "
            minLength={300}
            ref={description}
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

export default AddForm;
