import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import FileUploadIcon from "../../../assets/icons/Upload.svg"
import CancelIcon from '../../../assets/images/cancel-colour1x.png'
import UploadIcon from "../../../assets/images/image_1x.png"
import DeleteIcon from "../../../assets/images/delete_1x.png"
import SuccessTik from '../../../assets/images/blue_tik1x.png';
import Tooltip from '../../../shared/Tooltip';
import { getProgramDetails } from '../../../services/userprograms';
import { Backdrop, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Button } from '../../../shared';
import api from '../../../services/api';


export default function MenteeDocs() {
    const navigate = useNavigate()
    const fileRef = useRef(null);
    const params = useParams()
    const dispatch = useDispatch()

    const { programdetails, loading: programLoading } = useSelector(state => state.userPrograms)

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        getValues,
        setError
    } = useForm();


    const [idProof, setIdProof] = useState({})
    const [actionInfo, setActionInfo] = useState({ loading: false, modal: false })
    const [stepInfo, setStepInfo] = useState({ step: 'idProof', backBtn: true })


    const onSubmit = async (data) => {
        setActionInfo({ loading: true, modal: false })
        let bodyFormData = new FormData();

        bodyFormData.append('program_id', params.id);
        bodyFormData.append('id_proof', data.id_proof[0]);
        bodyFormData.append('files_to_remove', []);
        bodyFormData.append('certificates', data.certificates[0]);

        const headers = {
            'Content-Type': 'multipart/form-data',
        }

        const uploadMenteeDocs = await api.post("mentee/certificates", bodyFormData, { headers: headers });
        if (uploadMenteeDocs.status === 201) {
            reset()
            setActionInfo({ loading: false, modal: true })
        }

    }

    const handleBack = () => {
        if (stepInfo.step === 'idProof') {
            navigate('/programs?type=yettostart')
        }

        if (stepInfo.step === 'certificates') {
            setStepInfo({ step: 'idProof', backBtn: false })
        }
    }

    const handleDeleteImage = (key) => {
        let image = { ...idProof }
        delete image[key]
        setValue(key, '')
        setIdProof(image)
    }

    const resetActionInfo = () => {
        setActionInfo({ loading: false, modal: false })
    }

    useEffect(() => {
        if (actionInfo.modal) {
            setTimeout(() => {
                resetActionInfo()
                navigate('/programs?type=yettostart')
            }, 2000)
        }
    }, [actionInfo.modal])


    useEffect(() => {
        if (params.id) {
            dispatch(getProgramDetails(params.id))
        }
    }, [params])


    const idProofImage = register('id_proof', { required: 'This field is required' });
    const certificatesImage = register('certificates', { required: 'This field is required' });

    return (
        <div className="px-9 my-6 grid">

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={programLoading || actionInfo.loading}
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
                        >Successfully joined in a program</p>
                    </div>

                </div>
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

                                    </a>
                                </div>
                            </li>

                        </ol>
                        <div className="flex gap-20 items-center">
                            <Tooltip title="Cancel">
                                <img className='cursor-pointer' onClick={() => navigate(`/programs}`)} src={CancelIcon} alt="CancelIcon" />
                            </Tooltip>
                        </div>
                    </nav>
                </div>
                <div className='content px-32 py-6 mt-3 mb-40'>
                    <div className='py-6'>
                        <p className='text-[14px] pb-10'>
                            {stepInfo.step === 'idProof' && 'For the safety of mentees, we kindly request that you upload your ID proof. Ensuring the security and trustworthiness of our mentoring community is our top priority.*'}
                            {stepInfo.step === 'certificates' && 'We kindly request that you upload your certificate or experience letter, along with any optional proof.*'}

                        </p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {
                                stepInfo.step === 'idProof' &&
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
                                                    Upload Your  Id Proof (Png, Img,XLS)</span>
                                                </p>

                                            </div>
                                            <input id="dropzone-file" type="file"
                                                {...idProofImage}
                                                onChange={(e) => {
                                                    idProofImage.onChange(e);
                                                    if (e.target.files && e.target.files[0]) {
                                                        let types = ['image/png', 'image/jpeg']
                                                        if (types.includes(e.target.files[0].type)) {
                                                            setStepInfo({ ...stepInfo, backBtn: false })
                                                            setIdProof({ ...idProof, ['id_proof']: e.target.files });
                                                        } else {
                                                            setError(['id_proof'], 'Invalid file type')
                                                        }
                                                    }
                                                }}
                                                className="hidden" />
                                        </label>


                                    </div>

                                    {getValues('id_proof')?.length > 0 &&
                                        <>
                                            <div className='flex justify-between items-center w-[30%] mt-5 px-4 py-4'
                                                style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                <div className='flex w-[80%] gap-3 items-center'>
                                                    <img src={UploadIcon} alt="altlogo" />
                                                    <span className='text-[12px]'> {getValues('id_proof') && getValues('id_proof')[0]?.name}</span>
                                                </div>
                                                <img className='w-[30px] cursor-pointer' onClick={() => handleDeleteImage('id_proof')} src={DeleteIcon} alt="DeleteIcon" />
                                            </div>
                                        </>
                                    }
                                </>
                            }


                            {
                                stepInfo.step === 'certificates' &&
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
                                                    Upload Your  Id Proof (Png, Img,XLS)</span>
                                                </p>

                                            </div>
                                            <input id="dropzone-file" type="file"
                                                ref={fileRef}
                                                {...certificatesImage}
                                                onChange={(e) => {
                                                    certificatesImage.onChange(e);
                                                    if (e.target.files && e.target.files[0]) {
                                                        let types = ['image/png', 'image/jpeg']
                                                        if (types.includes(e.target.files[0].type)) {
                                                            setStepInfo({ ...stepInfo, backBtn: false })
                                                            setIdProof({ ...idProof, ['certificates']: e.target.files });
                                                        } else {
                                                            setError(['certificates'], 'Invalid file type')
                                                        }
                                                    }
                                                }}
                                                className="hidden" />
                                        </label>


                                    </div>
                                    {getValues('certificates')?.length > 0 &&
                                        <>
                                            <div className='flex justify-between items-center w-[30%] mt-5 px-4 py-4'
                                                style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                <div className='flex w-[80%] gap-3 items-center'>
                                                    <img src={UploadIcon} alt="altlogo" />
                                                    <span className='text-[12px]'> {getValues('certificates') && getValues('certificates')[0]?.name}</span>
                                                </div>
                                                <img className='w-[30px] cursor-pointer' onClick={() => handleDeleteImage('certificates')} src={DeleteIcon} alt="DeleteIcon" />
                                            </div>
                                        </>
                                    }
                                </>
                            }

                            {
                                (!stepInfo.backBtn) &&

                                <div className="flex gap-6 justify-center align-middle pt-6">
                                    {
                                        stepInfo.step === 'idProof' &&

                                        <>
                                            <Button btnName='Cancel' btnCategory="secondary" onClick={() => navigate('/programs?type=yettostart')} />
                                            <Button btnType="button" btnCls="w-[100px]" btnName={'Next'} onClick={() => setStepInfo({ step: 'certificates', backBtn: true })} btnCategory="primary" />
                                        </>
                                    }

                                    {stepInfo.step === 'certificates' &&
                                        <>
                                            <Button btnName='Cancel' btnCategory="secondary" onClick={() => navigate('/programs?type=yettostart')} />
                                            <Button btnType="submit" btnCls="w-[100px]" btnName={'Submit'} btnCategory="primary" />

                                        </>
                                    }
                                </div>
                            }




                        </form>
                        {
                            stepInfo.backBtn && <div className='py-2 cursor-pointer' onClick={handleBack}>Back</div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
