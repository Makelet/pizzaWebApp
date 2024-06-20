import React from 'react'
import Img from '../assets/hero.png'
const Hero = () => {
    return (
        <div className='w-full '>
            <div className='bg-bgPrimary w-full p-8 rounded-xl flex items-center justify-between '>
                <div className='text-white max-lg:text-center'>
                    <h2 className='text-4xl font-roboto font-bold'>Get Up To 20% Discount On <br />Your First Order</h2>
                    {/* <h2></h2> */}
                    <p className='text-lg mt-4'>Get the absolute best out of the main dishes that are prepared by the top 1%<br /> of chefs around the world. Don't hesitate to get started now!</p>
                </div>
                <div className='w-1/5'>
                    <img src={Img} className='max-lg:hidden' alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero