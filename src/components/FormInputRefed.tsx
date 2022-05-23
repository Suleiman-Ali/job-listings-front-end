import { forwardRef } from 'react';

interface FormInputRefedProps {
  min: number;
  max: number;
  plcHold: string;
}

const FormInputRefed = forwardRef<HTMLInputElement, FormInputRefedProps>(
  (props, ref) => (
    <input
      className="AddForm__input"
      type="text"
      min={props.min}
      max={props.max}
      placeholder={props.plcHold}
      ref={ref}
      required
    />
  )
);

export default FormInputRefed;
