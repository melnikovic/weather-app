'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { useState, type ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </QueryClientProvider>
  );
}
