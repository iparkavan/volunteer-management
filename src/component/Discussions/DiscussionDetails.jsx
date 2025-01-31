import React, { useState } from 'react'
import SearchIcon from '../../assets/icons/search.svg';
import UserIcon from '../../assets/images/user.jpg';
import ArrorRight from '../../assets/icons/arrowRightColor.svg';
import VideoIcon from '../../assets/icons/Videocall.svg';
import MenuIcon from '../../assets/icons/menu.svg';
import ChatSendIcon from '../../assets/icons/chatSend.svg'

export default function DiscussionDetails() {

    return (
        <div className='px-8 mt-10'>
            <div className='mb-5'>
                Discussions
            </div>
            <div className="grid grid-cols-7 gap-3 mb-10">
                <div className="col-span-2 flex flex-col gap-8">
                    <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', height: '880px' }}>
                        <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                            <div className="flex w-full gap-4 justify-between">
                                <h4>Messages</h4>
                                <img src={SearchIcon} alt='SearchIcon' />
                            </div>

                        </div>
                        <div className='py-4 px-6'>
                            {
                                Array.from({ length: 10 }, (_, i) => i + 1).map(i => {
                                    return (
                                        <div className='flex justify-between pb-6'>
                                            <div className="flex gap-4 create-post cursor-pointer" onClick={undefined}>
                                                <img className='user-image' src={UserIcon} alt="UserIcon" />
                                                <div>
                                                    <p>John Smith</p>
                                                    <p className='text-[12px]'>Student</p>
                                                </div>

                                            </div>
                                            <div className=''>
                                                <p className='text-[12px]'>2h ago</p>
                                                <p className='text-[12px] flex justify-end pt-1 items-center'
                                                >
                                                    <span style={{
                                                        background: 'linear-gradient(134.63deg, #1D5BBF 0.94%, #00AEBD 98.69%)', color: '#fff',
                                                        width: '20px',
                                                        textAlign: 'center',
                                                        borderRadius: '50%'
                                                    }}>5</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='border-b-2'></div>
                        <div>
                            <div className="flex justify-between items-center gap-4 create-post cursor-pointer py-4 px-4" onClick={undefined}>
                                <div className='flex gap-6 items-center'>
                                    <img className='user-image !w-[70px] !h-[70px]' src={UserIcon} alt="UserIcon" />
                                    <div>
                                        <p style={{ color: 'rgba(29, 91, 191, 1)', fontWeight: 500 }}>John Smith</p>
                                        <p className='text-[12px]'>Student</p>
                                    </div>
                                </div>
                                <div>
                                    <img src={ArrorRight} alt="ArrorRight" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-span-5">
                    <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', height: '880px', marginBottom: '20px' }}>

                        <div style={{ border: '1px solid rgba(219, 224, 229, 1)' }} className='py-5 px-8'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-4'>
                                    <img src={MenuIcon} alt="MenuIcon" className='cursor-pointer' />
                                    <div className="flex gap-4 create-post" onClick={undefined}>
                                        <img className='user-image' src={UserIcon} alt="UserIcon" />
                                        <div>
                                            <p>John Smith</p>
                                            <p className='text-[12px]'>Student</p>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <img src={VideoIcon} alt="VideoIcon" className='cursor-pointer' />
                                </div>

                            </div>
                        </div>

                        <div className='flex flex-col justify-between h-[89%]'>
                            <div className="position-relative">
                                <div className="chat-messages p-4">
                                    <div className="chat-message-right pb-4">
                                        <div>
                                            <div className="text-[12px] small text-nowrap mt-2">
                                                2hrs ago
                                            </div>
                                        </div>
                                        <div className="flex-shrink-1 right-bg rounded py-2 px-3 mt-3 text-[13px]">
                                            Hi  john!!
                                        </div>
                                        <div className="flex-shrink-1 right-bg rounded py-2 px-3 mt-3 text-[13px]">
                                            How can i asset you?
                                        </div>
                                    </div>
                                    <div className="chat-message-left pb-4">
                                        <div className='flex gap-2 items-center text-[12px] pb-3'>
                                            <img className='user-image !w-[40px] !h-[40px]' style={{ borderRadius: '50%', objectFit: 'cover' }} src={UserIcon} alt="UserIcon" />
                                            <p>John Smith</p>
                                            <div className="text-muted small text-nowrap pl-2">
                                                2hrs ago
                                            </div>
                                        </div>
                                        <div className="flex-shrink-1 left-bg rounded py-2 px-3 text-[13px]">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div style={{ border: '1px solid rgba(219, 224, 229, 1)', borderRadius: '6px' }} className='mx-4'>
                                <div className="input-group flex justify-between">
                                    <input
                                        type="text"
                                        className="form-control h-[90px] w-[90%] px-3 focus-visible:outline-none"
                                        placeholder="Type your message"

                                    />
                                    <img src={ChatSendIcon} className='pr-4 cursor-pointer' alt="ChatSendIcon" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )

}