import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaBan, FaPen } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const User = ({user}) => {
    return (
            <li
              key={user.id}
              className="flex justify-between border-b items-center py-1 gap-2"
            >
              <p className="flex items-center gap-2">
                <img
                  className="w-12 border-2 h-12"
                  src={user?.photo || 'https://avatars.githubusercontent.com/u/74469015'}
                  alt=""
                />{" "}
                {user.fullName}
              </p>
              <p className="flex items-center gap-2">
                <button className="p-1 border rounded-full border-blue-400">
                  <MdOutlineAdminPanelSettings size={20} />
                </button>
                <button className="p-1 border rounded-full border-blue-400">
                  <AiOutlineDelete size={20} />
                </button>
                <button className="p-1 border rounded-full border-blue-400">
                  <FaPen size={20} />
                </button>
                <button className="p-1 border rounded-full border-blue-400">
                  <FaBan size={20} />
                </button>
                <button className="p-1 border rounded-full border-blue-400">
                  <RiLockPasswordLine size={20} />
                </button>
              </p>
            </li>
    );
};

export default User;