// src/stores/useProductUIStore.ts
import { create } from 'zustand';

interface ProductUIStore {
  selectedColor: string;
  selectedSize: string | null;
  quantity: number;
  showSizeGuide: boolean;
  mainImage: string;

  setColor: (color: string) => void;
  setSize: (size: string) => void;
  changeQuantity: (amount: number) => void;
  toggleSizeGuide: () => void;
  setMainImage: (img: string) => void;
  resetUI: () => void;
}

export const useProductUIStore = create<ProductUIStore>((set) => ({
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
