import Head from "next/head";
import { useContext } from 'react';
import Maintenance from "../components/Maintenance/Maintenance";
import BottomBar from "../components/Shared/BottomBar/BottomBar";
import Footer from "../components/Shared/Footer/Footer";
import Navbar from "../components/Shared/Navbar/Navbar";
import { UserContext } from "../context/ContextProvider";

const Layout = ({ children, title, thumb, desc }) => {
const {settings} = useContext(UserContext) 

  return (
    <div className="container mx-auto">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={thumb} />
      </Head>
      {
        settings?.maintenance===1 ? <Maintenance /> :
        <div>
           <div>
        <Navbar />
      </div>
      <div className="md:my-16">{children}</div>
      <div>
        <BottomBar />
        <Footer />
      </div>
        </div>
      }
     
      </div>
  );
};

export default Layout;
