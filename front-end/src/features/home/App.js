import React from 'react';
import HomeLayout from './HomeLayout';
import Login from './Login';
import 'antd/dist/antd.min.css';
import {useSelector} from "react-redux";
import AppContextProviders from './context/index';


export default function App({ children }) {
  return (
    <div className="home-app">
      <div className="page-container">
        <AppContextProviders><HomeLayout children={children}/></AppContextProviders>
      </div>
    </div>
  );

  // {
  //         authorizedUser?
  //         <HomeLayout children={children}/>:
  //         <Login/>
  //       }
}
