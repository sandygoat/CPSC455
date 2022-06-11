import CardContainer from "../models/CardContainer";
import {Row} from 'antd';

export default function Home() {
    return (
        <div>
            <Row style={{width:'100%'}}>
            <div style={{height:'300px'}}>this is map</div>
            </Row>
            <Row style={{width:'100%'}}>
            <CardContainer></CardContainer>
            </Row>
            
        </div>
    );
}
