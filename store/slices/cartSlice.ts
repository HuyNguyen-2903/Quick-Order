import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        if (existingItem.quantity < 99) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ productId, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.productId !== productId);
        }
      }
    },
    setQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.productId !== productId);
      } else if (quantity <= 99) {
        if (existingItem) {
          existingItem.quantity = quantity;
        } else {
          state.items.push({ productId, quantity });
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItemQuantity = (state: { cart: CartState }, productId: number) => {
  const item = state.cart.items.find((item) => item.productId === productId);
  return item ? item.quantity : 0;
};

export const selectCartSummary = (state: { cart: CartState; products: { items: import('./productsSlice').Product[] } }) => {
  const { items } = state.cart;
  const { items: products } = state.products;

  let totalSKUs = items.length;
  let totalQuantity = 0;
  let totalAmount = 0;

  items.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (product) {
      totalQuantity += cartItem.quantity;
      totalAmount += product.price * cartItem.quantity;
    }
  });

  return {
    totalSKUs,
    totalQuantity,
    totalAmount,
  };
};

export default cartSlice.reducer;

