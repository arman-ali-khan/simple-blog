import Link from 'next/link';
import { useContext } from 'react';
import { RiQuillPenLine } from 'react-icons/ri';
import { UserContext } from '../../../context/ContextProvider';
const CreatePost = () =>{
    const {user} = useContext(UserContext)
    return(
       <>
       {
        user?.email ?  <div className='fixed md:right-10 right-4 bottom-28'>
        <Link href={'/post/create'}> <div className='bg-base-200 rounded-full border border-orange-500 p-2 flex gap-3 items-center'>
             <RiQuillPenLine /> <span className=' hidden sm:block'>Create</span>
         </div></Link>
     </div>
     :
     <div className='fixed md:right-10 right-4 bottom-28'>
     <Link href={'/start/login?page=post&next=create'}> <div className='bg-base-200 rounded-full border-orange-500 border hover:bg-orange-400 duration-300 hover:text-white p-2 flex gap-3 items-center'>
          <RiQuillPenLine /> <span className=' hidden sm:block'>Create</span>
      </div></Link>
  </div>
       }
       </>
    )
}

export default CreatePost;