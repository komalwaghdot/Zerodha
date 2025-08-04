import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import axios from "axios";


import './index.css';
import Home  from './components/Home';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =  process.env.REACT_APP_API_URL;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Home/>}/>
       
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

