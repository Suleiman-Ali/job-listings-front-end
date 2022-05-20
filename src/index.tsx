import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/pages/Home';
import ListingPage from './components/pages/ListingPage';
import { ContextProvider } from './context';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import SingIn from './components/pages/SingIn';
import SignUp from './components/pages/SingUp';
import UserPage from './components/pages/UserPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings/:id" element={<ListingPage />} />
          <Route path="/sign-in" element={<SingIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user/account/:name" element={<UserPage />} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);
