import dynamic from 'next/dynamic';




const Footer = () => {
  const BackToUp = dynamic(
    () => import('@uiw/react-back-to-top'),
    { ssr: false }
  )
    return (
      <footer className="footer footer-center my-12 p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Arman Ali Khan</p>
      </div>
      <BackToUp
      className='!bottom-14 sm:!right-16'
      fixed={false}
      step={500}
      speed={10}
    >
      <p>Top</p>    </BackToUp>
    </footer>
    );
};

export default Footer;