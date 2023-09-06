import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaBan, FaPencilAlt } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { UserContext } from "../../../context/ContextProvider";

const User = ({ user }) => {

 const {dbUser} = useContext(UserContext)
  // update user
  const handleUpdateUser = (data) =>{
    axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/admin/users/${user.id}`,{type:data},{
      headers:{
        authorization: `basic ${Cookies.get('token')}`,
        email: dbUser.email
      }
    })
    .then(res=>{
      console.log(res.data)
      // toast.error(res.data.message)
    }).catch(err=>{
      console.error(err.message)
    })
    console.log(data,user.id)
  }
  return (
   <>
   
   <li
      key={user.id}
      className="flex justify-between border-b items-center py-1 gap-2"
    >
      <p className="flex items-center gap-2">
        <img
          className="w-12 border-2 h-12"
          src={
            user?.photo || "https://avatars.githubusercontent.com/u/74469015"
          }
          alt=""
        />{" "}
        {user.fullName || user.email} ({user.type})
      </p>
      <select onChange={(e)=>handleUpdateUser(e.target.value)} className="select select-sm rounded select-bordered" id="role">
    <option value="contributor">contributor</option>
    <option value="author">Author</option>
    <option value="moderator">Moderator</option>
    <option value="admin">Admin</option>
   </select>
      <p className="flex items-center gap-2">
        <label title="Make Admin" className="p-1 cursor-pointer border rounded-full border-blue-400">
          <MdOutlineAdminPanelSettings size={20} />
        </label>
        <label htmlFor="delete_user" title="Edit User" className="p-1 cursor-pointer border rounded-full border-blue-400">
        <AiOutlineDelete size={20} />
          </label>
        <label htmlFor="edit_user" title="Edit User" className="p-1 cursor-pointer border rounded-full border-blue-400">
          <FaPencilAlt size={18} />
          </label>
        <label title="Block User" className="p-1 cursor-pointer border rounded-full border-blue-400">
          <FaBan size={20} />
        </label>
        <label title="Lock For 1 Day" className="p-1 cursor-pointer border rounded-full border-blue-400">
          <RiLockPasswordLine size={20} />
        </label>
      </p>
    </li>
     {/*  Admin modal */}

<input type="checkbox" id="admin_user" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Edit User</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
  </div>
  <label className="modal-backdrop" htmlFor="admin_user">Close</label>
</div>


     {/*  edit modal */}

<input type="checkbox" id="edit_user" className="modal-toggle" />
<div className="modal">
  <form onSubmit={e=>handleUpdateUser({e,user})} className="modal-box">
    <h3 className="text-lg font-bold">Edit User</h3>
  <div className="flex items-center gap-3">
  <select name="userUpdate" className="select select-sm rounded select-bordered" id="role">
    <option value="contributor">contributor</option>
    <option value="author">Author</option>
    <option value="moderator">Moderator</option>
    <option value="admin">Admin</option>
   </select>
   <button className="btn btn-neutral btn-sm rounded">Save</button>
  </div>
  </form>
  <label className="modal-backdrop" htmlFor="edit_user">Close</label>
</div>


     {/*  Delete modal */}

     <input type="checkbox" id="delete_user" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Delete User</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
  </div>
  <label className="modal-backdrop" htmlFor="delete_user">Close</label>
</div>


     {/*  Ban modal */}

     <input type="checkbox" id="ban_user" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Delete User</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
  </div>
  <label className="modal-backdrop" htmlFor="ban_user">Close</label>
</div>

     {/*  Lock modal */}

     <input type="checkbox" id="lock_user" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Delete User</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
  </div>
  <label className="modal-backdrop" htmlFor="lock_user">Close</label>
</div>
    </>
  );
};

export default User;
