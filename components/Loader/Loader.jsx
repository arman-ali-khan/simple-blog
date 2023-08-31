import React from 'react';

const Loader = ({h,w,py,px}) => {
    return (
        <div className={`animate-spin border-2 rounded-full w-${w} h-${h} px-${px} py-${[py]} border-black hover:border-white border-dashed `}>
            
        </div>
    );
};

export default Loader;