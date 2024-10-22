import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLogin: false,
  isMenu: false,
  platform: null,
  selectedCategoryId: null,
  pageTitle: null,
  userInfo: {},
  setIsLogin: (isLogin) => set({ isLogin }),
  setPageTitle: (pageTitle) => set({ pageTitle }),
  setPlatform: (platform) => set({ platform }),
  setIsMenu: (isMenu) => set({ isMenu }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),

  updateUserInfo: (token) => {
    if (!token) return set({ userInfo: {} });
    const userInfo = jwtDecode(token);
    return set({ userInfo });
  },
}));
