import React from 'react';
import GusetBook from '../../components/GusetBook/GusetBook';
import Layout from '../../layout/Layout';

const index = () => {
    return (
        <Layout title={'Guestbook'}>
            <GusetBook />
        </Layout>
    );
};

export default index;