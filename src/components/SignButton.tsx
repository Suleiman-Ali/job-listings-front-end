interface SignButtonProps {
  disabled: boolean;
  value: string;
}

function SignButton({ value, disabled }: SignButtonProps): JSX.Element {
  return (
    <button className="sign__btn" disabled={disabled} type="submit">
      {value}
    </button>
  );
}

export default SignButton;
