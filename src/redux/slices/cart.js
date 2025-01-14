import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {

    add(state, action) {

      const { product, quantity } = action?.payload;
      console.log(product, quantity)
      const existingProduct = state.find(item => item?.product_id == product?.product_id);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      }
      else {
        state.push({ ...product, quantity });
      }
    },
    addAll(state, action) {
      const productList = action?.payload;
      state.splice(0, state.length, ...productList)
    },
    incrementQty(state, action) {

      const { productId, quantity } = action?.payload;
      const existingProduct = state.find(item => item?.product_id == productId);

      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },

    decrementQty(state, action) {

      const { productId, quantity } = action?.payload;
      const productIndex = state.findIndex(item => item?.product_id == productId);

      if (productIndex >= 0) {
        const existingProduct = state[productIndex];

        if (existingProduct.quantity > 1) {
          existingProduct.quantity = quantity;
        }
        else {
          const products = state.filter(item => item?.product_id != productId);
          return products;
        }
      }
    },

    remove(state, action) {

      const productId = action?.payload;
      const products = state.filter(item => item?.id != productId);
      return products;
    },

    clear() {

      return [];
    }
  }
});


export const cart = cartSlice.actions;
export default cartSlice.reducer;