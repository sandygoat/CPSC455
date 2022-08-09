import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, message, List, Rate, Comment } from 'antd';
// import PropTypes from 'prop-types';
import {useGetUsers, useGetFavoriteList} from './redux/hooks';
import {useSelector} from 'react-redux';
import { useSocket } from './context/socket';

const { Option } = AutoComplete;

export default function Subscribe() {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const {getUsers} = useGetUsers();
  const {} = useGetFavoriteList();
  const [update, setUpdate] = useState([]);
  const socket = useSocket();
  const { authorizedUser, usersList } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
      usersList: state.home.usersList,
    })
  );

  const onSearch = (searchText) => {
    setOptions();
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
    setValue(data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  const subscribe = () =>{
    if(value){
      fetch(`/users/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body:JSON.stringify({
        poster:value,
        userId:authorizedUser,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status);
      })
      .then(res => {
      })
    }else{
      message.error("Please select a user from dropdown")
    }
  }

  const handleMessage = (message) =>{
    console.log(message)
  }

  // useEffect(() => {
  //   // componentDidMount
    
  //   socket.on('message', "hello"); // 监听消息
  //   return () => {
  //     // componentWillUnmount
  //     socket.off('message', handleMessage);
  //   };
  // }, [socket]);

  useEffect(() => {
    getUsers({
      userId: authorizedUser,
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    socket.on('message',(r)=>{
      console.log(r);
      setUpdate((x)=>[...x, r]);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[socket])

  useEffect(()=>{
    console.log(usersList);
    setOptions(usersList);
  },[usersList])

  return (
    <>
      <AutoComplete
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        placeholder="input here"
      >
        {options.map((option) => (
          <Option key={option.email} value={option.email}>
            {option.email}
          </Option>
        ))}
      </AutoComplete>
      <Button onClick={subscribe}>
        Subscribe
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={update}
        renderItem={(item) => (
          <List.Item>
            <Comment
              author={item.userId}
              content={
                <>
                <div>{item.placeName}</div>
                <Rate value={item.rating}/>
                </>
              }
            />
            
          </List.Item>
        )}
      />
      </>
  );

};

Subscribe.propTypes = {};
Subscribe.defaultProps = {};
