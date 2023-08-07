import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { UserContext } from "../../../context/ContextProvider";
import SingleCategory from "./SingleCategory";

const Categories = () => {
  // get user
  const { user } = useContext(UserContext);
  // loading
  const [loading, setLoading] = useState(true);
  // get all categories
  const [categories, setCategories] = useState([]);
  //
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`).then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {!user?.email ? (
        <div className="bg-base-100 overflow-y-auto h-full ">
          <h2 className="bg-base-200 px-4 py-2 border-b my-2 flex items-center gap-2">
            <span>
              <TbCategory />
            </span>
            Catgegories
          </h2>
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
      ) : (
        ""
      )}
    </>
  );
};

export default Categories;
