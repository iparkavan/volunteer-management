import React, { useEffect } from 'react'
import { recentActivities } from '../../utils/mock'
import { useDispatch, useSelector } from 'react-redux';
import { getRecentGoalActivity } from '../../services/goalsInfo';
import { activityStatusColor } from '../../utils/constant';
import Tooltip from '../../shared/Tooltip';

export default function RecentActivities() {
    const { goalActivity } = useSelector(state => state.goals)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecentGoalActivity())
    }, [])

    return (
        <div className="recent-activities pb-3" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2">
                <h4 className="text-base">Recent Activities</h4>
                {/* { goalActivity.length ? <p className="text-sm leading-8">View All</p> : null } */}
            </div>

            {
                goalActivity.length ?
                    <div className="program-status flex items-center flex-col justify-center w-max py-4 px-4">
                        {
                            goalActivity.map((recentActivity) =>
                                <div className="flex items-center flex-col relative" key={recentActivity.id}>
                                    <div className="absolute top-0 left-full ml-4 w-max">
                                        <Tooltip title={recentActivity.goal_name}>
                                            <p className="activity-name text-[14px]" >{recentActivity.goal_name}</p>
                                        </Tooltip>
                                        <Tooltip title={recentActivity.action_message}>
                                            <h6 className="text-[10px] activity-msg" style={{ color: activityStatusColor[recentActivity.action] }}>{recentActivity.action_message}</h6>
                                        </Tooltip>
                                    </div>
                                    <div className="timeline absolute lg:right-[-227px] md:right-[-227px] sm:right-[-200px] text-[10px]">{recentActivity.time_since_action}</div>
                                    <div
                                        className="w-8 h-3  mx-[-1px]  flex items-center justify-center">
                                        <span className="w-3 h-3  rounded-full" style={{ background: activityStatusColor[recentActivity.action] }}></span>
                                    </div>
                                    <div className="w-1 h-16 " style={{ background: 'rgba(0, 174, 189, 1)' }}></div>
                                </div>
                            )
                        }
                    </div>
                    : 

                    <div className='flex justify-center items-center py-5'>
                        There is no recent activities
                    </div>
            }

        </div>
    )
}
