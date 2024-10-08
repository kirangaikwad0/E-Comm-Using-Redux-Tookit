import { configureStore } from "@reduxjs/toolkit";
import ProductDetail from "../features/ProductDetailSlice";
import CartSlice from "../features/CartSlice";

// create store
export const store = configureStore({
  reducer: {
    app: ProductDetail,
    allCart: CartSlice,
  },
});
