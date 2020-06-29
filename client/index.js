import React from 'react';
import {
  render
} from 'react-dom';
import { CookiesProvider } from "react-cookie";

import App from './App.jsx';
// import './Style.css';



render(<CookiesProvider>
  < App />
</CookiesProvider>, document.getElementById('root'));