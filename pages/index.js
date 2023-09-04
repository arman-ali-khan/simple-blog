import Blogs from "../components/Home/Blogs/Blogs";
import Featured from "../components/Home/Hero/Featured";
import Layout from "../layout/Layout";



 const Home = ({data})=> {

  const settings = data[0]
  return (
    <Layout
      title={`${settings?.title}`}
      thumb={settings?.thumbnail}
      desc={settings?.description}
    >
      <Featured />
      <Blogs />
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/settings`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}
export default Home