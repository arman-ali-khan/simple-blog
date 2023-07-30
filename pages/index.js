import Blogs from '../components/Home/Blogs/Blogs';
import Featured from '../components/Home/Hero/Featured';
import CreatePost from '../components/Shared/CreatePost/CreatePost';
import Layout from '../layout/Layout';



export default function Home() {

  return (
    <Layout title={'TrickLoad || Home'}>
      <Featured />
      
      <Blogs />
      <CreatePost />
    
    </Layout>
  )
}
