import React from 'react'

function LoaderPlayer() {
    return (
        <div className='bg-gray-600 grid place-content-center' style={{ width: '100vw', marginTop: "7.4rem" }}>
            <div className='flex flex-col items-center'>
                <div className='absolute top-[15rem] text-xl text-gray-400'>Please search for an EV station</div>
                <div className='absolute left-[70%] top-[20rem]'>
                    <div className="player_one"></div>
                    <div className="player_two"></div>
                    <div className="ball"></div>
                </div>
            </div>
        </div>
    )
}

export default LoaderPlayer