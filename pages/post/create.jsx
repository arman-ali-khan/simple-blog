import Create from "../../components/Post/Create";
import PrivateRoute from "../../hooks/PrivateRouters/PrivateRoute";
import ProfileRoute from "../../hooks/ProfileUpdate/ProfileRoute";
import Layout from "../../layout/Layout";

const create = () => {
  return (
    <Layout title={"Create Post"}>
      <PrivateRoute>
        <ProfileRoute>
          <Create />
        </ProfileRoute>
      </PrivateRoute>
    </Layout>
  );
};

export default create;
