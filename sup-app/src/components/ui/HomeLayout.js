// import NavBar from "./NavBar";
import classes from "./Layout.module.css"
import { Layout, Menu, PageHeader} from 'antd';
import {Link} from 'react-router-dom'
import {
  DesktopOutlined,
  PieChartOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';
import { useState } from "react";
import '../style/HomeLayout.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function HomeLayout(props) {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () =>{
      setCollapsed(!collapsed);
    }

    return (
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
            <PageHeader
                style={{height:"70px", padding: "10px 24px",backgroundColor:'rgb(9,32,66)',color:"white"}}
                className="site-page-header"
                title="Title"
                subTitle="Subtitle"
              />
            <Content style={{ margin: '0 16px' }}>
              <main className={classes.main}>{props.children}</main>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Team 7</Footer>
          </Layout>
        </Layout>
      
    )
}

export default HomeLayout;