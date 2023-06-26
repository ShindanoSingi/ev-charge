import React from 'react'

function LoaderPlayer() {
    return (
        <div className='center flex flex-col gap-[1rem] justify-center items-center'>
            <div className='text-lg text-center w-screen md:text-2xl text-gray-400'>Please search for an EV station</div>
            <div className=''>
                <div className="player_one"></div>
                <div className="player_two"></div>
                <div className="ball"></div>
            </div>
        </div>
    )
}

export default LoaderPlayer