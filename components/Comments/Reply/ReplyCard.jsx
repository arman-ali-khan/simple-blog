import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdAlternateEmail } from "react-icons/md";
import { RiFacebookFill, RiPhoneLine } from "react-icons/ri";
import { UserContext } from "../../../context/ContextProvider";

const ReplyCard = ({ reply,blog, update, setUpdate }) => {
  // context
  const { user, logOut,dbUser } = useContext(UserContext);
  // router
  const router = useRouter();

  // const loading delete
  const [deleteBtn, setdeleteBtn] = useState("Delete");

  // delete comment
  const handleDeleteComment = (id) => {
    setdeleteBtn("Deleting...");
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/reply/${id}`, {
        headers: {
          authorization: `Basic ${Cookies.get("token")}`,
          email: user.email,
        },
      })
      .then((res) => {
        setUpdate(!update);
        setdeleteBtn("Deleted");
        toast.success("Deleted");
      })
      .catch((err) => {
        console.error(err);
        setdeleteBtn("Try again");
        if (err?.response?.status === 401) {
          logOut().then(() => {
            router.push(`/start/login`);
          });
        }
      });
  };

  // get author
  const [author, setAuthor] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/allusers?username=${reply?.username}`
      )
      .then((res) => {
        setAuthor(res.data[0]);
      });
  }, [reply]);

  // on hover
  const [hover, setHover] = useState(false);
  return (
    <div className="relative">
      <div className="ml-5   ">
        <div className="flex items-center gap-2">
          {/* name */}
          {reply?.username ? (
            <Link
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className={`font-bold  ${blog?.email === author.email && 'bg-orange-100 px-2 rounded-full'} text-blue-500 flex items-center gap-1`}
              href={`/user/${reply.username}`}
            >
              {reply?.name ? reply?.name : reply?.username}
              <p className="bg-orange-100 font-thin capitalize px-2 rounded-full text-orange-600">{author?.type}</p>
            </Link>
          ) : (
            <Link className="font-bold text-blue-500" href={`#`}>
              {"TrickZone User"}
            </Link>
          )}
          {/* HOver data */}
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`${
              hover
                ? "absolute bg-base-100 rounded-xl border-orange-500 border z-30 flex justify-center h-auto py-3 w-64 top-6"
                : "hidden"
            }`}
          >
            <div>
              <div className="flex justify-center mt-2">
                {/* hover image */}
                <img
                  className="w-16 h-16 border-white border-2 p-1 object-cover rounded-full"
                  src={
                    author.photo ||
                    "https://www.ucae.es/wp-content/uploads/2021/03/dummy-user.jpg"
                  }
                  alt=""
                />
              </div>
              <Link
                className="text-blue-500 font-bold"
                href={`/user/${reply.username}`}
              >
                <h2>{author.fullName}</h2>
              </Link>
              <div className="flex my-3 justify-center">{author.about}</div>
              {/* Social hover data */}
              <div className="flex justify-center">
                <ul className="flex items-center gap-4">
                  {author?.fbId ? (
                    <li className="border p-2 rounded-full">
                      <a href={author?.fbId} target="_blank">
                        <RiFacebookFill size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {author?.phone ? (
                    <li className="border p-2 rounded-full">
                      <a href={`tel:${author?.phone}`} target="_blank">
                        <RiPhoneLine size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {author?.email ? (
                    <li className="border p-2 rounded-full">
                      <a href={`mailto:${author?.email}`} target="_blank">
                        <MdAlternateEmail size={20} />
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
         <span className="text-xs"> ({moment(reply?.date).fromNow()})</span>
        </div>
        <p className="py-1">{reply?.reply}</p>
        {(user?.email === reply.email  || dbUser?.type==='admin') && (
          <button
            onClick={() => handleDeleteComment(reply.id)}
            className="text-error text-xs px-2 py-1 border border-error rounded-full"
          >
            {deleteBtn}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReplyCard;
