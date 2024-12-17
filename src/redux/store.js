import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "@/redux/slices/cart";
import wishlistReducer from "@/redux/slices/wishlist";
import buyNowReducer from "@/redux/slices/buyNow";


const PERSISTENCE_KEY = 'redux_state';


const isClientSide = () => typeof window !== "undefined";


const loadPersistedState = () => {

  if (isClientSide()) {
    const persistedState = localStorage.getItem(PERSISTENCE_KEY);
    return persistedState ? JSON.parse(persistedState) : undefined;
  }
    return undefined;
};


const store = configureStore({
  reducer: {
    cartReducer,
    wishlistReducer,
    buyNowReducer
  },
  preloadedState: loadPersistedState()
});


const savePersistedState = state => {
  
  if (isClientSide()) {
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
  }
}


if (isClientSide()) {

  store.subscribe(() => {  
    const state = store.getState();
    savePersistedState(state);
  });
}


export default store;