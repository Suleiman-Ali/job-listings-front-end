import Context from '../context';
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
} from 'react';

function Search(): JSX.Element {
  const {
    keyword: currentKeyword,
    keywordSetter,
    selectedJobType,
    selectedJobTypeSetter,
  } = useContext(Context);
  const keyword = useRef() as MutableRefObject<HTMLInputElement>;

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword.current.value) return;
    keywordSetter(keyword.current.value);
    keyword.current.value = '';
  };

  const selectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    selectedJobTypeSetter(e.target.value);

  const clearAll = () => {
    keywordSetter('');
    selectedJobTypeSetter('All-Jobs');
  };

  useEffect(() => {
    clearAll();
  }, []);

  return (
    <div className="search">
      <h1 className="search__title">Search for a Job</h1>

      <div className="search__formBox">
        <form className="search__form" onSubmit={formSubmitHandler}>
          <input
            type="text"
            className="search__input"
            ref={keyword}
            placeholder="i.e Front End Developer"
          />
          <button className="search__btn" type="submit">
            Search
          </button>
        </form>

        <div className="search__innerBox">
          {/* prettier-ignore */}
          <select className="search__options" value={selectedJobType} onChange={selectChange}>
          <option className='search__option' value="All-Jobs">All-Jobs</option>
          <option className='search__option' value="Full-Time">Full-Time</option>
          <option className='search__option' value="Part-Time">Part-Time</option>
          <option className='search__option' value="Contract">Contract</option>
          <option className='search__option' value="Volunteer">Volunteer</option>
          <option className='search__option' value="Internship">Internship</option>
          <option className='search__option' value="Temporary">Temporary</option>
        </select>

          {currentKeyword && (
            <div className="search__keywordBox">
              <p className="search__keyword">{currentKeyword.toUpperCase()}</p>
              <i className="bi bi-x-lg search__icon" onClick={clearAll} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
