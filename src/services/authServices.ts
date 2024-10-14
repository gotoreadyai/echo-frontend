const setAuthTokenCookie = (token: string, hours: number) => {
  const maxAge = hours * 60 * 60;
  document.cookie = `auth_token=${token}; path=/; max-age=${maxAge}; secure; samesite=strict`;
};

const fetchAuth = async (endpoint: string, email: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/auth/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to ${endpoint}`);
  }
  return response.json();
};

export const signIn = async (email: string, password: string) => {
  const data = await fetchAuth("signin", email, password);
  if (data.token) {
    setAuthTokenCookie(data.token, import.meta.env.VITE_API_TOKEN_LIFETIME);
  }
  return data;
};

export const signUp = async (email: string, password: string) => {
  return fetchAuth("signup", email, password);
};

export const signOut = () => {
  document.cookie = "auth_token=; path=/; max-age=0; secure; samesite=strict";
  
};

export const getEncodedToken = () => {
  const match = document.cookie.match(new RegExp('(^| )auth_token=([^;]+)'));
  return match ? match[2] : null;
};