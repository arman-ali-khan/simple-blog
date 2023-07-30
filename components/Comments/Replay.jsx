import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context/ContextProvider';
import Loader from '../Loader/Loader';

const Replay = ({showReplayBox, setShowReplayBox,comment}) => {
     // get user
     const {user} = useContext(UserContext)
     //  get db user
     const [dbUser,setDbUser] = useState({})
     useEffect(()=>{
        if(user?.email){
         axios.get(`/api/user?email=${user.email}`)
         .then(res=>{
             setDbUser(res.data)
         })
        }
     },[user?.email])
     //  react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   replay id
const replayId = uuidv4().split('-')[0]
     // handle replay
  const handleReplay = (data) => {
    const replay = {
        ...data,
        replayId,
        commentId:comment.commentId,
        name:dbUser.fullName,
        username:dbUser.username,
        date: Date(),
        email: user.email
    }
    console.log(replay)
  };

    return (
        <div>
             <div className="pl-4 border my-2 py-2">
              <div className="flex items-center gap-2">
                <Link className="font-bold text-blue-500" href={`#`}>
                  Arman Khan
                </Link>
                (<span>a day ago</span>)
              </div>
              <p className="py-1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores deserunt voluptatibus?
              </p>
              <button
                onClick={() => setShowReplayBox(!showReplayBox)}
                className="px-2 py-1 rounded-full border"
              >
                Replay
              </button>
            </div>
            {/* replay box */}
            {showReplayBox ? (
              <form
                onSubmit={handleSubmit(handleReplay)}
                className="flex items-center "
              >
                <input
                  {...register("replay", { required: true })}
                  className="w-full h-6 border px-4 py-6 sm:w-96"
                  placeholder="Replay"
                  type="text"
                  id=""
                />
                <button disabled={!dbUser.email} className="px-4 disabled:bg-gray-500 py-3 border">{dbUser?.email ? 'Replay':<Loader className='px-4 py-3' w={4} h={4} />}</button>
              </form>
            ) : (
              ""
            )}
        </div>
    );
};

export default Replay;