import Link from 'next/link';
import React from 'react';

const Page404 = () => {
    return (
        <div>
<div class="h-screen w-full flex flex-col justify-center items-center">
	<h1 class=" relative">
    <span className='text-9xl font-extrabold tracking-widest w-full'>
    404
    </span>
  <span class="bg-[#FF6A3D] w-32 text-center px-2 text-sm rounded rotate-12 left-[25%] top-[45%] absolute">
		Page Not Found
	</span>
  </h1>
	
	<button class="mt-5">
      <div
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <Link href="/">Go Home</Link>
        </span>
      </div>
    </button>
</div>
        </div>
    );
};

export default Page404;