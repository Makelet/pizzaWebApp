import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AiFillStar } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { addToFavorite, removeFavorite } from '../store/FavoriteSlice';

const Favorite = () => {

    let favorite = useSelector(state => state.favorite.favorite);
    console.log(favorite);
    let dispatch = useDispatch();
    const handleLike = (id, name, price, img, rating, like) => {
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

    return (
        <div className=' bg-bgColor py-12 px-8 h-screen w-94p absolute top-20 left-20 flex flex-col '>
            <div className='m-5'>
                <h1 className='text-6xl text-textPrimary font-bold'>Favorites</h1>
            </div>
            <div className=' flex flex-wrap gap-y-20 gap-x-32'>
                {favorite.map((food) => (
                    <div key={food.id} className='w-80  mt-5 bg-white shadow-2xl px-12 py-10 flex flex-col items-center gap-1 rounded-md hover:scale-105 transition-all duration-200 relative'>
                        <div className='w-60  h-32 mb-4'>
                            <img src={food.img} alt="" className='w-full h-full' />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>
                                <h4 className='font-poppins font-bold text-lg '>{food.name}</h4>
                                <p className='font-roboto text-bgPrimary font-bold text-md '>₹{food.price}</p>
                            </div>

                            {/* <div>
                                <p className='text-textPrimary'>{food.desc.slice(0, 60)}...</p>
                            </div> */}

                            <div className='flex justify-between items-center ' >
                                <div className='flex items-center'>
                                    <AiFillStar className="mr-1 text-yellow-400 text-xl" />
                                    <div className='font-bold text-lg'>{food.rating}</div>
                                </div>
                                <button className='bg-bgPrimary text-white py-1 px-1 rounded-md text-3xl hover:cursor-pointer' onClick={() => handleAdd(food.id, food.name, food.price, food.img)}><MdAdd /></button>
                            </div>
                        </div>

                        <MdFavorite className={`absolute right-3 top-3 text-2xl hover:cursor-pointer ${favorite.find((item => item.id === food.id)) ? 'text-red-700' : 'text-gray-500'}`} onClick={() => handleLike(food.id)} />
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Favorite