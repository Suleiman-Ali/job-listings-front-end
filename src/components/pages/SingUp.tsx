import Footer from '../Footer';
import Navbar from '../Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import api from '../../api';
import jwtDecode from 'jwt-decode';
import { UserType } from '../../data';
import Context from '../../context';

function SignUp(): JSX.Element {
  const { userSetter } = useContext(Context);
  const [operating, setOperating] = useState<boolean>(false);
  const navigate = useNavigate();
  const name = useRef() as React.MutableRefObject<HTMLInputElement>;
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;

  const submitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setOperating(true);
    const userReg = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    const userLog = {
      email: email.current.value,
      password: password.current.value,
    };
    name.current.value = email.current.value = password.current.value = '';

    await api.post('/users', userReg);
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
        <h1 className="signIn__title">Sign Up</h1>
        <form className="signIn__form" onSubmit={submitHandler}>
          <input
            type="text"
            className="signIn__input"
            placeholder="Name.."
            ref={name}
          />
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
              <Link to="/sign-in" className="signIn__btn">
                Sign In?
              </Link>
            )}
            <button
              className="signIn__btn"
              disabled={operating}
              type={'submit'}
            >
              Sign Up
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default SignUp;
