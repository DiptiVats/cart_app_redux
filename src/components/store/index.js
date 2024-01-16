import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSllice from "./cart-slice";
const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSllice.reducer },
});

export default store;
