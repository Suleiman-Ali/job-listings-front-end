import SignInput from '../SignInput';
import Context from '../../context';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Error from '../Error';
import api from '../../api';
import jwtDecode from 'jwt-decode';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../../data';
import SignButton from '../SignButton';
import SignTitle from '../SignTitle';

function SingIn(): JSX.Element | null {
  const { userSetter, user } = useContext(Context);
  const [operating, setOperating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();
  const email = useRef() as React.MutableRefObject<HTMLInputElement>;
  const password = useRef() as React.MutableRefObject<HTMLInputElement>;

  if (user) {
    navigate(`/user/account/${user.name}`, { replace: true });
    return null;
  }

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
    <div className="sign">
      <Navbar />
      <main className="sign__main">
        <SignTitle value="Sign In" />
        <form className="sign__form" onSubmit={submitHandler}>
          {isError && (
            <Error
              msg="Invalid email or password."
              onClick={() => setIsError(false)}
            />
          )}
          <SignInput type="email" plcHold="Email.." ref={email} />
          <SignInput type="password" plcHold="Password.." ref={password} />

          <div className="sign__btns">
            {!operating && (
              <Link to="/sign-up" className="sign__btn">
                Sign Up?
              </Link>
            )}
            <SignButton value="Login" disabled={operating} />
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default SingIn;
