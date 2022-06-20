import create from "zustand";

const useStore = create((set) => ({
  userData: null,
  isLoggedIn: false,
  setUserData: (userData) => set({ userData }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}))

export default useStore