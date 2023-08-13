import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineEye } from 'react-icons/hi';

const RelatedCard = ({post}) => {
    // popular post day
    const popularDays = 15
    //  categories 
     const categories = JSON.parse(post.categories)
    return (
        <div className={`flex md:flex-col w-full flex-row overflow-hidden md:h- bg-base-100 sm:h-  shadow-lg`}>
        <Image
          className="block md:w-full w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
          src={post.featured_image}
          width={176}
          height={96}
          alt={post.email}
        />
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
          <div className="font-bold  sm:text-sm text-sm mb-2 leading-tight">
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