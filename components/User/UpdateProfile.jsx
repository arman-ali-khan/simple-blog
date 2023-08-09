import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/ContextProvider";

const UpdateProfile = () => {
  // constext
  const { user,dbUser } = useContext(UserContext);

 
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
  const [inputUserName, setInputUserName] = useState("");
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
      email: user.email
    };
    console.log(submitData);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_PRO}/api/users/${dbUser?.id}`,
        submitData
      )
      .then((res) => {
        const result = res.data;
        if (result) {
          setUpdateBTN("Update Successful");
        }
      })
      .catch((err) => {
        console.log(err);
        setUpdateBTN("Try again");
      });
  };
  return (
    <div>
      <div>
        <div className="text-center">
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-96 border p-6"
            >
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
                  {inputUserName.length ? (
                    usernames.length ? (
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
                disabled={usernames.length || loading}
                className="w-full disabled:bg-gray-400 my-2 border px-4 py-2 bg-base-300 hover:bg-base-100"
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
