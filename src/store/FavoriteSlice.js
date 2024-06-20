import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        favorite: []
    },
    reducers: {
        addToFavorite(state, action) {
            state.favorite.push(action.payload)
        },
        removeFavorite(state, action) {
            state.favorite = state.favorite.filter(item => item.id !== action.payload);
        }

    }
})


export default favoriteSlice.reducer;
export const { addToFavorite, removeFavorite } = favoriteSlice.actions;