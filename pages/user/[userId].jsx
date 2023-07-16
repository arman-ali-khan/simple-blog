import { useRouter } from 'next/router';
import User from '../../components/User/User';
import Layout from '../../layout/Layout';

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