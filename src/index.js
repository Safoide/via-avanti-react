import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFW4Og4iQNG6E3MaE_Dm1U8hsnNrBoCBY",
  authDomain: "react-viaavanti.firebaseapp.com",
  projectId: "react-viaavanti",
  storageBucket: "react-viaavanti.appspot.com",
  messagingSenderId: "651596994923",
  appId: "1:651596994923:web:529c48844539991145d42e"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);