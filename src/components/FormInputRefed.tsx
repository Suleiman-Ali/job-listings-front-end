import { forwardRef } from 'react';

interface FormInputRefedProps {
  min: number;
  max: number;
  plcHold: string;
  type?: string;
}

const FormInputRefed = forwardRef<HTMLInputElement, FormInputRefedProps>(
  (props, ref) => (
    <input
      className="AUForm__input"
      type={props.type || 'text'}
      min={props.min}
      max={props.max}
      placeholder={props.plcHold}
      ref={ref}
      required
    />
  )
);

export default FormInputRefed;
