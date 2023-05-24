import React from 'react'
import { useDispatch, useSelector } from 'react-redux';



function Station() {
    const { apiStation } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    console.log(apiStation);
    return (
        <div className='text-white h-[50%] w-[100vw] px-4'>
            <div className='bg-green h-[15%] w-[100%]'>dsdsdsdsd</div>
            <div className='bg-yellow-200 h-[90%] w-full'></div>
        </div>
    )
}

export default Station