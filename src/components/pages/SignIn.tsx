import SignInput from '../SignInput';
import Context from '../../context';
import Navbar from '../Navbar';
import Footer from '../Footer';
import api from '../../api';
import jwtDecode from 'jwt-decode';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../../data';
import Error from '../Error';

function SingIn(): JSX.Element {
  const { userSetter } = useContext(Context);
  const [operating, setOperating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
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

    try {
      const jwt = (await api.post('/auth', userLog)).data;
      const user: UserType = jwtDecode(jwt);
      localStorage.setItem('LIST_JWT', jwt);
      userSetter(user);
      setOperating(false);
      navigate('/');
    } catch (_) {
      setOperating(false);
      setIsError(true);
    }
  };

  return (
    <div className="signIn">
      <Navbar />
      <main className="signIn__main">
        <h1 className="signIn__title">Sign In</h1>
        <form className="signIn__form" onSubmit={submitHandler}>
          {isError && (
            <Error
              msg="Invalid email or password."
              onClick={() => setIsError(false)}
            />
          )}
          <SignInput type="email" plcHold="Email.." ref={email} />
          <SignInput type="password" plcHold="Password.." ref={password} />

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
