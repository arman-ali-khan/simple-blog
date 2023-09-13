import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../context/ContextProvider";
import ReplyCard from "./ReplyCard";

const Reply = ({ comment }) => {
  const [show, setShow] = useState(false);
  // comment btn
  const [replyBtn, setReplyBtn] = useState("Reply");
  // get user
  const { user, dbUser, logOut } = useContext(UserContext);

  // router
  const router = useRouter();

  //  update comment
  const [update, setUpdate] = useState(false);

  //  react hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  // handle comment
  const handleReply = (data) => {
    setReplyBtn("Loading...");
    const replyData = {
      reply: data.reply,
      commentId: comment.id,
      email: user.email,
      name: dbUser.fullName,
      username: dbUser.username,
      author: comment.author,
      type: "reply",
      date: new Date(),
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PRO}/api/reply`, replyData, {
        headers: {
          authorization: `Basic ${Cookies.get("token")}`,
          email: user.email,
        },
      })
      .then((res) => {
        toast.success("Replied");
        reset();
        setUpdate(!update);
        setReplyBtn("Reply");
      })
      .catch((err) => {
        console.log(err);
        setReplyBtn("Try again");
        if (err?.response?.status === 401) {
          logOut().then(() => {
            router.push(`/start/login`);
          });
        }
      });
  };
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // get comments
  const [getComments, setGetComments] = useState({});

  //  loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (comment.id) {
      setLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_PRO}/api/reply?id=${comment.id}&limit=10&page=${currentPage}`
        )
        .then((res) => {
          setGetComments(res.data);
          console.log(res.data);
          if (res.data) {
            setLoading(false);
          }
        });
    }
  }, [update, currentPage]);
  /// replies
  const replies = getComments.replies;

  const count = Math.ceil((getComments?.count || 10) / 10);
  return (
    <div>
      <div>
        <button
          className="bg-base-200 border-orange-500 border px-2 py-1 rounded-md"
          onClick={() => setShow(!show)}
        >
          Reply
        </button>
        {show ? (
          <form onSubmit={handleSubmit(handleReply)}>
            <input
              {...register("reply", { required: true })}
              className="px-4 py-2 border-orange-400 rounded-l-md border"
              placeholder="Reply"
              type="text"
              id=""
            />
            <button className="px-4 py-2 bg-orange-500 text-white border border-orange-500 rounded-r-md">
              {replyBtn}
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
      {/* Replies */}
      {replies?.length ?
      replies.map((reply) => <ReplyCard update={update} setUpdate={setUpdate} reply={reply} key={reply.id} />):''
    
    }
    </div>
  );
};

export default Reply;
