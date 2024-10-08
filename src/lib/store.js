import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLogin: true,
  isMenu: false,
  setIsMenu: (isMenu) => set({ isMenu }),
}));
