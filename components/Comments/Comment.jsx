import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import Reply from './Reply';

const Comment = ({comment}) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    return (
        <div>
            <div className="mb-1">
        <div className="p-2 border">
         <div>
         <div className="flex items-center gap-2">
            {/* name */}
            <Link className="font-bold text-blue-500" href={`/user/${comment.username}`}>
              {comment?.username}
            </Link>
            (<span>{moment(comment?.date).fromNow()}</span>)
          </div>
          <p className="py-1">
           {comment?.comment}
          </p>
          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="px-2 py-1 rounded-full border"
          >
            Reply
          </button>
         </div>
          {/* Replies */}
         <Reply comment={comment} showReplyBox={showReplyBox} setShowReplyBox={setShowReplyBox} />
         
        </div>
      </div>
        </div>
    );
};

export default Comment;