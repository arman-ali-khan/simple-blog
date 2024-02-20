import Blogs from "../components/Home/Blogs/Blogs";
import Hadith from "../components/Home/Hadith/Hadith";
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
    {/* Hadith */}
    <Hadith />
      <Featured />
      <Blogs />
    </Layout>
  );
}

export async function getServerSideProps() {
 try {
   // Fetch data from external API
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/settings`)
   const data = await res.json()
  
   // Pass data to the page via props
   return { props: { data } }
 } catch (error) {
 return console.error(error);
 }
}
export default Home