import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLogin: false,
  isMenu: false,
  platform: null,
  selectedCategoryId: null,
  pageTitle: null,
  setIsLogin: (isLogin) => set({ isLogin }),
  setPageTitle: (pageTitle) => set({ pageTitle }),
  setPlatform: (platform) => set({ platform }),
  setIsMenu: (isMenu) => set({ isMenu }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  getUserInfo: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("karada-token");
      if (!token) return {};
      const user = jwtDecode(token);
      return user;
    }
    return {};
  },
}));
