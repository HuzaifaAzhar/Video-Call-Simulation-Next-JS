"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { GlobalStateProvider } from "./context/GlobalStateContext";
import ClientAuthGuardWrapper from "./ClientAuthGuardWrapper";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>
        <ClientAuthGuardWrapper>
          {children}
        </ClientAuthGuardWrapper>
      </GlobalStateProvider>
    </QueryClientProvider>
  );
}
