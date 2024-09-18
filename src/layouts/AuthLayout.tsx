import React from "react";
import Logo from "../blocks/Logo";

const AuthLayout: React.FC<{ [key: string]: React.ReactNode }> = (props) => {
  return (
    <>
      {/* <!-- component --> */}
      <div className="flex justify-center items-stretch w-full h-screen">
        {/* <!-- Left: Image --> */}
        <div className="flex-1 items-center justify-center  bg-base-200 flex">
          <Logo />
        </div>
        {/* <!-- Right: Login Form --> */}
        <div className="p-lg flex-1 flex flex-col justify-between  ">
          <header className="flex relative justify-end w-full">
            {props.header}
          </header>
         

          <form className="card w-1/2 mx-auto shadow-xl bg-base-300 p-lg ">
            <h1 className="text-2xl font-semibold mb-4">Login</h1>
            {/* <!-- Username Input --> */}
            <div className="mb-4bg-sky-100">
              <label htmlFor="username" className="block text-gray-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
            {/* <!-- Remember Me Checkbox --> */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-red-500"
              />
              <label htmlFor="remember" className="text-green-900 ml-2">
                Remember Me
              </label>
            </div>
            {/* <!-- Forgot Password Link --> */}
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* <!-- Login Button --> */}
            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-green-500 text-center">
            <a href="#" className="hover:underline">
              Sign up Here
            </a>
          </div>
        </div>

        {/* <!-- Sign up  Link --> */}
      </div>
    </>
  );
};

export default AuthLayout;
