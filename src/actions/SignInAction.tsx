import React, { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { signIn } from "../services/authServices";
import { useGlobalStore } from "../stores/globalStore";

const SignInAction: React.FC = () => {
  const { setUserToContext } = useContext(UserContext);
  const setUserData = useGlobalStore((state) => state.setUserData); 
  const setMainMessage = useGlobalStore((state) => state.setMainMessage); 

  const handleSignIn = async () => {
    try {
      const result = await signIn("admin@admin.com", "admin");
      setUserToContext(result.user); 
      setUserData(result.user);
      setMainMessage("Sign In successful", "success");
    } catch (error) {
      setMainMessage("Sign In error: " + (error as Error).message, "error");
    }
  };

  useEffect(() => {
    handleSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>RunSignInAction</>;
};

export default SignInAction;
