import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {

        setCart(state, action) {
            state.cart = action.payload;
        },
        addToCart(state, action) {

            let existingItem = state.cart.find((item) => {
                return item.id === action.payload.id;
            })

            if (existingItem) {
                state.cart = state.cart.map((item) => {
                    return item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
                })
                console.log("state.cart-------------------      ");
                console.log(state.cart);
            }
            else {
                state.cart.push(action.payload);
            }
        },
        removeCart(state, action) {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        incrementQty(state, action) {
            state.cart = state.cart.map((item) => {
                return item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
            })
        },
        decrementQty(state, action) {
            state.cart = state.cart.map((item) => {
                return item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
            })
        }
    }
})


export const { addToCart, removeCart, incrementQty, decrementQty, setCart } = cartSlice.actions;
export default cartSlice.reducer;



export function addProducts(id, name, price, img) {
    return async function fetchProductThunk(dispatch, getState) {
        try {
            const res = await axios.post('https://pizzawebapp.onrender.com/addcart', { id, name, price, img, qty: 1 });
            if (res.status === 200) {
                // let data = res.json()
                console.log(res);
                dispatch(addToCart(res.data)); // Fetch updated cart after adding product
            }
        } catch (err) {
            console.log(err);
        }
    };
}

export function getAllProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        try {
            const res = await axios.get('https://pizzawebapp.onrender.com/getallcarts');
            if (res.status === 200) {
                dispatch(setCart(res.data));
            }
        } catch (err) {
            console.log(err);
        }
    };
}

export function deleteProduct(id) {
    return async function fetchProductThunk(dispatch, getState) {
        try {
            const res = await axios.delete('https://pizzawebapp.onrender.com/delete/' + id);
            if (res.status === 200) {

                //both are valid
                // dispatch(removeCart(id));
                dispatch(getAllProducts());
            }
        } catch (err) {
            console.log(err);
        }
    };
}

export function incQuantity(id, qty) {
    return async function fetchProductThunk(dispatch, getState) {
        try {
            const res = await axios.post('https://pizzawebapp.onrender.com/updateqty', { id, qty });
            if (res.status === 200) {
                dispatch(getAllProducts());
            }
        } catch (err) {
            console.log(err);
        }
    };
}
