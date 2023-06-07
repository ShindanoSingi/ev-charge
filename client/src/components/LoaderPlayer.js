import React from 'react'

function LoaderPlayer() {
    return (
        <div className='bg-cyan-400 content' style={{ height: '74vh', width: '100vw', marginTop: "7.6rem" }}>
            <div className="content">
                <div className="player_one"></div>
                <div className="player_two"></div>
                <div className="ball"></div>
            </div>
        </div>
    )
}

export default LoaderPlayer