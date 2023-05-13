import React from 'react'
import { useDispatch, useSelector } from 'react-redux';



function Station() {
    const { apiStation } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    console.log(apiStation);
    return (
        <div className='text-white'>Station</div>
    )
}

export default Station