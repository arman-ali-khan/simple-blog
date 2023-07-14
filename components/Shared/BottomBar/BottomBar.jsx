
import Link from "next/link";
import { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { BiComment, BiUser } from "react-icons/bi";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import Categories from "../../../components/Home/Categories/Categories";

const BottomBar = () => {
    const [showCategory,setShowCategory] = useState(false)
    return (
        <div className="fixed md:hidden bottom-0 w-full bg-base-100">
            <div>
                <ul className="flex w-full justify-between items-center">
                    <li className="w-full">
                        <button onClick={()=>setShowCategory(!showCategory)} className="w-full py-3 bg-base-200 flex justify-center" href={'/'} ><HiOutlineMenuAlt1 size={24} /></button>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3 bg-base-200 flex justify-center" href={'/search'} ><RiSearch2Line size={24} /></Link>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3 bg-base-200 flex justify-center" href={'/'} ><AiOutlineHome size={24} /></Link>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3 bg-base-200 flex justify-center" href={'/'} ><BiComment size={24} /></Link>
                    </li>
                    <li className="w-full">
                        <Link className="w-full py-3 bg-base-200 flex justify-center" href={'/user/2'} ><BiUser size={24} /></Link>
                    </li>
                </ul>
            </div>
            {
                showCategory && <div className={` duration-300  ${showCategory ? 'left-0 fixed top-0':"-left-96 fixed top-0"} w-full bg-base-100`}>
                    <div className="h-screen">
                    <Categories />
                    </div>
                <div className="flex fixed bottom-0 w-full justify-between">
                    <div className="bg-base-200 w-full flex justify-center py-2 px-4">Categories</div>
                    <div onClick={()=>setShowCategory(!showCategory)} className="bg-error w-full flex justify-center py-2 px-4">Close</div>
                </div>
                </div>
            }
        </div>
    );
};

export default BottomBar;