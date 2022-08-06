import React, { useEffect } from 'react';
import UserComment from './UserComment';
import { Avatar, Button, Comment, Form, Input, List, Rate, message } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import {useAddReviews} from './redux/hooks';
import {useGetReviews} from './redux/hooks';
const { TextArea } = Input;

// import PropTypes from 'prop-types';

const CommentList = ({ comments, currentUser }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    
    renderItem={(props) => <UserComment {...props} currentUser={currentUser}/>}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function Review({id}) {
  const [comments, setComments] = useState([]);
  const [rate, setRate] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const {addReviews, addReviewsPending} = useAddReviews()
  const {getReviews, getReviewsPending} = useGetReviews();
  const { authorizedUser, curReviews } = useSelector(
    state => ({
      authorizedUser: state.home.authorizedUser,
      curReviews: state.home.curReviews,
    })
  );

  useEffect(()=>{
    getReviews(id);
    fetch(`/rating?placeId=${id}&userId=${authorizedUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      }
    )
    .then((r)=>{
      if(r.ok){
        return r.json();
      }else{
        throw new Error();
      }
    })
    .then((r)=>{
      if(r != null){
        setRate(r.rating);
      }
    })
    .catch((e)=>{
      message.error('fail to load rating');
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{

  },[curReviews])

  const handleSubmit = () => {
    if(!value) return;
    addReviews({
      author_name:authorizedUser,
      placeId:id,
      text:value,
    })
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const setRating = (v) =>{
    console.log(v);
      fetch(`/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body:JSON.stringify({
          placeId: id,
          userId: authorizedUser,
          rating: v,
        })
      }
    )
    .then((r)=>{
      if(r.ok){
        return r.json();
      }else{
        throw new Error();
      }
    })
    .then((r)=>{
      setRate(r[0].rating);
      message.success("Rated");
    })
    .catch((e)=>{
      message.error('fail to rate');
    })
  }

  return (
    <div className="home-review">
      <>
      {curReviews && curReviews.length > 0 && <CommentList comments={curReviews} currentUser={authorizedUser}/>}
      
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
        author={authorizedUser}
      />
      <div class="rateWrapper">Rate this place<Rate value={rate} onChange={(v) => setRating(v)}/></div>
      
    </>
    </div>
  );
};

Review.propTypes = {};
Review.defaultProps = {};
