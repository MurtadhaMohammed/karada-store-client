// app/providers.tsx
"use client"; // Important for client-side components

import { isTokenValid, reNewToken } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";
import { queryClient } from "@/lib/queryClient";
import { useAppStore } from "@/lib/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ReactQueryProvider({ fontStyle, children }) {
  const { setIsLogin, updateUserInfo } = useAppStore();
  const { setCart } = useCartStore();
  const pathname = usePathname();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("karada-token");

      setTimeout(() => {
        let cart = localStorage.getItem("karada-cart");
        if (cart) setCart(JSON.parse(cart));
      }, 200);

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
    <QueryClientProvider client={queryClient}>
      <body
        className={fontStyle}
        style={{
          background:
            pathname?.split("/")[1] === "products" ? "#f6f6f6" : "#fff",
        }}
      >
        {children}
      </body>
    </QueryClientProvider>
  );
}
