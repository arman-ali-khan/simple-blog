import axios from "axios";
import { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";

const Categories = () => {
    // loading
    const [loading,setLoading] = useState(true)
    // get all categories
    const [categories, setCategories] = useState([])
    //
    useEffect(()=>{
        axios.get(`/api/category`)
        .then(res=>{
            setCategories(res.data);
            setLoading(false)
        })
    },[])
    return (
             <div className="bg-base-100 overflow-y-auto h-full px-2">
    <h2 className="bg-base-200 px-4 py-2 rounded">Catgegories</h2>
    <div className="">
        <ul>
            { loading ? 
            [...Array(30).keys()].map((item,i)=><div key={i} className="flex w-full mt-1">
            <div className="w-full bg-base-300 animate-pulse h-8 border-b rounded"></div>
        </div>)
            :
                categories.map(category => <SingleCategory key={category._id} category={category} />)
            }
           
        </ul>
    </div>
    </div>
    );
};

export default Categories;