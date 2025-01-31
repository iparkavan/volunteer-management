import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress, Menu, MenuItem } from '@mui/material';

import SearchIcon from '../../assets/icons/search.svg';
import DownloadIcon from '../../assets/icons/Document.svg';
import { Button } from '../../shared';
import DataTable from '../../shared/DataGrid';
import TickCircle from '../../assets/icons/tickCircle.svg'
import ViewIcon from '../../assets/images/view1x.png'
import MoreIcon from '../../assets/icons/moreIcon.svg'

import { certificateColumns } from '../../utils/tableFields';
import { useNavigate } from 'react-router-dom';
import { certificateDownload, getCertificateList, getCertificates } from '../../services/certificate';
import { certificateColor, certificateRequestStatusText, certificateText, requestStatusColor, requestStatusText } from '../../utils/constant';
import Ratings from '../Programs/Ratings';


export default function Certificate() {
    const navigate = useNavigate()
    const [actionTab, setActiveTab] = useState('waiting_for_response')
    const [requestTab, setRequestTab] = useState('all')
    const [ratingModal, setRatingModal] = useState({ modal: false, success: false })
    const userInfo = useSelector(state => state.userInfo)
    const { certificatesList, certificateHTML, loading } = useSelector(state => state.certificates)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [seletedItem, setSelectedItem] = useState({})
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const role = userInfo.data.role
    const dispatch = useDispatch()
    const ratingModalSuccess = () => {
        if (role) {
            dispatch(getCertificateList(role === "admin" ? `?status=${role === "admin" ? "approved" : requestTab}&request_type=certificate${(role === "admin" && requestTab !== 'all') ? '&request_by=mentor' : ''}` : role === "mentor" ? `?status=${actionTab}&page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize}&request_type=certificate` : `?page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize}&request_type=certificate`))
        }
        setRatingModal({ modal: false, success: true })
    }

    const ratingModalClose = () => {
        setRatingModal({ modal: false, success: false })
    }

    const handleSearch = (value) => {
        let query = ''
        if (value !== '') {
            query = `?search=${value}`
        }
        dispatch(getCertificateList(query +
            role === "admin" ? `&page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize}&request_type=certificate${(role === "admin" && requestTab !== 'all') ? '&request_by=mentor' : ''}`
            : `&page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize}&request_type=certificate`))
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCeritificateDownload = () => {
        dispatch(certificateDownload(seletedItem.id))
        handleClose()
    }
    const handleMoreClick = (event, data) => {
        setSelectedItem(data)
        setAnchorEl(event.currentTarget);
    };
    const certificateRequestTab = [
        {
            name: 'Waiting For Response',
            key: 'waiting_for_response'
        },
        {
            name: 'Pending Certificates',
            key: 'pending'
        },
        {
            name: 'Generate Certificates',
            key: 'approved'
        }
    ]

    let certificateColumn = [
        ...certificateColumns.filter(col => col.for.includes(role)),
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            id: 2,
            renderCell: (params) => {

                return <>
                    <div className='cursor-pointer flex items-center justify-center h-full relative'>
                        <span className='w-[80px] flex justify-center h-[30px] px-3'
                            style={{
                                background: requestStatusColor[role === 'mentee' && !params.row?.certificate_rating ? "review" : params.row.status]?.bg || '', lineHeight: '30px',
                                borderRadius: '3px', width: '110px', height: '34px', color: requestStatusColor[role === 'mentee' && !params.row?.certificate_rating ? "review" : params.row.status]?.color || '',
                                fontSize: '12px'
                            }}
                        > {!params.row?.certificate_rating && role === 'mentee' ? "Please provide your rating" : certificateRequestStatusText[params.row.status]}</span>
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
                        {role === 'mentee' && (seletedItem.status === "accept" || seletedItem.status === "approved") ?
                            <MenuItem onClick={() => {
                                if (seletedItem?.certificate_rating) {

                                    navigate(`/certificate-view/${seletedItem.id}`)
                                } else {
                                    setRatingModal({ modal: true, success: false })
                                }
                            }} className='!text-[12px]'>
                                <img src={TickCircle} alt="AcceptIcon" className='pr-3 w-[27px]' />
                                View
                            </MenuItem> : null}
                        {(role === 'mentor') ?
                            <MenuItem onClick={() => navigate(`/certificate_mentees/${seletedItem.id}?type=${actionTab}`, {
                                state: {
                                    rowId: seletedItem?.id,
                                    status: seletedItem?.status
                                }
                            })} className='!text-[12px]'>
                                <img src={TickCircle} alt="AcceptIcon" className='pr-3 w-[27px]' />
                                View
                            </MenuItem> : null}
                        {role === "admin" &&
                            <MenuItem onClick={() => navigate(`/certificate_mentees/${seletedItem.id}?type=approved`, {
                                state: {
                                    rowId: seletedItem?.id,
                                    status: seletedItem?.status
                                }
                            })} className='!text-[12px]'>
                                <img src={TickCircle} alt="AcceptIcon" className='pr-3 w-[27px]' />
                                View
                            </MenuItem>}





                    </Menu>
                </>
            }

        },
    ]

    const handleTab = async (key) => {
        setRequestTab(key)
        setPaginationModel({
            page: 0,
            pageSize: 10
        })
    }

    const handleMenteeTabChange = async (key) => {
        setActiveTab(key)
        await setPaginationModel({
            page: 0,
            pageSize: 10
        })
    }

    const requestBtns = [
        {
            name: 'My Certificates',
            key: 'all'
        },
        {
            name: 'Approved Certificates',
            key: 'approved'
        }
    ]

    const mentorFields = ['pass', 'fail']

    if (role === 'admin') {
        certificateColumn = certificateColumn.filter(column => !mentorFields.includes(column.field))
    }


    useEffect(() => {
        if (role) {
            dispatch(getCertificateList(role === "admin" ? `?status=${role === "admin" ? "approved" : requestTab}&request_type=certificate${(role === "admin" && requestTab !== 'all') ? '&request_by=mentor' : ''}` : role === "mentor" ? `?status=${actionTab}&page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize}&request_type=certificate` : `?page=${paginationModel?.page + 1}&limit=${paginationModel?.pageSize}&request_type=certificate`))
        }
        // dispatch(getCertificates({search: role === "admin" ? requestTab : actionTab}))
    }, [requestTab, role, actionTab, paginationModel])
    return (
        <div className="program-request px-8 mt-10">

            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Ratings open={ratingModal.modal} modalSuccess={ratingModalSuccess} id={seletedItem?.program} modalClose={ratingModalClose} />
            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
                <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                    <div className='flex gap-5 items-center text-[18px] font-semibold'>
                        <p>{role !== 'mentee' && 'Generate '} Certificates {role === 'mentor' ? "Request" : ""}</p>
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
                        {role !== 'mentee' &&
                            <Button btnName="Create Certificate" onClick={() => navigate('/create-certificate', { state: { type: "new" } })} />}
                    </div>

                </div>


                <div className='mx-4' style={{ border: '1px solid #D9E4F2', borderRadius: '3px' }}>
                    <div className='px-6 py-7 program-info'>


                        {
                            role === 'admin' ?


                                <>
                                    <div className='flex gap-7 mb-6'>
                                        {
                                            requestBtns.map((actionBtn, index) =>
                                                <button key={index} className='px-5 py-4 text-[14px]' style={{
                                                    background: requestTab === actionBtn.key ? '#FE634E' :
                                                        '#fff',
                                                    border: requestTab !== actionBtn.key ? '1px solid #FE634E' : 'none',
                                                    color: requestTab === actionBtn.key ? '#fff' : '#000',
                                                    borderRadius: '3px',
                                                    width: '180px'
                                                }}
                                                    onClick={() => handleTab(actionBtn.key)}
                                                >{actionBtn.name}</button>
                                            )
                                        }
                                    </div>
                                </>

                                :
                                role === 'mentor' ?
                                    <>
                                        {
                                            certificateRequestTab.length > 0 &&
                                            <div className='flex justify-between px-5 mb-8 items-center border-b-2 '>
                                                <ul className='tab-list'>
                                                    {
                                                        certificateRequestTab.map((request, index) =>
                                                            <li className={`${actionTab === request.key ? 'active' : ''} relative`} key={index}
                                                                onClick={() => handleMenteeTabChange(request.key)}
                                                            >
                                                                {/* <div className='flex justify-center pb-1'>
                                                                    <div className={`total-proram-count relative ${actionTab === request.key ? 'active' : ''}`}>10

                                                                        <p className='notify-icon'></p>
                                                                    </div>
                                                                </div> */}
                                                                <div className={`text-[13px] ${actionTab === request.key ? 'text-font-primary-main' : 'text-font-secondary-black'}`}> {`${request.name}`}</div>
                                                                {actionTab === request.key && <span className={`${actionTab === request.key ? '!bg-background-primary-main' : 'bg-font-secondary-black'}`}></span>}
                                                            </li>)
                                                    }
                                                </ul>
                                            </div>


                                        }
                                    </>

                                    : null
                        }


                        <DataTable rows={certificatesList?.results || []} columns={certificateColumn} hideFooter={certificatesList?.results?.length === 0}
                            rowCount={certificatesList?.count}
                            paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
                    </div>
                </div>
            </div>


        </div>
    )
}