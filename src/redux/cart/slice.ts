import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartSliceState } from "./types";

const initialState: CartSliceState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<any>) {
      state.products += action.payload;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
