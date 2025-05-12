import { createSlice } from "@reduxjs/toolkit";


const collectionSlice = createSlice({
    name: "collectionList",
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


export const collectionData = collectionSlice.actions;
export default collectionSlice.reducer;