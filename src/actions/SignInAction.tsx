// src/components/SignInAction.tsx

import React, { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { signIn } from "../services/authServices";
import { useGlobalStore } from "../stores/globalStore";
import ActionMsg from "../components/uikit/ActionMsg";

interface SignInActionProps {
  scope: string;
  onActionResult: (success: boolean) => void;
  whitelist?: string[]; // Array of field names to skip reference checks
}

const SignInAction: React.FC<SignInActionProps> = ({
  scope,
  onActionResult,
}) => {
  const { setUserToContext } = useContext(UserContext);
  const setUserData = useGlobalStore((state) => state.setUser);
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);


  const handleSignIn = async () => {
    

    try {
    
      const result = await signIn("admin@admin.com", "admin");

      // Uncomment and adjust the Credential Management API code if needed
      /*
      if ('PasswordCredential' in window) {
        const credential = new PasswordCredential({
          id: result.user.id,
          password: result.user.password,
          name: result.user.email
        });
        navigator.credentials.store(credential)
          .then(() => {
            console.log('Credentials stored.');
          })
          .catch(err => {
            console.error('Error storing credentials:', err);
          });
      } else {
        console.warn('Credential Management API not supported in this browser.');
      }
      */

      setUserToContext(result.user);
      setUserData(result.user);
      setMainMessage("Sign In successful", "success");
      onActionResult(true);
    } catch (error) {
      setMainMessage(
        "Sign In error: " + scope + (error as Error).message,
        "error"
      );
      onActionResult(false);
    }
  };

  useEffect(() => {
    handleSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActionMsg type="info">RUN: SignIn to: {scope}</ActionMsg>;
};

export default SignInAction;
