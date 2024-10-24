// app/providers.tsx
"use client"; // Important for client-side components

import { isTokenValid, reNewToken } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useAppStore } from "@/lib/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function ReactQueryProvider({ children }) {
  const { setIsLogin, updateUserInfo } = useAppStore();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("karada-token");
      if (token && isTokenValid(token)) {
        setIsLogin(true);
        updateUserInfo(token);
      } else {
        token = await reNewToken();
        if (!token) {
          setIsLogin(false);
          localStorage.removeItem("karada-token");
          localStorage.removeItem("karada-refreshToken");
          return;
        }
        localStorage.setItem("karada-token", token);
        setIsLogin(true);
        updateUserInfo(token);
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
