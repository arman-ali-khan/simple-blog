import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextProvider";

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
          console.log(users);
        });
    }
  }, [user?.email]);
  return (
    <div className="w-full">
      <div className="bg-blue-400 px-4 py-2 w-full text-center text-white">
        <h2>Users</h2>
      </div>
      <div className="w-full border">
        <ul className="border">
          {users.map(user => {
            <li className="bg-red-200 py-4" key={user.id}>
              {user.email}
            </li>
          })}
        </ul>
      </div>
    </div>
  );
};

export default Users;
