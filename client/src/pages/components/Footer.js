import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsFillBookmarkDashFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='px-4 absolute bottom-2 w-full'>
            <div className=' flex items-center justify-between mt-2'>
                <Link to='/'>
                    < AiFillHome className='text-gray-400 text-[1.9rem]' />
                </Link>

                < BsFillBookmarkDashFill className='text-gray-400 text-[1.5rem]' />
                <Link to='/user'>
                    < FaUserCircle className='text-gray-400 text-[1.8rem]' />
                </Link>

            </div>
        </div>

    )
}

export default Footer