import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import FoodData from '../FoodData/FoodData'
import { IoCartSharp } from "react-icons/io5";
import FoodList from '../components/FoodList';
import Cart from '../components/Cart';
import axios from 'axios';
import { addToCart } from '../store/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDish, removeDish } from '../store/DishSlice';

const Home = () => {
    let dispatch = useDispatch();
    let dish = useSelector((state => state.dish.dish));


    const handleAllData = () => {
        axios.get('http://localhost:3000/all')
            .then((res) => {
                // console.log(cart);
                // console.log(res);
                dispatch(removeDish());
                dispatch(addDish(res.data));
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const handleLunchData = () => {
        axios.get('http://localhost:3000/lunch')
            .then((res) => {
                dispatch(removeDish());
                dispatch(addDish(res.data));
            })
            .catch((err) => {
                console.log(err);
            })

    }
    const handleDinnerData = () => {
        axios.get('http://localhost:3000/dinner')
            .then((res) => {
                dispatch(removeDish());
                dispatch(addDish(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleBreakfastData = () => {
        axios.get('http://localhost:3000/breakfast')
            .then((res) => {
                dispatch(removeDish());
                dispatch(addDish(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleSnacksData = () => {
        axios.get('http://localhost:3000/snacks')
            .then((res) => {
                dispatch(removeDish());
                dispatch(addDish(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        handleAllData();
    }, []);

    let [isShowMenu, setIsShowMenu] = useState(false);

    return (
        <div className='App w-94p  bg-bgColor py-12 px-8 max-mobile-l:top-40 '>
            <Hero />


            <div className='mt-8'>
                <div>
                    <h1 className='text-3xl font-bold text-textPrimary'>Find the best deals</h1>
                </div>
                <div className='px-0 py-2 flex mt-1 gap-4 max-mobile-l:overflow-x-scroll'>
                    <button className='bg-bgPrimary px-5 py-2 rounded-md font-roboto font-bold text-white tracking-wider' onClick={handleAllData}>All</button>
                    <button className='bg-bgPrimary px-5 py-2 rounded-md font-roboto font-bold text-white tracking-wider' onClick={handleLunchData}>Lunch</button>
                    <button className='bg-bgPrimary px-5 py-2 rounded-md font-roboto font-bold text-white tracking-wider' onClick={handleBreakfastData}>Breakfast</button>
                    <button className='bg-bgPrimary px-5 py-2 rounded-md font-roboto font-bold text-white tracking-wider' onClick={handleDinnerData}>Dinner</button>
                    <button className='bg-bgPrimary px-5 py-2 rounded-md font-roboto font-bold text-white tracking-wider' onClick={handleSnacksData}>Snacks</button>
                </div>
            </div>


            <FoodList demo={{ isShowMenu, setIsShowMenu }} />



            <Cart demo={{ isShowMenu, setIsShowMenu }} />



            <IoCartSharp className='fixed right-10 bottom-10 text-5xl   bg-white p-2 rounded-full cursor-pointer hover:animate-bounce z-20' onClick={() => setIsShowMenu(!isShowMenu)} />
        </div >
    )
}

export default Home