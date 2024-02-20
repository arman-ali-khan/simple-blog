// import Lottie from "lottie-react";
import React from 'react';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import dynamic from "next/dynamic";
import { RemoveScrollBar } from 'react-remove-scroll-bar';
import Loading from '../public/images/loading.json';

const Loader = () => {
    return (
        <div className='w-screen h-screen fixed top-0 flex justify-center items-center z-[9999]'>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-[9999999]">
            <Lottie className="w-screen h-screen z-50 " animationData={Loading} loop={true} />
            <RemoveScrollBar />
            </div>
        </div>
    );
};

export default Loader;