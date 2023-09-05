import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
const NoticeBoard = () => {
    return (
        <div>
            <div className='bg-white border h-full'>
                <div className='flex px-4 gap-2 py-1 items-center font-bold text-white bg-orange-400'>
                    <span><FiAlertTriangle /></span><p>Notice Board</p></div>
                <div className='p-2'>
                    <ul>
                        <li className='list-decimal list-inside leading-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique vitae asperiores exercitationem repellendus dolores temporibus saepe,</li>
                    </ul>
                    
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;