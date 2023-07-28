import React from 'react';

const Loader = ({h,w}) => {
    return (
        <div className={`animate-spin border-2 rounded-full w-${w} h-${h} border-blue-500 border-dashed `}>
            
        </div>
    );
};

export default Loader;