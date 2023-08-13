import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextProvider";
import AboutAuthor from "../../User/AboutAuthor/AboutAuthor";
import Related from "../Blogs/Related/Related";

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
      {user.email ? <AboutAuthor /> : ""}
      <Related />
    </>
  );
};

export default Categories;
