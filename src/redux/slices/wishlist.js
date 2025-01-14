import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],

  reducers: {

    add(state, action) {
      console.log(state)
      const product = action.payload;
      console.log(product)
      state.push({ ...product, isWishlist: true });
    },
    addAll(state, action) {
      const wishList = action?.payload;
      state.splice(0, state.length, ...wishList)
    },
    remove(state, action) {

      const productId = action.payload;
      console.log(productId)
      const products = state.filter(item => item.product_id != productId);
      return products;
    },

    clear() {
      return [];
    }
  }
});


export const wishlist = wishlistSlice.actions;
export default wishlistSlice.reducer;