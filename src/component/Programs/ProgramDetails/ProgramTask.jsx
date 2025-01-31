import React, { useEffect, useRef, useState } from 'react'
import DoubleArrowIcon from '../../../assets/images/double_arrow 1x.png';
import ProgramVideo from '../../../assets/images/video.png';
import ProgramDoc from '../../../assets/images/book.png';
import SuccessTik from '../../../assets/images/blue_tik1x.png';
import CancelIcon from '../../../assets/images/cancel-colour1x.png'
import DeleteIcon from "../../../assets/images/delete_1x.png"
import FileUploadIcon from "../../../assets/icons/Upload.svg"

import { useNavigate, useParams } from 'react-router-dom';
import { getProgramDetails, updateProgram } from '../../../services/userprograms';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { pipeUrls, programActionStatus } from '../../../utils/constant';
import Tooltip from '../../../shared/Tooltip';

export default function ProgramTask() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams();
    const { programdetails, loading: programLoading, error, status } = useSelector(state => state.userPrograms)
    const [loading, setLoading] = useState({ initial: true, join: false })
    const [taskStage, setTaskStage] = useState('uploadfile')
    const [logoImage, setLogoImage] = useState([])
    const [fileNames, setFileNames] = useState([])
    const fileRef = useRef(null);

    const handleTaskStage = (stage) => {
        if (stage === 'submit') {
            setLoading({ initial: false, join: true })
            dispatch(updateProgram({ id: programdetails.id, status: programActionStatus.yettostart }))
        }
        else setTaskStage(stage)
    }

    const handleBack = () => {
        if (taskStage === 'desc') navigate('program-details/1')
        if (taskStage === 'video') setTaskStage('desc')
        if (taskStage === 'docs') setTaskStage('video')
    }

    useEffect(() => {
        if (Object.keys(programdetails).length) {
            setLoading({ ...loading, initial: false })
        }
    }, [programdetails])

    useEffect(() => {
        if (status === programActionStatus.yettostart) {
            setTaskStage('submit')
            setLoading({ initial: false, join: false })
            setTimeout(() => {
                setTaskStage('')
                navigate(`${pipeUrls.assigntask}/${programdetails.id}`)
            }, [2000])
        }
    }, [status])


    useEffect(() => {
        const programId = params.id;
        if (programId && programId !== '') {
            dispatch(getProgramDetails(programId))
        }

    }, [params.id])

    function readmultifiles(files, cb) {
        let urls = [];
        const reader = new FileReader();
        function readFile(index) {
            if (index >= files.length) return cb(urls);
            const file = files[index];
            reader.onload = function (e) {
                const bin = e.target.result;
                urls = [...urls, bin]
                readFile(index + 1)
            }
            reader.readAsDataURL(file);
        }
        readFile(0);
    }


    const handleImageUpload = (e) => {
        const allFiles = fileRef.current.files;
        setFileNames([...fileNames, e.target.files[0].name])
        readmultifiles(allFiles, function (urls) {
            setLogoImage(urls);
        })
    }

    const handleDeleteImage = (i) => {
        const removeImage = []
        fileNames.forEach((file, index) => {
            if (index !== i) removeImage.push(file)
        })
        setFileNames(removeImage)
    }

    return (
        <div className="px-9 my-6 grid">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading.initial || loading.join}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='grid mb-10' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '5px' }}>
                <div className='breadcrum '>
                    <nav className="flex justify-between px-7 pt-6 pb-5 mx-2 border-b-2" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">

                                <a href="#" className="inline-flex items-center text-sm font-medium" style={{ color: 'rgba(89, 117, 162, 1)' }}>
                                    Program
                                </a>
                                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                        {/* Planned Program Joining details */}
                                        Upload Your Id Proof
                                        {taskStage === 'video' ? '- Video Introduction' : ''}
                                        {taskStage === 'docs' ? '- Case Study Introduction' : ''}
                                        {taskStage === 'question' ? '- Question and Answer' : ''}
                                        {taskStage === 'submit' ? '- Selected' : ''}

                                    </a>
                                </div>
                            </li>

                        </ol>
                        <div className="flex gap-20 items-center">
                            <Tooltip title="Cancel">
                                <img className='cursor-pointer' onClick={() => navigate(`/program-details/${params.id}`)} src={CancelIcon} alt="CancelIcon" />
                            </Tooltip>
                        </div>
                    </nav>
                </div>
                <div className='content px-32 py-6'>
                    {
                        taskStage === 'desc' ?

                            <div className='px-20 py-10' style={{ border: '1px solid rgba(107, 107, 107, 1)', borderRadius: '7px' }}>
                                <div>Setting Goals for this Teaching program</div>
                                <div className='flex gap-4 pt-3'>
                                    <div className='text-[12px] py-3 px-6' style={{ background: 'rgba(217, 228, 242, 1)', borderRadius: '5px', color: 'rgba(29, 91, 191, 1)' }}>Introduction Training and Theory</div>
                                    <div className='text-[12px] py-3 px-6' style={{ background: 'rgba(219, 252, 255, 1)', borderRadius: '5px', color: 'rgba(0, 174, 189, 1)' }}>1 Days left</div>
                                </div>
                                <div className='pt-5 pb-40 text-[12px]'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                </div>
                                <div className='flex justify-center items-center gap-6'>
                                    <button className='py-2 px-9 text-[12px] flex items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '28px' }}
                                        onClick={() => navigate('/program-details/1')}
                                    >Back
                                        {/* <span className='pl-8 pt-1'><img style={{ width: '15px', height: '13px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span> */}
                                    </button>

                                    <button className='py-2 px-9 text-white text-[12px] flex items-center' style={{
                                        background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                        borderRadius: '28px'
                                    }}
                                        onClick={() => handleTaskStage('video')}
                                    >Next
                                        <span className='pl-3 '><img style={{ width: '13px', height: '11px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span>
                                    </button>

                                </div>
                            </div>

                            : taskStage === 'video' ?


                                <div className='px-20 py-10' style={{ border: '1px solid rgba(107, 107, 107, 1)', borderRadius: '7px' }}>

                                    <div className='pb-10 text-[12px]'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    </div>
                                    <div className='flex justify-center items-center pb-10'>
                                        <img className='w-[370px]' src={ProgramVideo} alt="ProgramVideo" />
                                    </div>
                                    <div className='flex justify-center items-center gap-6'>
                                        <button className='py-2 px-9 text-[12px] flex items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '28px' }}
                                            onClick={handleBack}
                                        >Back
                                            {/* <span className='pl-8 pt-1'><img style={{ width: '15px', height: '13px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span> */}
                                        </button>

                                        <button className='py-2 px-9 text-white text-[12px] flex items-center' style={{
                                            background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                            borderRadius: '28px'
                                        }}
                                            onClick={() => handleTaskStage('docs')}
                                        >Next
                                            <span className='pl-3 '><img style={{ width: '13px', height: '11px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span>
                                        </button>

                                    </div>
                                </div>
                                :
                                taskStage === 'docs' ?
                                    <div className='px-20 py-10' style={{ border: '1px solid rgba(107, 107, 107, 1)', borderRadius: '7px' }}>

                                        <div className='pb-10 text-[12px]'>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                        </div>
                                        <div className='flex justify-center items-center pb-40 gap-3'>
                                            <img src={ProgramDoc} alt="ProgramDoc" />
                                            <span>WIN -WIN STATERGY  -  This is our NGO case study eBook</span>
                                        </div>
                                        <div className='flex justify-center items-center gap-6'>
                                            <button className='py-2 px-9 text-[12px] flex items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '28px' }}
                                                onClick={handleBack}
                                            >Back
                                                {/* <span className='pl-8 pt-1'><img style={{ width: '15px', height: '13px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span> */}
                                            </button>

                                            <button className='py-2 px-9 text-white text-[12px] flex items-center' style={{
                                                background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                                borderRadius: '28px'
                                            }}
                                                onClick={() => handleTaskStage('question')}
                                            >Next
                                                <span className='pl-3 '><img style={{ width: '13px', height: '11px' }} src={DoubleArrowIcon} alt="DoubleArrowIcon" /></span>
                                            </button>
                                        </div>
                                    </div>
                                    : taskStage === 'question' ?

                                        <div className='px-96 py-16' style={{ border: '1px solid rgba(107, 107, 107, 1)', borderRadius: '7px' }}>
                                            <div style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px' }}>
                                                <div className='questions py-5 px-8'>
                                                    <ul className='text-[12px] list-decimal leading-6'>
                                                        <li className='pb-8'>
                                                            <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                                                                for previewing layouts and visual mockups.</p>
                                                            <input className='focus-visible:border-none' name="" style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)', width: '100%' }} />
                                                        </li>

                                                        <li className='pb-8'>
                                                            <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                                                                for previewing layouts and visual mockups.</p>
                                                            <input name="" style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)', width: '100%' }} />
                                                        </li>
                                                        <li className='pb-8'>
                                                            <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
                                                                for previewing layouts and visual mockups.</p>
                                                            <input name="" style={{ borderBottom: '1px solid rgba(0, 0, 0, 1)', width: '100%' }} />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                            <div className='flex justify-center items-center gap-6 pt-16'>
                                                <button className='py-2 px-9 text-[12px] flex items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '28px' }}
                                                    onClick={() => navigate(`/program-details/${programdetails.id}`)}
                                                >Cancel
                                                </button>

                                                <button className='py-2 px-9 text-white text-[12px] flex items-center' style={{
                                                    background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                                    borderRadius: '28px'
                                                }}
                                                    onClick={() => handleTaskStage('submit')}
                                                >Submit
                                                </button>
                                            </div>
                                        </div>
                                        : taskStage === 'submit' ?

                                            <div className='px-5 py-1 flex justify-center items-center'>
                                                <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                                                    style={{ background: '#fff', borderRadius: '10px' }}>
                                                    <img src={SuccessTik} alt="SuccessTik" />
                                                    <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                                                        style={{
                                                            fontWeight: 600
                                                        }}
                                                    >Your ID proof has been approved,& you have successfully joined.</p>
                                                </div>

                                            </div>

                                            : taskStage === 'uploadfile' ?

                                                <div className='py-6'>
                                                    <p className='text-[14px] pb-10'>

                                                        For the safety of mentees, we kindly request that you upload your ID proof. Ensuring the security and trustworthiness of our mentoring community is our top priority.
                                                    </p>

                                                    <div className="flex items-center justify-center w-full">
                                                        <label htmlFor="dropzone-file"
                                                            className="flex flex-col items-center justify-center w-full h-64 border-2
                                                                                 border-gray-300 border-dashed cursor-pointer
                                                                                   dark:hover:bg-bray-800  hover:bg-gray-100
                                                                                   dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 input-bg">
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                <img src={FileUploadIcon} alt="FileUploadIcon" />
                                                                <p className="mb-2 text-sm pt-5" style={{ color: '#C6C6C6' }}><span>
                                                                    Upload Your  Id Proof (Png, Img,PDF)</span>
                                                                </p>

                                                            </div>
                                                            <input id="dropzone-file" type="file"
                                                                ref={fileRef}
                                                                onChange={handleImageUpload}
                                                                className="hidden" />
                                                        </label>

                                                    </div>
                                                    {fileNames.length ?
                                                        <>
                                                            <div className='flex gap-3'>
                                                                {
                                                                    fileNames.map((file, i) =>

                                                                        <div className='flex justify-between items-center w-[30%] mt-5 px-4 py-4 input-bg'
                                                                            style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                                            <div className='flex w-[80%] gap-3 items-center'>
                                                                                <span className='text-[12px]'> {file}</span>
                                                                            </div>
                                                                            <img className='w-[30px] cursor-pointer' onClick={() => handleDeleteImage(i)} src={DeleteIcon} alt="DeleteIcon" />
                                                                        </div>
                                                                    )
                                                                }

                                                            </div>
                                                            <div className='flex justify-center items-center gap-6 pt-16'>
                                                                <button className='py-2 px-9 text-[12px] flex items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '28px' }}
                                                                    onClick={() => navigate(`/program-details/${programdetails.id}`)}
                                                                >Cancel
                                                                </button>

                                                                <button className='py-2 px-9 text-white text-[12px] flex items-center' style={{
                                                                    background: "linear-gradient(94.18deg, #00AEBD -38.75%, #1D5BBF 195.51%)",
                                                                    borderRadius: '28px'
                                                                }}
                                                                    onClick={() => handleTaskStage('submit')}
                                                                >Submit
                                                                </button>
                                                            </div>
                                                        </>
                                                        : null
                                                    }
                                                </div>
                                                : null
                    }

                </div>
            </div>
        </div>
    )
}
