import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";
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

const Update = ({post}) => {
 

  // React Select

  const animatedComponents = makeAnimated();
  // categories
  // category update
  const [updateCat,setUpdateCat] = useState(false)
  // Category
  const [categories, setCategories] = useState([]);
  // Category load from db
  const [category, setCategory] = useState(post.categories || []);
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, [updateCat,post]);

  // categories end
// post body
  const [postBody, setPostBody] = useState(post?.body||'');
  

// handle featured image

// Photo upload 
const [featuredImage, setFeaturedImage] = useState(post.featured_image || '');

// Uploading...
const [uploadLoad, setUploadPhoto] = useState(false);
// photo upload error
  const [error, setError] = useState("");
// handle upload
const handlePhotoUpload = (data) => {
  setUploadPhoto(true);
  const photo = data;
  const photoData = new FormData();
  photoData.append("file", photo);
  photoData.append("upload_preset", "simpleblog");
  photoData.append("cloud_name", "dl1cxduy0");
  fetch("https://api.cloudinary.com/v1_1/dl1cxduy0/image/upload", {
    method: "POST",
    body: photoData,
  })
    .then((resp) => resp.json())
    .then((photoData) => {
      const photoUrl = photoData.secure_url;
      setFeaturedImage(photoUrl);
      setUploadPhoto(false);
      setError('')
    })
    .catch(err=>{
      setError(err.message)

    })
};

// handle featured image end




// publish btn
const [publishBtn,setPublishBtn] = useState('Update')

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

const handlePostUpdate = () =>{
//   setPostLoading(true)
  setPublishBtn('Updating...')
  const postData = {
    title: postTitle,
    body: postBody,
    slug: postTitle.split(' ').join('-'),
    categories: categories,
    description: removeTags(postBody),
    postId:post.postId,
    featured_image: featuredImage,
    lastUpdate: new Date(),
  }
  
  axios.put('/api/post/update',postData)
  .then(res=>{
    console.log(res.data)
    setPostLoading(false)
    setPublishBtn('Updated')
    // router.push(`/blog/${post?.postId}`)
  }).catch(err=>{
    setPublishBtn('Try Again')
    setPostLoading(false)
  })

}



  // error handling
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
    <div className="flex justify-center items-center">
      {
        post.postId ?
        'Loading...'
        :
         <div className="md:flex  container mx-auto">
        <div className="md:w-2/3 space-y-2">
          {/* Post title */}
          <div>
          <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Title</p>
           </div>
          <input defaultValue={post.title} onChange={(e)=>setPostTitle(e.target.value)} type="text" placeholder="Post Title" className="px-4 border py-2 w-full rounded" />
            </div>
          <div>
            {/* Post body */}
          <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Body</p>
           </div>
          <QuillNoSSRWrapper
            modules={modules}
            defaultValue={post.body}
            formats={formats}
            theme="snow"
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
           {
            category.length>0 ? <Select
              className="p-3  bg-transparent text-black"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              defaultValue={post.categories}
              onChange={(e) => setCategories(e)}
              options={category}
            />
            :
            <div className="flex justify-center">
              <button className="bg-base-200 px-4 py-2" onClick={()=>setUpdateCat(!updateCat)}>Reload Category</button>
            </div>
           }
            
          </div>
          {/* Featured Image */}
          <div className="bg-base-100 border">
           <div className="bg-base-200 px-4 py-2">
           <p className="font-bold">Featured Image</p>
           </div>
           <div className="relative">{
           }
            { featuredImage?.length === 0 ?  uploadLoad ? <span className="py-32 flex justify-center relative">Uploading... <button onClick={()=>setUploadPhoto(false)} className="absolute right-1 top-1 bg-error rounded-full px-4 py-2">X</button></span> : <span className="underline text-blue-500 flex items-center justify-center">
             <label htmlFor="image" className="py-32 px-[23%] relative">
             <input defaultValue={post?.featured_image} hidden id="image" onChange={(e)=>handlePhotoUpload(e.target.files[0])} type="file" className=""  />
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
          <div className="flex justify-between px-4 py-2 ">
            <button onClick={()=>setEditId('')} className="px-4 hover:bg-opacity-80 py-2 my-4 bg-error disabled:bg-indigo-100 text-black disabled:cursor-not-allowed">Close</button>
            <button onClick={()=>handlePostUpdate()} disabled={postTitle?.length<30 || categories?.length===0 || featuredImage?.length===0 || postBody?.length<300} className="px-4 hover:bg-opacity-80 py-2 my-4 bg-warning disabled:bg-indigo-100 text-black disabled:cursor-not-allowed">{publishBtn}</button>
          </div>
          </div>
        </div>
      </div>
      }
       
    </div>
    )
  );
};

export default Update;
