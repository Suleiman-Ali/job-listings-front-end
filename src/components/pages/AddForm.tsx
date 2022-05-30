import Context from '../../context';
import Navbar from '../Navbar';
import FormInputRefed from '../FormInputRefed';
import FormLabel from '../FormLabel';
import FormOption from '../FormOption';
import Footer from '../Footer';
import FormButtons from '../FormButtons';
import api from '../../api';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobTypes, ListingType } from '../../data';

function AUForm(): JSX.Element | null {
  const { user, addListing } = useContext(Context);
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

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const listing = {
      ownerId: user._id,
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

    addListing(data);
    navigate(`/user/account/${user.name}`, { replace: true });
  };

  return (
    <div className="AUForm">
      <Navbar />
      <form className="AUForm__form" onSubmit={submitHandler}>
        <div className="AUForm__sideBySideBox">
          <div className="AUForm__inputBox">
            <FormLabel text="Job Title" />
            <FormInputRefed
              min={0}
              max={30}
              plcHold="i.e Senior Front-end Developer"
              ref={title}
            />
          </div>

          <div className="AUForm__inputBox">
            <FormLabel text="Company Name" />
            <FormInputRefed
              min={0}
              max={30}
              plcHold="i.e Google"
              ref={companyName}
            />
          </div>
        </div>

        <div className="AUForm__sideBySideBox">
          <div className="AUForm__inputBox">
            <FormLabel text="Company Website Link" />
            <FormInputRefed
              min={0}
              max={30}
              plcHold="i.e google.com"
              ref={websiteLink}
              type="url"
            />
          </div>

          <div className="AUForm__inputBox">
            <FormLabel text="Job Application Link" />
            <FormInputRefed
              min={0}
              max={30}
              plcHold="i.e google.com"
              ref={applicationLink}
              type="url"
            />
          </div>
        </div>

        <div className="AUForm__inputBox">
          <FormLabel text="Job Type" />
          <div className="AUForm__optionsBox">
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

        <div className="AUForm__3SideBySideBox">
          <div className="AUForm__inputBox">
            <FormLabel text="Job Category" />
            <FormInputRefed
              min={0}
              max={30}
              plcHold="i.e Web Development"
              ref={category}
            />
          </div>

          <div className="AUForm__inputBox">
            <FormLabel text="Job Region" />
            <FormInputRefed min={0} max={30} plcHold="i.e USA" ref={region} />
          </div>

          <div className="AUForm__inputBox">
            <FormLabel text="Job Timezone" />
            <FormInputRefed
              min={0}
              max={30}
              plcHold="i.e UTC, ETC, ..."
              ref={timezones}
            />
          </div>
        </div>

        <div className="AUForm__inputBox">
          <FormLabel text="Job Description" />
          <textarea
            className="AUForm__textarea"
            placeholder="
          - Talk about the Role
          - Talk about the Role Responsibilities
          - Talk about the Role Requirements
          - Talk about the Role Benefits
          - Talk about other stuff..
          "
            minLength={250}
            ref={description}
          />
        </div>

        <FormButtons />
      </form>

      <Footer />
    </div>
  );
}

export default AUForm;
