import UpdateProfile from "../../../components/User/UpdateProfile";
import PrivateRoute from "../../../hooks/PrivateRouters/PrivateRoute";
import Layout from "../../../layout/Layout";

const updateprofile = () => {
  return (
    <Layout title="Update Profile">
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    </Layout>
  );
};

export default updateprofile;
