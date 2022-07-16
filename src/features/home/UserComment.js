import React, { useEffect } from 'react';
import { Avatar, Comment ,Tooltip} from 'antd';
import moment from 'moment';
// import PropTypes from 'prop-types';


export default function UserComment(p) {
  

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
    </div>
  );
}

UserComment.propTypes = {};
UserComment.defaultProps = {};
