import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MuiModal from '../../shared/Modal'
import DataTable from '../../shared/DataGrid'
import CardWrapper from '../../shared/Card/CardWrapper'
import { memberRequestColumns } from '../../utils/tableFields';

import CancelColorIcon from '../../assets/icons/cancelCircle.svg'
import CancelIcon from '../../assets/images/cancel1x.png'
import SearchIcon from '../../assets/icons/search.svg';
import MoreIcon from '../../assets/icons/moreIcon.svg'
import CloseCircle from "../../assets/icons/closeCircle.svg";
import PowerIcon from "../../assets/icons/PowerIcon.svg";
import ViewIcon from "../../assets/images/view1x.png";
import { Backdrop, CircularProgress, Menu, MenuItem } from '@mui/material';
import { cancelMemberRequest, getCategoryList, getMemberRequest, updateLocalRequest, updateMemberRequest } from '../../services/request';
import { requestStatus } from '../../utils/constant';
import { categoryColumns } from '../../mock';
import { Button } from '../../shared';


export default function MemberRequest() {
    const { memberRequest, categoryList, loading, status, error } = useSelector(state => state.requestList);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [seletedItem, setSelectedItem] = useState({})
    const [mentorActionInfo, setMentorActionInfo] = useState({ categoryPopup: false, cancelPopup: false, selectedItem: [] })

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };


    // Mentor Accept Category Popup
    const handleMemberAcceptRequest = () => {
        dispatch(getCategoryList())
        handleClose();
    }

    const getMemberRequestList = () => {
        dispatch(getMemberRequest({
            recent: 6,
            user: 'mentor',
        }));
    }

    const handleSelectedItems = (selected) => {
        // setMentorActionInfo({ ...mentorActionInfo, selectedItem: selected })
        const categoryId = []
        selected.forEach((selected) => categoryId.push(selected.categories_id))
        const payload = {
            member_id: seletedItem.id,
            categories_id: categoryId
        }
        dispatch(updateMemberRequest(payload)).then(() => {
            handleClosePopup();
            getMemberRequestList();
        })
    }

    const handleMemberCancelRequest = () => {
        handleClose()
        setMentorActionInfo({ categoryPopup: false, cancelPopup: true, selectedItem: [] })
    }

    const handleClosePopup = () => {
        setMentorActionInfo({ cancelPopup: false, categoryPopup: false, selectedItem: [] })
    }

    const handleConfirmRejectRequest = () => {
        dispatch(cancelMemberRequest({
            member_id: seletedItem.id
        })).then(() => {
            handleClosePopup();
            getMemberRequestList();
        })
    }

    const handleClick = (event, data) => {
        setSelectedItem(data)
        setAnchorEl(event.currentTarget);
    };

    const memberRequestColumn = [
        ...memberRequestColumns,
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex justify-center items-center h-full' onClick={(e) => handleClick(e, params.row)}>
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
                        <MenuItem onClick={(e) => { handleClose(); navigate(`/mentor-details/${seletedItem.id}`) }} className='!text-[12px]'>
                            <img src={ViewIcon} alt="ViewIcon" field={params.id} className='pr-3 w-[30px]' />
                            View
                        </MenuItem>
                        <MenuItem onClick={handleMemberAcceptRequest} className='!text-[12px]'>
                            <img src={PowerIcon} alt="AcceptIcon" className='pr-3 w-[27px]' />
                            Approve
                        </MenuItem>
                        <MenuItem onClick={handleMemberCancelRequest} className='!text-[12px]'>
                            <img src={CloseCircle} alt="CancelIcon" className='pr-3 w-[27px]' />
                            Reject
                        </MenuItem>
                    </Menu>
                </>
            },
        },
    ]

    const footerComponent = (props) => {
        return (
            <div className='flex gap-6 justify-center items-center py-4'>
                <button onClick={handleClosePopup} className='py-3 px-6 w-[16%]'
                    style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '3px', color: 'rgba(29, 91, 191, 1)' }}>Cancel</button>
                <button onClick={() => {  handleSelectedItems(props.selectedRows) }}
                    className='text-white py-3 px-6 w-[16%]'
                    style={{ background: 'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)', borderRadius: '3px' }}>Submit</button>
            </div>)
    }

    useEffect(() => {
        if (status === requestStatus.categoryload) {
            setMentorActionInfo({ cancelPopup: false, categoryPopup: true })
            setTimeout(() => {
                dispatch(updateLocalRequest({ status: '' }))
            }, 2000)
        }
    }, [status])


    useEffect(() => {
        getMemberRequestList()
    }, [])

    return (
        <div>
            <Backdrop
                sx={{ zIndex: (theme) => 999999999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CardWrapper title='Recent Member Requests' viewAll={memberRequest?.results?.length > 0}>
                <div className='py-6 px-3'>
                    <DataTable rows={memberRequest?.results} columns={memberRequestColumn} hideFooter hideCheckbox />
                </div>
            </CardWrapper>

            {/* { 'Select Categort Popup'} */}
            <MuiModal modalSize='md' modalOpen={mentorActionInfo.categoryPopup} modalClose={handleClosePopup} noheader>
                <div className='px-5 py-5'>
                    <div className='flex justify-center flex-col gap-5 px-5 pb-5 mt-4 mb-4'
                        style={{ border: '1px solid rgba(0, 0, 0, 1)', borderRadius: '10px', }}>
                        <div className='flex justify-between px-3 py-4 items-center' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
                            <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Select Category</p>
                            <img className='cursor-pointer' onClick={handleClosePopup} src={CancelIcon} alt="CancelIcon" />
                        </div>
                        <div className='flex justify-between px-3 mb-4'>
                            <div className="relative w-full">
                                <input type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 border-none"
                                    placeholder="Search here..." style={{
                                        border: '1px solid #FE634E',
                                        borderRadius: '50px',
                                        height: '60px',
                                        width: '100%'
                                    }} />
                                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                    <img src={SearchIcon} alt='SearchIcon' />
                                </div>
                            </div>
                        </div>


                        <DataTable
                            rows={categoryList}
                            columns={categoryColumns}
                            height={'460px'}
                            footerComponent={footerComponent}
                            selectedAllRows={mentorActionInfo.selectedItem}
                        />

                    </div>
                </div>

            </MuiModal>


            {/* Reject the request */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => 1 }}
                open={mentorActionInfo.cancelPopup}
            >
                <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
                    <img src={CancelColorIcon} alt="TickColorIcon" />
                    <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
                        {'Reject'}
                    </span>
                    <div className='py-5'>
                        <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>
                            Are you sure want to reject this request?
                        </p>
                    </div>
                    <div className='flex justify-center'>
                        <div className="flex gap-6 justify-center align-middle">
                            <Button btnCls="w-[110px]" btnName={'No'} btnCategory="secondary" onClick={handleClosePopup} />
                            <Button btnType="button" btnCls="w-[110px]" btnName={'Yes'}
                                style={{ background: '#E0382D' }} btnCategory="primary"
                                onClick={handleConfirmRejectRequest}
                            />
                        </div>
                    </div>
                </div>

            </Backdrop>
        </div>
    )
}
