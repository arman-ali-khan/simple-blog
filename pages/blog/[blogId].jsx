import SingleBlog from '@/components/Home/Blogs/SingleBlog';
import Layout from '@/layout/Layout';
import parse from 'html-react-parser';

const blogId = ({data}) => {
    
    return (
        <Layout title={`${data.title} || ${"Arman's Blog"}`} desc={parse(data.body)} thumb={data.featured_image}>
       <SingleBlog blog={data} />
        </Layout>
    );
};

export default blogId;


export const getStaticPaths = async () => {

    //fetch data from api
    const res = await fetch(`https://simple-blog-dun.vercel.app/api/blog`);
    const data = await res.json();
    const posts = data.posts
    //create paths for each item in the data
    const paths = posts.map(item => ({
      params: {
        blogId: item.postId.toString(),
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
    const res = await fetch(`https://simple-blog-dun.vercel.app/api/blog/${id}`);
    const data = await res.json();
    return {
      props: {
        data
      }
    };
  }

