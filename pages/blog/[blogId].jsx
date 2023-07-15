import SingleBlog from '@/components/Home/Blogs/SingleBlog';
import Layout from '@/layout/Layout';
import parse from 'html-react-parser';
import { useRouter } from 'next/router';


const index = ({data}) => {

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
    return (
        <Layout title={`${data.title} || ${"Arman's Blog"}`} desc={parse(data.body)} thumb={data.featured_image}>
       <SingleBlog blog={data} />
        </Layout>
    );
};

export async function getServerSideProps({ params }) {
  const { blogId } = params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/post/${blogId}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
export default index;