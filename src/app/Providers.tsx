"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster dir="rtl" richColors theme="light" />
    </QueryClientProvider>
  );
}

export default Providers;
