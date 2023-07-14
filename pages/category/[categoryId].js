import CategoryPost from '@/components/Category/CategoryPost';
import Layout from '@/layout/Layout';
import { useRouter } from 'next/router';

const categoryId = () => {
    const router = useRouter();
    const {categoryId} = router.query
    return (
        <Layout title={'Category'}>
       <CategoryPost blog={'blog'} />
        </Layout>
    );
};

export default categoryId;