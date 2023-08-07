import Blogs from '../components/Home/Blogs/Blogs';
import Featured from '../components/Home/Hero/Featured';
import Layout from '../layout/Layout';



export default function Home() {

  return (
    <Layout title={'BlogArman || Home'}>
      <Featured />
      <Blogs />
    
    
    </Layout>
  )
}
