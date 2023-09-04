import React from 'react';
import Users from '../../../components/Admin/Users/Users';
import AdminLayout from '../../../layout/AdminLayout';

const index = () => {
    return (
        <AdminLayout title={'All Users'}>
            <Users />
        </AdminLayout>
    );
};

export default index;