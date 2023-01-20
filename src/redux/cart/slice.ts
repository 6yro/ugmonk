import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartSliceState } from "./types";

const initialState: CartSliceState = {
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      state.cartProducts.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
