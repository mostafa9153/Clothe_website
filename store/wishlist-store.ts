import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  productIds: string[];
  toggleWishlist: (productId: string) => boolean; // returns true if added, false if removed
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggleWishlist: (productId: string) => {
        const current = get().productIds;
        const exists = current.includes(productId);
        if (exists) {
          set({ productIds: current.filter((id) => id !== productId) });
          return false;
        } else {
          set({ productIds: [...current, productId] });
          return true;
        }
      },

      removeFromWishlist: (productId: string) => {
        set({ productIds: get().productIds.filter((id) => id !== productId) });
      },

      isInWishlist: (productId: string) => {
        return get().productIds.includes(productId);
      },

      clearWishlist: () => set({ productIds: [] }),

      count: () => get().productIds.length,
    }),
    {
      name: "maison-aure-wishlist",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          try {
            return window.localStorage;
          } catch {
            return {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            } as any;
          }
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        } as any;
      }),
    }
  )
);

