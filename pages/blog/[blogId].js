import SingleBlog from '@/components/Home/Blogs/SingleBlog';
import Layout from '@/layout/Layout';
import { useRouter } from 'next/router';

const blogId = ({data}) => {
    const router = useRouter();
    console.log(data);
    return (
        <Layout title={'Private route'}>
       <SingleBlog blog={data} />
        </Layout>
    );
};

export default blogId;


export const getStaticPaths = async () => {

    //fetch data from api
    const res = await fetch(`http://localhost:5000/posts`);
    const data = await res.json();
 
    //create paths for each item in the data
    const paths = data.map(item => ({
      params: {
        blogId: item.postId,
      },
    }));
  
    //return paths
    return {
      paths,
      fallback: false,
    };
  };
  
  
  // write a get staticprops function for nextjs dynamic api call
  export async function getStaticProps(context) {
    const id = context.params.blogId
    const res = await fetch(`http://localhost:5000/post/${id}`);
    const data = await res.json();
    return {
      props: {
        data
      }
    };
  }