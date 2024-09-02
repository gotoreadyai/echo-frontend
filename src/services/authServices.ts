const setAuthTokenCookie = (token: string, hours: number) => {
  const maxAge = hours * 60 * 60; // Konwersja godzin na sekundy
  document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
};
export const signIn = async (email: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to sign in");
  }

  const data = await response.json();

  // Zakładamy, że token jest częścią odpowiedzi jako data.token
  if (data.token) {
    setAuthTokenCookie(data.token, 24);
  }

  return data;
};

export const signUp = async (email: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  return response.json();
};
