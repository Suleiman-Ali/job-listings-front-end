import Home from './components/pages/Home';
import ListingPage from './components/pages/ListingPage';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import UserPage from './components/pages/UserPage';
import AddForm from './components/pages/AddForm';
import UpdateForm from './components/pages/UpdateForm';
import Notfound from './components/pages/Notfound';
import { ContextProvider } from './context';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/listings/:id" element={<ListingPage />} />
          <Route path="/user/account/:name" element={<UserPage />} />
          <Route path="/add-form" element={<AddForm />} />
          <Route path="/update-form" element={<UpdateForm />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
