import Link from "next/link";
import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LuStepBack } from "react-icons/lu";
import { UserContext } from "../../../context/ContextProvider";

const Balance = () => {
  const { dbUser } = useContext(UserContext);
  return (
    <div className="w-full md:w-2/3 sm:px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words border w-full mb-6 shadow-xl rounded-lg ">
        <div className="flex sm:gap-3 justify-between">
          {/* Balance */}
          <div className="w-full my-12">
            <div className="flex justify-center">
              <div className="flex justify-center bg-blue-200 w-auto px-4 font-bold items-center h-16 rounded-full my-3">
                ৳ {parseFloat(dbUser?.balance).toFixed(2)}
              </div>
            </div>
            <div className="flex justify-center">
              <label
                htmlFor="my_modal_7"
                className="px-2 py-2 bg-blue-400 hover:bg-blue-500 duration-300 rounded text-white inline-block"
              >
                Withdraw
              </label>
            </div>
            <div className="flex justify-center w-full mt-6">
            <Link className="px-4 py-2 border flex items-center justify-center w-44 gap-3 bg-rose-400 text-white font-bold rounded text-center" href={`/user/${dbUser.username}`}> <LuStepBack /> Back</Link>
        </div>
          </div>
        </div>
       
      </div>
      {/* Modal */}
      {/* Put this part before </body> tag */}
      <>
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <label
              htmlFor="my_modal_7"
              className="px-2 cursor-pointer right-0 absolute top-0 rounded-full bg-rose-200 py-2 bg-[rgb(225 29 72)]"
            >
              <IoCloseSharp size={24} color="red" />
            </label>
            <h3 className="text-lg font-bold"> Withdraw your balance</h3>
            {/* <p className="py-4">This modal works with a hidden checkbox!</p> */}
            <div className="flex flex-col">
                {/* Number */}
              <label className="py-1" htmlFor="number">
                Amount
              </label>
              <input
                className="py-2 px-2 border border-blue-200"
                placeholder="300"
                type="number"
                id="number"
              />
            </div>
            <div className="flex flex-col">
                {/* Number */}
              <label className="py-1" htmlFor="number">
                Your Number
              </label>
              <input
                className="py-2 px-2 border border-blue-200"
                placeholder="01..."
                type="text"
                id="number"
              />
            </div>
            {/* Bank type */}
            <div className="flex flex-col">
              <label className="py-1" htmlFor="bank">
                Bank Type
              </label>
              <select className="py-2 px-2 border border-blue-200" id="bank">
                <option name="bkash">bKash</option>
                <option name="nagad">Nagad</option>
                <option name="rocket">Rocket</option>
                <option name="upay">Upay</option>
              </select>
            </div>
            {/* Confirm */}
            <div className="flex flex-col">
              <label className="py-1">Submit</label>
              <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 duration-300">
                Confirm
              </button>
            </div>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>
      </>
    </div>
  );
};

export default Balance;
