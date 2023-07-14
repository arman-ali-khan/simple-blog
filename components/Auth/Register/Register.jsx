import { UserContext } from "@/context/ContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const router = useRouter()
  // context
  const { createUser,user } = useContext(UserContext);
  // error
  const [registerError, setRegisterError] = useState("");
  // redirect when register
  if(user?.email){
     router.push("/")
  }
  // loading
  const [loading, setLoading] = useState(false);

  // register btn
  const [registerBtn, setRegisterBtn] = useState("Register");
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser = () => {
    setLoading(true);
    return createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        setLoading(false);
        setRegisterError("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setRegisterError(err.message);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64">
        <h1 className="text-center text-xl">Register</h1>
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
          disabled={!email&&!password}
            onClick={() => handleRegisterUser()}
            className="px-3 py-2 bg-primary disabled:bg-gray-600"
          >
            {registerBtn}
          </button>
        </div>
        <div>
          <div>
            <p className="text-error">
              {registerError ===
                "Firebase: Error (auth/email-already-in-use)." &&
                "Email Already Used"}
              {registerError ===
                "Firebase: Password should be at least 6 characters (auth/weak-password)." &&
                "Password should be at least 6 characters"}
              {registerError !==
                "Firebase: Error (auth/email-already-in-use)." &&
              registerError !==
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ? registerError
                : ""}
            </p>
            <p className="text-center text-sm">
              Already have an account? <Link href="/auth/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
