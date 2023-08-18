import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextProvider";
import UserCategories from "./UserCategories";

const Categories = () => {
  // get user
  const { user } = useContext(UserContext);
  // loading
  const [loading, setLoading] = useState(true);
  // get all categories
  const [categories, setCategories] = useState([]);
  //
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <UserCategories />
    </>
  );
};

export default Categories;
