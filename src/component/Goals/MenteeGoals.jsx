import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CalenderIcon from '../../assets/images/calender_1x.png';
import MoreIcon from '../../assets/icons/moreIcon.svg';
import ViewIcon from '../../assets/images/view1x.png';
import { mentorMenteeGoalsColumn } from '../../mock';
import { getGoalsHistory } from '../../services/goalsInfo';
import DataTable from '../../shared/DataGrid';
import { goalDataStatus, goalStatusColor } from '../../utils/constant';
import dayjs from 'dayjs';

export default function MenteeGoals() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [seletedItem, setSelectedItem] = useState({})
    const open = Boolean(anchorEl);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10
    })
    const [timeFrame, setTimeFrame] = React.useState("month")
    const [filterStatus, setFilterStatus] = React.useState("")

    const timeFrameList = [
        {
            label: "Month",
            value: "month"
        },
        {
            label: "Week",
            value: "week"
        },
        {
            label: "Day",
            value: "day"
        },
    ]

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { goalHistory } = useSelector(state => state.goals)

    const handleClick = (event, data) => {
        setSelectedItem(data)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menteeGoalsColumn = [
        ...mentorMenteeGoalsColumn,
        {
            field: 'completed_date',
            headerName: 'Completed Date',
            id: 1,
            flex: 1,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{`${params?.row?.completed_date ? dayjs(params?.row?.completed_date).format("DD-MM-YYYY") : "..."}`}</div>
            }
        },
        {
            field: 'period',
            headerName: 'Duration',
            id: 1,
            flex: 1,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{`${params?.row?.period} ${params?.row?.period === 1 ? 'Month' : 'Months'}`}</div>
            }
        },
        {
            field: 'goal_status',
            headerName: 'Status',
            id: 2,
            flex: 1,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full relative'>

                        <span className='w-[80px] flex justify-center h-[30px] px-7'
                            style={{
                                background: goalStatusColor[params.row.status]?.bg, lineHeight: '30px',
                                borderRadius: '3px', width: '110px', height: '34px', color: goalStatusColor[params.row.status]?.color,
                                fontSize: '12px'
                            }}>
                            {goalDataStatus[params.row.status]}
                        </span>

                    </div>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            id: 4,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e, params.row)}>
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
                        <MenuItem onClick={(e) => {
                            navigate(`/mentor-view-mentee-goal/${seletedItem.id}`);
                        }
                        } className='!text-[12px]'>
                            <img src={ViewIcon} alt="ViewIcon" field={params.id} className='pr-3 w-[30px]' />
                            View
                        </MenuItem>

                    </Menu>
                </>
            }


        },
    ]

    const getGoalList = (time_frame = timeFrame, status = filterStatus) => {
        dispatch(getGoalsHistory({
            status: status,
            created_by: "mentee",
            time_frame: time_frame,
            page: paginationModel?.page + 1,
            limit: paginationModel?.pageSize
        }))
    }

    const handleFilterMenteeGoals = (value) => {
        // dispatch(getMenteeGoals(value))
        setFilterStatus(value)
        getGoalList(timeFrame, value)
    }

    const handleTimeFrame = (value) => {
        setTimeFrame(value)
        getGoalList(value, filterStatus)
    }

    useEffect(() => {
        getGoalList()
    }, [])

    return (
        <div className='goals-container'>
            <div className='title-container flex justify-between items-center'>
                <div className='flex gap-5 items-center '>
                    <p className='text-[18px] font-semibold'>Volunteer Goals</p>
                </div>
                <div className='flex gap-8 items-center'>
                    <div className="relative flex gap-3 py-3 px-4"
                        style={{ border: '1px solid rgba(24, 40, 61, 0.25)',  borderRadius: '3px' }}>
                        <img src={CalenderIcon} alt="CalenderIcon" />
                        <select className='focus:outline-none cursor-pointer'
                            value={timeFrame}
                            onChange={(e) => handleTimeFrame(e.target.value)}>
                            {
                                timeFrameList?.map((e) => {
                                    return (
                                        <option value={e?.value}>{e?.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <select className='table-select text-[16px] cursor-pointer' onChange={(e) => handleFilterMenteeGoals(e.target.value)}
                        value={filterStatus} style={{fontWeight: 500}}>
                        <option className='!text-[16px]' value="">Total Goals</option>
                        <option className='!text-[16px]' value="active">Active Goals</option>
                        <option className='!text-[16px]' value="in_progress">Goals in progress</option>
                        <option className='!text-[16px]' value="completed">Completed Goals</option>
                        <option className='!text-[16px]' value="cancel">Cancelled Goals</option>
                    </select>
                </div>

            </div>
            <div className='py-8 px-6'>
                <DataTable rows={goalHistory?.results} columns={menteeGoalsColumn}
                    rowCount={goalHistory?.count}
                    paginationModel={paginationModel} setPaginationModel={setPaginationModel} 
                    hideFooter={goalHistory?.results?.length === 0} hideCheckbox />
            </div>

        </div>
    )
}
