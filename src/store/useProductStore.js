// src/stores/useProductUIStore.js
import { create } from 'zustand';

export const useProductUIStore = create((set) => ({
  selectedColor: '',
  selectedSize: null,
  quantity: 1,
  showSizeGuide: false,
  mainImage: '',

  setColor: (color) => set({ selectedColor: color }),
  setSize: (size) => set({ selectedSize: size }),
  changeQuantity: (amount) =>
    set((state) => {
      const newQty = state.quantity + amount;
      if (newQty < 1 || newQty > 10) return state;
      return { quantity: newQty };
    }),
  toggleSizeGuide: () =>
    set((state) => ({ showSizeGuide: !state.showSizeGuide })),
  setMainImage: (img) => set({ mainImage: img }),
  resetUI: () =>
    set({
      selectedColor: '',
      selectedSize: null,
      quantity: 1,
      showSizeGuide: false,
      mainImage: '',
    }),
}));
