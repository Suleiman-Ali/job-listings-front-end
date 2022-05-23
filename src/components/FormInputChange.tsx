import { ChangeEvent } from 'react';

interface FormInputChangeProps {
  min: number;
  max: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormInputChange({
  min,
  max,
  value,
  onChange,
}: FormInputChangeProps): JSX.Element {
  return (
    <input
      className="AddForm__input"
      type="text"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default FormInputChange;
