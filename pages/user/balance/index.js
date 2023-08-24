import React from 'react';
import Balance from '../../../components/User/Balance/Balance';
import PrivateRoute from '../../../hooks/PrivateRouters/PrivateRoute';
import Layout from '../../../layout/Layout';

const index = () => {
    return (
        <Layout title={'Balance'}>
            <PrivateRoute>
               <Balance />
            </PrivateRoute>
        </Layout>
    );
};

export default index;