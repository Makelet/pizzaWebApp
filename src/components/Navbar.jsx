import React, { useEffect, useState } from 'react'
import Icon from '../assets/svg_.svg'
import { LuLayoutPanelLeft } from "react-icons/lu";
import { FaConciergeBell } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addDish, removeDish } from '../store/DishSlice';

const Navbar = () => {
    let dispatch = useDispatch();

    let [show, setShow] = useState(false);
    let [inputVal, setInputVal] = useState("");
    console.log(inputVal);

    useEffect(() => {
        if (inputVal != "") {
            axios.get('http://localhost:3000/find?name=' + inputVal)
                .then((res) => {
                    console.log(res);
                    dispatch(removeDish());
                    dispatch(addDish(res.data));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [inputVal])


    return (
        <>
            <header className={`bg-white border-b-2 border-gray-200 shadow-md flex items-center justify-between pl-8 pr-16 py-4 absolute right-0 top-0 -z-20 w-95p  transition-all ease-in-out duration-700 max-lg:-right-6  max-md:-right-5 max-tablat-sm:-right-9 max-mobile-l:flex-col max-mobile-l:h-40`}>
                <div className='font-roboto text-center'>
                    <h6 className='text-sm text-iconPrimary'>Customer</h6>
                    <h4 className='text-lg font-bold text-textPrimary'>Welcome Back!</h4>
                </div>
                <div className='bg-red-400 w-96 max-lg:w-72'>
                    <input type="text" placeholder='Search Here' className='w-full py-1 px-6 outline-none bg-gray-100 ' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
                </div>
                <div className='w-20 flex gap-3 text-lg justify-between text-iconPrimary'>
                    <i className="fas fa-bell"></i>
                    <i className="fas fa-cog"></i>
                    <i className="fas fa-user-circle"></i>
                </div>
            </header>

            {/* //sidebar */}
            <div className={`${show ? 'translate-x-0' : 'translate-x-400'} bg-white  min-h-screen w-72 px-4 py-4 border-b-2 border-gray-200 shadow-md border-r-2 transition-all ease-in-out duration-700 flex flex-col gap-y-8 fixed left-0 top-0 z-30  max-mobile-l:z-10`}>
                <div className='w-full h-12 flex items-center justify-between py-8 border-b-2'>
                    <h2 className={`text-2xl font-bold text-orange-500 ${show ? 'translate-x-0' : 'translate-x-400'}  transition-all ease-in-out duration-700`}>LetsMeal</h2>
                    <img src={Icon} className={`h-5 ${show ? 'translate-x-0' : 'translate-x-400'}  transition-all ease-in-out duration-700`} />
                    <i className={`fas ${show ? 'fa-step-backward' : 'fa-step-forward'} text-2xl bg-gray-200 py-1 px-3 rounded-lg hover:cursor-pointer`} onClick={() => setShow(!show)}></i>
                </div>

                <div className='flex gap-x-3 text-textPrimary'>
                    <Link to='/' className='flex gap-x-3 text-textPrimary'>
                        <LuLayoutPanelLeft className={`text-2xl ${show ? 'translate-x-0' : 'translate-x-54'} transition-all ease-in-out duration-700`} />
                        <h4 className={`text-md ${show ? 'translate-x-0' : 'translate-x-400'}  transition-all ease-in-out duration-700`}>Overview</h4>
                    </Link>
                </div>
                <div className='flex gap-x-3 text-textPrimary'>
                    <FaConciergeBell className={`text-2xl ${show ? 'translate-x-0' : 'translate-x-54'}  transition-all ease-in-out duration-700`} />
                    <h4 className={`text-md ${show ? 'translate-x-0' : 'translate-x-400'}  transition-all ease-in-out duration-700`}> Food Order</h4>
                </div>
                <div className='flex gap-x-3 text-textPrimary'>
                    <Link to='/favorite' className='flex gap-x-3 text-textPrimary'>
                        <MdFavorite className={`text-2xl ${show ? 'translate-x-0' : 'translate-x-54'}  transition-all ease-in-out duration-700`} />
                        <h4 className={`text-md ${show ? 'translate-x-0' : 'translate-x-400'}  transition-all ease-in-out duration-700`}>Favorite</h4>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar