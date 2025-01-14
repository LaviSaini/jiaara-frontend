import { createSlice } from "@reduxjs/toolkit";


const userDataSlice = createSlice({
    name: "userdata",
    initialState: null,

    reducers: {

        add(state, action) {

            const userdata = action.payload;
            return { ...state, ...userdata }

        },


        clear() {
            return null;
        }
    }
});


export const userdata = userDataSlice.actions;
export default userDataSlice.reducer;