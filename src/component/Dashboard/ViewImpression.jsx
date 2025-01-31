import React from 'react'
import { Impressions } from '../../utils/mock'

export default function ViewImpression() {
    return (
        <div className="pb-3" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2">
                <h4 className="text-base">Views and Impressions</h4>
                <p className="text-sm leading-8">Today</p>
            </div>
            <ul className="flex flex-col gap-1 p-4 md:p-0 mt-4 font-medium">
                {
                    Impressions.map((menu, index) => 
                    <li className="" key={index}>
                        <div className="flex justify-between py-2 px-6 rounded" aria-current="page">
                            <span className="text-sm">{menu.name}</span>
                            <span className="text-base" style={{ color: 'rgba(0, 174, 189, 1)' }}>{menu.count}</span>
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}
