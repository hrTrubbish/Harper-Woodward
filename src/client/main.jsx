import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './redux/store';
import AuthProvider from './pages/components/_AuthProvider.jsx';
import App from './App.jsx';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
