import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import FileUploadIcon from "../../assets/icons/Upload.svg"
import UploadIcon from "../../assets/images/image_1x.png"
import DeleteIcon from "../../assets/images/delete_1x.png"
import SuccessTik from '../../assets/images/blue_tik1x.png';
import { Button } from '../../shared';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { updateUserInfo } from '../../services/loginInfo';



export default function DocumentUpload(props) {
    const navigate = useNavigate()
    const routeParams = useParams();
    console.log(props,"docProps")
    const params = props?.id ? { id: props?.id } : routeParams;
    const [idProof, setIdProof] = useState([])
    const [actionInfo, setActionInfo] = useState({ loading: false, modal: false, redirect: false })
    const userInfo = useSelector(state => state.userInfo)
    const role = userInfo?.role || ''
    const dispatch = useDispatch()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        getValues,
        setError
    } = useForm();


    const handleDeleteImage = (index) => {
        const files = idProof.filter((fil, i) => i !== index)
        if (files.length) setValue('documents', '')
        setIdProof(files)
    }

    const onSubmit = async (data) => {
        setActionInfo({ loading: true, modal: false })
        let allFiles = []
        let bodyFormData = new FormData();
        if (idProof.length) {
            idProof.forEach(file => bodyFormData.append('documents', file[0]))
        }
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        const submitDocument = await api.post("user/documents", bodyFormData, { headers: headers });
        if (submitDocument.status === 201 || submitDocument.status === 200) {
            if(userInfo?.data?.role === 'mentee'){
                const joinProgramAction = await api.post('join_program', { id: params.id });
                if (joinProgramAction.status === 200 && joinProgramAction.data) {
                    handleSubmitData(submitDocument)
                }
            }else{
                handleSubmitData(submitDocument)
            }
        }
    }

    const handleSubmitData = (submitDocument) => {
        localStorage.setItem("access_token", submitDocument.data.access);
        localStorage.setItem("refresh_token", submitDocument.data.refresh);
        let decoded = jwtDecode(submitDocument.data.access);
        dispatch(updateUserInfo({ data: decoded }))
        reset()
        setIdProof([])
        setActionInfo({ loading: false, modal: true })
    }

    useEffect(() => {
        // if (userInfo?.data?.document_upload === true && ((!actionInfo.modal && !params.id) || userInfo?.data?.role === 'mentor')) {
        //     navigate('/logout')
        // }

        if (userInfo?.data?.role === 'mentee' && userInfo?.data?.document_upload && params.id && params.id !== null) {
            setTimeout(() => {
                setActionInfo({ modal: false, loading: false })
                navigate(`/program-details/${params.id}`)
            }, 2000)
        }
    }, [userInfo])

    useEffect(() => {
        if (actionInfo.modal) {
            let userRole = userInfo?.data?.role
            setTimeout(() => {
                if(userRole === 'mentee'){
                    setActionInfo({ modal: false, loading: false })
                    navigate(`/program-details/${params.id}`)
                }
    
                if(userRole === 'mentor'){
                    navigate('/logout');
                }
            }, 2000)
        }
    }, [actionInfo.modal])

    const idProofImage = register('documents', { required: 'This field is required' });

    return (
        <div className="px-9 my-6 grid">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={actionInfo.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={actionInfo.modal}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >Documents uploaded successfully</p>
                    </div>

                </div>
            </Backdrop>

            <div className='grid mb-10' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '5px' }}>
                <div className='breadcrum '>
                    <nav className="flex justify-between px-7 pt-6 pb-5 mx-2 border-b-2" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li>
                                <div className="flex items-center">
                                    <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                        Upload Documents
                                    </a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='content px-32 py-6 mt-3 mb-40'>
                    <div className='py-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2
                                                border-gray-300 border-dashed cursor-pointer
                                                dark:hover:bg-bray-800  hover:bg-gray-100
                                                dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 input-bg">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <img src={FileUploadIcon} alt="FileUploadIcon" />
                                            <p className="mb-2 text-sm pt-5" style={{ color: '#C6C6C6' }}><span>
                                                Upload Documents</span>
                                            </p>
                                        </div>
                                        <input id="dropzone-file" type="file"
                                            {...idProofImage}
                                            onChange={(e) => {
                                                idProofImage.onChange(e);
                                                if (e.target.files && e.target.files[0]) {
                                                    console.log('e.target.files[0].type', e.target.files[0].type)
                                                    let types = ['image/png', 'image/jpeg', 'application/pdf']
                                                    if (types.includes(e.target.files[0].type)) {
                                                        setIdProof([...idProof, e.target.files]);
                                                    } else {
                                                        setError(['documents'], 'Invalid file type')
                                                    }
                                                }
                                            }}
                                            className="hidden" />
                                    </label>
                                </div>
                                {idProof.length > 0 &&
                                    <>
                                        <div>
                                            {
                                                idProof.map((proof, i) =>

                                                    <div key={i} className='flex justify-between items-center w-[30%] mt-5 px-4 py-4'
                                                        style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                        <div className='flex w-[80%] gap-3 items-center'>
                                                            <img src={UploadIcon} alt="altlogo" />
                                                            <span className='text-[12px]'> {proof[0]?.name}</span>
                                                        </div>
                                                        <img className='w-[30px] cursor-pointer' onClick={() => handleDeleteImage(i)} src={DeleteIcon} alt="DeleteIcon" />
                                                    </div>
                                                )
                                            }

                                        </div>

                                        <div className='flex gap-4 mt-16 justify-center items-center'>
                                            <Button btnName='Cancel' btnCategory="secondary" btnCls="w-[150px]" onClick={() => undefined} />
                                            <Button btnType="submit" btnCls="w-[150px]" btnName={'Submit'} btnCategory="primary" />
                                        </div>
                                    </>
                                }
                            </>

                        </form>


                    </div>
                </div>
            </div>
        </div>

    )
}
