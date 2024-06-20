import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { removeCart, incrementQty, decrementQty, deleteProduct, incQuantity } from '../store/CartSlice';
import axios from 'axios';
const ItemCard = () => {
    let dispatch = useDispatch();
    let flatCart = useSelector(state => state.cart.cart);
    let cart = flatCart.flat();
    // console.log(cart);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));

    }
    const handleIncrement = (id, qty) => {
        dispatch(incQuantity(id, qty + 1));
    }

    const handleDecrement = (id, qty) => {
        dispatch(incQuantity(id, qty - 1));
    }




    return (
        <div className='w-full flex flex-col gap-6 items-start justify-betwee overflow-auto'>
            {cart && cart.map((item, i) => (

                < div key={i} className='w-full flex items-start justify-between h-full p-3 rounded-lg shadow-xl border-t-2 border-gray-100'>
                    <div className='w-24 h-20'>
                        <img src={item.img} alt="" className='w-full h-full' />
                    </div>
                    <div className='w-48 ml-4'>
                        <h6>{item.name}</h6>
                        <p>₹{item.price * item.qty} </p>
                    </div>
                    <div className=' h-full flex flex-col items-end justify-between'>
                        <RiDeleteBin6Line className='text-2xl hover:text-red-800 hover:cursor-pointer transition-all duration-200 ' onClick={() => handleDelete(item.id)} />
                        <div className='flex items-center justify-center gap-1'>
                            <CiSquarePlus className='text-3xl hover:text-bgPrimary transition-all duration-200 cursor-pointer' onClick={() => handleIncrement(item.id, item.qty)} />
                            <p>{item.qty}</p>
                            <CiSquareMinus className='text-3xl hover:text-bgPrimary transition-all duration-200 cursor-pointer' onClick={() => item.qty > 1 ? handleDecrement(item.id, item.qty) : (item.qty = 0)} />
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default ItemCard