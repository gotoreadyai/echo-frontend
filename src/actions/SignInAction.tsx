import React, { useContext, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import { signIn } from "../services/authServices";
import { useGlobalStore } from "../stores/globalStore";
import ActionMsg from "../components/uikit/ActionMsg";

interface SignInActionProps {
  scope: string;
  onActionResult: (success: boolean) => void;
}
const SignInAction: React.FC<SignInActionProps> = ({
  scope,
  onActionResult,
}) => {
  const { setUserToContext } = useContext(UserContext);
  const setUserData = useGlobalStore((state) => state.setUserData);
  const setMainMessage = useGlobalStore((state) => state.setMainMessage);

  const handleSignIn = async () => {
    try {
      const result = await signIn("admin@admin.com", "admin");
      setUserToContext(result.user);
      setUserData(result.user);
      setMainMessage("Sign In successful", "success");
      onActionResult(true);
    } catch (error) {
      setMainMessage(
        "Sign In error: " + scope + (error as Error).message,
        "error"
      );
    }
  };

  useEffect(() => {
    handleSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ActionMsg type="info">RUN: SignIn to: {scope}</ActionMsg>;
};

export default SignInAction;
