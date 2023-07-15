import Link from "next/link";

const Featured = () => {
    return (
       <section className="w-full md:flex justify-between">
        <div className="md:w-2/3  md:p-3 p-1">
        <div className="flex flex-row-reverse overflow-hidden md:h-40 bg-base-100 sm:h-24  shadow-lg">
        <img
          className="block md:w-44 w-28 border-4 flex-none bg-cover md:h-auto h-24 object-cover"
          src='https://res.cloudinary.com/dl1cxduy0/image/upload/v1689334991/simpleblog/z9fkeqztermxsvpqzuls.png'
        />
        <div className="rounded-b lg:rounded-b-none lg:rounded-r md:p-4 p-1 flex flex-col justify-between leading-normal w-full">
          <div className="font-bold  sm:text-base text-sm mb-2 leading-tight">
           <Link className='hover:text-blue-300 visited:text-purple-400 duration-300 text-blue-500' href={`/blog/1}`}>লেবু দিয়ে ওজন কমানোর উপায়! নিয়মিত সেবনে শরীরে জমাট বাধা চর্বি ক্ষরণে বেশ কার্যকর।</Link>
          </div>
          <div className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
         <div>
         <div className='flex justify-between items-center w-full'>
            <p className='hidden sm:block md:hidden lg:block w-full text-xs sm:text-sm md:text-base'>Cateogry</p>
            <p className='w-full text-xs sm:text-sm md:text-base'>{'a day ago'}</p>
            <span className='w-full text-xs sm:text-sm md:text-base'>View: 0</span>
          </div>
         </div>
        </div>
      </div>
       </div>
       <div className="md:w-1/3 md:p-3 p-1">
        <div className="bg-base-100 flex justify-center items-center md:h-full w-full h-44">
        <p>Ads here</p>
        </div>
       </div>
       </section>
    );
};

export default Featured;