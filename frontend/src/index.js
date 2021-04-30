import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/raleway/400.css"
import "@fontsource/open-sans/700.css"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
