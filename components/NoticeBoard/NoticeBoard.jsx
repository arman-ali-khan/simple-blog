import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
const NoticeBoard = () => {
  const [notice, setNotice] = useState();
  // featch data
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/notice`).then((res) => {
      setNotice(res.data);
    });
  }, []);
  return (
    <div className="h-full">
      <div className="bg-white border shadow-xl rounded-b-md h-full">
        <div className="flex px-4 gap-2 py-1 items-center font-bold text-white bg-orange-400">
          <span>
            <FiAlertTriangle />
          </span>
          <p>Notice Board</p>
        </div>
        <div className="p-2 h-max ">
          <ul>
            {notice?.map((not, i) => {
              return (
                <li key={i} className="leading-5 px-1">
                {not.type === "normal" && not?.notice}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
