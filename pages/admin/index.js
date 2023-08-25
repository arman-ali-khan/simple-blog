import React from 'react';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';
import PrivateRoute from '../../hooks/PrivateRouters/PrivateRoute';
import AdminRoute from '../../hooks/useAdmin/AdminRoute';
import AdminLayout from '../../layout/AdminLayout';

const index = () => {
    return (
        <AdminLayout title={'Admin Dashboard'}>
           <PrivateRoute>
                <AdminRoute>
                    <Dashboard />
                </AdminRoute>
           </PrivateRoute>
        </AdminLayout>
    );
};

export default index;