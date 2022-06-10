import React from 'react';
import 'antd/dist/antd.css';
import { Col, Divider, Row } from 'antd';
import LoggedInCard from "../loggedInCard/LoggedInCard";

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

const GridDesign = () => {
    return (
        <div>
            <Divider orientation="left">Vertical</Divider>
            <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={6}>
                    <LoggedInCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <LoggedInCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <LoggedInCard/>
                </Col>
                <Col className="gutter-row" span={6}>
                    <LoggedInCard/>
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