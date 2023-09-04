import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/ContextProvider";

const UpdateProfile = () => {
  // constext
  const { user, dbUser } = useContext(UserContext);

  // router
  const router = useRouter();

  // hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // get username length
  const [usernames, setUsernames] = useState([]);

  // loading
  const [loading, setLoading] = useState(false);

  // get username from input
  const [inputUserName, setInputUserName] = useState(dbUser.username);
  // check User name from mongodb
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/allusers?username=${inputUserName}`
      )
      .then((res) => {
        setUsernames(res.data);
        setLoading(false);
      });
  }, [inputUserName]);

  // update btn
  const [updateBTN, setUpdateBTN] = useState("Update");

  // handle submit
  const onSubmit = (data) => {
    setUpdateBTN("Updating...");
    const submitData = {
      ...data,
      email: user.email,
    };
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/users/${dbUser?.id}`,
        submitData,
        {
          headers: {
            authorization: `basic ${Cookies.get("token")}`,
            email: user.email,
          },
        }
      )
      .then((res) => {
        const result = res.data;
        if (result) {
          setUpdateBTN("Update Successful");
          router.push(`/user/${data.username}`);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        setUpdateBTN("Try again");
      });
  };

  // Uploading...
  const [uploadLoading, setUploadPhoto] = useState(false);

  // photo upload error
  const [error, setError] = useState("");

  const handlePhotoUpload = (data) => {
    const photo = data[0];
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

        axios
          .put(
            `${process.env.NEXT_PUBLIC_API_PRO}/api/users/${dbUser?.id}`,
            { photo: photoUrl },
            {
              headers: {
                authorization: `basic ${Cookies.get("token")}`,
                email: user.email,
              },
            }
          )
          .then((res) => {
            setUploadPhoto(false);
            setError("");
            toast.success('Photo updated')
            router.push(`/user/${dbUser.username}`);
          })
          .catch((err) => {
            toast.error("Error While Uploading");
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="flex justify-center ">
      <div className="border">
        <div className="mx-5">
          <div>
            <div className="w-full bg-base-300 px-4 py-2">
              <p className="text-xl text-center">Update Photo</p>
            </div>
            <div className="flex flex-col">
              {/* Update photo */}
              <input
                onChange={(e) => handlePhotoUpload(e.target.files)}
                className="file-input my-2 file-input-warning file-input-bordered"
                type="file"
              />
              {error ||
                (uploadLoading && (
                  <button className="my-2 py-2 inline-block">
                    {error
                      ? "Error While Uploading"
                      : uploadLoading
                      ? "Uploading..."
                      : ""}
                  </button>
                ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-6">
              <h1 className="text-xl py-2 bg-base-300">Update Profile</h1>
              <div className="flex flex-col">
                <label>
                  Name <span>*</span>
                </label>
                <input
                  defaultValue={dbUser?.fullName}
                  {...register("fullName", { required: true })}
                  className="px-4 py-2 border"
                  placeholder="Name"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label>
                  Username <span>*</span>
                </label>
                <div className="relative w-full">
                  <input
                    defaultValue={dbUser?.username}
                    onChangeCapture={(e) => setInputUserName(e.target.value)}
                    {...register("username", { required: true })}
                    className="px-4 py-2 border w-full"
                    placeholder="my_username"
                    type="text"
                  />
                  {inputUserName?.length ? (
                    usernames?.length && dbUser?.username !== inputUserName ? (
                      <span className="absolute right-0 px-2 z-30 top-2 text-error">
                        {loading ? "Loading..." : "Not OK"}
                      </span>
                    ) : (
                      <span className="absolute right-0 px-2 z-30 top-2 text-success">
                        {loading ? "Loading..." : "OK"}
                      </span>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label>About Yourself</label>
                <textarea
                  defaultValue={dbUser?.about}
                  {...register("about", { required: false })}
                  className="px-4 py-2 border"
                  placeholder="I am a programmer"
                />
              </div>
              <div className="flex flex-col">
                <label>Education</label>
                <input
                  defaultValue={dbUser?.education}
                  {...register("education", { required: false })}
                  className="px-4 py-2 border"
                  placeholder="Graduated"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label>Work</label>
                <input
                  defaultValue={dbUser?.work}
                  {...register("work", { required: false })}
                  className="px-4 py-2 border"
                  placeholder="Works at Discord"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label>Your FB Profile</label>
                <input
                  defaultValue={dbUser?.fbId}
                  {...register("fbId", { required: false })}
                  className="px-4 py-2 border"
                  placeholder="https://fb.com/id"
                  type="url"
                />
              </div>
              <div className="flex flex-col">
                <label>Your Discord ID</label>
                <input
                  defaultValue={dbUser?.discord}
                  {...register("discord", { required: false })}
                  className="px-4 py-2 border"
                  placeholder="@armankhan"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label>Gender</label>
                <select
                  defaultValue={dbUser?.gender}
                  className="px-4 py-2 border"
                  {...register("gender", { required: true })}
                  id="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label>Phone</label>
                <input
                  defaultValue={dbUser?.phone}
                  {...register("phone", { required: false })}
                  className="px-4 py-2 border"
                  placeholder="+8801xxxx"
                  type="text"
                />
              </div>
              <button
                disabled={
                  (usernames.length || loading) &&
                  dbUser.username !== inputUserName
                }
                className="w-full disabled:bg-gray-400 my-2 bg-blue-400 text-white border px-4 py-2  hover:bg-blue-500"
              >
                {updateBTN}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
