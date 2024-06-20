import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './CartSlice';
import FavoriteSlice from './FavoriteSlice';
import DishSlice from './DishSlice';

const store = configureStore({
    reducer: {
        cart: CartSlice,
        favorite: FavoriteSlice,
        dish: DishSlice
    }
})

export default store;