import moment from 'moment';
import Link from 'next/link';
import React, { useState } from 'react';
import Replay from './Replay';

const Comment = ({comment}) => {
    const [showReplayBox, setShowReplayBox] = useState(false);
    return (
        <div>
            <div className="mb-1">
        <div className="p-2 border">
         <div>
         <div className="flex items-center gap-2">
            {/* name */}
            <Link className="font-bold text-blue-500" href={`/user/${comment.username}`}>
              {comment?.name}
            </Link>
            (<span>{moment(comment?.data).fromNow()}</span>)
          </div>
          <p className="py-1">
           {comment?.comment}
          </p>
          <button
            onClick={() => setShowReplayBox(!showReplayBox)}
            className="px-2 py-1 rounded-full border"
          >
            Replay
          </button>
         </div>
          {/* Replies */}
         <Replay comment={comment} showReplayBox={showReplayBox} setShowReplayBox={setShowReplayBox} />
         
        </div>
      </div>
        </div>
    );
};

export default Comment;