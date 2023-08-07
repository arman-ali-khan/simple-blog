import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import PrivateRoute from '../../../hooks/PrivateRouters/PrivateRoute';
import Layout from '../../../layout/Layout';

const index = () => {
    // get all categories
    const [categories,setCategories] = useState([])
    // fetch
    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/categories`)
        .then(res=>{
            setCategories(res.data)
        })
    },[])
    return (
        <PrivateRoute>
            <Layout title={'Categories'}>
          <div className='flex justify-center w-full'>
          <div className='w-96'>
                <div className='w-full bg-base-300 flex justify-between'>
                    <h1 className='px-4 py-2'>Categories</h1>
                    <Link  className='px-4 py-2 bg-base-200  hover:bg-base-100 duration-300' href='/admin/category/create'><HiOutlinePencilSquare size={30} /></Link>
                </div>
                <div>
                    <ul>
                        {
                            categories.map(category=>{
                                return(
                                      <li key={category.id} className='py-2 px-4 flex justify-between'>
                            <Link className='w-full relative inline-block' href={`/admin/category/edit/${category.id}`}>{category.label} <span className='bg-blue-300 rounded-full absolute px-2 bg-opacity-20 text-black text-xs'>eidt</span></Link>
                            <button className='px-4 py-2 bg-error text-black'><HiOutlineTrash size={20} /></button>
                        </li>
                                )
                            })
                        }
                      
                       
                    </ul>
                </div>
            </div>
          </div>
        </Layout>
        </PrivateRoute>
    );
};

export default index;