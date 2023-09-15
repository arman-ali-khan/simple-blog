import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BiDownArrow } from "react-icons/bi";
import { RiCloseLine, RiReplyLine, RiSendPlane2Line } from "react-icons/ri";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../context/ContextProvider";
const GusetBook = () => {
  // hook form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // get context user
  const { dbUser, user: fireUser } = useContext(UserContext);
  // socket
  const socket = io.connect(process.env.NEXT_PUBLIC_API_PRO);
  // get input message
  const [message, setMessage] = useState("");
  // get data from socket
  const [getMessage, setGetMessage] = useState([]);

  const [reply, setReply] = useState({});
  // update
  const [update, setUpdate] = useState(false);

  // scroll bottom
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }


  const handleSend = (data) => {

    setMessage(data.message)
  
    console.log(data);
    const messageData = {
      message: data.message,
      date: new Date(),
      reply: JSON?.stringify(reply),
      messageId: uuidv4(),
      user: JSON?.stringify({
        id: dbUser.id,
        fullName: dbUser.fullName,
        photo: dbUser.photo,
        email: dbUser.email,
        username: dbUser.username,
      }),
    };
    socket.emit("react", [...getMessage, messageData]);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PRO}/api/message`, messageData, {
        headers: {
          authorization: `basic ${Cookies.get("token")}`,
          email: fireUser?.email,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          reset();
          setReply({});
        }
      });
  };

  useEffect(() => {
    socket.on("sendData", (data) => {
      setGetMessage(data);
    });
  }, [socket]);

  // get message from  db
  const [messagesData, setMessageData] = useState({});

  useEffect(() => {
    scrollToBottom()
  }, [message]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/message?limit=100&page=1`, {
        headers: {
          authorization: `basic ${Cookies.get("token")}`,
          email: fireUser.email,
        },
      })
      .then((res) => {
        setMessageData(res.data);
      });
  }, [update]);

  // data
  const dataMessage = messagesData.message || [];

  // handle delete
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/message/${id}`, {
        headers: {
          authorization: `basic ${Cookies.get("token")}`,
          email: fireUser?.email,
        },
      })
      .then((res) => {
        console.log(res.data);
        // toast.success()
        setUpdate(!update);
      });
  };
  return (
    <div className="flex h-screen fixed mx-auto w-full antialiased">
      <div className="md:flex flex-row h-full w-full md:w-[70%] lg:w-[50%] mx-auto overflow-x-hidden">
        <div className="flex flex-col md:w-96 flex-auto h-full md:p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-base-100 h-full md:p-4 pb-6">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="flex flex-col sm:w-[90%] gap-y-2">
                  {dataMessage?.map((message, i) => {
                    const user = JSON?.parse(message.user);
                    // console.log(user)
                    const reply = JSON?.parse(message.reply);
                    return (
                      <div
                        key={i}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          {user?.photo ? (
                            <Image
                              src={user?.photo}
                              width={50}
                              height={50}
                              className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 flex-shrink-0"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 text-base-100 capitalize flex-shrink-0">
                              {user?.email?.slice(0, 1)}
                            </div>
                          )}

                          <div className="relative ">
                            {reply?.reply ? (
                              <a
                                href={`#${reply.replyId}`}
                                className="absolute -top-5 opacity-50  text-xs  bg-base-300 py-1 px-2 rounded-lg text-gray-400 left-0 truncate w-full"
                              >
                                {reply ? reply?.reply : ""}
                              </a>
                            ) : (
                              ""
                            )}

                            <div
                              id={message.messageId}
                              className="ml-3 w-full text bg-base-200 py-2 px-4 shadow rounded-xl"
                            >
                              {message?.message}
                            </div>
                          </div>

                          <div className="flex flex-col space-y-1 sm:flex-row items-center relative w-12 sm:space-x-2">
                            <button
                              onClick={() =>
                                setReply({
                                  reply: message?.message?.slice(0, 100),
                                  replyId: message?.messageId,
                                })
                              }
                              className="-right-3  px-2 sm:px-4"
                            >
                              <RiReplyLine className="p-1" size={25} />
                            </button>
                            {fireUser.email === user.email ? (
                              <button
                                className="w-6  flex justify-center rounded-full py-1 text-rose-500"
                                onClick={() => handleDelete(message.id)}
                              >
                                <RiCloseLine />
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {getMessage?.map((message, i) => {
                    const user = JSON?.parse(message.user);
                    const reply = JSON?.parse(message.reply);
                    return (
                      <div
                        key={i}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          {user?.photo ? (
                            <Image
                              src={user?.photo}
                              width={50}
                              height={50}
                              className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 flex-shrink-0"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 text-base-100 capitalize flex-shrink-0">
                              {user?.email?.slice(0, 1)}
                            </div>
                          )}

                          <div className="relative w-full">
                            {reply?.reply ? (
                              <a
                                href={`#${reply.replyId}`}
                                className="absolute -top-5 opacity-50 text-xs bg-base-300 py-1 px-2 truncate rounded-lg text-gray-400 left-0  w-fit max-w-full"
                              >
                                {reply ? reply?.reply : ""}
                              </a>
                            ) : (
                              ""
                            )}

                            <div
                              id={message?.messageId}
                              className="ml-3 w-fit bg-base-200 py-2 px-4 shadow rounded-xl"
                            >
                              {message?.message}
                            </div>
                           
                          </div>
                          <div ref={messagesEndRef} />
                          <button
                            onClick={() =>
                              setReply({
                                reply: message?.message?.slice(0, 100),
                                replyId: message?.messageId,
                              })
                            }
                            className="-right-3 relative w-14"
                          >
                            <RiReplyLine className="p-1" size={25} />
                          </button>
                        </div>
                     
                      </div>
                    );
                  })}
                </div>
              
                  <div id="down"></div>
              </div>
            </div>
            <a
              href="#down"
              className="fixed bottom-20 p-1 right-1 z-50 rounded-full border"
            >
              <BiDownArrow size={32} />
            </a>
            <form
              onSubmit={handleSubmit(handleSend)}
              className="flex sticky left-0 bottom-16 md:bottom-20 mt-12 flex-row items-center h-20 md:h-20 rounded-xl bg-base-300 w-full px-4"
            >
              {/* <div>
                <button className="flex items-center justify-center ">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div> */}
              <div className="flex-grow md:ml-4">
                <div className="relative w-full">
                  {reply.reply ? (
                    <div className="flex w-full">
                      <div className="absolute bg-base-300 px-5 w-full p-1 rounded-t-md -top-9 truncate flex items-center gap-1 left-0">
                        {reply.reply}
                        <RiReplyLine size={20} />
                        <span
                          onClick={() => setReply({})}
                          className="absolute cursor-pointer right-0 p-1 rounded-full border bg-base-100"
                        >
                          <RiCloseLine size={20} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <textarea
                    {...register("message", { required: true })}
                    placeholder="Message"
                    className="flex max-h-20 w-full border focus:outline-none focus:border-orange-300 md:px-4 textarea text-sm h-10 rounded-full"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 "></button>
                </div>
              </div>
              <div className="ml-1 md:ml-4">
                <a href="#down">
                  <button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded px-1 md:px-4 py-1 flex-shrink-0">
                    <span className="ml-2 py-1">
                      <RiSendPlane2Line size={24} />
                    </span>
                  </button>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GusetBook;
