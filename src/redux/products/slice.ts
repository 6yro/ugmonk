import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./asyncActions";
import { Product, ProductsSliceState, Status } from "./types";

const initialState: ProductsSliceState = {
  products: [],
  paginationLinks: {},
  status: Status.NEVER, // never | loading | success | error
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // setProducts(state, action: PayloadAction<Product[]>) {
    //   state.items = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.paginationLinks = action.payload.paginationLinks;

      if (
        state.products[0] &&
        state.products[0].category !== action.payload.category
      ) {
        state.products = [];
      }

      if (action.payload.paginationLinks) {
        state.products.push(...action.payload.data);
      } else state.products = action.payload.data;

      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.products = [];
    });
  },
});

// export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
