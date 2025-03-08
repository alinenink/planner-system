import React from 'react';
import ReactDOM from 'react-dom/client'; // Atualizado para 'react-dom/client'
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';

// Pegue o elemento root
const rootElement = document.getElementById('root');

// Crie a raiz usando `createRoot`
const root = ReactDOM.createRoot(rootElement);

// Renderize o componente App
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
