import ReactDOM from 'react-dom/client';
import App from './components/App';
import { LocaleProvider } from './contexts/LocaleContext';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocaleProvider defaultValue='ko'>
        <App />
      </LocaleProvider>
      , document.getElementById('root')
    </PersistGate>
  </Provider>
);
