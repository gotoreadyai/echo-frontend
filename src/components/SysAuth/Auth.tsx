import { useState } from "react";
import { FiMail, FiKey, FiLogIn, FiDownload } from "react-icons/fi";
import { signIn, signUp } from "./../../services/authServices";
import { useContext } from "react";

import { UserContext } from "./../../UserProvider";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const { setUserToContext } = useContext(UserContext);

  const handleSignIn = async () => {
    try {
      const result = await signIn(email, password);
      setUserToContext(result.user);
      console.log("Sign In successful:", result);
    } catch (error) {
      setAuthError("Sign In failed. Please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await signUp(email, password);
      console.log("Sign Up successful:", result);
    } catch (error) {
      setAuthError("Sign Up failed. Please try again.");
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      

      <div className="flex gap-md container mx-auto">
        <div className="flex flex-col gap-md flex-1">
          <h1 className="text-xl font-bold">Sign In</h1>
          {authError && <p className="text-red-500">{authError}</p>}
          <label className="input input-bordered flex items-center gap-2">
            <FiMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FiKey />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-primary" onClick={handleSignIn}>
            <FiLogIn /> Sign In
          </button>
        </div>
        <div className="flex flex-col gap-md flex-1">
          <h1 className="text-xl font-bold">Sign Up</h1>
          {authError && <p className="text-red-500">{authError}</p>}
          <label className="input input-bordered flex items-center gap-2">
            <FiMail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FiKey />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-primary" onClick={handleSignUp}>
            <FiDownload />
            Sign Up
          </button>
        </div>
      </div>
      <div>...... </div>
      <p> https://components.willpinha.link/</p>

      <p>
        {" "}
        https://tailwind-dashboard-template-dashwind.vercel.app/app/components
      </p>

      <p> https://www.builtatlightspeed.com/category/daisyui</p>
      <div>...... </div>
    </>
  );
};
