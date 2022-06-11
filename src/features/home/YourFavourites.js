import React from "react";
import ThreeColumn from "./ThreeColumn";

const restaurants = [{
  isCustomerFavourite:true,
},{
isCustomerFavourite:false,
},{
isCustomerFavourite:true,
}]

const YourFavourites = () => {

    const heading =
        <h1>Your Favourites</h1>;

    var isFavouriteArray = [];

    restaurants.forEach(restaurant => {
        if (restaurant.isCustomerFavourite === true) {
            isFavouriteArray.push(restaurant)
        }
    })

    return (
        <ThreeColumn restaurants={isFavouriteArray} heading={heading} />
    )
}

export default YourFavourites;