interface SignTitleProps {
  value: string;
}

function SignTitle({ value }: SignTitleProps): JSX.Element {
  return <h1 className="sign__title">{value}</h1>;
}

export default SignTitle;
