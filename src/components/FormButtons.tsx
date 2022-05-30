import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';

function FormButtons(): JSX.Element {
  const { user } = useContext(Context);
  return (
    <div className="AUForm__btns">
      <button className="AUForm__btn" type="submit">
        Save
      </button>
      <Link to={`/user/account/${user?.name}`} className="AUForm__btn">
        Cancel
      </Link>
    </div>
  );
}

export default FormButtons;
