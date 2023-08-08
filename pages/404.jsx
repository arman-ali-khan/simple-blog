import React from 'react';
import Page404 from '../components/404/404';
import Layout from '../layout/Layout';

const Custom404 = () => {
    return (
        <Layout title={'404 Not Found'}>
            <Page404 />
        </Layout>
    );
};

export default Custom404;