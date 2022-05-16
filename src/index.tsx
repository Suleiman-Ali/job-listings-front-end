import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/pages/Home';
import { ContextProvider } from './context';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import ListingPage from './components/pages/ListingPage';

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
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);
