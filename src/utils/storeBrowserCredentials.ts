// src/utils/storeCredentials.ts

interface UserCredentials {
    id: string;
    password: string;
    name: string;
  }
  
  type PasswordCredentialData = {
    id: string;
    password: string;
    name?: string;
  };
  
  declare global {
    interface Window {
      PasswordCredential?: new (data: PasswordCredentialData) => Credential;
    }
  }
  
  export const storeCredentials = (credentials: UserCredentials) => {
    if (window.PasswordCredential) {
      const credential = new window.PasswordCredential({
        id: credentials.id,
        password: credentials.password,
        name: credentials.name,
      });
      navigator.credentials
        .store(credential)
        .then(() => {
          console.log('Credentials stored.');
        })
        .catch((err) => {
          console.error('Error storing credentials:', err);
        });
    } else {
      console.warn('Credential Management API not supported in this browser.');
    }
  };