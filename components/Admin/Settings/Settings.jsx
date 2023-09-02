import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UserContext } from "../../../context/ContextProvider";

const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

// context
const {user,settings} = useContext(UserContext)


  // upload logo

  

  // Photo upload
  const [logo, setLogo] = useState(settings?.logo);

  // Uploading...
  const [uploadLoadLogo, setUploadPhotoLogo] = useState(false);
  // photo upload error
  const [error, setError] = useState("");

  // handle upload
  const handleLogoUpload = (data) => {
    const photo = data;

    if (photo.size > 2097152) {
      return toast.error("Too Large File, Max Upload Limit 2 MB");
    }
    setUploadPhotoLogo(true);
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
        setLogo(photoUrl);
        setUploadPhotoLogo(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // handle logo end
  // =================
  // upload thumbnail


  // Thumb upload ===============
  const [thumb, setThumb] = useState(settings?.thumbnail);

  // Uploading...
  const [uploadLoadThumb, setUploadPhotoThumb] = useState(false);
  // photo upload error
  const [errorThumb, setErrorThumb] = useState("");

  // handle upload
  const handleThumbUpload = (data) => {
    const photo = data;

    if (photo.size > 2097152) {
      return toast.error("Too Large File, Max Upload Limit 2 MB");
    }
    setUploadPhotoThumb(true);
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
        setThumb(photoUrl);
        setUploadPhotoThumb(false);
        setErrorThumb("");
      })
      .catch((err) => {
        setErrorThumb(err.message);
      });
  };
// =================


// submit loading 
const [subLoading,setSubLoading] = useState(false)

  const handleSubmitData = data =>{
    setSubLoading(true)
    const settingsData = {
      title: data.title,
    logo: logo,
    description: data.description,
    primaryColor: data.primaryColor,
    maintenance: data.maintenance ? 1 : 0,
    registerDisabled:  data.registerDisabled ? 1 : 0,
    loginDisabled:  data.loginDisabled ? 1 : 0,
    poinSystem:  data.pointSystem ? 1 : 0,
    thumbnail: thumb,
    ads:  data.ads ? 1 : 0
  }
  console.log(data)
  axios.put(`${process.env.NEXT_PUBLIC_API_PRO}/api/settings`,settingsData,{
    headers:{
      authorization: `basic ${Cookies.get('token')}`,
      email: user.email
    }
  })
  .then(res=>{
     setSubLoading(false)
    toast.success('Settings Updated')
    console.log(res.data)
   }).catch(err=>{
    setSubLoading(false)
    toast.error('Try Again')
   })
  }


  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="w-96 flex flex-col space-y-2">
      <div className="flex flex-col w-full">
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: false })}
          type="text"
          placeholder="title"
          defaultValue={settings?.title}
          id="title"
          className="input input-bordered input-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="description">Description</label>
        <textarea
        defaultValue={settings?.description}
          {...register("description", { required: false })}
          placeholder="description"
          id="description"
          className="textarea textarea-bordered textarea-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="logo">Logo</label>
        {
          uploadLoadLogo ? 'Uploading...':<div className="relative">
            <img
          className="h-auto w-20"
          src={logo || 'https://blog.arman.top/favicon.svg'}
          alt=""
        />
        <span onClick={()=>setLogo('')} className="px-2 cursor-pointer rounded-full bg-error text-white absolute right-0 top-0">X</span>
          </div>
        }
        
        <input
             onChange={(e) => handleLogoUpload(e.target.files[0])}
          type="file"
          placeholder="Logo"
          id="logo"
          className="file-input file-input-bordered file-input-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="thumbnail">Thumbnail</label>
       {
        uploadLoadThumb ? 'Uploading...': <div className="relative">
          <img
        className="h-12"
        src={thumb || 'https://blog.arman.top/favicon.svg'}
        alt=""
      />
      <span onClick={()=>setThumb('')} className="absolute cursor-pointer right-0 px-2 rounded-full flex top-0 bg-error text-white">X</span>
        </div>
       }
        <input
            onChange={(e) => handleThumbUpload(e.target.files[0])}
          type="file"
          placeholder="thumbnail"
          id="thumbnail"
          className="file-input file-input-bordered file-input-sm rounded"
        />
      </div>
      {/* Primary Color */}
      <div className="flex flex-col w-full">
        <label htmlFor="primaryColor">Primary Color</label>
        <input
          {...register("primaryColor", { required: true })}
          type="text"
          defaultValue={settings?.primaryColor}
          placeholder="primaryColor"
          id="primaryColor"
          className="input input-bordered input-sm rounded"
        />
      </div>
      {/* Maintenance */}
      <div className="flex flex-col w-full">
        <label htmlFor="maintenance">Maintenance</label>
        <label className="flex items-center gap-3" htmlFor="maintenanceYes">
        <input
          {...register("maintenance", { required: false })}
          defaultChecked={settings?.maintenance}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="maintenanceYes"
          />{" "}
          Yes
        </label>

      </div>
      {/* Register Disabled */}
      <div className="flex flex-col w-full">
        <label >Register Disabled</label>
        <label className="flex items-center gap-3" htmlFor="registerDisabled">
          <input
          {...register("registerDisabled", { required: false })}
          defaultChecked={settings?.registerDisabled}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="registerDisabled"
          />{" "}
          Yes
        </label>
      </div>
      {/* Login */}
      <div className="flex flex-col w-full">
        <label>Login Disabled</label>
        <label className="flex items-center gap-3" htmlFor="loginYes">
          <input
          {...register("loginDisabled", { required: false })}
          defaultChecked={settings?.loginDisabled}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="loginYes"
          />{" "}
          Yes
        </label>
      </div>
{/* Point System */}
      <div className="flex flex-col w-full">
        <label htmlFor="pointSystem">Point System</label>
        <label className="flex items-center gap-3" htmlFor="pointSystemYes">
          <input
          {...register("pointSystem", { required: false })}
            defaultChecked={settings?.poinSystem}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="pointSystemYes"
          />{" "}
          Yes
        </label>

      </div>
      {/* ADs */}
      <div className="flex flex-col w-full">
        <label htmlFor="ads">ADs</label>
        <label className="flex items-center gap-3" htmlFor="adsYes">
          <input
          {...register("ads", { required: false })}
          defaultChecked={settings?.ads}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="adsYes"
          />{" "}
          Yes
        </label>
      </div>

      <button className="btn btn-sm">{subLoading ? 'Updating...':'Save'}</button>
    </form>
  );
};


export default Settings;
