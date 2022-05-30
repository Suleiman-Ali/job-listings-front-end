interface SearchOptionProps {
  value: string;
}

function SearchOption({ value }: SearchOptionProps): JSX.Element {
  return (
    <option className="search__option" value={value}>
      {value}
    </option>
  );
}

export default SearchOption;
