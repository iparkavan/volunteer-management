import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './assets/fonts/fonts.css';
import './index.css';
import 'primeicons/primeicons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import MuiTheme from './theme/MuiTheme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={MuiTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer 
        position="top-right"
        autoClose={5000}
      />
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
