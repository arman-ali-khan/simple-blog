import React from 'react';
import Settings from '../../../components/Admin/Settings/Settings';
import AdminLayout from '../../../layout/AdminLayout';

const index = () => {
    return (
        <AdminLayout title={'Settings'}>
            <Settings />
        </AdminLayout>
    );
};

export default index;