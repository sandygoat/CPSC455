import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Badge from './Badge';
import Card from './Card';
import websites from './websites';
import {useSelector} from 'react-redux';
import {useGetPlaces} from './redux/hooks';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* mobile viewport bug fix */
  overflow-x: auto;
  scroll-behavior: smooth;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding-left: calc(50vw - 160px);


  /* Fake padding-right */
  &::after {
    content: '';
    position: relative;
    display: block;
    flex-shrink: 0;
    width: calc(50vw - 160px);
    height: 1px;
  }

  > button {
    margin: 10px 40px 10px 0px;
  }

  /* Hide the others cards */
  > button:not(:first-child) {
    visibility: visible; /* switch to 'visible' */
  }
`;

export default function CardList() {
  // const {getPlaces} = useGetPlaces();
  const { places } = useSelector(
    state => ({
      places: state.home.places,
    })
  );


  // const uGetPlaces = useCallback(() => {
  //     getPlaces();
  // }, [getPlaces])
 
// useEffect(() => {
//   getPlaces()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// },[])
function color16(){
   let r = Math.floor(Math.random()*256);
   let g = Math.floor(Math.random()*256);
   let b = Math.floor(Math.random()*256);
   let color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
   return color;
}
  return (
    <Page>
      <Grid>
        {places && places.slice(1,7).map((place, index) => (
          <Card
            key={place.place_id}
            id={place.place_id}
            hexa={color16()}
            title={place.name}
            description={place.vicinity}
            image={place && place.photos && place.photos[0] && place.photos[0].getUrl && place.photos[0].getUrl({maxHeight: 250, maxWidth: 400})}
          />
        ))}
      </Grid>
    </Page>
  );
}
