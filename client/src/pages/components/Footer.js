import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarkDashFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'

function Footer() {
    return (
        <div className='px-4'>
            <div className=' flex items-center justify-between mt-2'>
                < AiFillHome className='text-gray-400 text-3xl' />
                < BsFillBookmarkDashFill className='text-gray-400 text-2xl' />
                < FaUserCircle className='text-gray-400 text-2xl' />
            </div>
        </div>

    )
}

export default Footer