import React, { useEffect, useState } from 'react';
// // import PropTypes from 'prop-types';
// import {} from './redux/hooks';
import Map from './Map'
import {Row} from 'antd';
import CardList from './CardList'
import {useSelector} from 'react-redux';
import {Redirect } from 'react-router-dom';

export default function Home() {
  const { authorizedUser } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
    })
  );
  
  return (!authorizedUser?<Redirect to="/login"/>:
    <div className="home-home">    
        <Map/>
        <Row style={{width:'100%'}}>
              <CardList></CardList>
        </Row>  
    </div>
  );
};

Home.propTypes = {};
Home.defaultProps = {};
