import React, { useEffect, useState } from 'react';
// // import PropTypes from 'prop-types';
// import {} from './redux/hooks';
import Map from './Map'
import {Row} from 'antd';
import CardList from './CardList'

export default function Home() {
  return (
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
