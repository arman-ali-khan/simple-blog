import { useRouter } from 'next/router';
import SingleBlog from '../../components/Home/Blogs/SingleBlog';


const index = ({data}) => {

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
    return (
        <div>
       <SingleBlog blog={data} />
        </div>
    );
};

export async function getServerSideProps({ params }) {
  const { blogId } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/posts/${parseInt(blogId)}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
export default index;