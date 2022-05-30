import ReactLoading from 'react-loading';

function Loading(): JSX.Element {
  return (
    <ReactLoading
      type="cylon"
      color="#e5844a"
      width="90px"
      className="loading"
    />
  );
}

export default Loading;
