import parse from 'html-react-parser';
import Categories from "../Categories/Categories";

const SingleBlog = ({blog}) => {
    return (
        <div>
             <div className='md:flex justify-between'>
        <div className=" md:w-2/3 w-full sm:p-0 md:p-1 lg:p-14 bg-base-100">
	<div className="flex flex-col  overflow-hidden rounded">
		<img src={blog.featured_image} alt="" className="w-full h-60 sm:h-96 bg-gray-500" />
		<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md bg-base-200">
			<div className="space-y-2">
				<p className="inline-block text-2xl font-semibold sm:text-3xl">{blog.title}</p>
				<p className="text-xs">By
					<a href="#" className="text-xs hover:underline">Leroy Jenkins</a>
				</p>
			</div>
			<div>
				 {parse(blog.body)}.
			</div>
		</div>
	</div>
</div>
<div className='md:w-1/3'>
<Categories />
</div>
        </div>
        </div>
    );
};

export default SingleBlog;