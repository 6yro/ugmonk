import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import products from "./products/slice";

export const store = configureStore({
  reducer: { products },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
