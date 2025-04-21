import { createSlice } from "@reduxjs/toolkit";


const buyNowSlice = createSlice({
  name: "buyNow",
  initialState: [],

  reducers: {

    add(state, action) {

      const product = action?.payload;
      return product;
    },
    increaseQty(state, action) {
      const productId = action.payload;
      const item = state.find((item) => item.product_id === productId);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty(state, action) {
      const productId = action.payload;
      const item = state.find((item) => item.product_id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clear() {
      return [];
    }
  }
});


export const buyNow = buyNowSlice.actions;
export default buyNowSlice.reducer;