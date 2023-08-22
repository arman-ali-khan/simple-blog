import CategoryPost from "../../components/Category/CategoryPost";
import Layout from "../../layout/Layout";

const categoryId = ({ data, loading }) => {
    loading=false
    const blog = data?.posts
  return (
    <Layout title={"Category"}>
      <CategoryPost blog={blog} loading={loading} />
    </Layout>
  );
};

// This gets called on every request
export async function getServerSideProps({ params }) {
    
  let loading = true;
  const { categoryId } = params;
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PRO}/api/catetgory/${categoryId}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data, loading } };
}

export default categoryId;
