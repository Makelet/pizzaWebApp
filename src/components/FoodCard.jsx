import React, { useEffect, useState } from 'react'
import FoodData from '../FoodData/FoodData'
import { AiFillStar } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, addToCart, getAllProducts } from '../store/CartSlice';
import { addToFavorite, removeFavorite } from '../store/FavoriteSlice';
import axios from 'axios'
const FoodCard = ({ demo }) => {



    let { isShowMenu, setIsShowMenu } = demo;

    // console.log(isShowMenu);
    let dispatch = useDispatch();
    let dishFlat = useSelector(state => state.dish.dish);
    let dish = dishFlat.flat();
    // console.log(dish);

    // console.log(cart);
    let [isLiked, setIsLiked] = useState(true);

    let cart = useSelector(state => state.cart.cart);

    let favorite = useSelector(state => state.favorite.favorite);
    // console.log(favorite);


    useEffect(() => {
        dispatch(getAllProducts());
    }, [])

    const handleLike = (dbId, id, name, price, img, rating, like) => {

        axios.put('http://localhost:3000/like', { dbId })
            .then((res) => {
                console.log(res.data);
                // res.data.isLike = !res.data.isFLike;
                // console.log(res.data.isLike);
            })
            .catch((err) => {
                console.log(err);
            })

        let existingItem = favorite.find((item) => {
            return item.id === id;
        })

        // console.log(existingItem);

        if (existingItem) {
            dispatch(removeFavorite(id));
        }
        else {
            dispatch(addToFavorite({ id, name, price, img, rating, like }));
        }

    }

    // food.id, food.name, food.price,food.img
    const handleAdd = (id, name, price, img) => {

        // alert(qty)
        setIsShowMenu(true);
        // dispatch(getAllProducts());
        dispatch(addProducts(id, name, price, img));

        // axios.post('http://localhost:3000/addcart', { id, name, price, img, qty: 1 })
        //     .then((res) => {
        //         // console.log(res)
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

        // dispatch(addToCart({ id, name, price, img, qty: 1 }));

    }



    return (
        <>
            {dish.map((food, index) => (
                <div key={index} className='w-80  mt-5 bg-white shadow-2xl px-12 py-10 flex flex-col items-center gap-1 rounded-md hover:scale-105 transition-all duration-200 relative max-tablat:w-72 max-tablat:px-6  '>
                    <div className='w-60  h-32 mb-4'>
                        <img src={food.img} alt="" className='w-full h-full' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex justify-between items-center'>
                            <h4 className='font-poppins font-bold text-lg '>{food.name}</h4>
                            <p className='font-roboto text-bgPrimary font-bold text-md '>₹{food.price}</p>
                        </div>

                        <div>
                            <p className='text-textPrimary'>{food.desc.slice(0, 60)}...</p>
                        </div>

                        <div className='flex justify-between items-center ' >
                            <div className='flex items-center'>
                                <AiFillStar className="mr-1 text-yellow-400 text-xl" />
                                <div className='font-bold text-lg'>{food.rating}</div>
                            </div>
                            <button className='bg-bgPrimary text-white py-1 px-1 rounded-md text-3xl hover:cursor-pointer' onClick={() => handleAdd(food.id, food.name, food.price, food.img)}><MdAdd /></button>
                        </div>
                    </div>

                    <MdFavorite onClick={() => handleLike(food._id, food.id, food.name, food.price, food.img, food.rating, food.isLike)} className={`absolute right-3 top-3 hover:cursor-pointer  text-2xl ${favorite.find((item => item.id === food.id)) ? 'text-red-700' : 'text-gray-300'}`} />

                </div>
            ))
            }
        </>
    )
}

export default FoodCard