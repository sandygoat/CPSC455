import React from 'react';
import HomeLayout from './HomeLayout';
import Login from './Login';
import 'antd/dist/antd.min.css';
import {useSelector} from "react-redux";

export default function App({ children }) {
  const { authorizedUser} = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
    })
  );
  return (
    <div className="home-app">
      <div className="page-container">
        {
          authorizedUser?
          <HomeLayout children={children}/>:
          <Login/>
        }
      </div>
    </div>
  );
}
