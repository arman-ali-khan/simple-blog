import axios from 'axios';
import parse from 'html-react-parser';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../../layout/Layout';
import Comments from '../../Comments/Comments';
import Categories from "../Categories/Categories";

const SingleBlog = ({blog}) => {

	// get context user
	const [dbUser,setDbUSer] = useState({})

	useEffect(()=>{
		axios.get(`${process.env.NEXT_PUBLIC_API_PRO}/api/users?email=${blog?.email}`)
		.then(res=>{
			setDbUSer(res.data)
		})
	},[blog.email])

	
    return (
        <Layout title={`${blog.title} || ${"Arman's Blog"}`} desc={blog?.description} thumb={blog.featured_image}>
             <div className='md:flex justify-between'>
        <div className=" md:w-4/5 w-full sm:p-0 md:p-1 lg:p-14 bg-base-100">
	<div className="flex flex-col  overflow-hidden rounded">
		{
		blog.featured_image ?	<Image src={blog.featured_image} alt={blog.email} width={700} height={300} className="w-full h-60 object-cover sm:h-96 bg-gray-500" />
		:
		<Image src={'https://dummyimage.com/600x480/aaa/aaa'} alt={blog.email} width={700} height={300} className="w-full h-60 object-cover sm:h-96 bg-gray-500" />
		}
		<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-md bg-base-200">
			<div className="space-y-2">
				<p className="inline-block text-2xl font-semibold sm:text-3xl">{blog.title}</p>
				<div className='flex items-center gap-3'>
				<p className="text-xs">By {" "} 
					<Link href={`/user/${blog.username}`} className="text-base text-blue-400 hover:underline">{dbUser.fullName}</Link>
				</p>
				<p className='text-sm'>{moment(blog.date).calendar()}</p>
				</div>
			</div>
			<div>
				 {parse(JSON.parse(blog.body))}
			</div>
		</div>
	</div>
	{/* Comments */}
	<div>
		<Comments blog={blog} />
	</div>
</div>
<div className='md:w-1/5'>
<Categories />
</div>
        </div>
        </Layout>
    );
};

export default SingleBlog;