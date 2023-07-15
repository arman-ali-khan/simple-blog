import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
    // get all categories
    const [categories, setCategories] = useState([])
    //
    useEffect(()=>{
        axios.get(`https://blog-server-sparmankhan.vercel.app/category`)
        .then(res=>{
            setCategories(res.data);
        })
    },[])
    return (
             <div className="bg-base-100 overflow-y-auto h-full px-2">
    <h2 className="bg-base-200 px-4 py-2 rounded">Catgegories</h2>
    <div className="">
        <ul>
            {
                categories.map(category => <li key={category._id} className="border-b flex items-center">
                <Link className="hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500 w-full flex px-3 py-2" href={`/category/${category.value}`}>{category.label} </Link> <span>(10)</span>
            </li>)
            }
           
        </ul>
    </div>
    </div>
    );
};

export default Categories;