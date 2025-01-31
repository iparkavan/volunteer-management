import React, { useEffect, useState } from 'react'

import CancelIcon from '../../../assets/images/cancel-colour1x.png'
import EditIcon from '../../../assets/images/Edit1x.png'
import FileIcon from '../../../assets/icons/linkIcon.svg'
import SuccessTik from '../../../assets/images/blue_tik1x.png';
import UploadIcon from "../../../assets/images/image_1x.png"
import { Button } from '../../../shared'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Backdrop, Box, CircularProgress, Grid, Menu, MenuItem, Stack, Tab, Tabs, Typography } from '@mui/material'
import { getMenteeTaskfromMentor, getMenteeTaskListFromMentor, getSpecificTask, updateAllPassFail, updateCancelAllTask, updateSinglePassFail, updateTaskMark } from '../../../services/task'
import { dateFormat, dateFormatRever, dateTimeFormat, getFiles } from '../../../utils'
import { TaskApiStatus, taskStatus, TaskStatus, taskStatusColorNew } from '../../../utils/constant'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs';
import DataTable from '../../../shared/DataGrid';
import MoreIcon from '../../../assets/icons/moreIcon.svg';
import ViewIcon from '../../../assets/images/view1x.png';
import Cancel from "../../../assets/icons/cancelCircleIcon.svg"
import { CancelPopup } from './cancelPopup';
import BreadCrumbsArrow from "../../../assets/icons/breadCrumbsArrow.svg"
import TickColorIcon from '../../../assets/icons/tickColorLatest.svg'
import TickCircle from "../../../assets/icons/tickCircle.svg"
import ProgramHistoryIcon  from "../../../assets/icons/historyIcon.svg"
import moment from 'moment';

const MentorTaskDetails = () => {
    const navigate = useNavigate()
    const [editTask, setEditTask] = useState(true)
    const params = useParams();
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { task: taskDetails, loading: taskDetailsLoading, status, menteeTaskList } = useSelector(state => state.tasks)
    const state = useLocation()?.state
    const [selectedTab, setSelectedTab] = React.useState("")
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10
    })
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState({});
    const open = Boolean(anchorEl);
    const [confirmPopup, setConfirmPopup] = React.useState({
        cancel: false,
        type: "",
        activity: false,
        title: "Cancel Task Reason",
        pass: false
    })
    const [newType, setNewType] = React.useState("")

    const handleClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(row);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedItem(null);
    };
    const tabsList = [
        {
            name: "All",
            key: ""
        },
        {
            name: "New",
            key: "new"
        },
        {
            name: "In Progress",
            key: "inprogress"
        },
        {
            name: "Pending",
            key: "pending"
        },
        {
            name: "Re Assign",
            key: "reassigned"
        },
        {
            name: "Completed",
            key: "completed"
        },
        {
            name: "Cancel",
            key: "rejected"
        },
    ]
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const marks = () => {
        const markList = []
        for (let a = 1; a <= 10; a++) {
            markList.push({ key: a, value: a })
        }

        return markList
    }

    const onSubmit = (data) => {
        const apiData = { result: data.result === 'true', mentee_id: taskDetails.mentee_id, task_id: taskDetails.id }
        setEditTask(false)
        dispatch(updateTaskMark(apiData))
    }

    useEffect(() => {
        if (status === TaskApiStatus.updatemark) {
            setTimeout(() => {
                navigate('/mentor-tasks?type=menteetask')
            }, [2000])
        }
    }, [status])

    useEffect(() => {
        if (taskDetails.status === 'waiting_for_approval' && !editTask) {
            setEditTask(true)
        } else {
            setEditTask(false)
        }
    }, [taskDetails])


    // useEffect(() => {
    //     if (params && params.id && searchParams) {
    //         const menteeId = searchParams.get("mentee_id");
    //         dispatch(getSpecificTask({ task_id: params.id }))
    //     }
    // }, [params, searchParams])


    const referenceView = taskDetails?.reference_link || ''

    const docs = referenceView !== '' ? referenceView?.split(',') || [] : []

    const radiobox = register('result', { required: 'This field is required' })

    const allFiles = getFiles(taskDetails?.files || [])


    const handleTab = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const handleOpenConfirmPopup = (type, title = confirmPopup?.title, new_type = "") => {
        setNewType(new_type)
        handleClose()
        setConfirmPopup({
            ...confirmPopup,
            [type === "reassign" ? 'cancel' : type]: true,
            type: type,
            title: title
        })
    }

    const handleCloseConfirmPopup = (type = confirmPopup?.type) => {
        setConfirmPopup({
            ...confirmPopup,
            [type]: false,
            type: "",
            title: ""
        })
    }


    const menteeTaskListFromMentor = [
        {
            field: 'mentee_name',
            headerName: 'Volunteer Name',
            flex: 1,
            id: 0,
        },
        {
            field: 'phone_number',
            headerName: 'Phone Number',
            flex: 1,
            id: 0,
        },
        {
            field: 'mentee_email',
            headerName: 'Email',
            flex: 1,
            id: 0,
        },
        {
            field: 'sub_date',
            headerName: 'Sub.Date',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{`${params?.row?.submited_date ? moment(params?.row?.submited_date).format("MM-DD-YYYY") : "..."}`}</div>
            }
        },
        {
            field: 'cancel_date',
            headerName: 'Cancel Date',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{`${params?.row?.cancel_date ? moment(params?.row?.cancel_date).format("MM-DD-YYYY") : "..."}`}</div>
            }
        },
        {
            field: 'last_update_date',
            headerName: 'Last Update Date',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{`${params?.row?.completed_date ? moment(params?.row?.completed_date).format("MM-DD-YYYY") : "..."}`}</div>
            }
        },
        {
            field: 'status',
            headerName: 'Task status',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full relative'>

                        <span className='w-[80px] flex justify-center h-[30px] px-7'
                            style={{
                                background: taskStatusColorNew[params?.row?.status]?.bg, lineHeight: '30px',
                                borderRadius: '3px', width: '110px', height: '34px', color: taskStatusColorNew?.[params?.row?.status]?.color
                            }}>
                            {taskStatus?.[params?.row?.status]}
                        </span>
                    </div>
                </>
            }
        },
        {
            field: 'result',
            headerName: 'Result',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{`${params?.row?.result ?? "..."}`}</div>
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return (
                    // <>
                    //     <div
                    //         className='cursor-pointer flex items-center h-full'
                    //         onClick={(e) => handleClick(e, params.row)}
                    //     >
                    //         <img src={MoreIcon} alt='MoreIcon' />
                    //     </div>
                    //     <Menu
                    //         id='basic-menu'
                    //         anchorEl={anchorEl}
                    //         open={open}
                    //         onClose={handleClose}
                    //         MenuListProps={{
                    //             'aria-labelledby': 'basic-button',
                    //         }}
                    //     >
                    //         <MenuItem
                    //             onClick={() => navigate(`/viewTask/${selectedItem?.id}`)}
                    //             className='!text-[12px]'
                    //         >
                    //             <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                    //             View
                    //         </MenuItem>

                    //         {
                    //             params?.row?.status === "new" &&
                    //             <MenuItem
                    //                 onClick={() => handleOpenConfirmPopup("cancel", "Cancel Task Reason", "newTab")}
                    //                 className='!text-[12px]'
                    //             >
                    //                 <img src={Cancel} alt='Cancel' className='pr-3 w-[30px]' />
                    //                 Cancel Task
                    //             </MenuItem>
                    //         }
                    //         {
                    //             ["pending"].includes(params?.row?.status) && (
                    //                 <>
                    //                     <MenuItem
                    //                         onClick={() => handleOpenConfirmPopup("pass")}
                    //                         className='!text-[12px]'
                    //                     >
                    //                         <img src={TickCircle} alt='Cancel' className='pr-3 w-[30px]' />
                    //                         Pass
                    //                     </MenuItem>

                    //                     <MenuItem
                    //                         onClick={() => handleOpenConfirmPopup("cancel", "Task Fail Reason")}
                    //                         className='!text-[12px]'
                    //                     >
                    //                         <img src={Cancel} alt='Cancel' className='pr-3 w-[30px]' />
                    //                         No Pass
                    //                     </MenuItem>
                    //                 </>
                    //             )
                    //         }
                    //         {
                    //             params?.row?.status === "pending" &&
                    //             <MenuItem
                    //                 onClick={() => handleOpenConfirmPopup("cancel", "Task Fail Reason")}
                    //                 className='!text-[12px]'
                    //             >
                    //                 <img src={Cancel} alt='Cancel' className='pr-3 w-[30px]' />
                    //                 No Pass
                    //             </MenuItem>
                    //         }
                    //     </Menu>
                    // </>

                    <>
                        <div
                            className='cursor-pointer flex items-center h-full'
                            onClick={(e) => handleClick(e, params.row)}
                        >
                            <img src={MoreIcon} alt='MoreIcon' />
                        </div>
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

                            {selectedItem && (
                                <>
                                    <MenuItem
                                        onClick={() => navigate(`/viewTask/${selectedItem?.id}`)}
                                        className='!text-[12px]'
                                    >
                                        <img src={ViewIcon} alt='ViewIcon' className='pr-3 w-[30px]' />
                                        View
                                    </MenuItem>


                                    {selectedItem?.status === "new" && (
                                        <MenuItem
                                            onClick={() => handleOpenConfirmPopup("cancel", "Cancel Task Reason", "newTab")}
                                            className='!text-[12px]'
                                        >
                                            <img src={Cancel} alt='Cancel' className='pr-3 w-[30px]' />
                                            Cancel Task
                                        </MenuItem>
                                    )}


                                    {selectedItem?.status === "pending" && (
                                        <>
                                            <MenuItem
                                                onClick={() => handleOpenConfirmPopup("pass")}
                                                className='!text-[12px]'
                                            >
                                                <img src={TickCircle} alt='Cancel' className='pr-3 w-[30px]' />
                                                Pass
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => handleOpenConfirmPopup("cancel", "Task Fail Reason", "fail")}
                                                className='!text-[12px]'
                                            >
                                                <img src={Cancel} alt='Cancel' className='pr-3 w-[30px]' />
                                                No Pass
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => handleOpenConfirmPopup("reassign", "Re Assign Reason", "reject_one_task")}
                                                className='!text-[12px]'
                                            >
                                                <img src={ProgramHistoryIcon} alt='ProgramHistoryIcon' className='pr-3 w-[30px]' />
                                                Re Assign
                                            </MenuItem>
                                        </>
                                    )}
                                </>
                            )}
                        </Menu>
                    </>
                );
            },
        },
    ]


    const getMenteeList = () => {
        const payload = {
            task_id: params.id,
            status: selectedTab
        }
        dispatch(getMenteeTaskListFromMentor(payload))
    }


    React.useEffect(() => {
        getMenteeList()
    }, [selectedTab, paginationModel])

    const handleEditTask = () => {
        const keysToExclude = ["results", "count", "next", "total_pages", "previous", "next", "page_size", "current_page"];

        const data = Object.fromEntries(
            Object.entries(menteeTaskList).filter(([key]) => !keysToExclude.includes(key))
        );

        const constructedData = {
            ...data,
            task_id: menteeTaskList?.assign_task_id,
            state_date: data?.program_startdate
        }

        navigate(`/assign-mentees/?type=edit`, {
            state: {
                data: constructedData
            }
        })
    }

    const handleOpenAllPass = () => {
        setConfirmPopup({
            ...confirmPopup,
            cancel: true,
            title: "Task No Pass Reason"
        })
    }


    const handleCancelAllTask = () => {
        setConfirmPopup({
            ...confirmPopup,
            cancel: true,
            title: "Cancel Task Reason"
        })
    }


    const handleUpdateResult = async (type, reason = "") => {
        let payload = {            
            "task_id": selectedItem?.id,
            "type": newType === "reject_one_task" ? "reject_one_task" : "single_result"
        }
        if(type !== "reject_one_task"){
            payload={
                ...payload,
                "result": type === "pass" ? true : false,
            }
        }
        if (type === "fail" || type === "reject_one_task") {
            payload = {
                ...payload,
                reason: reason
            }
        }
        dispatch(updateSinglePassFail(payload)).then(async (res) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (type === "pass") {
                    setConfirmPopup({
                        ...confirmPopup,
                        pass: false,
                        activity: true
                    })
                    setTimeout(() => {
                        setConfirmPopup({
                            ...confirmPopup,
                            pass: false,
                            activity: false,
                            type: ""
                        })
                        getMenteeList()
                    }, 2000);
                } else {
                    setConfirmPopup({
                        ...confirmPopup,
                        cancel: false,
                        activity: true
                    })
                    setTimeout(() => {
                        setConfirmPopup({
                            ...confirmPopup,
                            cancel: false,
                            activity: false,
                            type: ""
                        })
                        getMenteeList()
                        setNewType('')
                    }, 2000);
                }
            }
        })
    }


    const handleCancelAllMentee = (reason = "") => {
        // updateCancelAllTask
        const payload = {
            task_id: (selectedTab === "new" && newType === "newTab") ? selectedItem?.id : selectedTab === "" ? selectedItem?.id : menteeTaskList?.assign_task_id,
            type: (selectedTab === "new" && newType === "newTab") ? "cancel_one_task" : selectedTab === "" ? "cancel_one_task" : "cancel_all_tasks",
            reason: reason
        }
        dispatch(updateCancelAllTask(payload)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {

                setConfirmPopup({
                    ...confirmPopup,
                    cancel: false,
                    activity: true,
                    type: "cancel_all"
                })

                setTimeout(() => {
                    setConfirmPopup({
                        ...confirmPopup,
                        activity: false,
                        cancel: false,
                        type: ""
                    })
                    setNewType("")
                    getMenteeList()
                }, 2000);
            }
        })
    }

    const handleUpdateAllTask = (type, reason = "") => {
        let payload = {
            "result": type === "pass" ? true : false,
            "task_id": menteeTaskList?.assign_task_id,
            "type": "all_result"
        }
        if (type === "cancel") {
            payload = {
                ...payload,
                reason: reason
            }
        }
        dispatch(updateAllPassFail(payload)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (type === "pass") {
                    setConfirmPopup({
                        ...confirmPopup,
                        pass: false,
                        activity: true
                    })
                    setTimeout(() => {
                        setConfirmPopup({
                            ...confirmPopup,
                            pass: false,
                            activity: false,
                            type: ""
                        })
                        getMenteeList()
                    }, 2000);
                } else {
                    setConfirmPopup({
                        ...confirmPopup,
                        cancel: false,
                        activity: true,
                        type: type
                    })
                    setTimeout(() => {
                        setConfirmPopup({
                            ...confirmPopup,
                            cancel: false,
                            activity: false,
                            type: ""
                        })
                    }, 2000);
                }
            }
        })



    }

    const leftGridData = [
        {
            title: "Category",
            value: menteeTaskList?.program_category_name ?? ''
        },
        {
            title: "Program Start Date",
            value: dateFormatRever(menteeTaskList?.program_startdate)
        },
    ]

    const rightGridData = [
        {
            title: "Program Name",
            value: menteeTaskList?.program_name
        },
        {
            title: "Program End Date",
            value: dateFormatRever(menteeTaskList?.program_enddate)
        }
    ]

    return (
        <div className="px-9 py-9">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={status === TaskApiStatus.updatemark}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >
                            Result Updated Successfully</p>
                    </div>

                </div>

            </Backdrop>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={taskDetailsLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={"30px"}>
                <Stack direction={"row"} alignItems={"center"} spacing={"14px"}>
                    <Typography className='!text-[#5975A2] !text-[14px] cursor-pointer' fontWeight={500}
                        onClick={() => navigate(-1)}>MenteesTask</Typography>
                    <img src={BreadCrumbsArrow} alt="" />
                    <Typography className='!text-[#18283D] !text-[14px] cursor-pointer' fontWeight={500}>View {menteeTaskList?.program_name}</Typography>
                </Stack>

                {
                    menteeTaskList?.editable &&
                    <Button
                        btnType='button'
                        btnCls='w-[auto]'
                        btnName={'Edit Task'}
                        btnCategory='primary'
                        onClick={() => handleEditTask()}
                    />
                }
            </Stack>


            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
                {/* <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                    <div className='flex gap-5 items-center text-[20px]'>
                        <p>Task - {taskDetails.task_name}</p>
                    </div>

                    <div className='flex gap-8 items-center'>
                        <div className="relative">
                            <div className="inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                                onClick={() => navigate(state?.from === "program" ? -1 : '/mentor-tasks')}
                            >
                                <img src={CancelIcon} alt='SearchIcon' />
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className='px-4'>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Grid container>
                                {
                                    leftGridData?.map((e, i, len) => {
                                        return (
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item xs={5} style={{
                                                        borderTop: '1px solid #232323',
                                                        borderLeft: '1px solid #232323',
                                                        borderRight: '1px solid #232323',
                                                        borderBottom: len.length - 1 !== i ? "none" : '1px solid #232323',
                                                        borderTopLeftRadius: i === 0 && '3px',
                                                        borderBottomLeftRadius: len?.length - 1 === i && '3px',
                                                    }}>
                                                        <Typography className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">{e?.title}</Typography>
                                                    </Grid>
                                                    <Grid item xs={7} sx={{
                                                        borderBottom: len?.length - 1 === i && "1px solid #FE634E",
                                                        borderTopRightRadius: i === 0 && '3px',
                                                        borderBottomRightRadius: len?.length - 1 === i && '3px',
                                                    }}>
                                                        <Typography className="px-6 py-4 text-white !text-[14px] !bg-[#FE634E]"
                                                            sx={{
                                                                borderBottom: len?.length - 1 === i && "1px solid #FE634E",
                                                                borderTopRightRadius: i === 0 && '3px',
                                                                borderBottomRightRadius: len?.length - 1 === i && '3px',
                                                            }}>{e?.value}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }

                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container>
                                {
                                    rightGridData?.map((e, i, len) => {
                                        return (
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item xs={5} style={{
                                                        borderTop: '1px solid #232323',
                                                        borderLeft: '1px solid #232323',
                                                        borderRight: '1px solid #232323',
                                                        borderBottom: len.length - 1 !== i ? "none" : '1px solid #232323',
                                                        borderTopLeftRadius: i === 0 && '3px',
                                                        borderBottomLeftRadius: len?.length - 1 === i && '3px',
                                                    }}>
                                                        <Typography className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">{e?.title}</Typography>
                                                    </Grid>
                                                    <Grid item xs={7} sx={{
                                                        borderBottom: len?.length - 1 === i && "1px solid #4f4f4f",
                                                        borderTopRightRadius: i === 0 && '3px',
                                                        borderBottomRightRadius: len?.length - 1 === i && '3px',
                                                    }}>
                                                        <Typography className="px-6 py-4 text-white !text-[14px] !bg-[#4f4f4f]"
                                                            sx={{
                                                                borderBottom: len?.length - 1 === i && "1px solid #4f4f4f",
                                                                borderTopRightRadius: i === 0 && '3px',
                                                                borderBottomRightRadius: len?.length - 1 === i && '3px',
                                                            }}>{e?.value}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        )
                                    })
                                }

                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <div className='task-desc flex mt-5 px-5 py-6' style={{ border: '1px solid rgba(29, 91, 191, 0.5)' }}>

                        <p className='text-[14px]'>Task</p>  :
                        <p className='text-[14px] pl-6'>{taskDetails.task_name}</p>
                    </div>

                    <div className='task-desc flex mt-5 px-5 py-6' style={{ border: '1px solid rgba(29, 91, 191, 0.5)' }}>

                        <p className='text-[14px]'>Task Description</p>  :
                        <p className='text-[14px] pl-6'>{taskDetails.task_description}</p>
                    </div>

                    <div className='task-desc flex mt-5 px-5 py-6' style={{ border: '1px solid rgba(29, 91, 191, 0.5)' }}>

                        <p className='text-[14px]'>Task Solution</p>  :
                        <p className='text-[14px] pl-6'>{taskDetails.task_solution}</p>
                    </div> */}

                    <Box className="!border !border-border-black rounded-[3px] mt-5">
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} className='!border-b-2 !border-border-black px-[35px] py-[22px]'>
                            <Typography className='!text-[#18283D] !text-[16px]' fontWeight={600}>{menteeTaskList?.task_name}</Typography>
                            <Typography className='!text-[#18283D] !text-[14px]'>Due date: {moment(menteeTaskList.due_date).format("MM-DD-YYYY")}</Typography>
                        </Stack>
                        <Stack spacing={3} className='px-[35px] py-[22px]'>
                            <Typography className='!text-[#18283D] !text-[16px]' sx={{ fontWeight: 500 }}>
                                {`Reference Book: `}
                                <span className='!text-[#18283D] !text-[14px]'>
                                    {
                                        menteeTaskList?.reference_link
                                    }
                                </span>
                            </Typography>
                            <Typography className='!text-[#18283D] !text-[16px]' sx={{ fontWeight: 500 }}>
                                {`Task Details: `}
                                <span>
                                    {menteeTaskList?.task_details}
                                </span>
                            </Typography>
                        </Stack>
                    </Box>

                    <Box mt={"48px"}>
                        <Box sx={{ borderBottom: "1px solid #D9E4F2" }}>
                            <Tabs
                                value={selectedTab}
                                onChange={handleTab}
                                sx={{
                                    "& .MuiTabs-indicator": {
                                        height: "5px",
                                        background: "#FE634E",
                                        borderRadius: "12px 12px 0px 0px"
                                    }
                                }}
                            >
                                {
                                    tabsList?.map((e) => {
                                        return (
                                            <Tab value={e?.key} label={
                                                <Typography className={`!text-[14px] text-[${selectedTab === e.key ? '#FE634E' : '#18283D'}] 
                                                    capitalize -pb-[8px]`} sx={{ fontWeight: 400 }}>{e?.name}</Typography>
                                            } />
                                        )
                                    })
                                }
                            </Tabs>
                        </Box>

                        <Box mt={"48px"}>
                            <DataTable rows={menteeTaskList?.results ?? []}
                                columns={menteeTaskListFromMentor}
                                rowCount={menteeTaskList?.count}
                                paginationModel={paginationModel}
                                hideCheckbox
                                setPaginationModel={setPaginationModel}
                                hideFooter={menteeTaskList?.results?.length === 0}
                            />
                        </Box>

                        {
                            (selectedTab === "pending" && menteeTaskList?.results?.length > 0) &&
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"} mt={"50px"}>
                                <Stack direction={"row"} alignItems={"center"} spacing={"20px"}>
                                    <Button
                                        btnName='All No Pass'
                                        btnCategory='secondary'
                                        onClick={() => handleOpenAllPass()}
                                        btnCls='w-[225px] !border !border-[#E0382D] rounded-[3px] !text-[#E0382D] h-[45px]'
                                    />
                                    <Button
                                        btnType='button'
                                        btnCls='w-[225px] h-[45px]'
                                        btnName={'All Pass'}
                                        btnCategory='primary'
                                        onClick={() => handleOpenConfirmPopup("pass")}
                                    />
                                </Stack>
                            </Stack>
                        }

                        {
                            (selectedTab === "new" && menteeTaskList?.results?.length > 0) &&
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"} mt={"50px"}>
                                <Stack direction={"row"} alignItems={"center"} spacing={"20px"}>
                                    <Button
                                        btnName='Cancel all mentees task'
                                        btnCategory='secondary'
                                        onClick={() => handleCancelAllTask()}
                                        btnCls='w-[225px] !border !border-[#E0382D] rounded-[3px] !text-[#E0382D] h-[45px]'
                                    />
                                    <Button
                                        btnType='button'
                                        btnCls='w-[225px] h-[45px]'
                                        btnName={'Edit Task'}
                                        btnCategory='primary'
                                        onClick={() => handleEditTask()}
                                    />
                                </Stack>
                            </Stack>
                        }

                        {
                            ["", "completed", "rejected"].includes(selectedTab) &&
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"} mt={"50px"}>
                                <Button
                                    btnType='button'
                                    btnCls='w-[225px] h-[45px]'
                                    btnName={'Close'}
                                    btnCategory='primary'
                                    onClick={() => navigate(-1)}
                                />
                            </Stack>
                        }
                    </Box>

                    {/* <div className='flex justify-between task-uploaded-images-container'>
                        {
                            allFiles.files ?

                                <div>
                                    <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Image</div>
                                    {
                                        allFiles.image.map((imges, index) =>

                                            <div className='uploaded-images task-image-list' key={index}>
                                                <div className='flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                                    style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                    <a href={imges.fileurl} target='_blank'>
                                                        <div className='flex gap-3 items-center'>
                                                            <img src={UploadIcon} alt="altlogo" />
                                                            <span className='text-[12px] image-name'>{imges.name}</span>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>

                                : null
                        }


                        {
                            allFiles.video.length ?

                                <div>
                                    <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Video</div>

                                    {
                                        allFiles.video.map((imges, index) =>
                                            <div className='task-image-list flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                                style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }} key={index}>
                                                <a href={imges.fileurl} target='_blank'>
                                                    <div className='flex gap-3 items-center'>
                                                        <img src={UploadIcon} alt="altlogo" />
                                                        <span className='text-[12px] image-name'>{imges.name}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    }
                                </div>


                                :

                                null

                        }



                        {
                            allFiles.doc.length ?

                                <div>
                                    <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Files</div>

                                    {
                                        allFiles.doc.map((imges, index) =>
                                            <div className='task-image-list flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                                style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }} key={index}>
                                                <a href={imges.fileurl} target='_blank'>
                                                    <div className='flex gap-3 items-center'>
                                                        <img src={UploadIcon} alt="altlogo" />
                                                        <span className='text-[12px] image-name'>{imges.name}</span>
                                                    </div>
                                                </a>
                                            </div>
                                        )
                                    }
                                </div>

                                : null
                        }

                    </div> */}
                    {/* 
                    <form onSubmit={handleSubmit(onSubmit)}>



                        <div className='py-6 mb-16'>
                            <div className='reference-link flex justify-between mb-8'>
                                <div className='reference-view'>
                                    <p className='py-4'>Reference Book</p>
                                    <ul className='leading-10'>
                                        {
                                            docs?.map((doc, index) => <li key={index}>{index + 1}. <span>{doc}</span></li>)
                                        }

                                    </ul>
                                </div>


                            </div>
                            {
                                (taskDetails.result !== '' && taskDetails.result !== null && taskDetails.result !== '----') &&

                                <div className='mark flex'>
                                    <div className='mr-96'>
                                        Result :

                                        <span style={{
                                            background: taskDetails.result === 'Pass' ? 'rgba(235, 255, 243, 1)' : 'rgba(255, 231, 231, 1)',
                                            color: taskDetails.result === 'Pass' ? 'rgba(22, 182, 129, 1)' : 'rgba(224, 56, 45, 1)',
                                            borderRadius: "6px",
                                            padding: "4px 22px",
                                            marginLeft: "15px"
                                        }}>
                                            {taskDetails.result}
                                        </span>
                                    </div>
                                </div>
                            }

                        {
                            taskDetails.status === 'waiting_for_approval' &&
                            <>
                                <div className='relative py-5'>
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                        Result
                                    </label>
                                    <div className='relative '>
                                        <div className="flex items-center me-4">
                                            <div className="flex items-center me-4">
                                                <div className="flex items-center me-4">
                                                    <input type="radio" className="w-4 h-4 text-blue-600 bg-gray-100
                                                                                    border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                                    dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                                                                    dark:border-gray-600"
                                                        {...radiobox}
                                                        onChange={e => {
                                                            radiobox.onChange(e);
                                                        }}
                                                        value={true}
                                                    />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{"Pass"}</label>
                                                </div>

                                                <div className="flex items-center me-4">
                                                    <input type="radio" className="w-4 h-4 text-blue-600 bg-gray-100
                                                                                    border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                                    dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                                                                    dark:border-gray-600"
                                                        {...radiobox}
                                                        onChange={e => {
                                                            radiobox.onChange(e);
                                                        }}
                                                        value={false}
                                                    />
                                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{'Fail'}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {errors['result'] && (
                                    <p className="error" role="alert">
                                        {errors['result'].message}
                                    </p>
                                )}
                            </>
                        }
                </div>

                <div className='close-btn flex justify-center gap-7 pb-5'>
                    {
                        editTask ?
                            <>
                                <Button btnName='Close' btnCls="w-[12%]" btnCategory="secondary" onClick={() => navigate('/mentor-tasks')} />
                                <Button btnType="submit" btnCls={`${editTask ? 'w-[14%]' : 'w-[12%]'}`}
                                    btnName='Submit' btnCategory="primary" />
                            </>
                            :
                            <Button btnType="button" btnCls="w-[10%]" onClick={() => { navigate('/mentor-tasks?type=menteetask') }} btnName='Close' btnCategory="primary" />
                    }

                </div>
            </form> */}
                </div>


            </div >

            <CancelPopup open={confirmPopup?.cancel} header={confirmPopup?.title} handleClosePopup={() => handleCloseConfirmPopup("cancel")}
                handleSubmit={(reason) => {
                    if (selectedTab === "new" || selectedTab === "") {
                        if (newType === "fail") {
                            handleUpdateResult("fail", reason)
                        } else if(newType === "reject_one_task"){
                            handleUpdateResult("reject_one_task", reason)
                        } else {
                            handleCancelAllMentee(reason)
                        }
                    } else if (selectedTab === "pending"&&!newType) {                        
                            handleUpdateAllTask("cancel", reason)                    
                    } else {
                        handleUpdateResult("fail", reason)
                    }

                }} />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => 1 }}
                open={confirmPopup?.pass}
            >
                <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
                    <img src={TickColorIcon} alt="TickColorIcon" />

                    <div className='py-5'>
                        <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>
                            Are you sure you want to mark as pass?
                        </p>
                    </div>
                    <div className='flex justify-center' mt={4}>
                        <div className="flex gap-6 justify-center align-middle">
                            <Button btnCls="w-[200px] !border !border-[#18283D80] !text-[#18283D]" btnName={'Cancel'} btnCategory="secondary" onClick={() => handleCloseConfirmPopup("pass")} />
                            <Button btnType="button" btnCls="w-[200px]" btnName={'Pass'}
                                style={{ background: '#16B681', color: "#fff" }} btnCategory="secondary"
                                onClick={() => {
                                    if (selectedTab === "pending") {
                                        handleUpdateAllTask("pass")
                                    } else {
                                        handleUpdateResult("pass")
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

            </Backdrop>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={confirmPopup?.activity}
            // onClick={() => setCreateMeetingLoading(false)}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >
                            {(selectedTab !== "pending" && confirmPopup?.type === "pass") && "Successfully Marked as Pass"}
                            {(selectedTab !== "pending" && confirmPopup?.type === "cancel") && "Successfully marked as Fail"}
                            {(selectedTab !== "pending" && confirmPopup?.type === "reassign") && "Successfully Task Reassigned"}                            
                            {((selectedTab === "pending" || selectedTab === "new") && confirmPopup?.type === "cancel") && "All Mentee’s New task has been successfully cancelled"}
                            {((selectedTab === "pending" || selectedTab === "new" || newType === "newTab") && confirmPopup?.type === "cancel_all") && "Task is cancelled successfully"}
                            {(selectedTab === "pending" && confirmPopup?.type === "pass") && "All Mentee’s New task has been successfully passed"}
                        </p>
                    </div>

                </div>
            </Backdrop>
        </div >
    )
}


export default MentorTaskDetails
