import { useState } from "react";
import { FiMail, FiKey, FiLogIn, FiDownload } from "react-icons/fi";
import { signIn, signUp } from "./../../services/authServices";
import { useContext } from 'react';

import { UserContext } from './../../UserProvider';

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
    <div className="flex gap-md">
      <div className="flex flex-col gap-md flex-1">
        <h1 className="text-2xl font-bold">Sign In</h1>
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
        <h1 className="text-2xl font-bold">Sign Up</h1>
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
  );
};
