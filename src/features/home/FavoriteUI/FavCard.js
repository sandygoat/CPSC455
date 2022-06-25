import React from 'react';
import 'antd/dist/antd.css';
import {Card} from 'antd';

import StarRating from "./FavCardComponents/StarRating";
import Location from "./FavCardComponents/Location";
import Note from "./FavCardComponents/Note";
import PetFriendly from "./FavCardComponents/PetFriendly";

const {Meta} = Card;

// 1. picture 2. star 3. Location (coordinates) 4. notes 5. pet friendly? 6. id

export default function FavCard(props) {
    console.log("entererd FavCard")
    return (
        <Card className="loggedInCard"
              hoverable
              style={{
                  width: 240,
              }}
            // cover={<img alt="example" src="https://i.imgur.com/SQIhRdB.png" />}
            // cover={<img alt="example" src="https://i.imgur.com/61ibiF7.jpg" />}
               cover={<img alt="example" src="https://i.imgur.com/7l2GRbK.jpeg" />}
            //   cover={<img alt="example" src={props.location}/>}
        >
            <Meta title="Yo Yo Dog" description="www.instagram.com" />
            {/*<Meta title="Yo Yo Dog" description={props.instagram}/>*/}
            <br/>
            <StarRating/>
            <br/>
            <div>
                {/*Location is: {props.location}*/}
                Location is: 123 Broadway Vancouver
            </div>
            <br/>
            <Note/>
            <br/>
            <PetFriendly/>
        </Card>
    )
}