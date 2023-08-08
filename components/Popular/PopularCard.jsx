import moment from 'moment';
import Link from 'next/link';

const PopularCard = ({post}) => {
    // popular post day
    const popularDays = 15
    //  categories 
     const categories = JSON.parse(post.categories)
     console.log(moment(post.date).startOf('day').fromNow().split(' ')[0])
    return (
        <div className={`flex ${
          ( post?.aproved === 0 || post?.publish === 0) && "hidden" ||
         (parseInt(moment(post.date).startOf('day').fromNow().split(' ')[0])) >=8 && 'hidden' } w-full flex-row overflow-hidden md:h-32 bg-base-100 sm:h-24  shadow-lg`}>
        <img
          className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
          src={post.featured_image}
        />
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
          <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/${post.id}`}> {post.title}</Link>
          </div>
         <div>
         <div className='flex justify-between items-center w-full'>
            <Link href={`/category/${categories[0].value}`} className='hidden sm:block md:hidden text-blue-400 lg:block w-full text-xs sm:text-sm md:text-base truncate'>{categories && categories[0].label}</Link>
            <p className='w-full text-xs sm:text-sm md:text-base'>{moment(post.date).startOf('day').fromNow()}</p>
            <span className='w-full text-xs sm:text-sm md:text-base'>View: {post.view}</span>
          </div>
         </div>
        </div>
      </div>
    );
};

export default PopularCard;