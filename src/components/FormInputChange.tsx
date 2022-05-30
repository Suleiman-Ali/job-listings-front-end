import { ChangeEvent } from 'react';

interface FormInputChangeProps {
  min: number;
  max: number;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormInputChange({
  min,
  max,
  value,
  onChange,
  type,
}: FormInputChangeProps): JSX.Element {
  return (
    <input
      className="AUForm__input"
      type={type || 'text'}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default FormInputChange;
