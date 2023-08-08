
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { UserContext } from "../../../context/ContextProvider";

const Login = () => {
// router
const router = useRouter()
  // context
  const { user, loginUser } = useContext(UserContext);
  // loading
  const [loading, setLoading] = useState(false);

  // redirect when login
  if(user?.email){
    router.push("/")
 }


  // btn text
  const [btnText, setBtnText] = useState("Login");
  // login error
  const [loginError, setLoginError] = useState("");

  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUser = () => {
    setLoading(true);
    return loginUser(email, password)
      .then((res) => {
        const user = res.user;
        setLoading(false);
        setLoginError("");
        setBtnText("Successfully logged in");
        if(!router.query===''){
          router.push(`/blog/${router.query}`)
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setLoginError(err.message);
        setBtnText("Try Again");
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64">
        <h1 className="text-center text-xl">Login{user?.email}</h1>
        <div className="flex flex-col gap-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-sm"
            type="email"
            placeholder="Email"
          />
          <div className="w-full relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 w-full rounded-sm"
              type={`${showPass ? "text" : "password"}`}
              placeholder="Password"
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-1 p-2 top-1"
            >
              {!showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <button
          disabled={!email && !password}
            onClick={() => handleLoginUser()}
            className="px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 duration-300 font-bold disabled:bg-gray-600"
          >
            {loading ? "Logging in..." : btnText}
          </button>
        </div>
        <div className="py-2">
          <p className="text-error">
            {loginError === "Firebase: Error (auth/wrong-password)." &&
              "Wrong Password"}
            {loginError === "Firebase: Error (auth/user-not-found)." &&
              "Wrong Email"}
            {loginError !== "Firebase: Error (auth/wrong-password)." &&
            loginError !== "Firebase: Error (auth/user-not-found)."
              ? loginError
              : ""}
          </p>

          <p className="text-center text-sm">
            Don't have an account? <Link className="text-blue-500" href={`/start/register`}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
