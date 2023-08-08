import Link from 'next/link';
import { RiQuillPenLine } from 'react-icons/ri';
const CreatePost = () =>{
    return(
        <div className='fixed md:right-10 right-4 bottom-28'>
           <Link href={'/post/create'}> <div className='bg-base-200 rounded-full border border-primary p-2 flex gap-3 items-center'>
                <RiQuillPenLine /> <span className=' hidden sm:block'>Create</span>
            </div></Link>
        </div>
    )
}

export default CreatePost;