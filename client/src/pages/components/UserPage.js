import React from 'react'
import { useSelector } from 'react-redux';

function UserPage() {
    const { user } = useSelector((state) => state.userReducer);
    return (
        <div className='h-[80%] w-screen mt-[8.9rem] overflow-scroll'>
            {user}
        </div>
    )
}

export default UserPage