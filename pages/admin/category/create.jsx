import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import PrivateRoute from "../../../hooks/PrivateRouters/PrivateRoute";
import Layout from "../../../layout/Layout";

const create = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()

      // btn text
      const [btnText,setBtnText] = useState('Create')

      const onSubmit = (data) => {
        setBtnText('Creating...')
        axios.post(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`,data)
        .then(res=>{
            setBtnText('Created successfully')
            reset()
            setTimeout(() => {
                setBtnText('Create Another')
              }, "1000");
            
        }).catch(err => {
            setBtnText('Failed! Try again')
        })
      }

  return (
    <PrivateRoute>
        <Layout title={"Create Category"}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center w-full">
        <div className="w-96 px-3 py-2">
          <div className="bg-base-300 flex  px-4 ">
            <Link className="mr-5 bg-base-200 px-4 py-2" href={"/admin/category"}>
              <button><BiArrowBack /></button>
            </Link>
            <h1 className="py-2">Create Category</h1>
          </div>
          <div className="items-center gap-1 w-full mt-5">
            <label className="w-full" htmlFor="title">
                <p>Label</p>
              <input  {...register("label", { required: true })} placeholder="Android Apps" className="w-full py-2 px-2 border" type="text" />
            </label>
            <label className="w-full" htmlFor="title">
                <p>Value</p>
              <input  {...register("value", { required: true })} placeholder="android-apps" className="w-full py-2 px-2 border" type="text" />
            </label>
           <button className="bg-base-300 w-full my-3 hover:bg-base-100 duration-300 px-4 py-2">{btnText}</button>
          </div>
        </div>
      </form>
    </Layout>
    </PrivateRoute>
  );
};

export default create;
