import User from '../../components/User/User';
import Layout from '../../layout/Layout';

const userId = ({data}) => {
    return (
        <Layout title={`${data[0].fullName}, User at Arman's Blog`} thumb={data[0].photo || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'} desc={data[0].about}>
        
          <User dbUser={data} />
        </Layout>
    );
};


export async function getServerSideProps({ query }) {
  const { userId } = query;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/allusers?username=${userId}`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}
export default userId;