import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
    name: 'dish',
    initialState: {
        dish: []
    },
    reducers: {
        addDish(state, action) {
            state.dish.push(action.payload);
        },
        removeDish(state, action) {
            state.dish = [];
        }

    }
})


export default dishSlice.reducer;
export const { addDish, removeDish } = dishSlice.actions;