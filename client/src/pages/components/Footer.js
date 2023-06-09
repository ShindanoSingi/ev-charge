import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarkDashFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='flex justify-around h-[7%] items-center fixed bottom-1 w-full p-2 bg-[#262A34]'>
            <Link to='/'>
                < AiFillHome className='text-gray-400 text-[1.9rem]' />
            </Link>

            < BsFillBookmarkDashFill className='text-gray-400 text-[1.5rem]' />
            <Link to='/user'>
                < FaUserCircle className='text-gray-400 text-[1.8rem]' />
            </Link>
        </div>
    )
}

export default Footer