import { useContext } from "react";
import Register from "../../components/Auth/Register/Register";
import { UserContext } from "../../context/ContextProvider";
import Layout from "../../layout/Layout";

const register = () => {
  const { settings } = useContext(UserContext);

  return (
    <Layout title={"Register"}>
      {settings?.registerDisabled === 1 ? (
        <div className="flex justify-center items-center h-screen w-full">
          Register Disabled
        </div>
      ) : (
        settings?.registerDisabled === 0 && <Register />
      )}
    </Layout>
  );
};

export default register;
