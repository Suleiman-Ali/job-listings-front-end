import { forwardRef } from 'react';

interface SignInputProps {
  type: string;
  plcHold: string;
}

const SignInput = forwardRef<HTMLInputElement, SignInputProps>((props, ref) => (
  <input
    type={props.type}
    className="signIn__input"
    placeholder={props.plcHold}
    ref={ref}
  />
));

export default SignInput;
