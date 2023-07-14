import Layout from '@/layout/Layout';
import { useRouter } from 'next/router';
import User from '../../components/User/User';

const userId = () => {
    const router = useRouter();
    const {userId} = router.query
    return (
        <Layout title={'Private route'}>
        <User />
        </Layout>
    );
};

export default userId;