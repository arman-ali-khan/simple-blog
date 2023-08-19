import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";
import Loader from "../../lib/Loader";

const AdminRoute = ({ children }) => {
  // router
  const router = useRouter()
  // context provider
  const {user, dbUser, userLoading } = useContext(UserContext);
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
  if (user?.email && dbUser.type==='admin') {
    return <>{children}</>;
  } else {
    router.push('/')
  }
};

export default AdminRoute;
