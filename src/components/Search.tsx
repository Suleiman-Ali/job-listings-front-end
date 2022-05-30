import Context from '../context';
import SearchOption from './SearchOption';
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
            <SearchOption value='All-Jobs'/>
            <SearchOption value='Full-Time'/>
            <SearchOption value='Part-Time'/>
            <SearchOption value='Contract'/>
            <SearchOption value='Volunteer'/>
            <SearchOption value='Internship'/>
            <SearchOption value='Temporary'/>
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
