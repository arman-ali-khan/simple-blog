import Link from 'next/link';
import { RiQuillPenLine } from 'react-icons/ri';
const CreatePost = () =>{
    return(
        <div className='fixed md:right-12 right-3 bottom-16'>
           <Link href={'/post/create'}> <div className='bg-base-200 rounded-full border border-black dark:border-white p-2 flex gap-3 items-center'>
                <RiQuillPenLine /> <span className=' hidden sm:block'>Create</span>
            </div></Link>
        </div>
    )
}

export default CreatePost;