import moment from 'moment';
import Link from 'next/link';

const Blog = ({post}) => {
    return (
        <div className="flex flex-row overflow-hidden md:h-32 bg-base-100 sm:h-24  shadow-lg">
        <img
          className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
          src={post.featured_image}
        />
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
          <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.postId}`}> {post.title}</Link>
          </div>
         <div>
         <div className='flex justify-between items-center w-full'>
            <p className='hidden sm:block md:hidden lg:block w-full text-xs sm:text-sm md:text-base'>{post.categories[0].label}</p>
            <p className='w-full text-xs sm:text-sm md:text-base'>{moment(post.date).fromNow()}</p>
            <span className='w-full text-xs sm:text-sm md:text-base'>View: {post.view}</span>
          </div>
         </div>
        </div>
      </div>
    );
};

export default Blog;