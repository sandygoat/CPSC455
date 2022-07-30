import { Layout, Menu, PageHeader} from 'antd';
import {Link} from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import React from 'react';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// import PropTypes from 'prop-types';

export default function HomeLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () =>{
    setCollapsed(!collapsed);
  }

  return (
    <div className="home-home-layout">
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{backgroundColor:'rgb(230,229,230)'}}>
            <div className="logo" />
            <Menu defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="home" icon={<PieChartOutlined />}>
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="favorite" icon={<DesktopOutlined />}>
                <Link to="/favorite">Favorite</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            
            <Content style={{ margin: '0 16px' }}>
              {props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Team 7</Footer>
          </Layout>
        </Layout>
    </div>
  );
};

HomeLayout.propTypes = {};
HomeLayout.defaultProps = {};


// <PageHeader
            //     style={{height:"70px", padding: "10px 24px",backgroundColor:'rgb(9,32,66)',color:"white"}}
            //     className="site-page-header"
            //     title="Title"
            //     subTitle="Subtitle"
            //   />