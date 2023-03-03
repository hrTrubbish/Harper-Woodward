import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
