import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../context/ContextProvider";

import axios from "axios";
import { useRouter } from "next/router";
import makeAnimated from "react-select/animated";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const Create = () => {
  // context
  const {user} = useContext(UserContext)
  
  // router
  const router = useRouter()
  
  // React Select

  const animatedComponents = makeAnimated();
  // categories
  // Category
  const [categories, setCategories] = useState([]);
  console.log(categories);
  // Category load from db
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, []);

  // categories end
// post body
  const [postBody, setPostBody] = useState("");
  



// upload btn
const [uploadBtn,setUploadBtn] = useState('Upload')
// upload image
const [uploading,setUploading] = useState(false)
const [selectedImage,setSelectedImage] = useState('')
const [selectedFile,setSelectedFile] = useState('')
console.log(selectedFile);

const [getUrl,setUrl] = useState('')
const handleUpload = async () =>{
  setUploading(true)
  setUploadBtn('Uploading...')
  try {
    if(!selectedFile) return;
    const formData = new FormData();
    formData.append('image', selectedFile);
    const {data} = await axios.post('/api/upload/photo',formData)
    console.log(data);
    setUploadBtn('Uploaded')
    setUrl(data.newFilename)
  } catch (error) {
    console.log(error.response?.data);
    setUploadBtn('Try again')
  }
  setUploading(false)
}
console.log(getUrl);
// upload image



// publish btn
const [publishBtn,setPublishBtn] = useState('Publish')

// post id
const postId = uuidv4().split('-')[0]

// post title
const [postTitle,setPostTitle] = useState('')
// posting
const [postLoading,setPostLoading] = useState(false)

// get desc

function removeTags(str) {
  if ((str===null) || (str===''))
      return false;
  else
      str = str.toString();
        
  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace( /(<([^>]+)>)/ig, '');
}

const handlePost = () =>{
  setPostLoading(true)
  setPublishBtn('Publishing...')
  const postData = {
    title: postTitle,
    body: postBody,
    categories: categories,
    description: removeTags(postBody),
    featured_image: `https://simple-blog-dun.vercel.app/images/${getUrl}`,
    date: new Date(),
    postId,
    email: user.email,
    view:0,
  }
  
  axios.post('/api/post/create',postData)
  .then(res=>{
    console.log(res.data)
    setPostLoading(false)
    setPublishBtn('Published')
    router.push(`/blog/${postId}`)
  }).catch(err=>{
    setPublishBtn('Try Again')
    setPostLoading(false)
    console.log(err);
  })

}



  // error handling
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <div className="md:flex gap-6 container mx-auto">
        <div className="md:w-2/3 space-y-2">
          {/* Post title */}
          <div>
          <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Title</p>
           </div>
          <input onChange={(e)=>setPostTitle(e.target.value)} type="text" placeholder="Post Title" className="px-4 border py-2 w-full rounded" />
            </div>
          <div>
            {/* Post body */}
          <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Body</p>
           </div>
          <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={postBody}
            onChange={setPostBody}
            placeholder="Write content form here"
            ></QuillNoSSRWrapper>
            </div>
        </div>
        <div className="md:w-1/3  space-y-2">
          {/* categories */}
          <div className="border bg-base-100">
           <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Categories</p>
           </div>
            <Select
              className="p-3  bg-transparent text-black"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={(e) => setCategories(e)}
              options={category}
            />
          </div>
          {/* Featured Image */}
          {/* <div className="bg-base-100 border">
           <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Featured Image</p>
           </div>
           <div className="relative">{
           }
            { featuredImage?.length === 0 ?  uploadLoad ? <span className="py-32 flex justify-center relative">Uploading... <button onClick={()=>setUploadPhoto(false)} className="absolute right-1 top-1 bg-error rounded-full px-4 py-2">X</button></span> : <span className="underline text-blue-500 flex items-center justify-center">
             <label htmlFor="image" className="py-32 px-[23%] relative">
             <input hidden id="image" onChange={(e)=>handlePhotoUpload(e.target.files[0])} type="file" className=""  />
             Click to upload
             
             </label>
            </span>
            :
            <div className="relative">
              <img className="w-full h-64 object-cover p-4" src={featuredImage} alt="" />
              <button onClick={()=>setFeaturedImage('')} className="absolute right-1 top-1 bg-error rounded-full px-4 py-2">X</button>
            </div>
             
            }
            <span>{error}</span>
           </div>
          </div> */}
          {/* Featured Image */}
          {/* <label>
     <input hidden type="file" />
     <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
{
  selectedImage ? (
    <img src={selectedImage} alt="" />
  ):
  (
    <span>Select Image</span>
  )
}
     </div>
     </label> */}
          <div className="bg-base-100 border">
           <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Featured Image</p>
           </div>
           <div className="relative">{
           }
            { selectedImage?.length === 0 ?  uploading ? <span className="py-32 flex justify-center relative">Uploading... <button onClick={()=>setUploading(false)} className="absolute right-1 top-1 bg-error rounded-full px-4 py-2">X</button></span> : <span className="underline text-blue-500 flex items-center justify-center">
             <label htmlFor="image" className="py-32 px-[23%] relative">
             <input hidden id="image" onChange={({target})=>{
      if(target.files){
        const file = target.files[0];
        setSelectedImage(URL.createObjectURL(file))
        setSelectedFile(file)
      }
     
     }}  type="file" className=""  />
             Click to upload
             
             </label>
            </span>
            :
            <div className="relative">
              <img className="w-full h-64 object-cover p-4" src={selectedImage} alt="" />
              <button onClick={()=>setSelectedImage('')} className="absolute right-1 top-1 bg-error rounded-full px-4 py-2">X</button>
            </div>
             
            }
            <button className="w-full px-4 py-2 bg-blue-300 mt-2 hover:bg-blue-100 text-black border" onClick={()=>handleUpload()} >{uploadBtn}</button>
           </div>
          </div>
          {/* Action */}
          <div className="bg-base-100 border">
           <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Publish</p>
           </div>
           <div className="px-2 py-1">
              <h3 className="font-bold">Post Publish Policy</h3>
             <ul className="mx-6">
             <li className="list-decimal">Hello WOrld</li>
              <li className="list-decimal">Hello WOrld</li>
              <li className="list-decimal">Hello WOrld</li>
              <li className="list-decimal">Hello WOrld</li>
             </ul>
            </div>
          <div className="flex justify-end px-4 py-2">
            
            <button onClick={()=>handlePost()} disabled={postTitle.length<30 || categories.length===0 || getUrl.length===0 || postBody.length<300} className="px-4 hover:bg-opacity-80 py-2 bg-warning disabled:bg-indigo-100 text-black disabled:cursor-not-allowed">{publishBtn}</button>
          </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Create;
