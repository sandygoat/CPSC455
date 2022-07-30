import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Card, Button, Tooltip, Modal } from 'antd';
import Icon, {DeleteOutlined} from '@ant-design/icons';
import {useRemoveFromFavoriteList} from './redux/hooks';

const { Meta } = Card;
// import PropTypes from 'prop-types';

export default function Favorite({favorite}) {
  const {removeFromFavoriteList} = useRemoveFromFavoriteList();
  const [place, setPlace] = useState(null);
  const { authorizedUser} = useSelector(state => ({
    authorizedUser: state.home.authorizedUser,
  }));

  // useEffect(()=>{
  //   if(favorite != null){
  //     fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${favorite.placeId}&key=AIzaSyA1h-RJmy66EAvQmxOOExargkvrdDRLlH4`, {
  //     method: 'GET',

  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Headers': 'X-Requested-With',
  //       },
  //     }
  //   )
  //   .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw new Error(res.status);
  //   })
  //   .then(res=>{
  //     setPlace(res);
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // }},[favorite])

  const removeFromFavorites = () =>{
    removeFromFavoriteList({
      userId: authorizedUser,
      placeId: favorite.result.place_id,
    })
  }

  const openDetail = () =>{
    
  }

  return !authorizedUser ? (
    <Redirect to="/login" />
  ) : (
    <div className="home-favorite">
      <Card
        
        actions={[
          <Button.Group>
            <Tooltip title={'Remove from favorites'} placement="topLeft">
              <Button data-testid="favButton" type={'default'} onClick={removeFromFavorites}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
            <Button data-testid="detailsButton" type="default" onClick={openDetail}>
              <Icon type="profile" /> More details
            </Button>
          </Button.Group>
        ]}
      >
        <Meta title={favorite.result.name} />
      </Card>
      {console.log(favorite.result.photos[0].getUrl())}
    </div>
  );
}

Favorite.propTypes = {};
Favorite.defaultProps = {};
