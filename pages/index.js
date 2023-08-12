import Blogs from "../components/Home/Blogs/Blogs";
import Featured from "../components/Home/Hero/Featured";
import Layout from "../layout/Layout";

export default function Home() {
  return (
    <Layout
      title={`Arman's Blog || Home`}
      thumb={"images/thumb.png"}
      desc={"This is Arman's Blog"}
    >
      <Featured />
      <Blogs />
    </Layout>
  );
}
