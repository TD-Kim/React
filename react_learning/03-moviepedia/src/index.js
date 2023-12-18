import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import App2 from './components/App2';
import App_final from './components/App_final';
import { LocaleProvider } from './contexts/LocaleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocaleProvider defaultValue='ko'>
    <App_final />
  </LocaleProvider>
);
