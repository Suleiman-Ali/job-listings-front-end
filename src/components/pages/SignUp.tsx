import SignInput from '../SignInput';
import Context from '../../context';
import Footer from '../Footer';
import Navbar from '../Navbar';
import api from '../../api';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import { UserType } from '../../data';
import Error from '../Error';

function SignUp(): JSX.Element {
  const { userSetter } = useContext(Context);
  const [operating, setOperating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
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

    try {
      await api.post('/users', userReg);
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
        <h1 className="signIn__title">Sign Up</h1>
        <form className="signIn__form" onSubmit={submitHandler}>
          {isError && (
            <Error
              msg="Invalid name, email, or password."
              onClick={() => setIsError(false)}
            />
          )}
          <SignInput type="text" plcHold="Name.." ref={name} />
          <SignInput type="email" plcHold="Email.." ref={email} />
          <SignInput type="password" plcHold="Password.." ref={password} />

          <div className="signIn__btns">
            {!operating && (
              <Link to="/sign-in" className="signIn__btn">
                Sign In?
              </Link>
            )}
            <button className="signIn__btn" disabled={operating} type="submit">
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
