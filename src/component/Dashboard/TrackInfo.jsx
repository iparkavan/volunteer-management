import React from 'react'
import TrackImage from '../../assets/images/track_program.png'

export default function TrackInfo() {
    return (
        <div className='track-info' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className='flex flex-col justify-center items-center gap-7 py-10 px-6'>
                <img src={TrackImage} alt="TrackImage" />
                <p>Track your current program reports</p>
                <button className='text-white py-2 px-7' style={{ background: 'rgba(0, 174, 189, 1)', borderRadius: '5px' }}>Track here</button>
            </div>
        </div>
    )
}
