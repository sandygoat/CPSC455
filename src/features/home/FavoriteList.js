import React, { useEffect} from 'react';
import Favorite from './Favorite';
// import PropTypes from 'prop-types';
import {useGetFavoriteList} from './redux/hooks';
import { useDispatch, useSelector } from "react-redux";
import { List } from "antd";

export default function FavoriteList() {
  const { authorizedUser, favoriteList } = useSelector(state => ({
    authorizedUser: state.home.authorizedUser,
    favoriteList: state.home.favoriteList,
  }));
  const {getFavoriteList} = useGetFavoriteList();
  const extraProps = { grid: { gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 } };
  
  useEffect(()=>{
    getFavoriteList({userId:authorizedUser});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="home-favorite-list">
      <List
        {...extraProps}
        dataSource={favoriteList}
        renderItem={favorite => (
          <List.Item>
            <Favorite favorite={favorite} />
          </List.Item>
        )}
      />
    </div>
  );
}

FavoriteList.propTypes = {};
FavoriteList.defaultProps = {};
