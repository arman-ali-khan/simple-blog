import axios from "axios";
import { useEffect, useState } from "react";
import SingleCategory from "./SingleCategory";

const UserCategories = () => {
  // loading
  const [loading, setLoading] = useState(true);
  // get all categories
  const [categories, setCategories] = useState([]);
  //
  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories`).then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className="bg-base-100 overflow-y-auto h-full  px-2">
        <h2 className="bg-base-200 px-4 py-2 border-b my-2">Catgegories</h2>
        <div className="">
          <ul className="mb-12">
            {loading
              ? [...Array(30).keys()].map((item, i) => (
                  <div key={i} className="flex w-full mt-1">
                    <div className="w-full bg-base-300 animate-pulse h-8 border-b "></div>
                  </div>
                ))
              : categories.map((category) => (
                  <SingleCategory key={category.id} category={category} />
                ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserCategories;