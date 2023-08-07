import Head from "next/head";
import BottomBar from "../components/Shared/BottomBar/BottomBar";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";

const Layout = ({ children, title, thumb, desc }) => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={thumb} />
      </Head>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
      <div>
        <BottomBar />
        <Footer />
      </div>
      </div>
  );
};

export default Layout;
