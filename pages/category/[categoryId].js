import CategoryPost from "../../components/Category/CategoryPost";
import Layout from "../../layout/Layout";

const categoryId = ({ data, loading,categoryId }) => {
    loading=false
    console.log(categoryId)
    const blog = data?.posts

    const category = JSON.parse(blog[0]?.categories)
  return (
    <Layout className="capitalize" title={`Archive By Category '${categoryId.split('-').join(' ')}'`}>
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
  return { props: { data, loading,categoryId } };
}

export default categoryId;
