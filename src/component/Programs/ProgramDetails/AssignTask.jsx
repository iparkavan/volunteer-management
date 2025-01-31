import React, { useEffect, useRef, useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Calendar } from 'primereact/calendar';

import UserImage from "../../../assets/icons/user-icon.svg";
import LocationIcon from '../../../assets/images/Location1x.png';
import CalendarIcon from '../../../assets/images/calender_1x.png';
import RatingsIcon from '../../../assets/images/ratings1x.png';
import CertificateIcon from '../../../assets/images/certficate1x.png';
import QuoteIcon from '../../../assets/images/quotes1x.png';
import MoreIcon from '../../../assets/images/more1x.png';
import ShareIcon from '../../../assets/images/share1x.png';
import DiscussionsIcon from '../../../assets/images/discussions1x.png';
import RescheduleIcon from '../../../assets/images/reschedule1x.png';
import CreateTaskIcon from '../../../assets/images/create-task-from-mentees1x.png';
import AbortIcon from '../../../assets/images/abort1x.png';
import WaitingIcon from '../../../assets/images/waiting1x.png';
import SuccessTik from '../../../assets/images/blue_tik1x.png';

import LinkIcon from '../../../assets/images/link1x.png';
import CancelIcon from '../../../assets/images/cancel-colour1x.png';
import PauseIcon from '../../../assets/images/pause1x.png';
import ResumeIcon from '../../../assets/images/resume1x.png';
import CompleteIcon from '../../../assets/images/completed1x.png'
import PlusCircle from '../../../assets/icons/Pluscircle.svg'
import TimeHistoryIcon from '../../../assets/icons/time-history-icon.svg'
import TickColorIcon from '../../../assets/icons/tickColorLatest.svg'

import './program-details.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MuiModal from '../../../shared/Modal';
import { Button } from '../../../shared';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { programActionStatus, requestStatus } from '../../../utils/constant';
import { getProgramMentees } from '../../../services/programInfo';
import { getProgramDetails, launchProgram, updateProgram } from '../../../services/userprograms';
import { Backdrop, CircularProgress } from '@mui/material';
import useTimer from '../../../hooks/useTimer';
import SkillsSet from '../../SkillsSet';
import { programCancelRequest, programRescheduleRequest, updateLocalRequest } from '../../../services/request';
import './details.css'
import { convertDateFormat, formatDateFunToAll, formatDateTimeISO, todatDateInfo } from '../../../utils';
import Ratings from '../Ratings';
import { getUserProfile } from '../../../services/profile';
import { JoinedProgramMenteeColumn } from '../../../mock';
import DataTable from '../../../shared/DataGrid';
import PaymentButton from '../../../shared/paymentButton';


export default function AssignTask() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams();

  const timerData = useTimer()
  const calendarRef = useRef([])

  const { allPrograms, programDetails, programMentees } = useSelector(state => state.programInfo)
  const userdetails = useSelector(state => state.userInfo)
  const { programdetails, loading: programLoading, error, status } = useSelector(state => state.userPrograms)
  // const programdetails = programData
  const { profile, loading: profileLoading } = useSelector(state => state.profileInfo)

  const { loading: requestLoading, status: requestStatusInfo, error: requestError } = useSelector(state => state.requestList);
  const [currentPage, setCurrentPage] = useState('')
  const [ratingModal, setRatingModal] = useState({ modal: false, success: false })
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState({ initial: true, task: false })
  const [activeTab, setActiveTab] = useState('about_program')
  const [viewMenteeModal, setViewMenteeModal] = useState(false)
  const [certificateActiveTab, setCertificateActiveTab] = useState('participated')
  const [startProgramModal, setStartProgramModal] = useState({ loading: false, success: false })
  const [moreMenuModal, setMoreMenuModal] = useState({ share: false, reschedule: false })
  const [timer, setTimer] = useState({ hrs: 0, min: 20, sec: 0, })
  const [dateFormat, setDateFormat] = useState({})
  const [message, setMessage] = useState(false);
  const role = userdetails.data.role || ''
  const rating = programdetails?.mentor_rating === 0 ? 3 : programdetails?.mentor_rating;

  const url = `${process.env.REACT_APP_SITE_URL}/program-details/${params.id}`

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();


  const dateInfo = todatDateInfo()


  const tabs = [
    {
      name: 'About Program',
      key: 'about_program'
    },
    {
      name: 'Program Outcomes',
      key: 'program_outcomes'
    },
    {
      name: 'Program Testimonials',
      key: 'program_testimonials'
    },
  ]

  const participatedTabs = [
    {
      name: 'Participated',
      key: 'participated'
    },
    {
      name: 'Completed',
      key: 'completed'
    },

  ]

  const handleTab = (key) => {
    setActiveTab(key)
  }

  const handleCerificateTab = (key) => {
    setCertificateActiveTab(key)
  }


  const handleViewJoinedMentees = async (programInfo) => {
    dispatch(getProgramMentees(programInfo?.id))
    setViewMenteeModal(true)
  }

  const JoinMenteeColumn = [
    ...JoinedProgramMenteeColumn,
    {
      field: 'action',
      headerName: 'View',
      width: 150,
      id: 3,
      renderCell: (params) => {
        return <button style={
          {
            background: 'rgb(29, 91, 191)',
            color: 'rgb(255, 255, 255)',
            padding: '2px 20px',
            height: '32px',
            margin: '9px 0px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '3px'
          }
        }
          onClick={
            () => navigate(`/mentee-details/${params.row?.id}`)
          } > View Profile </button>;
      }
    }
  ]

  const handleActionPage = async (type = "") => {


    // if (programdetails.status === programActionStatus.yettostart) {
    //     navigate(`${pipeUrls.assignmentess}/${programdetails.id}`)
    // }
    if (type === "join_program") {
      dispatch(launchProgram({ program: programdetails.id, request_type: "program_join" })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getProgramDetails({ id: parseInt(params.id) }))
        }
      })
    } else if (programdetails.status === programActionStatus.yettostart) {
      // setLoading({ initial: true, task: false })
      // const startProgramRequest = await api.post('start_program', { id: parseInt(params.id) });
      // if ((startProgramRequest.status === 201 || startProgramRequest.status === 200) && startProgramRequest.data) {
      // setLoading({ initial: false, task: false })
      dispatch(launchProgram({ program: programdetails.id, request_type: "program_start" })).then(() => {
        dispatch(getProgramDetails({ id: parseInt(params.id) }))
      })

      // }
    }

    // if (programdetails.status === programActionStatus.started) {
    //     dispatch(updateProgram({ id: programdetails.id, status: programActionStatus.inprogress }))
    // }

    // if (programdetails.status === programActionStatus.inprogress) {
    //     dispatch(updateProgram({ id: programdetails.id, status: programActionStatus.paused }))
    // }

    // if (programdetails.status === programStatus.paused) {
    //     dispatch(updateProgram({ id: programdetails.id, status: programActionStatus.inprogress }))
    // }
  }

  const handleMenu = (key) => {
    switch (key) {
      case 'create-task':
        navigate('/assign-mentees/1')
        handleClose()
        break;
      case 'share':
        setMoreMenuModal({ ...moreMenuModal, share: true });
        handleClose()
        break
      case 'reschedule':
        setMoreMenuModal({ ...moreMenuModal, reschedule: true })
        handleClose()
        break;

      case 'cancel':
        setMoreMenuModal({ ...moreMenuModal, reschedule: false, cancel: true })
        handleClose()
        break;
      case 'discussion':
        break;
      default:
        break
    }
  }

  const onSubmit = (data) => {
    if (moreMenuModal.reschedule) {

      const formattedStartDate = convertDateFormat(data.reschedule_start_date);
      const formattedEndDate = convertDateFormat(data.reschedule_end_date);

      const payload = {
        request_type: "program_reschedule",
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        program: params.id,
        comments: data?.reason
      }
      dispatch(programRescheduleRequest(payload))
    }

    if (moreMenuModal.cancel) {
      dispatch(programCancelRequest({
        program: params.id,
        comments: data.cancel_reason,
        request_type: "program_cancel"
      }))
    }
  }

  const handleComplete = (programId) => {
    handleClose()
    dispatch(updateProgram({ id: programdetails.id, status: programActionStatus.completed })).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setCompleteProgram({
          bool: false,
          activity: true
        })
        setTimeout(() => {
          setCompleteProgram({
            bool: false,
            activity: false
          })
          navigate(`/program-completion/${programId}`)
        }, 2000);
      }
    })

  }

  const handleMoreMenuClosePopup = () => {
    setMoreMenuModal({ share: false, reschedule: false, cancel: false })
    reset()
  }

  useEffect(() => {
    if (requestStatusInfo === requestStatus.reschedule || requestStatusInfo === requestStatus.cancel) {
      setMoreMenuModal({ share: false, reschedule: false })
      reset()
      setDateFormat({})
      setTimeout(() => {
        dispatch(getProgramDetails({ id: parseInt(params.id) }))
        dispatch(updateLocalRequest({ status: '' }))

      }, 3000)
    }
  }, [requestStatusInfo])

  useEffect(() => {
    const pathname = location.pathname.split('/')
    if (pathname?.length && pathname.includes('assign-task')) {
      setCurrentPage('assigntask')
    }
    if (pathname?.length && pathname.includes('start-program')) {
      setCurrentPage('startprogram')
    }
  }, [location])

  useEffect(() => {
    if (startProgramModal.loading) {
      setTimeout(() => {
        setStartProgramModal({ loading: false, success: true })
      }, [4000])
    }

    if (startProgramModal.success) {
      setTimeout(() => {
        setStartProgramModal({ loading: false, success: false })
        // navigate('/program-completion/1')
      }, [2000])
    }
  }, [startProgramModal])

  useEffect(() => {
    const programId = params.id;

    if (programId && programId !== '') {
      dispatch(getProgramDetails({ id: programId }))
    }

    if (!Object.keys(profile)?.length) {
      dispatch(getUserProfile())
    }

  }, [params.id])

  useEffect(() => {
    if (programdetails && Object.keys(programdetails)?.length) {
      setLoading({ ...loading, initial: false })

      if (role === 'mentee' && window.location.href.includes('assign-task')) {
        navigate(`/start-program/${programdetails.id}`)
      }

      // if (role === 'mentor' && window.location.href.includes('start-program') && programdetails.status === programActionStatus.yettostart) {
      //     navigate(`/assign-task/${programdetails.id}`)
      // }

      // if (programdetails.status === programActionStatus.paused) {
      //     timerData.stopTimer()
      // }

      // if (programdetails.status === programActionStatus.inprogress) {
      //     timerData.startTimer(0, 20, 0)
      // }

      if (programdetails.status === programActionStatus.completed) {
        navigate('/programs')
      }

      if (role === 'mentee' && programdetails.status === 'completed' && !programdetails.mentee_program_rating) {
        setRatingModal({ modal: true, success: false })
      }
    }
  }, [programdetails, role])


  const handleCopy = () => {

    navigator.clipboard.writeText(url)
      .then(() => {
        setMessage(true);
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
        setMessage(false);
      });
  };

  const handleCloseNotify = () => {
    setMessage(false)
  }

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(false)
      }, 3000)
    }
  }, [message])

  const handleDateClick = () => {
    setTimeout(() => {
      document.querySelector('.p-datepicker')?.classList.add('program-date-picker')
    }, 200)

  }

  const handleTimeClick = () => {
    document.querySelector('.p-datepicker')?.classList.add('program-time-picker')
  }


  const handleInstructor = (programdetails) => {
    const mentorId = programdetails?.mentor_info?.id || ''

    if (mentorId !== '' && mentorId !== userdetails?.data?.user_id) {
      navigate(`/mentor-profile/${mentorId}`)
    }
  }


  const ratingModalSuccess = () => {
    setRatingModal({ modal: false, success: true })
  }

  const ratingModalClose = () => {
    setRatingModal({ modal: false, success: false })
  }


  useEffect(() => {
    return () => {
      document.querySelector('.p-datepicker')?.classList.remove('program-date-picker')
      document.querySelector('.p-datepicker')?.classList.remove('program-time-picker')
    }
  }, [])


  const programApprovalStage = {
    yettoapprove: { status: 'yettoapprove', text: 'Waiting for admin approval' },
    join_request_submitted: { status: 'join_request_submitted', text: 'Waiting for admin approval' },
    start_request_submitted: { status: 'start_request_submitted', text: 'Waiting for admin approval' },
    schedule_request_submitted: { status: 'schedule_request_submitted', text: 'Waiting for admin approval' },
    cancel_request_submitted: { status: 'cancel_request_submitted', text: 'Waiting for admin approval' },
  }

  const dateStartField = moreMenuModal.reschedule ? register('reschedule_start_date', { required: "This field is required" }) : null
  const dateEndField = moreMenuModal.reschedule ? register('reschedule_end_date', { required: "This field is required" }) : null

  const [completeProgram, setCompleteProgram] = React.useState({
    bool: false,
    activity: false
  })
  const handleOpenConfirmPopup = () => {
    handleClose()
    setCompleteProgram({
      ...completeProgram,
      bool: true
    })
  }

  const handleCloseConfirmPopup = () => {
    setCompleteProgram({
      bool: false,
      activity: false
    })
  }


  const handleNewTaskFromAdmin = (data) => {
    const constructedData = {
      ...data,

      "program_category_name": programdetails?.category_name,
      "program_name": programdetails?.program_name,
      "program_startdate": programdetails?.start_date,
      "program_enddate": programdetails?.end_date,
      "task_name": programdetails?.task_name ?? "",
      "reference_link": programdetails?.reference_links ?? "",
      "task_details": programdetails?.task_details ?? "",
      "due_date": programdetails?.due_date,
      // "assign_task_id": null,
      "list_mentees": programdetails?.participated_mentees,
      "program_id": programdetails?.id,
      "program_duration": programdetails?.duration,
      "category_id": programdetails?.categories?.[0]?.id,
      // "mentor_id": programdetails?.created_by,
      "mentor_name": programdetails?.mentor_name,
      // "task_id": null,
      "state_date": programdetails?.start_date
    }

    navigate(`/assign-mentees/?type=edit&from=program`, {
      state: {
        data: constructedData
      }
    })
  }

  return (
    <div className="px-9 my-6 grid">

      <Backdrop
        sx={{ color: '#fff', zIndex: 9999999 }}
        open={loading.initial || loading.join || programLoading || requestLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={ratingModal.success}
      >
        <div className='px-5 py-1 flex justify-center items-center'>
          <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
            style={{ background: '#fff', borderRadius: '10px' }}>
            <img src={SuccessTik} alt="SuccessTik" />
            <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
              style={{
                fontWeight: 600
              }}
            >Thank you for providing the rating for this program</p>
          </div>

        </div>
      </Backdrop>

      <Ratings open={ratingModal.modal} modalSuccess={ratingModalSuccess} modalClose={ratingModalClose} />


      <MuiModal modalSize='md' modalOpen={viewMenteeModal} modalClose={() => false} noheader>
        <div className='px-5 py-5'>
          <div className='flex justify-center flex-col gap-5  mt-4 mb-4'
            style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px', }}>
            <div className='flex justify-between px-3 py-4 items-center' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
              <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Joining Volunteer </p>
              <img className='cursor-pointer' onClick={() => setViewMenteeModal(false)} src={CancelIcon} alt="CancelIcon" />
            </div>
            <div className='px-5'>
              <DataTable rows={programMentees?.length > 0 && programMentees} columns={JoinMenteeColumn} hideCheckbox />
            </div>
          </div>
        </div>
      </MuiModal>

      {/* {
                message &&
                <ToastNotification openToaster={message} message={'URL copied!'} handleClose={handleCloseNotify} toastType={'success'} />
            } */}

      {
        (programdetails && Object.keys(programdetails)?.length) && !programLoading ?
          <div className='grid mb-10' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '5px' }}>
            <div className='breadcrum'>
              <nav className="flex px-7 pt-6 pb-5 mx-2 border-b-2 justify-between" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <div className="inline-flex items-center text-sm font-medium cursor-pointer" style={{ color: 'rgba(89, 117, 162, 1)' }}
                      onClick={() => navigate(-1)}>
                      Program
                    </div>
                    <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <div className="ms-1 text-sm font-medium text-gray-700 cursor-pointer">
                        Program Details </div>
                    </div>
                  </li>

                </ol>

                {
                  (
                    ((role === 'mentor' || role === "admin") && programDetails.created_by === userdetails?.data?.user_id) ||
                    (role === 'mentee' &&
                      (programdetails.status === programActionStatus.inprogress || programdetails.mentee_join_status === programActionStatus.program_join_request_accepted)
                    )
                  ) &&

                  <>
                    <div className='cursor-pointer' onClick={handleClick}>
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
                      {
                        currentPage === 'assigntask1' ?
                          <>
                            <MenuItem onClick={() => handleMenu('create-task')} className='!text-[12px]'>
                              <img src={CreateTaskIcon} alt="CreateTaskIcon" className='pr-3 w-[25px]' />
                              Create Task for Volunteers</MenuItem>
                            <MenuItem onClick={() => handleMenu('share')} className='!text-[12px]'>
                              <img src={ShareIcon} alt="ShareIcon" className='pr-3 w-[25px]' />
                              Share
                            </MenuItem>
                            <MenuItem onClick={() => handleMenu('reschedule')} className='!text-[12px]'>
                              <img src={RescheduleIcon} alt="RescheduleIcon" className='pr-3 w-[25px]' /> Reschedule</MenuItem>
                            <MenuItem onClick={() => handleMenu('discussion')} className='!text-[12px]'>
                              <img src={DiscussionsIcon} alt="DiscussionsIcon" className='pr-3 w-[25px]' />Discussions</MenuItem>
                          </>
                          :
                          currentPage === 'startprogram' ?
                            <>
                              {
                                (role === 'mentor' || role === "admin") &&

                                <>

                                  {
                                    programdetails.status === programActionStatus.paused &&

                                    <MenuItem onClick={handleClose} className='!text-[12px]'>
                                      <img src={ResumeIcon} alt="ResumeIcon" className='pr-3 w-[25px]' />
                                      Resume</MenuItem>
                                  }

                                  {
                                    programdetails.status !== "yettoapprove" &&
                                    <MenuItem onClick={() => handleMenu('cancel')} className='!text-[12px]'>
                                      <img src={AbortIcon} alt="AbortIcon" className='pr-3 w-[25px]' />
                                      Cancel</MenuItem>
                                  }
                                  {programdetails.status !== "yettoapprove" &&
                                    <MenuItem onClick={() => handleMenu('reschedule')} className='!text-[12px]'>
                                      <img src={RescheduleIcon} alt="RescheduleIcon" className='pr-3 w-[25px]' />
                                      Reschedule
                                    </MenuItem>}
                                  <MenuItem onClick={() => handleMenu('share')} className='!text-[12px]'>
                                    <img src={ShareIcon} alt="ShareIcon" className='pr-3 w-[25px]' /> Share</MenuItem>
                                  {
                                    (programdetails.status === programActionStatus.inprogress
                                      || programdetails.status === programActionStatus.assigned

                                    ) &&
                                    <>
                                      <MenuItem onClick={() => handleOpenConfirmPopup()} className='!text-[12px]'>
                                        <img src={CompleteIcon} alt="AbortIcon" className='pr-3 w-[25px]' />
                                        Complete</MenuItem>
                                      <MenuItem onClick={() => handleNewTaskFromAdmin()} className='!text-[12px]'>
                                        <img src={PlusCircle} alt="PlusCircle" className='pr-3 w-[25px]' />Assign Task to Volunteer</MenuItem>
                                    </>
                                  }
                                </>
                              }

                              {
                                role === 'mentee' &&

                                <>
                                  {
                                    (programdetails.status === programActionStatus.inprogress ||
                                      programdetails.mentee_join_status === programActionStatus.program_join_request_accepted
                                    ) &&

                                    <MenuItem onClick={() => handleMenu('cancel')} className='!text-[12px]'>
                                      <img src={AbortIcon} alt="AbortIcon" className='pr-3 w-[25px]' />
                                      Cancel</MenuItem>
                                  }
                                </>
                              }



                            </>
                            : null
                      }

                    </Menu>
                  </>
                }

              </nav>
              <div className='content px-8'>
                <div className='grid grid-cols-3 gap-4 py-6'>

                  {/* Left Side Content */}
                  <div className='left-side-content col-span-2'>
                    <div className='flex items-center gap-6 pb-6'>
                      <h3 className='font-semibold text-[18px]' style={{ color: 'rgba(29, 91, 191, 1)' }}>{programdetails.program_name}</h3>
                      {
                        programdetails?.categories?.length ?

                          <div className='text-[10px] px-3 py-2' style={{
                            background: 'rgba(238, 240, 244, 1)',
                            color: 'rgba(253, 0, 58, 1)',
                            borderRadius: '5px'
                          }}>
                            {programdetails?.categories[0]?.name}
                          </div>
                          : null
                      }

                      {
                        programdetails?.reschedule_info?.length > 0 &&
                        <div className='flex gap-5 items-center'>
                          <span style={{ background: 'rgba(255, 213, 0, 1)', borderRadius: '3px', padding: '10px' }}>
                            <img src={TimeHistoryIcon} alt="TimeHistoryIcon" />
                          </span>
                          <p style={{
                            background: 'rgba(255, 249, 216, 1)', color: 'rgba(255, 213, 0, 1)',
                            padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: 500
                          }}>{programdetails.reschedule_info}</p>
                        </div>
                      }

                    </div>

                    <div className='text-[12px]'>
                      {programdetails.description}
                    </div>

                    <div className='flex gap-6 py-6'>
                      {programdetails.venue &&
                        <div className='flex gap-2 items-center'>
                          <img src={LocationIcon} alt="LocationIcon" />
                          <span className='text-[12px]'>
                            {programdetails.venue}
                          </span>
                        </div>}
                      {!completeProgram.activity && <div style={{ borderRight: '1px solid rgba(24, 40, 61, 1)' }}></div>}

                      {!completeProgram.activity && programdetails?.start_date &&
                        <div className='flex gap-3 items-center'>
                          <img src={CalendarIcon} alt="CalendarIcon" />
                          <span className='text-[12px]'>
                            {formatDateTimeISO(programdetails?.start_date)}
                          </span>
                        </div>}

                      {!completeProgram.activity && <div style={{ borderRight: '1px solid rgba(24, 40, 61, 1)' }}></div>}

                      <div className='flex gap-3 items-center text-[12px]'>
                        {
                          !completeProgram.activity && !profileLoading &&
                          <img src={programdetails?.mentor_profile_image || UserImage} style={{ borderRadius: '50%', width: '35px', height: '35px' }} alt="UserImage" />
                        }
                        {!completeProgram.activity && <span>Instructor :</span>}
                        {
                          role !== 'mentor' ?

                            <span style={{ color: 'rgba(29, 91, 191, 1)', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleInstructor(programdetails)}>{programdetails?.mentor_name}</span>

                            :

                            <span style={{ color: 'rgba(29, 91, 191, 1)' }}>{programdetails?.mentor_name}</span>
                        }

                      </div>

                    </div>

                    {
                      programdetails?.learning_materials?.length ?
                        <div>
                          <p className='pb-3'>Our Learning Materials</p>
                          <div className='flex gap-3  items-center'>
                            {
                              programdetails.learning_materials.map(materials =>
                                <span className='py-2 px-6 text-[12px]' style={{ background: 'rgba(242, 242, 242, 1)', borderRadius: '30px' }}>
                                  {materials.name}
                                </span>


                              )
                            }

                            {/* <span className='ml-10 cursor-pointer'>
                                                            <img src={PlusIcon} alt="PlusIcon" />
                                                        </span> */}
                          </div>
                        </div>

                        :
                        null
                    }

                    {/* <div className='discussions pt-8 flex gap-6'>
                                            <button
                                                className='text-[12px] py-3 px-9 cursor-pointer'
                                                style={{
                                                    border: '1px dotted rgba(29, 91, 191, 1)', color: 'rgba(29, 91, 191, 1)', background: 'rgba(29, 91, 191, 0.05)',
                                                    borderRadius: '3px'
                                                }}>Program Discussions</button>

                                            <button
                                                className='text-[12px] py-3 px-9 cursor-pointer'
                                                style={{
                                                    border: '1px dotted rgba(29, 91, 191, 1)', color: 'rgba(29, 91, 191, 1)', background: 'rgba(29, 91, 191, 0.05)',
                                                    borderRadius: '3px'
                                                }}>Individual Discussions</button>
                                        </div> */}



                    <div className='py-9'>
                      {
                        role === 'mentor' ?
                          <>
                            {programApprovalStage[programdetails.status] ?
                              <div className='flex gap-4 pt-10' >
                                <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                                  border: "1px solid #E0382D",
                                  borderRadius: '5px',
                                  color: '#E0382D',
                                  cursor: 'not-allowed'
                                }}
                                  onClick={() => false}
                                >
                                  <i className="pi pi-clock" style={{ color: 'red' }}></i>
                                  <span className='pl-3'>{programApprovalStage[programdetails.status]?.text}</span>
                                </button>
                              </div>
                              :
                              programdetails.status === 'draft' ?
                                <div className='py-9'>
                                  <div className='py-3 px-16 text-white text-[14px] flex justify-center items-center' style={{
                                    background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                    borderRadius: '5px',
                                    width: '30%'
                                  }}>Drafted</div>
                                </div>
                                :

                                null
                            }
                          </>
                          : null

                      }
                      {
                        programdetails.status === programActionStatus.inprogress || programdetails.status === programActionStatus.paused
                          || programdetails.status === programActionStatus.started

                          ?

                          <div className='flex gap-9'>

                            <div className='flex gap-2 items-center justify-center'>
                              <p className="flex flex-col gap-2 items-center justify-center">
                                <span className='px-2 py-1 text-[20px] w-[40px] flex justify-center items-center'
                                  style={{ background: 'rgba(231, 241, 242, 1)', color: 'rgba(0, 174, 189, 1)', borderRadius: '5px', fontWeight: 700 }}>{dateInfo.month}</span>
                                <span className="text-[12px]" style={{ color: 'rgba(118, 118, 118, 1)' }}>Month</span>
                              </p>
                              <p className='flex justify-center items-baseline pt-2 h-full w-full font-bold'>-</p>
                              <p className="flex flex-col gap-2 items-center justify-center">
                                <span className='px-2 py-1 text-[20px] w-[40px] flex justify-center items-center'
                                  style={{ background: 'rgba(231, 241, 242, 1)', color: 'rgba(0, 174, 189, 1)', borderRadius: '5px', fontWeight: 700 }}>{dateInfo.date}</span>
                                <span className="text-[12px]" style={{ color: 'rgba(118, 118, 118, 1)' }}>Day</span>
                              </p>
                              <p className='flex justify-center items-baseline pt-2 h-full w-full font-bold'>-</p>
                              <p className="flex flex-col gap-2 items-center justify-center">
                                <span className='px-2 py-1 text-[20px] w-[70px] flex justify-center items-center'
                                  style={{ background: 'rgba(231, 241, 242, 1)', color: 'rgba(0, 174, 189, 1)', borderRadius: '5px', fontWeight: 700 }}>{dateInfo.year}</span>
                                <span className="text-[12px]" style={{ color: 'rgba(118, 118, 118, 1)' }}>Year</span>
                              </p>
                            </div>

                            {/* <div className='flex gap-6 items-center justify-center'>
                                                            <p className="flex flex-col gap-2 items-center justify-center">
                                                                <span className='px-2 py-1 text-[20px] w-[40px] flex justify-center items-center'
                                                                    style={{ background: 'rgba(231, 241, 242, 1)', color: 'rgba(0, 174, 189, 1)', borderRadius: '5px', fontWeight: 700 }}>{timerData.hours}</span>
                                                                <span className="text-[12px]" style={{ color: 'rgba(118, 118, 118, 1)' }}>Hrs</span>
                                                            </p>
                                                            <p className="flex flex-col gap-2 items-center justify-center">
                                                                <span className='px-2 py-1 text-[20px] w-[40px] flex justify-center items-center'
                                                                    style={{ background: 'rgba(231, 241, 242, 1)', color: 'rgba(0, 174, 189, 1)', borderRadius: '5px', fontWeight: 700 }}>{timerData.minutes}</span>
                                                                <span className="text-[12px]" style={{ color: 'rgba(118, 118, 118, 1)' }}>Mins</span>
                                                            </p>
                                                            <p className="flex flex-col gap-2 items-center justify-center">
                                                                <span className='px-2 py-1 text-[20px] w-[40px] flex justify-center items-center'
                                                                    style={{ background: 'rgba(231, 241, 242, 1)', color: 'rgba(0, 174, 189, 1)', borderRadius: '5px', fontWeight: 700 }}>{timerData.seconds}</span>
                                                                <span className="text-[12px]" style={{ color: 'rgba(118, 118, 118, 1)' }}>Secs</span>
                                                            </p>
                                                        </div> */}

                            <>
                              {
                                role === 'mentor' &&
                                <button className='py-3 px-10 text-white text-[14px] flex items-center w-[200px] justify-center' title="Pause" style={{
                                  color: programdetails.status !== programActionStatus.paused && programdetails.status !== programActionStatus.assigned ? 'rgba(29, 91, 191, 1)' : '#fff',
                                  borderRadius: '5px',
                                  border: '1px solid rgba(29, 91, 191, 1)',
                                  display: 'none',
                                  background: programdetails.status === programActionStatus.paused || programdetails.status === programActionStatus.assigned ? 'linear-gradient(97.32deg, #1D5BBF -32.84%, #00AEBD 128.72%)' : 'transparent'
                                }}
                                  onClick={() => handleActionPage()}
                                >
                                  <img src={programdetails.status !== programActionStatus.inprogress ? ResumeIcon : PauseIcon} alt={programdetails.status !== programActionStatus.inprogress ? 'ResumeIcon' : 'PauseIcon'} className='pr-4' />
                                  {programdetails.status === programActionStatus.inprogress ? 'Pause' : 'Start'}</button>
                              }

                              {/* {
                                                                role === 'mentee' &&
                                                                <div>
                                                                    <p className="flex flex-col  items-center justify-center">
                                                                        <span className='px-2 py-1 text-[16px]'
                                                                            style={{
                                                                                color: 'background: rgba(0, 0, 0, 1)',
                                                                                borderRadius: '5px', fontWeight: 700
                                                                            }}>EST. TIME LEFT</span>
                                                                        <span className="text-[16px]" style={{ color: 'rgba(255, 67, 0, 1)' }}>2 Hours 30 mins</span>
                                                                    </p>
                                                                </div>
                                                            } */}


                            </>

                          </div>
                          : null
                      }

                      {/* {
                                                (programdetails.status === programActionStatus.yettostart && role === 'mentor') &&

                                                <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                                                    background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                                    borderRadius: '5px'
                                                }}
                                                    onClick={handleActionPage}
                                                >
                                                    Assign Task To Volunteers

                                                </button>
                                            } */}

                      {
                        (programdetails.status === programActionStatus.yettostart && (role === 'mentor' || role === "admin")) &&

                        <button className='py-3 px-16 text-[14px] flex items-center !bg-background-primary-main !text-font-secondary-white'
                          onClick={() => handleActionPage()}
                        >
                          Start Program

                        </button>
                      }



                      {
                        // programdetails.status !== programActionStatus.inprogress && programdetails.status !== programActionStatus.paused &&
                        // programdetails.status !== programActionStatus.yettojoin && programdetails.status !== programActionStatus.assigned &&
                        // programdetails.status !== programActionStatus.yettostart &&
                        // role !== 'mentee' &&
                        (programdetails.status === "yettostart" && role === "mentee" &&
                          programdetails?.mentee_join_status === "") &&
                        <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                          background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                          borderRadius: '5px'
                        }}
                          onClick={() => handleActionPage("join_program")}
                        >{'Join Program'}

                        </button>
                      }

                      {programdetails?.mentee_join_status === "program_join_request_submitted" &&

                        <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                          background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                          borderRadius: '5px'
                        }}
                        >
                          Waiting for Program Manager Approval
                        </button>
                      }

                      {programdetails?.mentee_join_status === "program_join_request_rejected" &&

                        <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                          background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                          borderRadius: '5px'
                        }}
                        >
                          Program Manager Rejected
                        </button>
                      }

                    </div>



                  </div>


                  {/* Right Side Content */}
                  <div className='right-side-content'>
                    <div style={{ border: '1px solid rgba(223, 237, 255, 1)', borderRadius: '10px' }}
                      className='px-6 pt-6 pb-3'>
                      <ul className='flex flex-col gap-3'>
                        {
                          role === 'mentee1' &&

                          <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px' }}>
                            <span>Ratings</span>
                            <span className='flex gap-2 items-center'>

                              {
                                Array.from({ length: rating }, (_, i) => i + 1).map(i => {
                                  return <img src={RatingsIcon} style={{ width: '12px', height: '12px' }} alt="RatingsIcon" />
                                })
                              }
                              {rating}
                            </span>
                          </li>
                        }
                        <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px', paddingTop: '14px' }}>
                          <span>Session</span>
                          <span>{programdetails.session_count}</span>
                        </li>

                        <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px', paddingTop: '14px' }}>
                          <span>Course Level</span>
                          <span style={{ textTransform: "capitalize" }}>{programdetails.course_level}</span>
                        </li>
                        <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px', paddingTop: '14px' }}> <span>Start Date</span>
                          <span>{`${formatDateFunToAll(programdetails?.start_date)}`}</span>
                        </li>

                        <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px', paddingTop: '14px' }}> <span>End Date</span>
                          <span>{`${formatDateFunToAll(programdetails?.end_date)} `}</span>
                        </li>

                        <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px', paddingTop: '14px' }}> <span>Duration</span>
                          <span>{programdetails.duration} {' days'}</span>
                        </li>
                        <li className='flex justify-between text-[12px]' style={{ borderBottom: '1px solid rgba(217, 217, 217, 1)', paddingBottom: '10px', paddingTop: '14px' }}> <span>Schedule</span>
                          <span>Flexible schedule</span>
                        </li>
                        {
                          (role === 'mentor' || role === "admin") &&
                          <li className='flex justify-between text-[12px]' style={{ paddingTop: '14px', paddingBottom: "10px", borderBottom: '1px solid rgba(217, 217, 217, 1)', }}> <span>Joined Volunteers</span>
                            <span className='underline cursor-pointer' onClick={() => handleViewJoinedMentees(programdetails)}>{programdetails.participated_mentees_count}</span>
                          </li>
                        }
                        <li className='flex justify-between text-[12px]' style={{ paddingBottom: '10px', paddingTop: '14px' }}>
                          <span>Payment</span>
                          <span><PaymentButton /></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>


                {
                  role === 'mentee' && (programdetails.status === programActionStatus.inprogress || programdetails.status === programActionStatus.paused) &&
                  <SkillsSet programdetails={programdetails} />
                }


                {/* Detail Section */}
                <div className='details-section px-6 py-11 mb-10' style={{ background: 'rgba(249, 249, 249, 1)', borderRadius: '10px' }}>
                  <div className='tabs flex gap-4'>
                    {
                      tabs.map((tab) =>
                        <button key={tab.key}
                          className={`px-12 py-3 text-[12px] ${activeTab === tab.key ? 'tab-active' : 'tab'} `}
                          onClick={() => handleTab(tab.key)}>
                          {tab.name}
                        </button>)
                    }
                  </div>
                  <div className='tab-content px-6 pt-10 text-[12px]'>
                    <div className={`about-programs ${activeTab === 'about_program' ? 'block' : 'hidden'}`}>
                      <div className='learning'>
                        <div className='font-semibold pb-3'>What you'll learn</div>
                        {programdetails.about_program}
                      </div>
                      {
                        programdetails?.skills?.length ?

                          <div className='skills pt-8'>
                            <div className='font-semibold pb-5'>Skills you'll gain</div>
                            <ul className='flex gap-3'>
                              {
                                programdetails.skills.map((skills) =>
                                  <li key={skills.id} className='px-8 py-3' style={{ background: 'rgba(234, 237, 240, 1)', borderRadius: '30px' }}>{skills.name}</li>
                                )
                              }
                            </ul>
                          </div>
                          : null
                      }

                      {
                        programdetails.image !== null && programdetails.image !== '' &&

                        <div className='sponsor pt-8'>
                          <div className='font-semibold pb-5'>Sponsored by </div>
                          <ul className='flex gap-5'>
                            <img style={{ width: '100px', height: '100px' }} src={programdetails.image} alt="SponsorIcon" />
                          </ul>
                        </div>

                      }

                    </div>

                    <div className={`program-outcomes ${activeTab === 'program_outcomes' ? 'block' : 'hidden'}`}>
                      <div className='benefits'>
                        <div className='font-semibold pb-3'>Benefits</div>
                        {
                          programdetails.benefits
                        }
                        {/* <ul className='leading-9 list-disc ml-4'>
                                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
                                                </ul> */}
                      </div>
                      <div className='program-certificate pt-8'>
                        <div className='font-semibold pb-3'>Types of Certificates
                          {/* {
                                                        programdetails.certifications.length <= 9 ? ' 0' + programdetails.certifications.length : programdetails.certifications.length} */}
                        </div>
                        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-10">
                          <ul className="flex flex-wrap -mb-px">
                            {
                              participatedTabs.map(participatedTab =>

                                <li className="me-2" key={participatedTab.key}>
                                  <p className={`inline-block p-4 border-b-2 cursor-pointer border-transparent rounded-t-lg ${certificateActiveTab === participatedTab.key ? 'active  text-font-primary-main' : ''} `}
                                    onClick={() => handleCerificateTab(participatedTab.key)}
                                  >{participatedTab.name}</p>
                                </li>

                              )
                            }

                          </ul>
                        </div>

                        {
                          participatedTabs.map(participatedTab =>

                            <div className={`certificate-tab-content flex items-center justify-between relative ${participatedTab.key === certificateActiveTab ? 'block' : 'hidden'}`} key={participatedTab.key}>
                              <div className='px-9 py-16 w-4/6 leading-6'>
                                {participatedTab.key === 'participated' && 'The ability for members to earn badges and receive certifications is another essential feature of our Mentoring Management program. It helps in creating engaging and impactful relationships between mentors and mentees.'}
                                {participatedTab.key === 'completed' &&
                                  'All the badges and certifications are secured through a blockchain system to ensure authenticity and traceability. This innovative approach not only enhances motivation but also provides tangible recognition of achievements, encouraging continuous growth and engagement.'}       </div>
                              <img className='absolute right-0' src={CertificateIcon} alt="CertificateIcon" />
                            </div>

                          )
                        }



                      </div>
                    </div>


                    <div className={`program-outcomes ${activeTab === 'program_testimonials' ? 'block' : 'hidden'}`}>
                      <div className='testimonials bg-white px-5 py-7'>
                        {/* <div className='flex justify-end'>
                                                    <button className='py-2 px-6 mb-10' style={{ color: 'rgba(29, 91, 191, 1)', border: '1px dotted rgba(29, 91, 191, 1)', borderRadius: '3px' }}>Request Testimonials</button>
                                                </div> */}
                        <div className="grid grid-cols-3 gap-8">

                          <div className='pt-16 pb-2 px-7 leading-5 relative' style={{ background: 'rgba(248, 249, 250, 1)', }}>
                            <img src={QuoteIcon} className='absolute top-[-16px]' alt="QuoteIcon" />
                            <div className='relative'>
                              <p className='pb-7'>
                                {programdetails.testimonial_types}
                              </p>
                              <hr className='absolute' style={{ width: '496px', left: '-15px' }} />
                            </div>

                            <div className='flex gap-3 py-5'>
                              <img src={UserImage} alt="user" style={{ borderRadius: '50%', width: '38px', height: '35px' }} />
                              <div className='flex flex-col'>
                                <span style={{ color: 'rgba(0, 174, 189, 1)' }}>{programdetails.mentor_full_name}</span>
                                <span>Mentor</span>
                              </div>
                            </div>

                          </div>

                          {/* <div className='pt-16 pb-2 px-7 leading-5 relative' style={{ background: 'rgba(248, 249, 250, 1)', }}>
                                                        <img src={QuoteIcon} className='absolute top-[-16px]' alt="QuoteIcon" />
                                                        <div className='relative'>
                                                            <p className='pb-7'>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                                ook.standard dummy text ever since the 1500s, ook.
                                                            </p>
                                                            <hr className='absolute' style={{ width: '496px', left: '-15px' }} />
                                                        </div>

                                                        <div className='flex gap-3 py-5'>
                                                            <img src={UserImage} alt="user" style={{ borderRadius: '50%', width: '38px', height: '35px' }} />
                                                            <div className='flex flex-col'>
                                                                <span style={{ color: 'rgba(0, 174, 189, 1)' }}>Alexander Johnson</span>
                                                                <span>Mentor</span>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='pt-16 pb-2 px-7 leading-5 relative' style={{ background: 'rgba(248, 249, 250, 1)', }}>
                                                        <img src={QuoteIcon} className='absolute top-[-16px]' alt="QuoteIcon" />
                                                        <div className='relative'>
                                                            <p className='pb-7'>
                                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                                ook.standard dummy text ever since the 1500s, ook.
                                                            </p>
                                                            <hr className='absolute' style={{ width: '496px', left: '-15px' }} />
                                                        </div>

                                                        <div className='flex gap-3 py-5'>
                                                            <img src={UserImage} alt="user" style={{ borderRadius: '50%', width: '38px', height: '35px' }} />
                                                            <div className='flex flex-col'>
                                                                <span style={{ color: 'rgba(0, 174, 189, 1)' }}>Alexander Johnson</span>
                                                                <span>Mentor</span>
                                                            </div>
                                                        </div>

                                                    </div> */}
                        </div>
                      </div>





                    </div>
                  </div>
                </div>

              </div>


              <MuiModal modalOpen={startProgramModal.loading} modalClose={() => setStartProgramModal({ loading: false, success: false })} noheader>
                <div className='px-5 py-1 flex justify-center items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)' }}>
                  <div className='flex justify-center items-center flex-col gap-5 py-10 px-20 mt-20 mb-20'
                  >
                    <img src={WaitingIcon} alt="SuccessTik" />
                    <p className='text-[12px]' style={{ color: 'rgba(29, 91, 191, 1)' }}>Waiting for Program Manager Manager Approval</p>
                  </div>

                </div>
              </MuiModal>

              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={requestStatusInfo === requestStatus.reschedule || requestStatusInfo === requestStatus.cancel}
              >
                <div className='px-5 py-1 flex justify-center items-center'>
                  <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                    style={{ background: '#fff', borderRadius: '10px' }}>
                    <img src={SuccessTik} alt="SuccessTik" />
                    <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                      style={{
                        fontWeight: 600
                      }}
                    >Program {requestStatusInfo === requestStatus.reschedule ? 'Rescheduled ' :
                      requestStatusInfo === requestStatus.cancel ? 'Cancelled ' : ''
                      } Successfully</p>
                  </div>

                </div>

              </Backdrop>

              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={startProgramModal.success}
              >
                <div className='px-5 py-1 flex justify-center items-center'>
                  <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                    style={{ background: '#fff', borderRadius: '10px' }}>
                    <img src={SuccessTik} alt="SuccessTik" />
                    <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                      style={{
                        fontWeight: 600
                      }}
                    >Started Request Approved by Program Manager Manager</p>
                  </div>

                </div>
              </Backdrop>

              <MuiModal modalOpen={moreMenuModal.share} modalClose={handleMoreMenuClosePopup} noheader>
                <div className='px-5 py-1 flex justify-center items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)' }}>
                  <div className='flex justify-center items-center flex-col gap-8 py-10 px-20 mt-5'
                  >
                    <div>{programdetails?.program_name}</div>
                    <input className='input-bg text-[12px] h-[60px] w-[396px] px-5' style={{ borderRadius: '27px' }} disabled
                      value={url} />
                    <div className='flex gap-7'>
                      <img className='cursor-pointer' src={LinkIcon} alt="LinkIcon" onClick={handleCopy} />
                      {/* <img className='cursor-pointer' src={LinkedInIcon} alt="LinkedInIcon" />
                                            <img className='cursor-pointer' src={InstagramIcon} alt="InstagramIcon" />
                                            <img className='cursor-pointer' src={FacebookOutlineIcon} alt="FacebookOutlineIcon" />
                                            <img className='cursor-pointer' src={TwitterIcon} alt="TwitterIcon" /> */}
                    </div>

                    <div className="flex  justify-center align-middle pt-4">
                      <Button btnType="button" onClick={handleMoreMenuClosePopup} btnName='Close' btnCategory="primary" />
                    </div>
                  </div>

                </div>
              </MuiModal>

              {
                moreMenuModal.reschedule &&

                <MuiModal modalOpen={moreMenuModal.reschedule} modalClose={handleMoreMenuClosePopup} noheader>
                  <div style={{ border: '1px solid rgba(29, 91, 191, 1)' }}>
                    <div className='flex justify-between items-center px-3 py-4 mx-1' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
                      <div>Reschedule {programdetails.name}</div>
                      <img className='cursor-pointer' onClick={() => setMoreMenuModal({ share: false, reschedule: false })} src={CancelIcon} alt="CancelIcon" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='px-4 py-7'>

                        <div className="flex flex-wrap gap-4">

                          <div className={`relative mb-6 w-[48%]`} >
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={'Reschedule Date'}>
                              Reschedule Start Date
                            </label>

                            <div className='relative input-bg'>
                              <Calendar
                                className='calendar-control w-full'
                                {...dateStartField}
                                value={dateFormat['reschedule_start_date']}
                                onChange={(e) => {
                                  dateStartField.onChange(e)
                                  setDateFormat({ reschedule_end_date: '', reschedule_start_date: e.value })
                                  calendarRef?.current[0]?.hide()
                                }}
                                onClick={handleDateClick}
                                disabled={false}
                                // minDate={new Date()}
                                // maxDate={new Date(programdetails.end_date)}
                                minDate={new Date()}
                                maxDate={["yettostart", "yettojoin"].includes(programdetails?.status) ? "" : new Date(programdetails?.end_date)}
                                showTime={false}
                                hourFormat="12"
                                dateFormat="dd/mm/yy"
                                style={{ width: '60%' }}
                                ref={el => (calendarRef.current[0] = el)}
                                viewDate={["yettostart", "yettojoin"].includes(programdetails?.status) ? new Date() : new Date(programdetails?.start_date)}
                              />

                              <img className='absolute top-5 right-2 cursor-pointer' src={CalendarIcon} alt="CalendarIcon"
                                onClick={(e) => {
                                  handleDateClick();
                                  calendarRef?.current[0]?.show();

                                }}
                              />
                            </div>
                            {errors['reschedule_start_date'] && (
                              <p className="error" role="alert">
                                {errors['reschedule_start_date'].message}
                              </p>
                            )}

                          </div>

                          <div className={`relative mb-6 w-[48%]`} >
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={'Reschedule Date'}>
                              Reschedule End Date
                            </label>

                            <div className='relative input-bg'>
                              <Calendar
                                className='calendar-control w-full'
                                {...dateEndField}
                                value={dateFormat['reschedule_end_date']}
                                onChange={(e) => {
                                  dateEndField.onChange(e)
                                  setDateFormat({ ...dateFormat, ['reschedule_end_date']: e.value })
                                  calendarRef?.current[1]?.hide()
                                }}
                                onClick={handleDateClick}
                                disabled={false}
                                // minDate={new Date(dateFormat.reschedule_start_date)}
                                // maxDate={new Date(programdetails.end_date)}
                                minDate={dateFormat.reschedule_start_date ? new Date(dateFormat.reschedule_start_date) : new Date()}
                                maxDate={["yettostart", "yettojoin"].includes(programdetails?.status) ? "" : new Date(programdetails?.end_date)}
                                showTime={false}
                                hourFormat="12"
                                dateFormat="dd/mm/yy"
                                style={{ width: '60%' }}
                                ref={el => (calendarRef.current[1] = el)}
                                viewDate={new Date(dateFormat.reschedule_start_date ?? programdetails?.start_date)}
                              />

                              <img className='absolute top-5 right-2 cursor-pointer' src={CalendarIcon} alt="CalendarIcon"
                                onClick={(e) => {
                                  handleDateClick();
                                  calendarRef?.current[1]?.show();

                                }}
                              />
                            </div>
                            {errors['reschedule_end_date'] && (
                              <p className="error" role="alert">
                                {errors['reschedule_end_date'].message}
                              </p>
                            )}
                          </div>

                          <div className={`relative mb-6 w-full`} >
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={'Comments'}>
                              Comments
                            </label>
                            <textarea id="message" rows="4" className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                                                   focus:visible:outline-none focus:visible:border-none}`}
                              placeholder={''}
                              {...register('reason', { required: "This field is required" })}></textarea>

                            {errors['reason'] && (
                              <p className="error" role="alert">
                                {errors['reason'].message}
                              </p>
                            )}
                          </div>

                        </div>

                      </div>


                      <div className="flex gap-6 justify-center align-middle py-5">
                        <Button btnName='Cancel' btnCategory="secondary" onClick={() => setMoreMenuModal({ share: false, reschedule: false })} />
                        {/* <Button btnType="submit" btnCls="w-[170px]" btnName={'Submit'} btnCategory="primary" /> */}
                        <Button btnType="submit"
                          // onClick={() => {
                          //     setMoreMenuModal({ share: false, reschedule: false });
                          //     setStartProgramModal({ loading: false, success: true })
                          // }}

                          btnName='Submit' btnCategory="primary" />
                      </div>
                    </form>
                  </div>
                </MuiModal>

              }

              {
                moreMenuModal.cancel &&

                <MuiModal modalSize='md' modalOpen={moreMenuModal.cancel} modalClose={handleMoreMenuClosePopup} noheader>

                  <div className='px-5 py-5'>
                    <div className='flex justify-center flex-col gap-5  mt-4 mb-4'
                      style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px', }}>
                      <div className='flex justify-between px-3 py-4 items-center' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
                        <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Cancel Reason </p>
                        <img className='cursor-pointer' onClick={handleMoreMenuClosePopup} src={CancelIcon} alt="CancelIcon" />
                      </div>

                      <div className='px-5'>
                        {
                          requestError !== '' ? <p className="error" role="alert">{requestError}</p> : null
                        }

                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='relative pb-8'>
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                              Cancel Reason
                            </label>

                            <div className='relative'>
                              <textarea
                                {...register('cancel_reason', {
                                  required: "This field is required",
                                })}
                                id="message" rows="4" className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                                                focus-visible:outline-none focus-visible:border-none`}
                                style={{ border: '2px solid rgba(229, 0, 39, 1)' }}
                                placeholder={''}
                              ></textarea>
                              {errors['cancel_reason'] && (
                                <p className="error" role="alert">
                                  {errors['cancel_reason'].message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                            <Button btnName='Cancel' btnCls="w-[18%]" btnCategory="secondary" onClick={handleMoreMenuClosePopup} />
                            <button
                              type='submit'
                              className='text-white py-3 px-7 w-[18%]'
                              style={{ background: 'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)', borderRadius: '3px' }}>
                              Submit
                            </button>
                          </div>
                        </form>

                      </div>


                    </div>

                  </div>
                </MuiModal>
              }

              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={completeProgram.bool}
              >
                <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
                  <img src={TickColorIcon} alt="TickColorIcon" />
                  <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>
                    Complete
                  </span>
                  <div className='py-5'>
                    <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>
                      Are you sure want to complete the program?
                    </p>
                  </div>
                  <div className='flex justify-center'>
                    <div className="flex gap-6 justify-center align-middle">
                      <Button btnCls="w-[110px]" btnName={'No'} btnCategory="secondary" onClick={handleCloseConfirmPopup} />
                      <Button btnType="button" btnCls="w-[110px]" btnName={'Yes'}
                        style={{ background: '#16B681' }} btnCategory="primary"
                        onClick={() => handleComplete(programDetails.id)}
                      />
                    </div>
                  </div>
                </div>
              </Backdrop>

              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={completeProgram.activity}
              >
                <div className='px-5 py-1 flex justify-center items-center'>
                  <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                    style={{ background: '#fff', borderRadius: '10px' }}>
                    <img src={SuccessTik} alt="SuccessTik" />
                    <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                      style={{
                        fontWeight: 600
                      }}
                    >Successfully completed a program</p>
                  </div>

                </div>
              </Backdrop>

            </div>
          </div>
          : null
      }
    </div >
  )

}
