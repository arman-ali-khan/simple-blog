import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';

const RelatedCard = ({post,blog}) => {
    // popular post day
    const popularDays = 15
    //  categories 
     const categories = JSON.parse(post.categories)
    return (
        <div className={`flex md:flex-col ${blog.id===post.id && 'hidden'} w-full px-2 flex-row overflow-hidden md:h- bg-base-100 shadow-lg`}>
          <div className="font-bold hidden md:flex sm:text-sm text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.id}/${post.title.split(/[\s?=:"/',]+/).join('-').toLowerCase()}`}> {post.title}</Link>
          </div>
      <div className='leading-4 flex text-sm'>
        <p className='hidden md:flex'>{post.description.split(' ').slice(0,20).join(' ')}</p>
      <Image
          className="block md:w-16  w-20 sm:w-24 border-4 flex-none bg-cover md:h-14 h-16 sm:h-24 object-cover"
          src={post.featured_image}
          width={120}
          height={120}
          alt={post.email}
        />
 
      </div>
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:px-2 p-1 flex flex-col justify-between leading-normal w-full">
        <div className="font-bold md:hidden sm:text-sm text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.id}`}> {post.title}</Link>
          </div>
         <div className='w-full'>
         <div className='flex gap-1 justify-between items-center w-full'>
            <Link href={`/category/${categories[0].value}`} className=' text-blue-400 lg:block w-full text-xs sm:text-sm md:text-base truncate'>{categories && categories[0].label}</Link>
            <p className='w-full text-xs sm:text-sm md:text-base truncate'>{moment(post.date).fromNow().split(' ').slice(0,2).join(' ')}</p>
            <span className='w-full text-xs sm:text-sm md:text-base flex items-center gap-1'><HiOutlineEye /> {post.view}</span>
          </div>
         </div>
        </div>
      </div>
    );
};

export default RelatedCard;