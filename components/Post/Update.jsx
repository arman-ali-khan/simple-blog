import axios from "axios";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { UserContext } from "../../context/ContextProvider";
import PrivateRoute from "../../hooks/PrivateRouters/PrivateRoute";
import Loader from "../../lib/Loader";
const CKFullEditor = dynamic(import("rc-ckfulleditor"), {
  ssr: false,
  loading: () =><div className="fixed top-0 left-0 w-screen h-screen z-[999]  backdrop-blur-3xl">
  <Loader />
  </div>,
});

const Update = ({ post }) => {
  // context
  const { user, dbUser, logOut } = useContext(UserContext);



  // router
  const router = useRouter();


    // access for only authorized user
    if(user?.email !== post?.email && dbUser?.type!=='admin'){
      
      router.push('/')
     return toast.error("Your can't access this post")
    }

  // confirm
  const [unsavedChanges,useUnsavedChange] = useState(false) 

  // React Select

  const animatedComponents = makeAnimated();

  // categories
  // category update
  const [updateCat, setUpdateCat] = useState(false);
  // Category
  const [categories, setCategories] = useState(JSON.parse(post.categories));
  // Category load from db
  const [category, setCategory] = useState(JSON.parse(post.categories));
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, [updateCat]);

  // categories end

  // post body
  const editor = useRef(null);
  const [content, setContent] = useState(JSON.parse(post.body));
  // handle featured image

  // Photo upload
  const [featuredImage, setFeaturedImage] = useState(post.featured_image);

  // Uploading...
  const [uploadLoad, setUploadPhoto] = useState(false);
  // photo upload error
  const [error, setError] = useState("");

  // posting
  const [postLoading, setPostLoading] = useState(false);

  // handle upload
  const handlePhotoUpload = (data) => {
    const photo = data;
    useUnsavedChange(false)
    if (photo.size > 2097152) {
      return toast.error("Too Large File, Max Upload Limit 2 MB");
    }
    setUploadPhoto(true);
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
        useUnsavedChange(false)
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // publish btn
  const [publishBtn, setPublishBtn] = useState("Update");

  // post title
  const [postTitle, setPostTitle] = useState(post.title);
  // posting
  const [updating, setUpdating] = useState(false);

  // get desc
  // remove tags from description
  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }
// chenge body
const handleChangeBody = () =>{
  useUnsavedChange(true)
}

  // date
  const now = new Date();
  const isoString = now.toISOString();

  // ======================
  // create post
  const handlePost = () => {
    setPostLoading(false);
    useUnsavedChange(false)
    setPublishBtn("Updating...");
    const postData = {
      title: postTitle,
      body: JSON.stringify(content),
      categories: JSON.stringify(categories),
      description: removeTags(content),
      featured_image: featuredImage,
      date: isoString,
      email: post.email,
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/posts/update/${post.id}`,
        postData,
        {
          headers: {
            authorization: `Basic ${Cookies.get("token")}`,
            email: user.email,
          },
        }
      )
      .then((res) => {
        setPostLoading(false);
        setPublishBtn("Post Updated");
        router.push(`/blog/${post.id}`);
      })
      .catch((err) => {
        setPublishBtn("Try Again");
        setPostLoading(false);
        useUnsavedChange(false)
        if (err.response?.status === 401) {
          toast.error("You may not update other users' posts");
          router.push(`/`);
        }
      });
  };

  // ======================



// page leave warning


const warningText =
  'You have unsaved changes - are you sure you wish to leave this page?'

useEffect(() => {
  const handleWindowClose = (e) => {
    if (!unsavedChanges) return
    e.preventDefault()
    return (e.returnValue = warningText)
  }
  const handleBrowseAway = () => {
    if (!unsavedChanges) return
    if (window.confirm(warningText)) return
    router.events.emit('routeChangeError')
    throw 'routeChange aborted.'
  }
  window.addEventListener('beforeunload', handleWindowClose)
  router.events.on('routeChangeStart', handleBrowseAway)
  return () => {
    window.removeEventListener('beforeunload', handleWindowClose)
    router.events.off('routeChangeStart', handleBrowseAway)
  }
}, [unsavedChanges])

  // error handling
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <PrivateRoute>
        <div className="md:flex gap-6 container mx-auto">
          <div className="md:w-2/3 space-y-2">
            {/* Post title */}
            <div>
              <div className="bg-base-200 px-4 py-2">
                <p className="font-bold">Title</p>
              </div>
              <input
                defaultValue={post.title}
                onChange={(e) => setPostTitle(e.target.value)}
                type="text"
                onChangeCapture={()=>handleChangeBody()}
                placeholder="Post Title"
                className="px-4 border py-2 w-full rounded"
              />
            </div>
            <div>
              {/* Post body */}
              <div className="bg-base-200 px-4 py-2">
                <p className="font-bold">Body</p>
              </div>
              <CKFullEditor
                data={JSON.parse(post.body)}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                  handleChangeBody()
                }}
                config={{
                  // ...Ckeditor config
                  cloudinary: {
                    cloudName: "dl1cxduy0",
                    uploadPreset: "simpleblog",
                  },
                }}
              />
            </div>
          </div>
          <div className="md:w-1/3  space-y-2">
            {/* categories */}
            <div className="border bg-base-100">
              <div className="bg-base-200 px-4 py-2">
                <p className="font-bold">Categories</p>
              </div>
              {category.length > 0 ? (
                <Select
                  defaultValue={JSON.parse(post.categories)}
                  className="p-3  bg-transparent text-black"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  onChange={(e) => setCategories(e)}
                  options={category}
                />
              ) : (
                <div className="flex justify-center">
                  <button
                    className="bg-base-200 px-4 py-2"
                    onClick={() => setUpdateCat(!updateCat)}
                  >
                    Reload Category
                  </button>
                </div>
              )}
            </div>
            {/* Featured Image */}
            <div className="bg-base-100 border">
              <div className="bg-base-200 px-4 py-2">
                <p className="font-bold">Featured Image</p>
              </div>
              <div className="relative">
                {}
                {featuredImage?.length === 0 ? (
                  uploadLoad ? (
                    <span className="py-32 flex justify-center relative">
                      Uploading...{" "}
                      <button
                        onClick={() => setUploadPhoto(false)}
                        className="absolute right-1 top-1 bg-error rounded-full px-4 py-2"
                      >
                        X
                      </button>
                    </span>
                  ) : (
                    <span className="underline text-blue-500 flex items-center justify-center">
                      <label
                        htmlFor="image"
                        className="py-32 px-[23%] relative"
                      >
                        <input
                          hidden
                          id="image"
                          onChange={(e) => handlePhotoUpload(e.target.files[0])}
                          type="file"
                          className=""
                        />
                        Click to upload
                      </label>
                    </span>
                  )
                ) : (
                  <div className="relative">
                    <img
                      className="w-full h-64 object-cover p-4"
                      src={featuredImage}
                      alt=""
                    />
                    <button
                      onClick={() => setFeaturedImage("")}
                      className="absolute right-1 top-1 bg-error rounded-full px-4 py-2"
                    >
                      X
                    </button>
                  </div>
                )}
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
                  <li className="list-decimal">
                    পোষ্ট এর সাথে সম্পুর্কযুক্ত ক্যাটাগরী/ফিচারড ইমেজ/ট্যাগ
                    ব্যবহার করুন
                  </li>
                  <li className="list-decimal">কপিপেষ্ট পরিহার করুন।</li>
                  {/* <li className="list-decimal">কেউ কপিপেষ্ট করেছে এমন প্রমান পেলে সাথে সাথে ট্রেইনার থেকে তাকে বাতিল করা হবে</li> */}
                  <li className="list-decimal">
                    পোষ্ট এর একেবারে শেষ ছাড়া কোথাও পোষ্ট দাতার সাইট লিংক থাকতে
                    পারবে না
                  </li>
                  <li className="list-decimal">
                    এপ/গেম এর রিভিও দিলে এপ/গেম ডাওনলোড এর ডাইরেক্ট লিংক দিতে
                    হবে এবং বিস্তারিত পোষ্ট+স্ক্রিনশট দিতে হবে
                  </li>
                </ul>
              </div>
              <div className="flex justify-end px-4 py-2">
                <button
                  onClick={() => handlePost()}
                  // disabled={
                  //   postTitle.length < 30 ||
                  //   categories.length === 0 ||
                  //   featuredImage.length === 0 ||
                  //   content.length < 300
                  // }
                  className="px-4 hover:bg-opacity-80 py-2 bg-warning disabled:bg-indigo-100 text-black disabled:cursor-not-allowed"
                >
                  {publishBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </PrivateRoute>
    )
  );
};

export default Update;
