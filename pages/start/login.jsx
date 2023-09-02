import { useContext } from "react";
import Login from "../../components/Auth/Login/Login";
import { UserContext } from "../../context/ContextProvider";
import Layout from "../../layout/Layout";

const login = () => {
  const { settings } = useContext(UserContext);
  return (
    <Layout title={"Login"}>
      {settings?.loginDisabled === 1 ? (
        <div className="flex justify-center items-center h-screen w-full">
          Register Disabled
        </div>
      ) : (
        settings?.loginDisabled === 0 &&  <Login />
      )}
    </Layout>
  );
};

export default login;
