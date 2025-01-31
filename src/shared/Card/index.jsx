import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { programActionStatus } from '../../utils/constant';
import { useSelector } from 'react-redux';

export default function Card({ cardTitle, cardContent, cardFilter = [], cardCountColor = '#000', handleClick, activeItem = '', menuNavigate = undefined }) {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const userInfo = useSelector(state => state.userInfo)
    const role = userInfo.data.role || ''
    const handleNavigate = (menu) => {
        if (menuNavigate) {
            menuNavigate()
        }
        if (role === 'mentee' && menu?.menteePage) {
            navigate(menu.menteePage)
        } else {
            navigate(menu.page)
        }
    }
    return (
        <div className="pb-3" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2">
                <h4 className="text-base" style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600 }}>{cardTitle}</h4>
                {cardFilter.length ?
                    <p className="text-sm leading-8">
                        <select className='focus:outline-none py-1' style={{ background: 'rgba(217, 228, 242, 1)', border: 'none' }}>
                            {
                                cardFilter.map((filter, index) =>
                                    <option key={index}>{filter.name}</option>
                                )
                            }
                        </select>
                    </p>
                    :
                    null
                }
            </div>
            {/* <ul className="flex flex-col gap-4 p-4 md:p-0 mt-4 font-medium">
                {
                    cardContent.map((menu, index) => <li className="" key={index}>
                        <div onClick={() => menu.page ? handleNavigate(menu) : handleClick ? handleClick(menu) : undefined}
                            className={`flex justify-between py-2 px-6 rounded cursor-pointer menu-content 
                            ${searchParams.get("type") === menu.status || activeItem === menu.status || searchParams.get("type") === menu?.key ||
                                    (searchParams.get("is_bookmark") !== null && menu.status === programActionStatus.bookmark) ||
                                    (searchParams.get("type") === 'planned' && menu.status === 'yettojoin') ||
                                    (searchParams.get("type") === null && searchParams.get("is_bookmark") === null && menu.status === 'all' && userInfo?.data?.is_registered) ||
                                    (searchParams.get("type") === null && searchParams.get("is_bookmark") === null && menu.status === programActionStatus.yettojoin && role === 'mentee' && !userInfo?.data?.is_registered) ? 'active' : ''}`} aria-current="page">
                            <span className="text-sm">{menu.name}</span>
                            <span className="text-base" style={{ color: cardCountColor }}>{menu.count > 0 ? menu.count : ''}</span>
                        </div>
                    </li>)
                }
            </ul> */}

            <ul className="flex flex-col gap-4 p-4 md:p-0 mt-4 font-medium">
                {
                    cardContent.map((menu, index) => <li className="" key={index}>
                        <div onClick={() => menu.page ? handleNavigate(menu) : handleClick ? handleClick(menu) : undefined}
                            className={`flex justify-between py-2 px-6 rounded cursor-pointer menu-content 
                            ${searchParams.get("type") === menu.status || activeItem === menu.status || searchParams.get("type") === menu?.key || (role === "mentee" && (searchParams.get("type") === menu?.menteeStatus)) ||
                                    (searchParams.get("is_bookmark") !== null && menu.status === programActionStatus.bookmark) ||
                                    (searchParams.get("type") === 'planned' && menu.status === 'yettojoin') ||
                                    (searchParams.get("type") === null && searchParams.get("is_bookmark") === null && menu.status === 'all' && userInfo?.data?.is_registered) ||
                                    (searchParams.get("type") === null && searchParams.get("is_bookmark") === null && menu.status === programActionStatus.yettojoin && role === 'mentee' && !userInfo?.data?.is_registered) ? 'active' : ''}`} aria-current="page">
                            <span className="text-sm">{menu.name}</span>
                            <span className="text-base" style={{ color: cardCountColor }}>{menu.count > 0 ? menu.count : ''}</span>
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}
