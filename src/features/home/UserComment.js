import React, { useEffect } from 'react';
import { Avatar, Comment ,Tooltip, Button} from 'antd';
import moment from 'moment';
import {useDeleteReview} from './redux/hooks';
// import PropTypes from 'prop-types';


export default function UserComment(p) {
  const {deleteReview} = useDeleteReview()
  
  const deleteComment = ()=>{
    deleteReview(p)
  }

  return (
    <div className="home-user-comment">
      <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>{p.author_name}</a>}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          p.text
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      >
        {p.children}
      </Comment>
      {
        p.currentUser == p.author_name?<Button type="dashed" danger onClick={deleteComment}>Delete</Button>:null
        }
      
    </div>
  );
}

UserComment.propTypes = {};
UserComment.defaultProps = {};
