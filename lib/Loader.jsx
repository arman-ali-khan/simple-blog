
import React from 'react';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

const Loader = () => {
    return (
        <div className='w-screen h-screen fixed top-0 flex justify-center items-center z-[9999]'>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-[9999999]">
            {/* <Lottie className="w-screen h-screen z-50 " animationData={Loading} loop={true} /> */}
            Loading
            <RemoveScrollBar />
            </div>
        </div>
    );
};

export default Loader;