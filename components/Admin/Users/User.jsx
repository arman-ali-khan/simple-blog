import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaBan, FaPencilAlt } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const User = ({ user }) => {
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
        {user.fullName}
      </p>
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
  <div className="modal-box">
    <h3 className="text-lg font-bold">Edit User</h3>
    <p className="py-4">This modal works with a hidden checkbox!</p>
  </div>
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
