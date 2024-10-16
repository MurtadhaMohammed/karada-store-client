import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLogin: true,
  isMenu: false,
  platform: null,
  selectedCategoryId: null,
  pageTitle: null,
  setPageTitle: (pageTitle) => set({ pageTitle }),
  setPlatform: (platform) => set({ platform }),
  setIsMenu: (isMenu) => set({ isMenu }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
