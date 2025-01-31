import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import DataTable from '../../shared/DataGrid';
import { Button } from '../../shared';

import UserImage from "../../assets/images/user.jpg";
import MoreIcon from '../../assets/images/more1x.png';
import MaleIcon from '../../assets/images/male.png';
import SearchIcon from '../../assets/icons/search.svg';
import MaleProfileIcon from '../../assets/images/male-profile1x.png'
import FemaleProfileIcon from '../../assets/images/female-profile1x.png'
import SuccessTik from '../../assets/images/blue_tik1x.png';

import CalendarIcon from '../../assets/images/Birthdaydate1x.png'
import MobileIcon from '../../assets/images/Mobilenumber1x.png'
import LocationIcon from '../../assets/images/Locationcolour1x.png'
import ConnectIcon from '../../assets/images/Connectpop1x.png'

import EmailIcon from '../../assets/icons/EmailColor.svg'

import StarIcon from '../../assets/icons/filledYellowStar.svg'
import TickColorIcon from '../../assets/icons/tickColorLatest.svg'
import CancelColorIcon from '../../assets/icons/cancelCircle.svg'
import CancelIcon from '../../assets/images/cancel1x.png'

import { categoryColumns } from '../../mock';
import { recentRequest, programFeeds } from '../../utils/mock'
import { Backdrop, CircularProgress, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MediaPost from '../Dashboard/MediaPost';
import { getFollowList, getMenteeProgramActivity, getMentorProgramActivity, getProfileInfo, userFollow, userUnFollow } from '../../services/userList';
import { dateFormat } from '../../utils';
import { cancelMemberRequest, getCategoryList, updateLocalRequest, updateMemberRequest, updateMentorAutoApproval } from '../../services/request';
import { requestStatus } from '../../utils/constant';
import MuiModal from '../../shared/Modal';

export default function MentorDetails() {
    const dispatch = useDispatch()
    const params = useParams();
    const [activity, setActivity] = useState({ modal: false, following: false })
    const [userDetails, setUserDetails] = useState({})
    const [confirmPopup, setConfirmPopup] = useState({ accept: false, cancel: false, programId: '' })

    const options = ['Off', 'On'];
    const [value, setValue] = useState(options[0]);

    const [checked, setChecked] = useState(false);
    const [categoryPopup, setCategoryPopup] = useState({ show: false, selectedItem: [] })


    const userInfo = useSelector(state => state.userInfo)

    const { mentorDetails, menteeDetails, loading, programActivity, userDetails: profileInfo, followInfo } = useSelector(state => state.userList)

    const { loading: requestLoading, status: requestStatusInfo, error: requestStatusError, categoryList } = useSelector(state => state.requestList);

    const role = userInfo.data.role || ''

    const handleChange = (event) => {
        setChecked(event.target.checked);
        dispatch(updateMentorAutoApproval({
            id: params.id,
            start_auto_approval_status: event.target.checked
        }))
    };

    const programActivityColumns = [{
        field: 'program_name',
        headerName: 'Program Name',
        width: 200,
        id: 0,
    },
    {
        field: 'mentor_name',
        headerName: 'Program Manager Manager',
        width: 150,
        id: 1,
    },
    {
        field: 'start_date',
        headerName: 'Program Date',
        width: 200,
        id: 2,
        renderCell: (params) => {
            return <div className='flex items-center gap-2'>
                {dateFormat(params.row.start_date)}
            </div>
        }
    },
    {
        field: 'end_date',
        headerName: 'Program End Date',
        width: 150,
        id: 3,
        renderCell: (params) => {
            return <div className='flex items-center gap-2'>
                {dateFormat(params.row.end_date)}
            </div>
        }
    },
    {
        field: 'admin',
        headerName: 'Supervisor Name',
        width: 200,
        id: 2,
    },
    {
        field: 'action',
        headerName: 'Achieve graphic',
        width: 200,
        id: 4,
        renderCell: (params) => {
            return <div className='flex items-center gap-2'>
                <div className='relative w-[50%]'>
                    <div style={{
                        background: 'rgba(0, 174, 189, 1)', width: '67%', borderRadius: '30px', height: '8px',
                        position: 'absolute', top: '8px'
                    }}></div>
                    <div style={{
                        background: 'rgba(217, 217, 217, 1)', width: '100%', borderRadius: '30px', height: '8px', marginTop: '8px',

                    }}></div>
                </div>
                <span>45%</span>
            </div>
        }


    },
    ];

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const handleFollow = () => {
        if (followInfo.is_following) {
            dispatch(userUnFollow({ user_id: params.id })).then(() => {
                setActivity({ modal: false, following: !activity.following });
                dispatch(getFollowList(params.id))
            }
            )
        }
        if (!followInfo.is_following) {
            dispatch(userFollow({ user_id: params.id })).then(() => {
                setActivity({ modal: false, following: !activity.following });
                dispatch(getFollowList(params.id))
            }
            )
        }

    }

    const handleShowPopup = () => {
        setActivity({ ...activity, modal: true })
    }


    const handleAcceptCancelProgramRequest = (action, programid) => {
        let popup = { ...confirmPopup, programId: programid }
        if (action === 'approve') {
            dispatch(getCategoryList())
            // setConfirmPopup({ ...popup, approve: true });
        }
        if (action === 'reject') { setConfirmPopup({ ...popup, reject: true }) }
    }

    const handleConfirmPopup = () => {
        dispatch(cancelMemberRequest({
            member_id: params.id
        }))
    }

    const resetConfirmPopup = () => {
        setConfirmPopup({ accept: false, cancel: false, programId: '' })
    }

    const handleCancelPopup = () => {
        resetConfirmPopup()
    }

    // Category Popup Close
    const handleCloseCategoryPopup = () => {
        setCategoryPopup({ show: false, selectedItem: [] })
    }

    // Handle Selected Items for Category 
    const handleSelectedItems = (selectedInfo) => {

        let data = { ...categoryPopup }
        if (selectedInfo.length) {
            data = { ...data, selectedItem: selectedInfo }
        }
        const categoryId = []
        data.selectedItem.forEach((selected) => categoryId.push(selected.categories_id))
        const payload = {
            member_id: params.id,
            categories_id: categoryId
        }
        dispatch(updateMemberRequest(payload))

    }

    const footerComponent = (props) => {
        return (
            <div className='flex gap-6 justify-center items-center py-4'>
                <button onClick={() => setCategoryPopup({ show: false, selectedItem: [] })} className='py-3 px-6 w-[16%]'
                    style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '3px', color: 'rgba(29, 91, 191, 1)' }}>Cancel</button>
                <button onClick={() => { handleSelectedItems(props.selectedRows) }}
                    className='text-white py-3 px-6 w-[16%]'
                    style={{ background: 'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)', borderRadius: '3px' }}>Submit</button>
            </div>)
    }

    useEffect(() => {
        if (requestStatusInfo === requestStatus.memberupdate || requestStatusInfo === requestStatus.membercancel) {
            resetConfirmPopup()
            setCategoryPopup({ show: false, selectedItem: [] })
            setTimeout(() => {
                dispatch(getProfileInfo({id: params.id}))
                dispatch(updateLocalRequest({ status: '' }))
            }, 3000)
        }

        if (requestStatusInfo === requestStatus.autoapproval) {
            setTimeout(() => {
                dispatch(getProfileInfo({id: params.id}))
                dispatch(updateLocalRequest({ status: '' }))
            }, 3000)

        }

        if (requestStatusInfo === requestStatus.categoryload) {
            setCategoryPopup({ show: true, selectedItem: [] })
            setTimeout(() => {
                dispatch(updateLocalRequest({ status: '' }))
            }, 2000)
        }
    }, [requestStatusInfo])

    useEffect(() => {
        if (params.id !== '') {
            if (role === 'mentor') {
                // dispatch(getMyMentorInfo(params.id))
                dispatch(getMentorProgramActivity(params.id))
            }

            if (role === 'mentee') {
                // dispatch(getMyMenteeInfo(params.id))
                dispatch(getMenteeProgramActivity(params.id))
            }

            dispatch(getProfileInfo({id: params.id}))
            dispatch(getFollowList(params.id))
        }
    }, [params.id, role])

    useEffect(() => {
        // if(role === 'mentee'){
        //     setUserDetails(menteeDetails)
        // }
        // if(role === 'mentor'){
        //     setUserDetails(mentorDetails)
        // }

        setUserDetails(profileInfo)
        setChecked(profileInfo.start_auto_approval_status)

    }, [mentorDetails, menteeDetails, profileInfo])


    return (
        <div className="px-9 my-6 grid">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => 999999999 }}
                open={loading || requestLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


            {/* { 'Select Categort Popup'} */}
            <MuiModal modalSize='md' modalOpen={categoryPopup.show} modalClose={handleCloseCategoryPopup} noheader>
                <div className='px-5 py-5'>
                    <div className='flex justify-center flex-col gap-5 px-5 pb-5 mt-4 mb-4'
                        style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px', }}>
                        <div className='flex justify-between px-3 py-4 items-center' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
                            <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Select Category</p>
                            <img className='cursor-pointer' onClick={handleCloseCategoryPopup} src={CancelIcon} alt="CancelIcon" />
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
                            selectedAllRows={categoryPopup.selectedItem}
                        />

                    </div>
                </div>

            </MuiModal>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={confirmPopup.approve || confirmPopup.reject}
            >
                <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
                    <img src={confirmPopup.approve ? TickColorIcon : confirmPopup.reject ? CancelColorIcon : ''} alt="TickColorIcon" />
                    <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
                        {confirmPopup.approve ? 'Approve' : confirmPopup.reject ? 'Reject' : ''}
                    </span>
                    <div className='py-5'>
                        <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>
                            Are you sure want to {confirmPopup.approve ? 'approve ' : 'reject '} {userDetails?.role === 'mentor' ? 'Program Manager ' : 'Volunteer '} Request?
                        </p>
                    </div>
                    <div className='flex justify-center'>
                        <div className="flex gap-6 justify-center align-middle">
                            <Button btnCls="w-[110px]" btnName={confirmPopup.approve ? 'Cancel' : confirmPopup.reject ? 'No' : ''} btnCategory="secondary" onClick={handleCancelPopup} />
                            <Button btnType="button" btnCls="w-[110px]" btnName={confirmPopup.approve ? 'Approve' : confirmPopup.reject ? 'Yes' : ''}
                                style={{ background: confirmPopup.approve ? '#16B681' : '#E0382D' }} btnCategory="primary"
                                onClick={handleConfirmPopup}
                            />
                        </div>
                    </div>
                </div>

            </Backdrop>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={requestStatusInfo === requestStatus.memberupdate || requestStatusInfo === requestStatus.membercancel}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >Member request is updated Successfully</p>
                    </div>

                </div>

            </Backdrop>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={requestStatusInfo === requestStatus.autoapproval}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >Auto Approval {checked ? 'enabled ' : 'disabled '} successfully</p>
                    </div>

                </div>
            </Backdrop>




            {
                Object.keys(userDetails).length ?


                    <div className='grid mb-10' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '5px' }}>
                        <div className='breadcrum'>
                            <nav className="flex px-7 pt-6 pb-5 mx-2 border-b-2 justify-between" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    <li className="inline-flex items-center">
                                        <a href="#" className="inline-flex items-center text-sm font-medium" style={{ color: 'rgba(89, 117, 162, 1)' }}>
                                            {role === 'mentor' ? 'My Volunteer' : 'Top Program Manager'}
                                        </a>
                                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                                {role === 'mentor' ? 'Volunteer' : 'Program Manager'} Profile </a>
                                        </div>
                                    </li>

                                </ol>
                                <div className='cursor-pointer' onClick={() => console.log('More')}>
                                    <img src={MoreIcon} alt='MoreIcon' />
                                </div>
                            </nav>

                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={activity.modal}
                            >
                                <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
                                    <img src={ConnectIcon} alt="ConnectIcon" />
                                    <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>{followInfo.is_following ? 'UnFollow' : 'Follow'}</span>

                                    <div className='py-5'>
                                        <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>Are you sure you want to {followInfo.is_following ? 'Unfollow' : 'Follow'} Program Manager?</p>
                                    </div>
                                    <div className='flex justify-center'>
                                        <div className="flex gap-6 justify-center align-middle">
                                            <Button btnName='Cancel' btnCategory="secondary" onClick={() => setActivity({ modal: false, following: false })} />
                                            <Button btnType="button" btnCls="w-[110px]" btnName={followInfo.is_following ? 'Unfollow' : 'Follow'} btnCategory="primary"
                                                onClick={handleFollow}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </Backdrop>

                            <div className='mentor-mentee-container content px-8'>
                                <div className="grid grid-cols-3 gap-7 mt-10">
                                    <div className="col-span-2">
                                        <div className='flex flex-col'>
                                            <div className='mentor-details flex py-4 px-4 items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '3px' }}>
                                                <div className='user-image w-[200px] px-5 flex justify-center items-center h-[180px]' style={{ borderRight: '1px solid rgba(29, 91, 191, 1)' }}>
                                                    <img style={{ borderRadius: '50%', height: '117px', width: '100%', objectFit: 'cover' }} src={MaleIcon} alt="MaleIcon" />
                                                </div>
                                                <div className='pl-4'>
                                                    <div>{userDetails?.first_name}{' '}{userDetails.last_name} (Software Developer)</div>
                                                    <p className='text-[12px] py-3'>
                                                        The purpose of lorem ipsum is to create a natural looking block of text
                                                        (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy
                                                    </p>
                                                    <div className="grid grid-cols-2 gap-7">
                                                        <div >
                                                            <div className='contact-info flex gap-3 items-center pt-2 pb-4'>
                                                                <img src={MobileIcon} alt="PhoneIcon" />
                                                                <span className='text-[12px]'>+1 43 456890</span>
                                                            </div>
                                                            <div className='contact-info flex gap-3 items-center pt-2'>
                                                                <img src={CalendarIcon} alt="CalendarIcon" />
                                                                <span className='text-[12px]'>19/03/1980</span>
                                                            </div>
                                                        </div>

                                                        <div className='pb-5'>
                                                            <div className='contact-info flex gap-3 items-center pt-2 pb-4'>
                                                                <img src={EmailIcon} alt="EmailIcon" />
                                                                <span className='text-[12px]'>Johnson@gmail.com</span>
                                                            </div>
                                                            <div className='contact-info flex gap-3 items-center pt-2'>
                                                                <img src={LocationIcon} alt="LocationIcon" />
                                                                <span className='text-[12px]'>101, Elanxa Apartments, 340 N Madison Avenue</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-7 mt-8">
                                                <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                                                    <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                                                        <div className="flex gap-4">
                                                            <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                                                            <h4>About Program Manager</h4>
                                                        </div>

                                                    </div>
                                                    <div className='py-4 px-6'>
                                                        <div className='text-[14px] mb-7'>
                                                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                                            et dolore magna aliqua. Ut enim ad minim veniam,"Lorem ipsum dolor sit amet, consectetur
                                                            dolore magna aliqua. Ut enim ad minim veniam,..
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-7 text-[14px] pb-5">
                                                            <p className='text-bold'>Gender</p>
                                                            <p>Male</p>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-7 text-[14px] pb-5">
                                                            <p className='text-bold'>Designation</p>
                                                            <p>Student</p>
                                                        </div>

                                                    </div>
                                                </div>


                                                <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                                                    <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                                                        <div className="flex gap-4">
                                                            <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                                                            <h4>Program Manager Skills</h4>
                                                        </div>

                                                    </div>
                                                    <div className='py-4 px-6'>
                                                        <div className='py-3'>
                                                            <p className='flex justify-between text-[14px]'>
                                                                <span>Teaching skill</span>
                                                                <span>67%</span>
                                                            </p>
                                                            <div className='relative'>
                                                                <div style={{
                                                                    background: 'rgba(0, 174, 189, 1)', width: '67%', borderRadius: '30px', height: '8px',
                                                                    position: 'absolute'
                                                                }}></div>
                                                                <div style={{
                                                                    background: 'rgba(217, 217, 217, 1)', width: '100%', borderRadius: '30px', height: '8px', marginTop: '8px',

                                                                }}></div>
                                                            </div>
                                                        </div>

                                                        <div className='py-3'>
                                                            <p className='flex justify-between text-[14px]'>
                                                                <span>Program skill</span>
                                                                <span>32%</span>
                                                            </p>
                                                            <div className='relative'>
                                                                <div style={{
                                                                    background: 'rgba(29, 91, 191, 1)', width: '32%', borderRadius: '30px', height: '8px',
                                                                    position: 'absolute'
                                                                }}></div>
                                                                <div style={{
                                                                    background: 'rgba(217, 217, 217, 1)', width: '100%', borderRadius: '30px', height: '8px', marginTop: '8px',

                                                                }}></div>
                                                            </div>

                                                        </div>

                                                        <div className='py-3'>
                                                            <p className='flex justify-between text-[14px]'>
                                                                <span>Speaking skill</span>
                                                                <span>55%</span>
                                                            </p>
                                                            <div className='relative'>
                                                                <div style={{
                                                                    background: 'rgba(255, 138, 0, 1)', width: '55%', borderRadius: '30px', height: '8px',
                                                                    position: 'absolute'
                                                                }}></div>
                                                                <div style={{
                                                                    background: 'rgba(217, 217, 217, 1)', width: '100%', borderRadius: '30px', height: '8px', marginTop: '8px',

                                                                }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }} className='mt-8'>
                                                <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                                                    <div className="flex gap-4">
                                                        <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                                                        <h4>{'Program Activity'}</h4>
                                                    </div>
                                                    <div className="flex gap-4 items-center">
                                                        <img src={SearchIcon} alt="statistics" />
                                                        <p className="text-[12px] py-2 px-2" style={{ background: 'rgba(223, 237, 255, 1)', borderRadius: '5px' }}>View All</p>
                                                    </div>
                                                </div>
                                                <div className='py-4 px-10'>
                                                    <DataTable rows={programActivity} columns={programActivityColumns} hideCheckbox hideFooter />
                                                </div>
                                            </div>

                                            {/* {
                                                role === 'mentee' &&
                                                <div style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }} className='mt-8'>
                                                    <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                                                        <div className="flex gap-4">
                                                            <div className="card-dash" style={{ background: 'linear-gradient(180deg, #00B1C0 0%, #005DC6 100%)' }} ></div>
                                                            <h4>{'Related Mentors'}</h4>
                                                        </div>
                                                        <div className="flex gap-4 items-center">
                                                            <p className="text-[12px] py-2 px-2" style={{ background: 'rgba(223, 237, 255, 1)', borderRadius: '5px' }}>View All</p>
                                                        </div>
                                                    </div>

                                                    <div className="content flex gap-4 py-5 px-5 overflow-x-auto">
                                                        {
                                                            recentRequest.map((recentRequest, index) =>
                                                                <div key={index} className="lg:w-5/12 md:w-1/3 py-3 px-3" style={{ border: '1px solid rgba(219, 224, 229, 1)', borderRadius: '10px' }}>
                                                                    <div className="flex gap-2 pb-3">
                                                                        <div className="w-1/4"> <img src={index % 2 === 0 ? MaleProfileIcon : FemaleProfileIcon} alt="male-icon" /> </div>
                                                                        <div className="flex flex-col gap-2">
                                                                            <p className="text-[12px]">{recentRequest.name}<span>(Mentor)</span></p>
                                                                            <p className="text-[12px]">Software Developer</p>
                                                                            <p className="text-[12px] flex gap-1"><img src={StarIcon} alt="StarIcon" /> 4.5 Ratings</p>

                                                                            <button style={{ border: '1px solid rgba(29, 91, 191, 1)', color: 'rgba(29, 91, 191, 1)', fontSize: '12px', borderRadius: '30px', padding: '7px' }}>Connect</button>
                                                                        </div>
                                                                        <div className="pt-1 cursor-pointer" style={{ marginLeft: 'auto' }}><img src={MoreIcon} alt="MoreIcon" /></div>
                                                                    </div>


                                                                </div>

                                                            )
                                                        }
                                                    </div>

                                                </div>
                                            } */}
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                                            <div className='py-4 px-6'>
                                                <div className='flex justify-around'>
                                                    <div className='text-center'>
                                                        <p className='text-[12px]'>Followers</p>
                                                        <p className='text-[18px]'>{followInfo?.follower_count}</p>
                                                    </div>
                                                    <div className='text-center'>
                                                        <p className='text-[12px]'>Following</p>
                                                        <p className='text-[18px]'>{followInfo?.following_count}</p>
                                                    </div>
                                                    <div className='text-center'>
                                                        <p className='text-[12px]'>Posts</p>
                                                        <p className='text-[18px]'>{followInfo?.post_count}</p>
                                                    </div>
                                                </div>

                                                <div className='flex justify-center pt-6 gap-5'>

                                                    {
                                                        role === 'admin' ?

                                                            <>
                                                                {
                                                                    (userDetails?.approve_status === 'new' || userDetails?.approve_status === 'pending') ?

                                                                        <>
                                                                            <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                                                                                border: "1px solid #E0382D",
                                                                                borderRadius: '5px',
                                                                                color: '#E0382D'
                                                                            }}
                                                                                onClick={() => handleAcceptCancelProgramRequest('reject', params.id)}
                                                                            >Reject
                                                                            </button>
                                                                            <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                                                                                background: "#16B681",
                                                                                borderRadius: '5px'
                                                                            }}
                                                                                onClick={() => handleAcceptCancelProgramRequest('approve', params.id)}
                                                                            >Approve
                                                                            </button>

                                                                        </>
                                                                        :

                                                                        userDetails?.approve_status === 'accept' ?

                                                                            <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                                                                                background: "#16B681",
                                                                                borderRadius: '5px',
                                                                                cursor: 'not-allowed'
                                                                            }}
                                                                                onClick={undefined}
                                                                            >Approved
                                                                            </button>
                                                                            :
                                                                            userDetails?.approve_status === 'cancel' ?
                                                                                <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                                                                                    border: "1px solid #E0382D",
                                                                                    borderRadius: '5px',
                                                                                    color: '#E0382D',
                                                                                    cursor: 'not-allowed'
                                                                                }}
                                                                                    onClick={undefined}
                                                                                >Rejected
                                                                                </button>
                                                                                :
                                                                                null

                                                                }
                                                            </>

                                                            : null
                                                    }


                                                    {
                                                        role !== 'admin' &&


                                                        <>
                                                            <button onClick={handleShowPopup} style={{ background: 'rgba(29, 91, 191, 1)', color: '#fff', borderRadius: '6px' }}
                                                                className='py-3 px-4 text-[14px]'>{followInfo.is_following ? 'Unfollow' : 'Follow'}</button>

                                                            <button style={{ background: 'rgba(0, 174, 189, 1)', color: '#fff', borderRadius: '6px' }} className='py-3 px-4 text-[14px] w-[20%]'>Chat</button>


                                                        </>
                                                    }
                                                </div>


                                            </div>
                                        </div>

                                        {
                                            role === 'admmin' &&
                                            <div className='mt-8 hide' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                                                <div className='flex justify-between items-center px-6 py-4'>
                                                    <p style={{ color: '#1D5BBF' }}>Auto Approval</p>
                                                    <div>
                                                        <Switch
                                                            checked={checked}
                                                            onChange={handleChange}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        }

                                        {
                                            role === 'mentor' &&
                                            <div className='mt-8'>
                                                <MediaPost />
                                            </div>
                                        }


                                        <div className='program-feeds mt-8' style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }} >
                                            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                                                <div className="flex gap-4">
                                                    <div className="card-dash" style={{ background: "#FE634E" }} ></div>
                                                    <h4>
                                                        {role === 'mentor' ? 'Program' : 'Program Manager'} Feeds
                                                    </h4>
                                                </div>
                                                <div className="flex gap-4 items-center">
                                                    <img src={SearchIcon} alt="statistics" />
                                                    <p className="text-[12px] py-2 px-2" style={{ background: 'rgba(223, 237, 255, 1)', borderRadius: '5px' }}>View All</p>
                                                </div>

                                            </div>

                                            {
                                                programFeeds.map((programFeeds, index) =>
                                                    <div key={index} className="feed-list mx-9 my-9" >
                                                        <div className="flex py-3 px-3 gap-4" style={{ border: '1px solid #FE634E', borderRadius: '5px' }}>
                                                            <img src={UserImage} className={`program-user-img ${getWindowDimensions().width <= 1536 ? 'w-1/5' : 'w-1/6'} rounded-xl h-[100px]`} style={{ height: getWindowDimensions().width <= 1536 ? '90px' : '100px' }} alt="" />
                                                            <div className="flex flex-col gap-4">
                                                                <div className='program-title flex items-center gap-3'>
                                                                    <h3 className='program-name' >{programFeeds.title}  </h3>
                                                                    <span className="lg:w-2 lg:h-2  rounded-full" style={{ background: 'rgba(0, 174, 189, 1)' }}></span> 10min ago
                                                                </div>

                                                                <h4 className="text-[12px]">{programFeeds.desc}</h4>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }




        </div >
    )

}
