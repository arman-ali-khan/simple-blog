import React from 'react';
import Posts from '../../../components/Admin/Posts/Posts';
import PrivateRoute from '../../../hooks/PrivateRouters/PrivateRoute';
import AdminLayout from '../../../layout/AdminLayout';

const index = () => {
    return (
        <AdminLayout title={'All Posts'}>
            <PrivateRoute>
            <Posts />
            </PrivateRoute>
        </AdminLayout>
    );
};

export default index;