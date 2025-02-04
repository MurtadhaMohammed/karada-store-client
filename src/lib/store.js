import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  installmentId: null,
  isInstallment: false,
  isLogin: false,
  isMenu: false,
  isOtp: false,
  platform: null,
  selectedCategoryId: null,
  pageTitle: null,
  userInfo: {},
  querySearch: "",
  queryString: "",
  otp: null,
  favorites: [],
  isPhoneValidated: false,
  userCheckoutInfo: {},
  searchResult: null,
  validateAddress: false,
  setValidateAddress: (validateAddress) =>
    set({ validateAddress: validateAddress }),
  setSearchResult: (result) => set({ searchResult: result }),
  setUserCheckoutInfo: (info) => set({ userCheckoutInfo: info }),
  setInstallmentId: (id) => set({ installmentId: id }),
  setInstallment: (isInstallment) => set({ isInstallment }),
  setFavorites: (favorites) => set({ favorites }),
  setIsOtp: (isOtp) => set({ isOtp }),
  setQueryString: (queryString) => set({ queryString }),
  setQuerySearch: (querySearch) => set({ querySearch }),
  setIsLogin: (isLogin) => set({ isLogin }),
  setPageTitle: (pageTitle) => set({ pageTitle }),
  setPlatform: (platform) => set({ platform }),
  setIsMenu: (isMenu) => set({ isMenu }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setOtp: (otp) => set({ otp }),
  setIsPhoneValidated: (isValid) => set({ isPhoneValidated: isValid }),

  toggleFav: (productId) => {
    let favorites = get().favorites;
    let newArr = [];
    let isExist = favorites?.find((id) => id === productId);
    if (isExist) newArr = favorites?.filter((id) => id !== productId);
    else newArr = [...favorites, productId];
    return set({ favorites: newArr });
  },

  updateUserInfo: (token) => {
    if (typeof window === "undefined") return;
    if (!token) return set({ userInfo: {} });
    const userInfo = jwtDecode(token);
    localStorage.setItem("karada-account-name", userInfo?.name);
    return set({ userInfo });
  },
  setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
}));

useAppStore.subscribe(({ favorites }) => {
  localStorage.setItem("favorites_product", JSON.stringify(favorites));
});
