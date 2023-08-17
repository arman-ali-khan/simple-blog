import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../context/ContextProvider";

const AdminRoute = ({ children }) => {
  // router
  const router = useRouter()
  // context provider
  const {user, dbUser, userLoading } = useContext(UserContext);
  const cookie = Cookies.get("token");
  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center w-full">
        Loading...
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
