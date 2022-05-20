import jwtDecode from 'jwt-decode';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import Context from '../../context';
import { UserType } from '../../data';
import Footer from '../Footer';
import Navbar from '../Navbar';

function SingIn(): JSX.Element {
  const { userSetter } = useContext(Context);
  const [operating, setOperating] = useState<boolean>(false);
  const navigate = useNavigate();
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setOperating(true);
    const userLog = {
      email: email.current.value,
      password: password.current.value,
    };
    email.current.value = password.current.value = '';

    const jwt = (await api.post('/auth', userLog)).data;
    const user: UserType = jwtDecode(jwt);

    localStorage.setItem('LIST_JWT', jwt);
    userSetter(user);
    setOperating(false);
    navigate('/');
  };

  return (
    <div className="signIn">
      <Navbar />
      <main className="signIn__main">
        <h1 className="signIn__title">Sign In</h1>
        <form className="signIn__form" onSubmit={submitHandler}>
          <input
            type="email"
            className="signIn__input"
            placeholder="Email.."
            ref={email}
          />
          <input
            type="password"
            className="signIn__input"
            placeholder="Password.."
            ref={password}
          />
          <div className="signIn__btns">
            {!operating && (
              <Link to="/sign-up" className="signIn__btn">
                Sign Up?
              </Link>
            )}

            <button className="signIn__btn" disabled={operating} type="submit">
              Login
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default SingIn;