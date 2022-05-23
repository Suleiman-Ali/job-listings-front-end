interface FormLabelProps {
  text: string;
}

function FormLabel({ text }: FormLabelProps): JSX.Element {
  return <label className="AddForm__label">{text}</label>;
}

export default FormLabel;
