"use client";
import axios from "axios";
import parse from 'html-react-parser';
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../../../../context/ContextProvider";
import AdminLayout from "../../../../layout/AdminLayout";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

function index({data}) {
    const hadith = data?.length && data[0]
  // context
  const { user, dbUser, logOut } = useContext(UserContext);
// console.log(hadith?.content,'hadith')
  // source
  const [source, setSource] = useState("");
  const [name, setName] = useState("");

  const [value, setValue] = useState('');


  // loading
  const [loading, setLoading] = useState(false);
  // handle create
  const handleCreate = () => {
    setLoading(true);
    const data = {
      content: value,
      likes: 0,
      source: source,
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PRO}/api/hadith`, data, {
        headers: {
          authorization: `Basic ${Cookies.get("token")}`,
          email: user.email,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      });
  };

  return (
    <AdminLayout title={"Create New Hadith"}>
      <div className="flex px-3 flex-col w-full">
        <div className="md:flex items-center py-2 w-full justify-between gap-3">
          <div className="w-full">
            <h2 className="text-xl">Name</h2>
            <input defaultValue={hadith?.name}
              onChange={(e) => setName(e.target.value)}
              type="input"
              className="px-4 w-full py-2 border"
            />
          </div>
          <div className="w-full">
            <h2 className="text-xl">Source</h2>
            <input defaultValue={hadith?.source}
              onChange={(e) => setSource(e.target.value)}
              type="url"
              className="px-4 w-full py-2 border"
            />
          </div>
        </div>
        <code className="bg-base-300 text-black px-4">
            {parse(hadith?.content)}
        </code>
        <ReactQuill 
          className="container h-96"
          theme="snow"
          value={value}
          onChange={setValue}
        />
        <div className="mt-12">
          <button
            onClick={() => handleCreate()}
            className="px-4 py-2 rounded-full border border-orange-400"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

export default index;
export async function getServerSideProps(context) {
    const { editId } = context.query;

    try {
      // Fetch data from external API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/hadith/${editId}`)
      const data = await res.json()
     
      // Pass data to the page via props
      return { props: { data } }
    } catch (error) {
    return console.error(error);
    }
   }
