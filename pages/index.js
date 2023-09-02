import { useContext } from 'react';
import Blogs from "../components/Home/Blogs/Blogs";
import Featured from "../components/Home/Hero/Featured";
import { UserContext } from "../context/ContextProvider";
import Layout from "../layout/Layout";
export default function Home() {
  const {settings} = useContext(UserContext) 
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
