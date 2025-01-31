import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { programActionStatus, programMenus, roleName, statusAction } from '../../utils/constant';

import UserImage from "../../assets/icons/user-icon.svg";
import EditIcon from '../../assets/icons/editIcon.svg';
import RightArrow from '../../assets/icons/rightArrow.svg'

export default function UserInfoCard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo)
    const { profile, loading } = useSelector(state => state.profileInfo)
    const [hoverIndex, setHoverIndex] = useState(false)
    const userprograms = useSelector(state => state.userPrograms)

    const [programMenusList, setProgramMenusList] = useState([])
    const [searchParams] = useSearchParams();

    const role = userInfo.data.role


    useEffect(() => {

        const totalCount = role === 'mentor' ? userprograms.statusCounts : userprograms.programsCounts
        if (Object.keys(totalCount).length) {
            const programMenu = [...programMenus('dashboard')].filter(men => men.for.includes(role)).map(menu => {

                if (menu.status === 'all') {
                    return { ...menu, count: role === 'mentor' ? userprograms.totalPrograms : totalCount?.allprogram }
                }
                // Mentor Response Count
                if (role === 'mentor' && statusAction.includes(menu.status)) {
                    return { ...menu, count: totalCount[menu.mentorStatus] }
                }

                // Mentee Response Count
                if (role === 'mentee') {
                    return { ...menu, count: totalCount[menu.menteeStatus] }
                }
                // Admin Response Count
                if (role === 'admin') {
                    return { ...menu, count: totalCount[menu.menteeStatus] }
                }

                return menu

            })
            setProgramMenusList(programMenu)
        }

    }, [userprograms])

    return (
        <div className="">
            <div className="pb-3 w-full max-w-sm bg-white rounded-lg" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', background: 'rgba(255, 255, 255, 1)' }}>
                <div className="flex flex-col items-center pb-10 pt-14 border-b-2 relative">
                    {
                        !loading &&
                        <img className={`w-24 h-24 mb-3 rounded-full shadow-lg object-cover cursor-pointer ${hoverIndex ? 'opacity-20' : ''}`}
                        onMouseEnter={() => setHoverIndex(true)} onMouseLeave={() => setHoverIndex(false)}
                        onClick={() => navigate('/profile?mode=edit')} src={profile?.image || UserImage} alt="User logo" />
                    }


                    <div className={`absolute top-[30%] left-[40%] cursor-pointer  ${hoverIndex ? 'show' : 'hidden'}`} style={{ background: '#fff', borderRadius: '50%', padding: '13px 15px' }}
                        onClick={() => navigate('/profile?mode=edit')} onMouseEnter={() => setHoverIndex(true)} 
                        onMouseLeave={() => setHoverIndex(false)}
                    >
                        <img className="h-[25px] w-[22px]" src={EditIcon} alt="EditIcon" />
                    </div>

                    <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                        {userInfo?.data?.first_name} {userInfo?.data?.last_name}
                    </h5>
                    <span className="text-sm text-gray-500 " style={{ textTransform: 'capitalize' }}>
                        {roleName[userInfo.data.role]} 
                        {/* | {role === 'mentee'?"Student":role === 'mentor'?"Teaching Professional":role === 'admin'?"Organizational Admin":""} */}
                    </span>
                </div>

                <ul className="flex flex-col gap-2 p-4 md:p-0 mt-4 font-medium">
                    {
                        programMenusList.map((menu, index) => {
                            if (index > 3) return null
                            return (
                                <li className="" key={index}>
                                    <div className={`flex justify-between py-2 px-6 rounded cursor-pointer menu-content 
                                            ${searchParams.get("type") === menu.status
                                            || (searchParams.get("is_bookmark") === 'true' && menu.status === programActionStatus.bookmark)
                                            || (searchParams.get("type") === programActionStatus.planned && menu.status === programActionStatus.yettojoin)
                                            || (searchParams.get("type") === null && searchParams.get("is_bookmark") === null && menu.status === programActionStatus.all) ? 'active' : ''}`} aria-current="page"
                                        onClick={() => navigate(menu.page)}>
                                        <span className="text-sm">{menu.name}</span>
                                        <span className="text-base">{menu.count > 0 ? menu.count : ''}</span>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>
                <div className="flex justify-center mt-5 mb-2">
                    <button className="text-white flex justify-center items-center gap-3 px-4 py-3 text-[12px] !bg-background-primary-main"
                        style={{ borderRadius: '3px', }}
                        onClick={() => navigate('/programs')}
                    >
                        <span>View All</span>
                        <img src={RightArrow} alt={'RightArrow'} />
                    </button>
                </div>
            </div>
        </div>
    )
}
