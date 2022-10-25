import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../features/Product/ProductSlice";
import { userSlice } from "../features/User/UserSlice";
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
  },
});
