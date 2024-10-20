// src/components/SignInAction.tsx

import { signIn, getEncodedToken } from "../services/authServices";
import { getGetterByPath, useGlobalStore, usePageStore } from "../stores";
import { FetchItemsActionProps } from "../types/types";
import { decodeJwt } from "../utils/auth";
import { storeCredentials } from "../utils/storeBrowserCredentials";

export const SignInAction = async (scope: FetchItemsActionProps["scope"]) => {
  // Bezpośredni dostęp do stanu bez użycia hooków
  const { setUser, setMainMessage } = useGlobalStore.getState();
  const pageData = usePageStore.getState().pageData;

  const userData = scope
    ? (getGetterByPath(scope)(pageData) as {
        email: string;
        password: string;
      })
    : undefined;

  try {
    console.log(userData);

    if (!userData) {
      throw new Error("Brak danych użytkownika");
    }

    const result = await signIn(userData.email, userData.password);
    const token = getEncodedToken(); // Pobierz token po zalogowaniu

    if (token) {
      const decodedUser = decodeJwt(token);
      setUser(decodedUser);
    } else {
      throw new Error("Brak tokena po zalogowaniu");
    }

    storeCredentials({
      id: result.user.id,
      password: userData.password,
      name: result.user.email,
    });
    setMainMessage("Zalogowano pomyślnie", "success");
  } catch (error) {
    console.error(`Error fetching items for scope: ${scope}`, error);
    const errorMsg = `Błąd logowania: ${scope} - ${(error as Error).message}`;
    setMainMessage(errorMsg, "error");
  }
};

export default SignInAction;
