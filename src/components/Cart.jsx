import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdCancel } from "react-icons/md";
import ItemCard from './ItemCard';
import axios from 'axios';

const Cart = ({ demo }) => {



    let dispatch = useDispatch();
    let { isShowMenu, setIsShowMenu } = demo;
    let flatCart = useSelector(state => state.cart.cart);
    let cart = flatCart.flat();
    let totalQty = cart.reduce((totalQty, item) => totalQty + item.qty, 0)
    let totalPrice = cart.reduce((total, item) => total + item.qty * item.price, 0)

    // let demo1 = !!cart;


    return (

        <div className={` ${isShowMenu ? 'translate-x-0' : 'translate-x-96'} transition-all ease-in-out duration-700 bg-white w-96 fixed right-0 h-screen top-0 flex flex-col items-center justify-start   py-4 px-8 gap-6 max-mobile-l:z-20 max-mobile-l:w-full max-mobile-l:${isShowMenu ? 'translate-x-0' : 'translate-x-100'} `}>
            <div className='flex items-center justify-between w-full '>
                <h3 className='text-2xl font-roboto font-medium'>Order Menu</h3>
                <MdCancel className={`text-2xl text-textPrimary`} onClick={() => setIsShowMenu(!isShowMenu)} />
            </div>

            <ItemCard />

            <div className='border-t-2 border-gray-200 min-h-20 w-full flex flex-col justify-between  text-center '>
                <div className='flex  items-center justify-between px-4'>
                    <h6 className='text-md'>Items</h6>
                    <span>{totalQty}</span>
                </div>
                <div className='flex items-center justify-between px-4'>
                    <h4 className='text-xl'>Total</h4>
                    <span>₹{totalPrice}</span>
                </div>
            </div>
        </div>

    )
}

export default Cart