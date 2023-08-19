import Cookies from "js-cookie";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import Loader from "../../lib/Loader";
import Redirect from "../../utl/Redirect/Redirect";

const PrivateRoute = ({ children }) => {
  // context provider
  const { user, userLoading } = useContext(UserContext);
  const cookie = Cookies.get("token");
  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center w-full">
        <div className="fixed top-0 left-0 w-screen h-screen z-[999]  backdrop-blur-3xl">
        <Loader />
        </div>
      </div>
    );
  }
  if (user?.email) {
    return <>{children}</>;
  } else {
    return <Redirect route={"start/login"} />;
  }
};

export default PrivateRoute;
