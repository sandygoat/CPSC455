import React, { useEffect } from 'react';
import YourFavourites from './YourFavourites';
import GridDesign from "../FavoriteUI/GridDesign";
// import PropTypes from 'prop-types';

export default function Favorite() {
  return (
    <div className="home-favorite">
      {// <YourFavourites/>
      }
      <GridDesign />
    </div>
  );
};

Favorite.propTypes = {};
Favorite.defaultProps = {};
