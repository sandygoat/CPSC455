import {Col} from "antd";
import FavCard from "./FavCard";
import React from 'react';
// import React from "@types/react";

function createCard(obj) {
    console.log("enter create card")
    console.log("before test")
    console.log(obj)
    return (
        <Col className="gutter-row" span={6}>
            <FavCard picture={obj.picture} instagram={obj.instagram} location={obj.location}/>
        </Col>
    )
}

export default function makeGrid(props) {
    console.log("enter makeGrid");
    props.list.map((card) => {
        return (
            createCard(card)
        )
    })
}