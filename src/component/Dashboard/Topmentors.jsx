import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import DataTable from '../../shared/DataGrid';
import MoreIcon from '../../assets/icons/moreIcon.svg'
import StarIcon from '../../assets/icons/filledStar.svg'
import ViewIcon from '../../assets/images/view1x.png'
import ReportIcon from '../../assets/icons/report.svg'

import { topMentorRows } from '../../mock';
import { useNavigate } from 'react-router-dom';

export default function Topmentors() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const TopMentorColumns = [{
        field: 'name',
        headerName: 'Name',
        flex: 1,
        id: 0,
    },
    {
        field: 'designation',
        headerName: 'Designation',
        flex: 1,
        id: 1,
    },
    {
        field: 'skills',
        headerName: 'Skills',
        flex: 1,
        id: 2,
    },
    {
        field: 'ratings',
        headerName: 'Ratings',
        flex: 1,
        id: 3,
        renderCell: (params) => {
            return <div className='flex gap-2 items-center'> <img src={StarIcon} alt="StarIcon" /> 4.5</div>
        }
    },
    {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        id: 4,
        renderCell: (params) => {
            return <>
                <div className='cursor-pointer h-full flex items-center' onClick={handleClick}>
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
                    <MenuItem onClick={() => navigate('/mentor-details/1')} className='!text-[12px]'>
                        <img src={ViewIcon} alt="ViewIcon" className='pr-3 w-[30px]' />
                        View
                    </MenuItem>
                    <MenuItem onClick={() => console.log('report', params)} className='!text-[12px]'>
                        <img src={ReportIcon} alt="ReportIcon" className='pr-3 w-[27px]' />
                        Reports
                    </MenuItem>
                </Menu>
            </>
        }


    },
    ];

    return (
        <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                <div className="flex gap-4">
                    <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                    <h4>Top Program Managers</h4>
                </div>
                <p className="text-[12px] py-2 px-2 cursor-pointer" style={{
                    background: 'rgba(217, 228, 242, 1)', color: 'rgba(29, 91, 191, 1)', borderRadius: '3px'
                }}
                    onClick={() => console.log('View all')}
                >View All</p>
            </div>
            <div className='py-4 px-10'>
                <DataTable rows={topMentorRows} columns={TopMentorColumns} hideCheckbox hideFooter />
            </div>
        </div>
    )
}
