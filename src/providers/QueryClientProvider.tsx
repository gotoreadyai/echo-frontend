// src/QueryClientProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Unikaj ponownego zapytania, gdy okno się skupi
      retry: 1, // Próbuj ponownie tylko raz w przypadku błędu
    },
  },
} );

export const ReactQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};