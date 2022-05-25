interface ErrorProps {
  msg: string;
  onClick: () => void;
}

function Error({ msg, onClick }: ErrorProps): JSX.Element {
  return (
    <div className="error">
      <p className="error__msg">{msg}</p>
      <i className="bi bi-x-lg error__btn" onClick={onClick} />
    </div>
  );
}

export default Error;
