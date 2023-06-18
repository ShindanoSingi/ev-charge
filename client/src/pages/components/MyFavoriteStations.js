import React from 'react'
import { useSelector } from 'react-redux';

function MyFavoriteStations() {
    const { myFavoriteStations } = useSelector((state) => state.userReducer);
    console.log(myFavoriteStations);

    return (
        <div className='max-h-[100%] mt-[8.9rem] overflow-scroll'>
            MyFavoriteStations
        </div>
    )
}

export default MyFavoriteStations