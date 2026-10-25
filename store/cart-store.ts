import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import brandConfig from "@/config/brand.config";

export interface CartItem {
  id: string; // unique item key: `${productId}-${variantId}`
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  price: number;
  qty: number;
  maxStock: number;
  gstRate: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  giftWrap: boolean;
  giftMessage: string;
  orderNote: string;
  couponCode: string | null;
  discount: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  buyNowItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  setGiftWrap: (val: boolean) => void;
  setGiftMessage: (msg: string) => void;
  setOrderNote: (note: string) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  syncValidatedCart: (validItems: CartItem[]) => void;
  // Computed helpers
  subtotal: () => number;
  shippingFee: () => number;
  totalGst: () => number;
  grandTotal: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      giftWrap: false,
      giftMessage: "",
      orderNote: "",
      couponCode: null,
      discount: 0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) => {
        const id = `${item.productId}-${item.variantId}`;
        const existing = get().items.find((i) => i.id === id);

        if (existing) {
          const newQty = Math.min(existing.qty + item.qty, item.maxStock);
          set({
            items: get().items.map((i) => (i.id === id ? { ...i, qty: newQty } : i)),
            isOpen: true,
          });
        } else {
          set({
            items: [...get().items, { ...item, id }],
            isOpen: true,
          });
        }
      },

      buyNowItem: (item) => {
        const id = `${item.productId}-${item.variantId}`;
        set({
          items: [{ ...item, id, qty: Math.min(item.qty, item.maxStock) }],
          isOpen: false,
        });
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        });
      },

      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, qty: Math.min(qty, i.maxStock) } : i
          ),
        });
      },

      setGiftWrap: (val) => set({ giftWrap: val }),
      setGiftMessage: (msg) => set({ giftMessage: msg.slice(0, 150) }),
      setOrderNote: (note) => set({ orderNote: note.slice(0, 300) }),

      applyCoupon: (code, discount) => set({ couponCode: code.toUpperCase(), discount }),

      removeCoupon: () => set({ couponCode: null, discount: 0 }),

      clearCart: () =>
        set({
          items: [],
          couponCode: null,
          discount: 0,
          giftWrap: false,
          giftMessage: "",
          orderNote: "",
        }),

      syncValidatedCart: (validItems) => set({ items: validItems }),

      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
      },

      shippingFee: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        return sub >= brandConfig.shipping.freeAbove ? 0 : brandConfig.shipping.flatRate;
      },

      totalGst: () => {
        return get().items.reduce((sum, item) => {
          const itemTotal = item.price * item.qty;
          const rate = item.gstRate || 12;
          const gstPortion = itemTotal - itemTotal / (1 + rate / 100);
          return sum + Math.round(gstPortion);
        }, 0);
      },

      grandTotal: () => {
        const sub = get().subtotal();
        if (sub === 0) return 0;
        const ship = get().shippingFee();
        const disc = get().discount;
        const giftWrapCost = get().giftWrap ? (brandConfig.shipping.giftWrapFee ?? 250) : 0;
        return Math.max(0, sub + ship + giftWrapCost - disc);
      },

      totalCount: () => {
        return get().items.reduce((acc, item) => acc + item.qty, 0);
      },
    }),
    {
      name: "maison-aure-bag",
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
      partialize: (state) => ({
        items: state.items,
        giftWrap: state.giftWrap,
        giftMessage: state.giftMessage,
        orderNote: state.orderNote,
        couponCode: state.couponCode,
        discount: state.discount,
      }),
    }
  )
);
