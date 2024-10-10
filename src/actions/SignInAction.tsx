// src/components/SignInAction.tsx

import React, { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { getEncodedToken, signIn } from "../services/authServices";
import ActionMsg from "../components/uikit/ActionMsg";
import { getGetterByPath, useGlobalStore, usePageStore } from "../stores";
import { storeCredentials } from "../utils/storeBrowserCredentials";
import { decodeJwt } from "../utils/auth";

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
  const { setUser: setUserData, setMainMessage } = useGlobalStore((state) => ({
    setUser: state.setUser,
    setMainMessage: state.setMainMessage,
  }));
  const userData = usePageStore((state) =>
    scope
      ? (getGetterByPath(scope)(state.pageData) as {
          email: string;
          password: string;
        })
      : undefined
  );

  const handleSignIn = async () => {
    try {
      if (!userData) throw new Error("User data is missing");
      const token = getEncodedToken();
      const result = await signIn(userData.email, userData.password);
      const timestamp = new Date();

      token && setUserToContext(decodeJwt(token));
      token && setUserData({ ...result.user, loggedAt: timestamp });

      storeCredentials({
        id: result.user.id,
        password: userData.password,
        name: result.user.email,
      });
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

  return <ActionMsg type="success">RUN: SignIn to: {scope}</ActionMsg>;
};

export default SignInAction;
