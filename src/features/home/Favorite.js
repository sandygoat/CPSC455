import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function Favorite() {
  const { authorizedUser } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
    })
  );
  return (!authorizedUser?<Redirect to="/login"/>:
    <div className="home-favorite">
    </div>
  );
};

Favorite.propTypes = {};
Favorite.defaultProps = {};
