import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLogin: true,
  isMenu: false,
  platform: null,
  setPlatform: (platform) => set({ platform }),
  setIsMenu: (isMenu) => set({ isMenu }),
}));
