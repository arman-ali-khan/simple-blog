import axios from "axios";
import { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";

const Categories = () => {
    // get all categories
    const [categories, setCategories] = useState([])
    //
    useEffect(()=>{
        axios.get(`/api/category`)
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
                categories.map(category => <SingleCategory key={category._id} category={category} />)
            }
           
        </ul>
    </div>
    </div>
    );
};

export default Categories;