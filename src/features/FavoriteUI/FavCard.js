import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';

import StarRating from "./FavCardComponents/StarRating";
import Location from "./FavCardComponents/Location";
import Note from "./FavCardComponents/Note";
import PetFriendly from "./FavCardComponents/PetFriendly";

const { Meta } = Card;

// 1. picture 2. star 3. Location (coordinates) 4. notes 5. pet friendly? 6. id

const FavCard = () => (
    <Card className="loggedInCard"
        hoverable
        style={{
            width: 240,
        }}
        // cover={<img alt="example" src="https://i.imgur.com/SQIhRdB.png" />}
        cover={<img alt="example" src="https://i.imgur.com/61ibiF7.jpg" />}
    >
        <Meta title="Yo Yo Cat" description="www.instagram.com" />
        <br/>
        <StarRating/>
        <br/>
        <Location/>
        <br/>
        <Note/>
        <br/>
        <PetFriendly/>
    </Card>
);

export default FavCard;