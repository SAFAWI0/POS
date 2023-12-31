import { create } from "zustand";

export const useAppStore = create((set) => ({
  cart: "",
  cats: "",
  list: "",
  setCart: (cart) => set({ cart }),
  setCats: (cats) => set({ cats }),
  setList: (list) => set({ list }),
}));
