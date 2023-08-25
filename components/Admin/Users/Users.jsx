import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextProvider";
import User from "./User";

const Users = () => {
  const { user } = useContext(UserContext);
  // all users
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/getallusers`, {
          headers: {
            authorization: `Basic ${Cookies.get("token")}`,
            email: user?.email,
          },
        })
        .then((res) => {
          setUsers(res.data);
        });
    }
  }, [user?.email]);
  return (
    <div className="w-full">
      <div className="bg-blue-400 px-4 py-2 text-white w-full text-center">
        <h2 className="text-base">Users</h2>
      </div>
      <div className="w-full border px-3 my-1">
        <ul>
        {
          users.map(user=><User user={user} key={user.id} />)
        }
        </ul>
      </div>
    </div>
  );
};

export default Users;
