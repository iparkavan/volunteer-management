import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';

import Carousel from "../../shared/Carousel";
import FilterIcon from '../../assets/icons/Filter.svg';
import MoreIcon from '../../assets/icons/moreIcon.svg'
import ProgramImage from "../../assets/images/logo_image.jpg";
import BookmarkedIcon from '../../assets/icons/Bookmarked.svg'
import BookmarkedColorIcon from '../../assets/images/bookmarked-colour1x.png'
import CalenderIcon from '../../assets/icons/Calender.svg';
import StarColorIcon from '../../assets/icons/starColor.svg';


export default function DashboardCard({ title, viewpage, handleNavigateDetails, handleBookmark, programs, height, action = [] }) {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userInfo = useSelector(state => state.userInfo)
    const role = userInfo.data.role
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (

        <div className='main-program' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px', height: role === 'mentee' && !height ? '528px' : height ? height : 'auto' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                <div className="flex gap-4">
                    <div className="card-dash !bg-background-primary-main !border !border-background-primary-main"></div>
                    <h4>{title}</h4>
                    <img src={FilterIcon} alt="statistics" />
                </div>
                {
                    programs && programs.length ?

                        <p className="text-[12px] py-2 px-2 cursor-pointer !bg-background-primary-light !text-background-primary-main rounded-[3px]"
                            onClick={() => navigate(viewpage)}
                        >View All</p>

                        : null
                }

                {
                    action && action.length ?
                        <>
                            <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e)}>
                                <img src={MoreIcon} alt='MoreIcon' />
                            </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                {
                                    action.map((act, i) =>
                                        <MenuItem key={i} onClick={() => navigate(act.url)} className='!text-[12px]'>
                                            {act.icon && <img src={act.icon} alt="Icon" className='pr-3 w-[30px]' />}
                                            {act.name}
                                        </MenuItem>
                                    )
                                }
                            </Menu>
                        </>

                        : null

                }

            </div>

            <div className="py-3 px-3 ">
                {
                    programs && programs.length > (getWindowDimensions().width <= 1536 ? 2 : 3) ?

                        <Carousel slideCount={getWindowDimensions().width <= 1536 ? 2 : 3}>
                            {
                                programs && programs.map((curatedProgram, index) => {
                                    let startDate = ''
                                    if (curatedProgram.start_date !== '') {
                                        startDate = new Date(curatedProgram.start_date).toISOString().substring(0, 10).split("-")
                                    }
                                    const actualStartDate = startDate.length ? `${startDate[2]}/${startDate[1]}/${startDate[0]}` : ''

                                    return (
                                        <div key={index} className="curated-programs program-container flex gap-0 items-center py-8 px-5 w-2/5">

                                            <div className="w-full" style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                                <div className="flex py-6 px-7 border-b-2 relative gap-3">
                                                    <div className="w-6/12 h-full">
                                                        <img className="object-cover w-full h-[150px]" src={curatedProgram.image} alt="Program Logo" />
                                                    </div>
                                                    <div className="flex flex-col gap-3 w-[80%]">
                                                        <p className="py-1 px-1 text-[12px] text-center rounded-3xl w-[90px]" style={{ border: '1px solid rgba(238, 238, 238, 1)' }}>{curatedProgram?.categories[0]?.name}</p>
                                                        <h4 className="text-[16px]">{curatedProgram.program_name}</h4>
                                                        <span className="text-[12px] line-clamp-2">{curatedProgram.description}</span>

                                                        <div className='flex gap-2 text-[12px]'>
                                                            <img src={StarColorIcon} alt="StarColorIcon" />
                                                            <span>4.6</span>
                                                            <span style={{ borderRight: '1px solid #18283D' }}></span>
                                                            <span style={{
                                                                textOverflow: 'ellipsis', overflow: 'hidden',
                                                                width: '215px', whiteSpace: 'nowrap'
                                                            }}>Instructor : {curatedProgram?.mentor_name}</span>
                                                        </div>


                                                        <button className="text-white text-[12px] py-2 w-[90px]" style={{ background: 'rgba(29, 91, 191, 1)', borderRadius: '5px' }}

                                                            onClick={() => handleNavigateDetails(curatedProgram)}
                                                        >View Details</button>
                                                    </div>
                                                    <img className="absolute top-4 right-4 cursor-pointer" onClick={() => handleBookmark(curatedProgram)} src={curatedProgram.bookmark ? BookmarkedColorIcon : BookmarkedIcon} alt="BookmarkedIcon" />
                                                </div>


                                                <div className="flex justify-between pb-3 mx-4 my-4 items-center">
                                                    <div className="flex text-[12px] gap-4 items-center">
                                                        <img src={CalenderIcon} alt="CalendarImage" />
                                                        <span>{actualStartDate}</span>
                                                        <div
                                                            className="w-[6px] h-[6px]  mx-[-1px]  flex items-center justify-center">
                                                            <span className="w-[6px] h-[6px]  rounded-full" style={{ background: 'rgba(0, 0, 0, 1)' }}></span>
                                                        </div>

                                                        <span>{'10 A.M (GMT + 7)'}</span>
                                                    </div>
                                                    <div className="text-[12px] px-2 py-2" style={{ background: 'rgba(241, 241, 241, 1)', borderRadius: '3px' }}>{'10 Mins ago'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                )
                            }
                        </Carousel>
                        :
                        <div className="flex">
                            {
                                programs.length ?

                                    programs.map((currentProgram, index) => {
                                        let startDate = ''
                                        if (currentProgram.start_date !== '') {
                                            startDate = new Date(currentProgram.start_date).toISOString().substring(0, 10).split("-")
                                        }
                                        const actualStartDate = startDate.length ? `${startDate[2]}/${startDate[1]}/${startDate[0]}` : ''

                                        return (
                                            <div key={index} className={`curated-programs program-container flex gap-1 items-center py-8 px-5 
                                                            ${getWindowDimensions().width <= 1536 ? 'w-2/5' : 'w-1/3'}`}>

                                                <div className="w-full" style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                                    <div className="flex  gap-4 py-6 px-7 border-b-2 relative">
                                                        <div className="w-6/12 h-full">
                                                            <img className="object-cover w-full h-[150px]" src={currentProgram.image} alt="Program Logo" />
                                                        </div>
                                                        <div className="flex flex-col gap-3">
                                                            {
                                                                currentProgram?.categories.length &&
                                                                <p className="py-1 px-1 text-[12px] text-center rounded-3xl w-[90px]"
                                                                    style={{ border: '1px solid rgba(238, 238, 238, 1)' }}>{currentProgram?.categories[0]?.name}</p>
                                                            }

                                                            <h4 className="text-[16px]">{currentProgram.program_name}</h4>
                                                            <span className="text-[12px] line-clamp-2 ">{currentProgram.description}</span>
                                                            <div className='flex gap-2 text-[12px]'>
                                                                <img src={StarColorIcon} alt="StarColorIcon" />
                                                                <span>4.6</span>
                                                                <span style={{ borderRight: '1px solid #18283D' }}></span>
                                                                <span style={{
                                                                textOverflow: 'ellipsis', overflow: 'hidden',
                                                                width: '215px', whiteSpace: 'nowrap'
                                                            }}>Instructor : {currentProgram?.mentor_name}</span>
                                                            </div>
                                                            <button className="text-white text-[12px] py-2 w-[90px]"
                                                                onClick={() => handleNavigateDetails(currentProgram)}
                                                                style={{ background: 'rgba(29, 91, 191, 1)', borderRadius: '5px' }}>View Details</button>
                                                        </div>
                                                        <img className="absolute top-4 right-4 cursor-pointer"
                                                            onClick={() => handleBookmark(currentProgram)}
                                                            src={currentProgram.bookmark ? BookmarkedColorIcon : BookmarkedIcon} alt="BookmarkedIcon" />
                                                    </div>


                                                    <div className="flex justify-between pb-3 mx-4 my-4 items-center">
                                                        <div className="program-time-info flex text-[12px] gap-4 items-center">
                                                            <img src={CalenderIcon} alt="CalendarImage" />
                                                            <span className='program-date'>{actualStartDate}</span>
                                                            <div
                                                                className="w-[6px] h-[6px]  mx-[-1px]  flex items-center justify-center">
                                                                <span className="w-[6px] h-[6px]  rounded-full" style={{ background: 'rgba(0, 0, 0, 1)' }}></span>
                                                            </div>

                                                            <span className='program-time'>{'10 A.M (GMT + 7)'}</span>
                                                        </div>
                                                        <div className="posted-time text-[12px] px-2 py-2" style={{ background: 'rgba(241, 241, 241, 1)', borderRadius: '3px' }}>{'10 Mins ago'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                    )
                                    : <div>No Programs found</div>
                            }

                        </div>
                }
            </div>
        </div>

    )
}
