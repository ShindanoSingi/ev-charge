import React from 'react'
import { Link } from 'react-router-dom';
import { FaRoute } from 'react-icons/fa';
import { IoMapSharp } from 'react-icons/io5';

function TwoButtons() {
    return (
        <div className='flex gap-4 absolute top-[83%] left-[65%] z-50'>
            <Link to='/map'>
                <div className='bg-green rounded-full h-11 w-11  p-2 items-center flex'>
                    <IoMapSharp className='text-white text-3xl ' />
                </div>
            </Link>
            <Link to='/'>
                <div className='bg-green rounded-full h-11 w-11  p-2 items-center flex'>
                    <FaRoute className='text-white text-3xl ' />
                </div>
            </Link>
        </div>
    )
}

export default TwoButtons