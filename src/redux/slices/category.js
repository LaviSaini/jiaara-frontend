import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
    name: "categoryList",
    initialState: [],

    reducers: {
        addAll(state, action) {
            const wishList = action?.payload;
            state.splice(0, state.length, ...wishList)
        },
        clear() {
            return [];
        }
    }
});


export const categoryData = categorySlice.actions;
export default categorySlice.reducer;