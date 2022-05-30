interface FormOptionProps {
  text: string;
  condition: boolean;
  onClick: () => void;
}

function FormOption({
  text,
  condition,
  onClick,
}: FormOptionProps): JSX.Element {
  return (
    <p
      className={`AUForm__option ${condition && 'selectedOption'}`}
      key={text}
      onClick={onClick}
    >
      {text}
    </p>
  );
}

export default FormOption;
