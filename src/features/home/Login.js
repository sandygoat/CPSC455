import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Register from './Register';
import {useLogin} from './redux/hooks';
import {useSelector} from 'react-redux';
import {Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import {} from './redux/hooks';

export default function Login() {
  const { authorizedUser } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
    })
  );
  const {login, loginError} = useLogin();
  
  const onFinish = (values) => {
    login({
        email:values.email,
        password:values.password,
      })
  };

  const submit = (values) =>{
      
  }

  useEffect(()=>{
    if(loginError){
      message.error("Failed to login");
    }
  },[loginError])


  return (
    authorizedUser? <Redirect to="/home"/>:
    <div className='log-in-card'>
      <h2>Log In</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={submit}>
            Log in
          </Button>
          Or <a href="/reg">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

Login.propTypes = {};
Login.defaultProps = {};
