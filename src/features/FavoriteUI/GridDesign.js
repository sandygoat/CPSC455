import React from 'react';
import 'antd/dist/antd.css';
import { Col, Divider, Row } from 'antd';
import FavCard from "./FavCard";

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

const GridDesign = () => {
    return (
        <div>
            <Divider orientation="center">Your Favorite List</Divider>
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={6}>
                    <FavCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <FavCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <FavCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <FavCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col className="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>
        </div>
    );
}

export default GridDesign;