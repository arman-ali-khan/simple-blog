import React from "react";
import GusetBook from "../../components/GusetBook/GusetBook";
import PrivateRoute from "../../hooks/PrivateRouters/PrivateRoute";
import Layout from "../../layout/Layout";

const index = () => {
  return (
    <Layout title={"Guestbook"}>
      <PrivateRoute>
        <GusetBook />
      </PrivateRoute>
    </Layout>
  );
};

export default index;
