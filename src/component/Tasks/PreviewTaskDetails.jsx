import React, { useEffect, useState } from 'react'

import UploadIcon from "../../assets/images/image_1x.png"
import DeleteIcon from "../../assets/images/delete_1x.png"
import CancelIcon from '../../assets/images/cancel-colour1x.png'
import SuccessTik from '../../assets/images/blue_tik1x.png';
import { Button } from '../../shared'
import { useNavigate, useParams } from 'react-router-dom'
import { Backdrop } from '@mui/material';


const PreviewTaskDetails = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const params = useParams();

    const handleSubmitTask = () => {
        setLoading(true)
    }

    const handleEditTask = () => {
        if (params.id === '5') {
            navigate(`/assign-task/${params.id}`)
        } else {
            navigate(`/mentee-tasks-details/${params.id}`)
        }
    }

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false)
                navigate('/mentee-tasks')
            }, 3000)
        }
    }, [loading])

    return (
        <div className="px-9 py-9">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >Task Submitted Successfully</p>
                    </div>

                </div>
            </Backdrop>

            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)' }}>
                <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                    <div className='flex gap-5 items-center text-[20px]'>
                        <p>Preview Teaching Program Task Assignment</p>
                    </div>

                    <div className='flex gap-8 items-center'>
                        <div className="relative">
                            <div className="inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                                onClick={() => navigate('/mentee-tasks-details/1')}
                            >
                                <img src={CancelIcon} alt='SearchIcon' />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='px-4'>
                    <div className="relative flex gap-6 justify-between">
                        <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody style={{ border: '1px solid rgba(0, 174, 189, 1)' }}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" style={{ border: '1px solid rgba(0, 174, 189, 1)' }} className="px-6 py-4 font-medium whitespace-nowrap ">
                                        Assigned Date
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(0, 174, 189, 1)' }}>
                                        04/23/2024
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th style={{ border: '1px solid rgba(0, 174, 189, 1)' }} scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                        Task Name
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(0, 174, 189, 1)' }}>
                                        Task Name
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 ">
                                    <th style={{ border: '1px solid rgba(0, 174, 189, 1)' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                        Program Name
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(0, 174, 189, 1)' }}>
                                        Teaching Program
                                    </td>
                                </tr>
                                <tr className="bg-white border-b  dark:bg-gray-800">
                                    <th style={{ border: '1px solid rgba(0, 174, 189, 1)' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                        Assigned  Date
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(0, 174, 189, 1)' }}>
                                        04/23/2024
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody style={{ border: '1px solid rgba(29, 91, 191, 1)' }}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" style={{ border: '1px solid rgba(29, 91, 191, 1)' }} className="px-6 py-4 font-medium whitespace-nowrap ">
                                        Completed  Date
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(29, 91, 191, 1)' }}>
                                        -
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th style={{ border: '1px solid rgba(29, 91, 191, 1)' }} scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                        Task assigned by
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(29, 91, 191, 1)' }}>
                                        Program Manager
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 ">
                                    <th style={{ border: '1px solid rgba(29, 91, 191, 1)' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                        File Type
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(29, 91, 191, 1)' }}>
                                        Video, Jpg, PDF
                                    </td>
                                </tr>
                                <tr className="bg-white border-b  dark:bg-gray-800">
                                    <th style={{ border: '1px solid rgba(29, 91, 191, 1)' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                        Status
                                    </th>
                                    <td className="px-6 py-4 text-white" style={{ background: 'rgba(29, 91, 191, 1)' }}>
                                        Completed
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='task-desc flex mt-5 px-5 py-6' style={{ border: '1px solid rgba(29, 91, 191, 0.5)' }}>
                        <p className='w-[30%]'>Task Description : </p>
                        <p className='text-[14px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                            and scrambled it to make a type specimen book.It has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop.</p>
                    </div>

                    <div className='pt-4 pb-2'>
                        <div className='task-details'>
                            <p>Task</p>
                            <div className='task-information px-7 py-8 text-[14px]' style={{ background: 'rgba(217, 228, 242, 1)', borderRadius: '3px' }}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                took a galley of type and scrambled it to make a type specimen book.It has survived not only five
                                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                                more recently with desktop.
                            </div>
                        </div>
                    </div>


                    <div className='flex justify-between mb-10'>
                        <div>
                            <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Image</div>
                            <div className='uploaded-images'>
                                <div className='flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                    style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                    <div className='flex gap-3 items-center'>
                                        <img src={UploadIcon} alt="altlogo" />
                                        <span className='text-[12px]'>145816452.jpg</span>
                                    </div>
                                    <img className='w-[30px] cursor-pointer' onClick={() => console.log('delete')} src={DeleteIcon} alt="DeleteIcon" />
                                </div>
                            </div>

                        </div>

                        <div>
                            <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Video</div>

                            <div className='flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                <div className='flex gap-3 items-center'>
                                    <img src={UploadIcon} alt="altlogo" />
                                    <span className='text-[12px]'>loripusum.video</span>
                                </div>
                                <img className='w-[30px] cursor-pointer' onClick={() => console.log('delete')} src={DeleteIcon} alt="DeleteIcon" />
                            </div>
                        </div>


                        <div>
                            <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Files</div>

                            <div className='flex gap-3 w-[400px] justify-between items-center mt-5 px-4 py-4'
                                style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                <div className='flex gap-3 items-center'>
                                    <img src={UploadIcon} alt="altlogo" />
                                    <span className='text-[12px]'>loripusum.PDF</span>
                                </div>
                                <img className='w-[30px] cursor-pointer' onClick={() => console.log('delete')} src={DeleteIcon} alt="DeleteIcon" />
                            </div>
                        </div>
                    </div>


                    <div className='close-btn flex justify-center gap-7 pb-5'>
                        <Button btnName='Cancel' btnCls="w-[12%]" btnCategory="secondary" onClick={() => navigate('/mentee-tasks')} />
                        <Button btnType="button" btnCls={'w-[12%]'}
                            onClick={() => handleEditTask()} btnName='Edit'
                            style={{
                                background: 'rgba(217, 228, 242, 1)',
                                color: 'rgba(29, 91, 191, 1)'
                            }}
                        />
                        <Button btnType="button" btnCls={'w-[13%]'}
                            onClick={handleSubmitTask} btnName='Submit to Program Manager' btnCategory="primary" />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default PreviewTaskDetails

