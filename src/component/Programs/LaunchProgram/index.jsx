import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress, Menu, MenuItem } from '@mui/material';

import ArrowRightIcon from '../../../assets/icons/arrowRightColor.svg';
import SearchIcon from '../../../assets/icons/search.svg';
import MoreIcon from '../../../assets/icons/moreIcon.svg'
import ShareIcon from '../../../assets/icons/Share.svg'
import ViewIcon from '../../../assets/images/view1x.png'
import DataTable from '../../../shared/DataGrid';
import { getLaunchPrograms } from '../../../services/launchProgram';
import { launchProgramColumns } from '../../../utils/tableFields';
import { requestStatusColor, requestStatusText } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';


export default function LaunchProgram() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { launchProgram, loading, error, status } = useSelector(state => state.launchProgram)

    const [anchorEl, setAnchorEl] = useState(null);
    const [seletedItem, setSelectedItem] = useState({})
    const [filter, setFilter] = useState({ search: '', status: '' })
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMoreClick = (event, data) => {
        setSelectedItem(data)
        setAnchorEl(event.currentTarget);
    };

    const launchProgramColumn = [
        ...launchProgramColumns,
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            id: 2,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full relative'>
                        <span className='w-[80px] flex justify-center h-[30px] px-7'
                            style={{
                                background: requestStatusColor[params.row.status]?.bgColor || '', lineHeight: '30px',
                                borderRadius: '3px', width: '110px', height: '34px', color: requestStatusColor[params.row.status]?.color || '',
                                fontSize: '12px'
                            }}>
                            {requestStatusText[params.row.status] || ''}
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

                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleMoreClick(e, params.row)}>
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
                        <MenuItem onClick={(e) => navigate(`/program-details/${seletedItem.id}`)} className='!text-[12px]'>
                            <img src={ViewIcon} alt="ViewIcon" field={params.id} className='pr-3 w-[30px]' />
                            View
                        </MenuItem>

                        <MenuItem onClick={undefined} className='!text-[12px]'>
                            <img src={ShareIcon} alt="ShareIcon" className='pr-3 w-[27px]' />
                            Share
                        </MenuItem>

                    </Menu>
                </>
            }
        }
    ]

    const handleDropdownFilter = (status) => {
        setFilter({ ...filter, status })
    }

    const handleSearch = (search) => {
        setFilter({ ...filter, search })
    }

    useEffect(() => {
        dispatch(getLaunchPrograms(filter))
    }, [filter])


    return (
        <div className="program-request px-8 mt-10">

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
                <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                    <div className='flex gap-5 items-center text-[14px]'>
                        <p style={{ color: 'rgba(89, 117, 162, 1)', fontWeight: 500 }}>Objectives</p>
                        <img src={ArrowRightIcon} alt="ArrowRightIcon" />
                        <p>Launch Program</p>
                    </div>

                    <div className='flex gap-5'>
                        <div className="relative">
                            <input type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 border-none"
                                placeholder="Search here..." style={{
                                    border: '1px solid #FE634E',
                                    borderRadius: '1px',
                                    height: '45px',
                                    width: '280px'
                                }}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <img src={SearchIcon} alt='SearchIcon' />
                            </div>
                        </div>
                        <div style={{ border: '1px solid rgba(29, 91, 191, 1)', height: '45px', width: '180px' }}>
                            <select style={{ height: '100%', width: '100%', padding: '10px' }} onChange={(e) => handleDropdownFilter(e.target.value)}>
                                <option value="launched">Launch</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>

                    </div>

                </div>


                <div className='px-4'>
                    <DataTable rows={launchProgram} columns={launchProgramColumn} hideFooter={!launchProgram.length} hideCheckbox />
                </div>
            </div>



        </div>
    )
}
