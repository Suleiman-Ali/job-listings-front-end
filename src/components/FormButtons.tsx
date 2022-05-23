import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';

function FormButtons(): JSX.Element {
  const { user } = useContext(Context);
  return (
    <div className="AddForm__btns">
      <button className="AddForm__btn" type="submit">
        Save
      </button>
      <Link to={`/user/account/${user?.name}`} className="AddForm__btn">
        Cancel
      </Link>
    </div>
  );
}

export default FormButtons;
