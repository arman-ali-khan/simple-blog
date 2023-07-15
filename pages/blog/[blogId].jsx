import SingleBlog from '@/components/Home/Blogs/SingleBlog';
import Layout from '@/layout/Layout';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';
import useSWR from 'swr';


const blogId = () => {
 const router = useRouter()
 const {blogId} = router.query;
 const fetcher = (...args) => fetch(...args).then(res => res.json())


    const { data, error, isLoading } = useSWR(`/api/post/${blogId}`, fetcher)
   
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
  
    return (
        <Layout title={`${data.title} || ${"Arman's Blog"}`} desc={parse(data.body)} thumb={data.featured_image}>
       <SingleBlog blog={data} />
        </Layout>
    );
};

export default blogId;


// export const getStaticPaths = async () => {

//     //fetch data from api
//     const res = await fetch(`https://simple-blog-dun.vercel.app/api/blog`);
//     const data = await res.json();
//     const posts = data.posts
//     //create paths for each item in the data
//     const paths = posts.map(item => ({
//       params: {
//         blogId: item.postId.toString(),
//       },
//     }));
  
//     //return paths
//     return {
//       paths,
//       fallback: false,
//     };
//   };
  
  
//   // write a get staticprops function for nextjs dynamic api call
//   export async function getStaticProps(context) {
//     const id = context.params.blogId
//     const res = await fetch(`https://simple-blog-dun.vercel.app/api/blog/${id}`);
//     const data = await res.json();
//     return {
//       props: {
//         data
//       }
//     };
//   }

