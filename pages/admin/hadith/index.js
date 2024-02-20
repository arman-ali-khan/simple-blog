import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/ContextProvider";
import AdminLayout from "../../../layout/AdminLayout";
const moment  = require('moment')


function index() {
   // user
   const {user } = useContext(UserContext)
  const [getPosts, setGetPosts] = useState({});
  // get post loading
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [count,setCount] = useState(null)
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setLoadingBlog(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/hadith?page=${currentPage}&limit=12`
      )
      .then((res) => {
        setGetPosts(res.data?.hadith);
        setLoadingBlog(false);
      });
  }, [currentPage,loading]);

  const count = Math.ceil((getPosts?.count || 1) / 10);

  // handle delete
  const handleDelete = id =>{
    setLoading(true)
    axios.delete(`${process.env.NEXT_PUBLIC_API_PRO}/api/hadith/${id}`,{
      headers:{
        authorization: `Basic ${Cookies.get('token')}`,
        email : user?.email
      }
    })
    .then(res=>{
      console.log(res.data)
      toast.success('Deleted')
      setLoading(false)
    })
    .catch(err=>{
      console.error(err);
      setLoading(false)
      toast.error(err?.message)
    })
  }
  return (
    <AdminLayout title={"Hadith"}>
      <div class="flex w-full min-w-96 max-w-full min-h-44">
        <div class="overflow-x-auto w-full">
          <table class="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr class="bg-blue-gray-100 text-gray-700">
                <th class="py-3 px-4 max-w-14 overflow-hidden text-left ">
                  Name{" "}
                  <Link
                    className="px-4 py-2 border border-orange-400 rounded-full my-2 inline-block"
                    href={"/admin/hadith/add"}
                  >
                    Create
                  </Link>
                </th>
                <th class="py-3 px-4 text-left">Hadith</th>
                <th class="py-3 px-4 text-left">Date</th>
                <th class="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody class="text-blue-gray-900">
              {loadingBlog ? 'Loading...':
                getPosts?.length && getPosts?.map((hadith, i) => {
                return (
                  <tr key={i} class="border-b border-blue-gray-200">
                    <td
                      class="py-3 px-4 max-w-56 min-w-24 w-44 truncate"
                      title={hadith?.name}
                    >
                      {hadith?.name}
                    </td>
                    <td class="py-3 max-w-14 px-4 truncate h-12"> {(hadith?.content.replace(/<\/?[^>]+>/gi, '')
)}</td>
                    <td class="py-3 max-w-14 px-4">{moment(hadith?.createdAt).fromNow()}</td>
                    <td class="py-3 max-w-14 flex items-center gap-1 px-4">
                      <Link
                        href={`/admin/hadith/edit/${hadith?.id}`}
                        class="font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>
                      <button onClick={()=>handleDelete(hadith?.id)} className="btn btn-sm text-rose-600 bg-rose-100">{loading?'Deleting...':'Delete'}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default index;
