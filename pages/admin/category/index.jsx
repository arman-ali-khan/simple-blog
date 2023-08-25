import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { UserContext } from "../../../context/ContextProvider";
import PrivateRoute from "../../../hooks/PrivateRouters/PrivateRoute";
import AdminRoute from "../../../hooks/useAdmin/AdminRoute";
import AdminLayout from "../../../layout/AdminLayout";

const index = () => {
  // delete loading
  const [loading, setLoading] = useState(false);
  // get all categories
  const [categories, setCategories] = useState([]);
  // fetch
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`)
      .then((res) => {
        setCategories(res.data);
      });
  }, [loading]);

  // get email
  const { dbUser } = useContext(UserContext);

  // delete category
  const handleDeleteCat = (id) => {
    setLoading(true);
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/category/${id}`, {
        headers: {
          authorization: `basic ${Cookies.get("token")}`,
          email: dbUser.email,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <AdminLayout title={"Categories"}>
      <PrivateRoute>
        <AdminRoute>
          <div className="flex justify-center w-full">
            <div className="w-96">
              <div className="w-full bg-base-300 flex items-center justify-between">
                <h1 className="px-4 text-base">Categories</h1>
                <Link
                  className="px-4 py-2 bg-base-200  hover:bg-base-100 duration-300"
                  href="/admin/category/create"
                >
                  <HiOutlinePencilSquare size={30} />
                </Link>
              </div>
              <div>
                <ul>
                  {categories.map((category) => {
                    return (
                      <li
                        key={category.id}
                        className="py-2 px-4 flex justify-between"
                      >
                        <Link
                          className="w-full relative inline-block"
                          href={`/admin/category/edit/${category.id}`}
                        >
                          {category.label}{" "}
                          <span className="bg-blue-300 rounded-full absolute px-2 bg-opacity-20 text-black text-xs">
                            eidt
                          </span>
                        </Link>
                        <button
                          onClick={() => handleDeleteCat(category.id)}
                          className="px-4 py-2 bg-error text-black"
                        >
                          {loading ? (
                            "Loading..."
                          ) : (
                            <HiOutlineTrash size={20} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </AdminRoute>
      </PrivateRoute>
    </AdminLayout>
  );
};

export default index;
