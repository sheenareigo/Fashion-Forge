import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
 import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './contexts/UserContext';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider>
          <SearchProvider>
            <CartProvider>
          <App />
            </CartProvider>
         </SearchProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
