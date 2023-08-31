import React from 'react';
import { BsGraphDown } from 'react-icons/bs';

const UserAnalytics = () => {
    return (
        <div className='border border-t-0 w-full my-6'>
            <div className='border-orange-500 bg-orange-400 w-full border-b my-2 px-4 py-1 flex items-center gap-2 text-white font-bold'>
              
                <h2 className="flex text-base items-center gap-2"><span><BsGraphDown  /></span>Your analytics</h2>
            </div>
            <div className='h-full flex items-center justify-center
            '>
                comming soon...
            </div>
        </div>
    );
};

export default UserAnalytics;