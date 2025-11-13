// app/providers.tsx
"use client"; // Important for client-side components

import { apiCall, isTokenValid, reNewToken } from "@/lib/api";
import { useCartStore } from "@/lib/cartStore";
import { queryClient } from "@/lib/queryClient";
import { useAppStore } from "@/lib/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import HomeSkeleton from "./Skeleton/skeleton";

export function ReactQueryProvider({ fontStyle, children }) {
  const {
    setIsLogin,
    updateUserInfo,
    setFavorites,
    // deviceOSName,
    // setDeviceOSName,
    setPlatform,
    platform,
    setSettings,
  } = useAppStore();
  const { setCart } = useCartStore();
  // const [platform, setPlatform] = useState(null);

  const pathname = usePathname();
  useEffect(() => {
    init();
    initFav();
    // initDevice();
    initPlatform();
    initSettings();
    initFontSize();
  }, []);

  const initFontSize = () => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      let value = "100%";
      if (ua.includes("android") || ua.includes("samsungbrowser")) {
        value = "80%";
      }
      const style = document.createElement("style");
      style.innerHTML = `html { -webkit-text-size-adjust: ${value} !important; }`;
      document.head.appendChild(style);
    }
  };

  const initSettings = async () => {
    try {
      const resp = await apiCall({ pathname: "/app/setting" });
      let obj = {};
      resp.map((el) => {
        obj[el?.type] = el.value;
      });
      setSettings(obj);
    } catch (error) {
      console.log(error);
    }
  };

  const initPlatform = () => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);
      const platformQuery = queryParams.get("platform");
      setPlatform(platformQuery);
    }
  };

  const initFav = () => {
    if (typeof window !== "undefined") {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites_product")) || [];
      setFavorites(storedFavorites.map((id) => parseInt(id)));
    }
  };

  const init = async () => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("karada-token");
      let user = localStorage.getItem("karada-user");

      setTimeout(() => {
        let cart = localStorage.getItem("karada-cart");
        if (cart) setCart(JSON.parse(cart));
      }, 200);

      if (user && isTokenValid(token)) {
        setIsLogin(true);
        updateUserInfo(JSON.parse(user));
      } else {
        const newTokenData = await reNewToken();
        if (!newTokenData) {
          setIsLogin(false);
          localStorage.removeItem("karada-token");
          localStorage.removeItem("karada-refreshToken");
          localStorage.removeItem("karada-user");
          return;
        }
        localStorage.setItem("karada-token", newTokenData.accessToken);
        if (newTokenData.refreshToken) {
          localStorage.setItem("karada-refreshToken", newTokenData.refreshToken);
        }
        if (newTokenData.user) {
          localStorage.setItem("karada-user", JSON.stringify(newTokenData.user));
          localStorage.setItem("karada-account-name", newTokenData.user.name || "");
          setIsLogin(true);
          updateUserInfo(newTokenData.user);
        }
      }
    }
  };

  const deviceStatment = () => {
    if (platform === "ios") {
      return true;
    } else if (platform === "android") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <body
        className={`${fontStyle}`}
        style={{
          background:
            pathname?.split("/")[1] === "product" ? "#fff" : "#f6f6f6",
          userSelect: deviceStatment() ? "none" : "auto",
          WebkitUserSelect: deviceStatment() ? "none" : "auto",
        }}
      >
        <Suspense fallback={<HomeSkeleton />}>{children}</Suspense>
      </body>
    </QueryClientProvider>
  );
}
