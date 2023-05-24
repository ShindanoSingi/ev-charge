import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarkDashFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='px-4 py-1 w-full flex items-center justify-between'>
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