// app/providers.tsx
"use client"; // Important for client-side components

import { isTokenValid } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useAppStore } from "@/lib/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function ReactQueryProvider({ children }) {
  const { setIsLogin } = useAppStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("karada-token");
      if (token && isTokenValid(token)) setIsLogin(true);
      else setIsLogin(false);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
