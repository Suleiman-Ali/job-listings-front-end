import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
