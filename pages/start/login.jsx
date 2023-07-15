import Login from "@/components/Auth/Login/Login";
import Layout from "@/layout/Layout";

const login = () => {
    return (
        <Layout title={'Login'}>
            <Login />
        </Layout>
    );
};

export default login;