import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getSpecificTask, updateCancelAllTask, updateSinglePassFail } from '../../../services/task';
import { useDispatch, useSelector } from 'react-redux';
import { dateTimeFormat, getFiles } from '../../../utils';
import { Backdrop, Box, Checkbox, CircularProgress, Stack, Typography } from '@mui/material';
import { Button } from '../../../shared';
import BreadCrumbsArrow from "../../../assets/icons/breadCrumbsArrow.svg"
import { CancelPopup } from './cancelPopup';
import SuccessTik from '../../../assets/images/blue_tik1x.png';
import UploadIcon from "../../../assets/images/image_1x.png"
import { styled } from '@mui/material/styles';
import TickColorIcon from '../../../assets/icons/tickColorLatest.svg'
import CloseIcon from '../../../assets/icons/closeIcon.svg';
import moment from 'moment';

const CustomCheckbox = styled(Checkbox)({
    color: '#ccc',
    '&.Mui-checked': {
        color: '#00AEBD',
    },
    '& .MuiSvgIcon-root': {
        borderRadius: 2,
    },
});

const ViewTask = () => {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = useLocation()?.state
    const userInfo = useSelector((state) => state.userInfo);
    const role = userInfo.data.role || '';
    const { task: taskDetails, loading } = useSelector(state => state.tasks)
    const [resultCheck, setResultCheck] = React.useState("")
    const [activity, setActivity] = React.useState({
        bool: true,
        type: "",
        activity: false
    })

    const referenceView = taskDetails?.reference_link || ''
    const docs = referenceView !== '' ? referenceView?.split(',') || [] : []
    const allFiles = getFiles(taskDetails?.files || [])
    const resultOption = [
        {
            label: "Pass",
            value: "pass"
        },
        {
            label: "No Pass",
            value: "fail"
        }
    ]

    const [cancelPopup, setCancelPopup] = React.useState({
        bool: false,
        activity: false,
    })

    const handleOpenPopup = () => {
        setCancelPopup({
            ...cancelPopup,
            bool: true
        })
    }

    const handleClosePopup = () => {
        setCancelPopup({
            bool: false,
            activity: false
        })
    }

    React.useEffect(() => {
        if (params && params.id) {
            dispatch(getSpecificTask({ task_id: params.id }))
        }
    }, [params])


    const handleCancelSubmit = (reason) => {
        if (cancelPopup?.type === "reassign") {
            const payload = {
                task_id: taskDetails?.id,
                type: "reject_one_task",
                reason: reason
            }

            dispatch(updateSinglePassFail(payload)).then((res) => {
                if (res?.meta?.requestStatus === "fulfilled") {
                    setCancelPopup({
                        ...cancelPopup,
                        bool: false,
                        activity: true
                    })
                    setTimeout(() => {
                        handleClosePopup()
                        dispatch(getSpecificTask({ task_id: params.id }))
                    }, 2000);
                }
            })
        } else {
            const payload = {
                task_id: taskDetails?.id,
                type: "cancel_one_task",
                reason: reason
            }
            dispatch(updateCancelAllTask(payload)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    navigate(-1)
                }
            })

            setCancelPopup({
                ...cancelPopup,
                bool: false,
                activity: true
            })
            setTimeout(() => {
                handleClosePopup()
            }, 2000);
        }
    }

    const handleUpdateResult = async (type, reason = "") => {
        let payload = {
            "result": type === "pass" ? true : false,
            "task_id": taskDetails?.id,
            "type": "single_result"
        }
        if (type === "fail") {
            payload = {
                ...payload,
                reason: reason
            }
        }
        dispatch(updateSinglePassFail(payload)).then(async (res) => {
            if (res.meta.requestStatus === "fulfilled") {
                if (type === "pass") {
                    await setActivity({
                        bool: true,
                        type: "pass",
                        activity: true
                    })
                    await setResultCheck("")
                    setTimeout(() => {
                        setActivity({
                            bool: false,
                            type: "",
                            activity: false
                        })
                        dispatch(getSpecificTask({ task_id: params.id }))
                    }, 2000);
                } else {
                    await setActivity({
                        bool: true,
                        type: "fail",
                        activity: true
                    })
                    await setResultCheck("")
                    setTimeout(() => {
                        setActivity({
                            bool: false,
                            type: "",
                            activity: false
                        })
                        dispatch(getSpecificTask({ task_id: params.id }))
                    }, 2000);
                }
            }
        })

    }

    return (
        <div className="px-9 py-9">
            <Backdrop
                sx={{ zIndex: (theme) => 999999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {state?.type !== "certificate" && <Stack direction={"row"} alignItems={"center"} spacing={"14px"} mb={"30px"}>
                <Typography className='!text-[#5975A2] !text-[14px] cursor-pointer' fontWeight={500}
                    onClick={() => navigate("/mentor-tasks?type=menteetask")}>MenteesTask</Typography>
                <img src={BreadCrumbsArrow} alt="" />
                <Typography className='!text-[#5975A2] !text-[14px] cursor-pointer' fontWeight={500}
                    onClick={() => navigate(-1)}>{taskDetails?.program_name}</Typography>
                <img src={BreadCrumbsArrow} alt="" />
                <Typography className='!text-[#18283D] !text-[14px] cursor-pointer' fontWeight={500}>View {taskDetails.task_name}</Typography>
            </Stack>}

            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
                {
                    state?.type === "certificate" &&
                    <Stack direction={"row"} justifyContent={"space-between"} width={"100%"} p={"4px 0px 16px 0px"} sx={{ borderBottom: "1px solid #D9E4F2" }} mb={2}>
                        <Typography className='!text-[18px]' fontWeight={600}>Task details</Typography>
                        <Box className='cursor-pointer' onClick={() => navigate(-1)}>
                            <img src={CloseIcon} alt='close' />
                        </Box>
                    </Stack>
                }
                <div className="relative flex gap-6 justify-between">
                    <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody style={{ border: '1px solid #232323' }}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" style={{ border: '1px solid #232323', background: '#fff', color: '#000' }} className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">
                                    Category
                                </th>
                                <td className="px-6 py-4 text-white !text-[14px]" style={{ background: '#FE634E' }}>
                                    {taskDetails.program_category || ''}
                                </td>
                            </tr>
                            <tr className="bg-white border-b  dark:bg-gray-800">
                                <th style={{ border: '1px solid #232323', background: '#fff', color: '#000' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">
                                    Program Start Date
                                </th>
                                <td className="px-6 py-4 text-white !text-[14px]" style={{ background: '#FE634E' }}>
                                    {moment(taskDetails.program_startdate).format("MM-DD-YYYY")}
                                </td>
                            </tr>
                            <tr className="bg-white border-b  dark:bg-gray-800">
                                <th style={{ border: '1px solid #232323', background: '#fff', color: '#000' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">
                                    Due Date
                                </th>
                                <td className="px-6 py-4 text-white !text-[14px]" style={{ background: '#FE634E' }}>
                                    {moment(taskDetails.due_date).format("MM-DD-YYYY")}
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody style={{ border: '1px solid #232323' }}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th style={{ border: '1px solid #232323', background: '#fff', color: '#000' }} scope="row" className="px-6 py-4 font-medium  whitespace-nowrap !text-[#18283D] !text-[14px]">
                                    Program Name
                                </th>
                                <td className="px-6 py-4 text-white !text-[14px]" style={{ background: '#4f4f4f' }}>
                                    {taskDetails.program_name}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" style={{ border: '1px solid #232323', background: '#fff', color: '#000' }} className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">
                                    Program End Date
                                </th>
                                <td className="px-6 py-4 text-white !text-[14px]" style={{ background: '#4f4f4f' }}>
                                    {moment(taskDetails.program_enddate).format("MM-DD-YYYY")}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" style={{ border: '1px solid #232323', background: '#fff', color: '#000' }} className="px-6 py-4 font-medium whitespace-nowrap !text-[#18283D] !text-[14px]">
                                    Status
                                </th>
                                <td className="px-6 py-4 text-white !text-[14px] capitalize" style={{ background: '#4f4f4f' }}>
                                    {taskDetails.status ?? '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Box className="!border !border-border-black rounded-[3px] mt-5">
                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} className='!border-b-2 !border-border-black px-[35px] py-[22px]'>
                        <Typography className='!text-[#18283D] !text-[16px]'>{taskDetails.task_name}</Typography>
                        <Typography className='!text-[#18283D] !text-[14px]'>Due date: {moment(taskDetails.due_date).format("MM-DD-YYYY")}</Typography>
                    </Stack>
                    <Stack spacing={3} className='px-[35px] py-[22px]'>
                        <Typography className='!text-[#18283D] !text-[16px]' sx={{ fontWeight: 500 }}>
                            {`Reference Book: `}
                            <span className='!text-[#18283D] !text-[14px]'>
                                {
                                    docs?.map((doc, index) => <span>{doc}</span>)
                                }
                            </span>
                        </Typography>
                        <Typography className='!text-[#18283D] !text-[14px]' sx={{ fontWeight: 500 }}>
                            Task Details:
                            <span>
                                {taskDetails?.task_description}
                            </span>
                        </Typography>
                    </Stack>
                </Box>


                {
                    taskDetails?.status === "cancel" &&
                    <Box className="!bg-[#FFE7E7] !border !border-[#E0382D] rounded-[5px]" mt={3}>
                        <Typography className='!text-[#E0382D] !text-[18px] px-[20px] py-[12px]' sx={{ fontWeight: 600, borderBottom: "1px solid #E0382D" }}>Cancelled Reason</Typography>
                        <Typography className=' px-[20px] py-[12px] !text-[14px] !text-[#18283D]'>{taskDetails?.individual_cancel_reason}</Typography>
                    </Box>
                }

                {
                    ["completed", "pending", "completed"].includes(taskDetails?.status) &&
                    <div style={{ marginTop: "40px" }}>
                        <Typography className='!text-[14px] !text-[#18283D]'>Task Solution</Typography>

                        <Box className="bg-background-primary-light px-[20px] py-[12px] rounded-[3px]" mt={1}>
                            <Typography className='!text-[14px] !text-font-primary-main'>{taskDetails?.task_solution}</Typography>
                        </Box>
                    </div>
                }


                {
                    taskDetails?.status !== "new" && taskDetails?.status !== "inprogress" &&
                    <div className='flex justify-between task-uploaded-images-container'>
                        {
                            allFiles.files ?

                                <div>
                                    <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Image</div>
                                    {
                                        allFiles.image.map((imges, index) =>

                                            <div className='uploaded-images task-image-list !mt-[2]' key={index} style={{ marginTop: "8px" }}>
                                                {/* <div className='flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                                    style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}
                                                    >
                                                    <a href={imges.fileurl} target='_blank'>
                                                        <div className='flex gap-3 items-center'>
                                                            <img src={UploadIcon} alt="altlogo" />
                                                            <span className='text-[12px] image-name'>{imges.name}</span>
                                                        </div>
                                                    </a>
                                                </div> */}
                                                <a href={imges.fileurl} target='_blank'>
                                                    <span className='text-[14px] image-name !text-[#18283D] underline'>{imges.name}</span>
                                                </a>

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
                                            // <div className='task-image-list flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                            //     style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }} key={index}>
                                            //     <a href={imges.fileurl} target='_blank'>
                                            //         <div className='flex gap-3 items-center'>
                                            //             <img src={UploadIcon} alt="altlogo" />
                                            //             <span className='text-[12px] image-name'>{imges.name}</span>
                                            //         </div>
                                            //     </a>
                                            // </div>

                                            <a href={imges.fileurl} target='_blank'>
                                                <span className='text-[14px] image-name !text-[#18283D] underline'>{imges.name}</span>
                                            </a>
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
                                            // <div className='task-image-list flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                            //     style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }} key={index}>
                                            //     <a href={imges.fileurl} target='_blank'>
                                            //         <div className='flex gap-3 items-center'>
                                            //             <img src={UploadIcon} alt="altlogo" />
                                            //             <span className='text-[12px] image-name'>{imges.name}</span>
                                            //         </div>
                                            //     </a>
                                            // </div>

                                            <a href={imges.fileurl} target='_blank'>
                                                <span className='text-[14px] image-name !text-[#18283D] underline'>{imges.name}</span>
                                            </a>
                                        )
                                    }
                                </div>

                                : null
                        }

                    </div>
                }

                {
                    taskDetails?.status === "pending" &&
                    <Stack direction={"row"} alignItems={"center"}>
                        <Typography>Select Result</Typography>
                        {
                            resultOption?.map((e) => {
                                return (
                                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                        <Checkbox checked={e?.value === resultCheck} onChange={(event) => setResultCheck(e?.value)} />
                                        <Typography>{e?.label}</Typography>
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                }

                {
                    taskDetails?.status === "completed" &&

                    <div className='mark flex' style={{ marginTop: "20px" }}>
                        <div className='mr-96 !text-[#18283D]' style={{ fontWeight: 600 }}>
                            Volunteer Result :

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
                    taskDetails?.result === "Fail" &&
                    <Box className="!bg-[#FFE7E7] !border !border-[#E0382D] rounded-[5px]" mt={3}>
                        <Typography className='!text-[#E0382D] !text-[18px] px-[20px] py-[12px]' sx={{ fontWeight: 600, borderBottom: "1px solid #E0382D" }}>Failed Reason</Typography>
                        <Typography className=' px-[20px] py-[12px] !text-[14px] !text-[#18283D]'>{taskDetails?.fail_reason}</Typography>
                    </Box>
                }

                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} width={"100%"} mt={5}>
                    {
                        taskDetails?.status === "new" &&
                        <Stack direction={"row"} alignItems={"center"} spacing={"20px"}>
                            <Button
                                btnName='Cancel Task'
                                btnCategory='secondary'
                                onClick={() => handleOpenPopup()}
                                btnCls='w-[auto] !border !border-[#E0382D] rounded-[3px] !text-[#E0382D] h-[45px]'
                            />
                            <Button
                                btnType='button'
                                btnCls='w-[110px] h-[45px]'
                                btnName={'Close'}
                                btnCategory='primary'
                                onClick={() => navigate(-1)}
                            />
                        </Stack>
                    }

                    {
                        (taskDetails?.status === "pending" && role === "mentor") &&
                        <Button
                            btnName="Re Assign"
                            btnCategory="primary"
                            onClick={() => setCancelPopup({
                                bool: true,
                                type: "reassign"
                            })}
                            btnCls="mr-3"
                        />
                    }

                    {
                        ["completed", "inprogress", "pending", "cancel"].includes(taskDetails.status) &&
                        <Button
                            btnName='Close'
                            btnCategory='secondary'
                            onClick={() => navigate(-1)}
                            btnCls='w-[auto] !border !border-[#000] rounded-[3px] !text-[#18283D] h-[45px]'
                        />
                    }
                </Stack>
            </div>
            <CancelPopup open={cancelPopup?.bool} handleClosePopup={handleClosePopup} header={cancelPopup?.type === "reassign" ? "Re Assign Reason" : "Cancel Task Reason"}
                handleSubmit={(reason) => handleCancelSubmit(reason)} />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={cancelPopup?.activity}
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
                        >{cancelPopup?.type === "reassign" ? "Task Successfully Reassigned" : "Volunteer New task has been successfully cancelled"}</p>
                    </div>

                </div>
            </Backdrop>


            {/* Pass Popup */}

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => 1 }}
                open={resultCheck === "pass"}
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
                            <Button btnCls="w-[200px] !border !border-[#18283D80] !text-[#18283D]" btnName={'Cancel'} btnCategory="secondary" onClick={() => setResultCheck("")} />
                            <Button btnType="button" btnCls="w-[200px]" btnName={'Pass'}
                                style={{ background: '#16B681', color: "#fff" }} btnCategory="secondary"
                                onClick={() => handleUpdateResult("pass")}
                            />
                        </div>
                    </div>
                </div>

            </Backdrop>

            <CancelPopup header='Task fail Reason' open={resultCheck === "fail"} handleSubmit={(reason) => handleUpdateResult("fail", reason)}
                handleClosePopup={() => setResultCheck("")} />


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={activity?.activity}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >Result successfully updated</p>
                    </div>

                </div>
            </Backdrop>
        </div>
    )
}


export default ViewTask