import Create from '../../components/Post/Create';
import PrivateRoute from '../../hooks/PrivateRouters/PrivateRoute';
import Layout from '../../layout/Layout';

const create = () => {
    return (
        <Layout title={'Create Post'}>
           <PrivateRoute>
           <Create />
           </PrivateRoute>
        </Layout>
    );
};

export default create;