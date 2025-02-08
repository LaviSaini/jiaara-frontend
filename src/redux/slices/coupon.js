import { createSlice } from "@reduxjs/toolkit";


const couponSlice = createSlice({
    name: "coupon",
    initialState: null,

    reducers: {

        add(state, action) {
            return { ...state, ...action.payload }
        },

        clear() {
            return null;
        }
    }
});


export const coupon = couponSlice.actions;
export default couponSlice.reducer;