import React from "react";
import { useForm } from "react-hook-form";

const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSubmitData = data =>{
   const settingsData = {
    title: data.title,
    logo: 'https://blog.arman.top/favicon.svg',
    description: data.description,
    primaryColor: data.primaryColor,
    maintenance: data.maintenance ? 1 : 0,
    registerDisabled:  data.registerDisabled ? 1 : 0,
    loginDisabled:  data.loginDisabled ? 1 : 0,
    poinSystem:  data.pointSystem ? 1 : 0,
    thumbnail: 'https://res.cloudinary.com/dcckbmhft/image/upload/v1684764279/nobinImage/eemiaamz1gvb4maalesb.png',
    ads:  data.ads ? 1 : 0
   }
   console.log(settingsData,data)
  }
  return (
    <form onSubmit={handleSubmit(handleSubmitData)} className="w-96 flex flex-col space-y-2">
      <div className="flex flex-col w-full">
        <label htmlFor="title">Title</label>
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="title"
          id="title"
          className="input input-bordered input-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="description">Description</label>
        <textarea
          {...register("description", { required: true })}
          placeholder="description"
          id="description"
          className="textarea textarea-bordered textarea-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="logo">Logo</label>
        <img
          className="w-12 h-12"
          src="https://blog.arman.top/favicon.svg"
          alt=""
        />
        <input
          {...register("logo", { required: true })}
          type="file"
          placeholder="Logo"
          id="logo"
          className="file-input file-input-bordered file-input-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="thumbnail">Thumbnail</label>
        <img
          className="w-12 h-12"
          src="https://blog.arman.top/favicon.svg"
          alt=""
        />
        <input
          {...register("thumbnail", { required: true })}
          type="file"
          placeholder="thumbnail"
          id="thumbnail"
          className="file-input file-input-bordered file-input-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="primaryColor">Primary Color</label>
        <input
          {...register("primaryColor", { required: true })}
          type="text"
          placeholder="primaryColor"
          id="primaryColor"
          className="input input-bordered input-sm rounded"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="maintenance">Maintenance</label>
        <label className="flex items-center gap-3" htmlFor="maintenanceYes">
        <input
          {...register("maintenance", { required: false })}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="maintenanceYes"
            name="maintenance"
          />{" "}
          Yes
        </label>

      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="registerDisabled">Register Disabled</label>
        <label className="flex items-center gap-3" htmlFor="registerYes">
          <input
          {...register("registerDisabled", { required: false })}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="registerYes"
            name="register"
          />{" "}
          Yes
        </label>
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="pointSystem">Point System</label>
        <label className="flex items-center gap-3" htmlFor="pointSystemYes">
          <input
          {...register("pointSystem", { required: false })}
            defaultChecked
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="pointSystemYes"
            name="point"
          />{" "}
          Yes
        </label>

      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="ads">ADs</label>
        <label className="flex items-center gap-3" htmlFor="adsYes">
          <input
          {...register("ads", { required: false })}
            className="checkbox rounded checkbox-warning checkbox-sm"
            type="checkbox"
            id="adsYes"
            name="ads"
          />{" "}
          Yes
        </label>
      </div>

      <button className="btn btn-sm">Save</button>
    </form>
  );
};

export default Settings;
