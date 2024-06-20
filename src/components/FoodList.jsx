import React from 'react'
import FoodCard from './FoodCard'

const FoodList = ({ demo }) => {
    return (
        <div className='flex  flex-wrap gap-x-20 gap-y-12  max-tablat-sm:gap-x-12 max-tablat-sm:justify-center max-tablat-vsm:gap-x-5 max-tablat-vsm:gap-y-5'>
            <FoodCard demo={demo} />
        </div>
    )
}

export default FoodList