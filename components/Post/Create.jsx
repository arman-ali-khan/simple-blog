import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
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
  const { user } = useContext(UserContext);

  // dbUser
  const [dbUser, setDbUser] = useState({});
  console.log(dbUser);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${user?.email}`)
        .then((res) => {
          setDbUser(res.data);
        });
    }
  }, [user?.email]);

  // router
  const router = useRouter();

  // React Select

  const animatedComponents = makeAnimated();
  // categories
  // category update
  const [updateCat, setUpdateCat] = useState(false);
  // Category
  const [categories, setCategories] = useState([]);
  console.log(categories);
  // Category load from db
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  }, [updateCat]);

  // categories end
  // post body
  const [postBody, setPostBody] = useState("");

  // handle featured image

  // Photo upload
  const [featuredImage, setFeaturedImage] = useState("");

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
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // handle featured image end

  // publish btn
  const [publishBtn, setPublishBtn] = useState("Publish");

  // post id
  const postId = uuidv4().split("-")[0];

  // post title
  const [postTitle, setPostTitle] = useState("");
  // posting
  const [postLoading, setPostLoading] = useState(false);

  // get desc

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const handlePost = () => {
    setPostLoading(true);
    setPublishBtn("Publishing...");
    const postData = {
      title: postTitle,
      body: JSON.stringify(postBody),
      categories: JSON.stringify(categories),
      description: removeTags(postBody),
      featured_image: featuredImage,
      date: new Date(),
      email: user.email,
      username: dbUser.username,
      view: 0,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts`, postData)
      .then((res) => {
        setPostLoading(false);
        setPublishBtn("Published");
        router.push(`/user/${dbUser.username}`)
      })
      .catch((err) => {
        setPublishBtn("Try Again");
        setPostLoading(false);
      });
  };

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
            <input
              onChange={(e) => setPostTitle(e.target.value)}
              type="text"
              placeholder="Post Title"
              className="px-4 border py-2 w-full rounded"
            />
          </div>
          <div>
            {/* Post body */}
            <div className="bg-base-200 px-4 py-2">
              <p className="font-bold">Body</p>
            </div>
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              className="dark:text-teal-500 "
              theme="snow"
              value={postBody}
              onChange={setPostBody}
              placeholder="Start from here..."
            ></QuillNoSSRWrapper>
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
                    <label htmlFor="image" className="py-32 px-[23%] relative">
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
                <li className="list-decimal">Hello WOrld</li>
                <li className="list-decimal">Hello WOrld</li>
                <li className="list-decimal">Hello WOrld</li>
                <li className="list-decimal">Hello WOrld</li>
              </ul>
            </div>
            <div className="flex justify-end px-4 py-2">
              <button
                onClick={() => handlePost()}
                disabled={
                  postTitle.length < 30 ||
                  categories.length === 0 ||
                  featuredImage.length === 0 ||
                  postBody.length < 300
                }
                className="px-4 hover:bg-opacity-80 py-2 bg-warning disabled:bg-indigo-100 text-black disabled:cursor-not-allowed"
              >
                {publishBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Create;
