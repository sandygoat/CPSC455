import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';

import StarRating from "./LoggedInCardComponents/StarRating";
import Location from "./LoggedInCardComponents/Location";
import Note from "./LoggedInCardComponents/Note";
import PetFriendly from "./LoggedInCardComponents/PetFriendly";

const { Meta } = Card;

// 1. picture 2. star 3. Location (coordinates) 4. notes 5. pet friendly? 6. id

const LoggedInCard = () => (
    <Card className="loggedInCard"
        hoverable
        style={{
            width: 240,
        }}
        cover={<img alt="example" src="https://i.imgur.com/SQIhRdB.png" />}
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

export default LoggedInCard;