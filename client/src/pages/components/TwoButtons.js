import React from 'react'
import { Link } from 'react-router-dom';
import { FaRoute } from 'react-icons/fa';
import { IoMapSharp } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai'

function TwoButtons() {
    return (
        <div className='flex gap-4 fixed top-[90%] tablet-landscape:[top:75%] right-[4rem] z-50'>
            <Link to='/'>
                <div className='bg-green hover:bg-[#00aA90] rounded-full tablet-landscape:h-11 tablet-landscape:w-11 h-11 w-11 md:h-14 md:w-14 p-2 grid place-content-center'>
                    <AiFillHome className='text-white text-3xl ' />
                </div>
            </Link>
            <Link to='/map'>
                <div className='bg-green hover:bg-[#00aA90] rounded-full h-11 tablet-landscape:h-11 tablet-landscape:w-11 w-11 md:h-14 md:w-14 p-2 grid place-content-center'>
                    <IoMapSharp className='text-white text-3xl ' />
                </div>
            </Link>
            <Link to='/listStations'>
                <div className='bg-green hover:bg-[#00aA90] rounded-full h-11 tablet-landscape:h-11 tablet-landscape:w-11 w-11 md:h-14 md:w-14 p-2 grid place-content-center'>
                    <FaRoute className='text-white text-3xl ' />
                </div>
            </Link>
        </div>
    )
}

export default TwoButtons