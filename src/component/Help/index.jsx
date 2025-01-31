import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../../shared';
import { useNavigate } from 'react-router-dom';
import UploadIcon from "../../assets/images/image_1x.png"
import DeleteIcon from "../../assets/images/delete_1x.png"

export default function Help() {
    const [logoImage, setLogoImage] = useState('')
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        getValues,
        setError,
        setValue
    } = useForm();

    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log('Help Submit', data)
    }

    const handleDeleteImage = () => {
        setValue('image', '')
        setLogoImage('')
    }

    const imageField = register('image', { required: "This field is required", })

    return (
        <div className="feedback px-9 py-9">
            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
                <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                    <div className='flex w-full gap-5 items-center justify-between'>
                        <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 700 }}>Help Desk Support</p>
                    </div>
                </div>

                <div className='content px-8'>
                    <div className="py-9">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap gap-4">
                                <div className='relative mb-6 width-49'>
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Select Ticket Category
                                    </label>

                                    <select
                                        {...register('ticket_category', { required: "This field is required", })}
                                        className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg  
                                                focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                                        style={{
                                            color: "#232323",
                                            borderRadius: '3px'
                                        }}
                                        disabled={false}
                                    >
                                        <option value="">Select</option>
                                        <option value='1'> Option 1 </option>
                                    </select>
                                    {errors['ticket_category'] && (
                                        <p className="error" role="alert">
                                            {errors['ticket_category'].message}
                                        </p>
                                    )}

                                </div>

                                <div className='relative mb-6 width-49'>
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Select Ticket Types
                                    </label>

                                    <>
                                        <select
                                            {...register('ticket_type', { required: "This field is required", })}
                                            className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg  
                                                                                focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                                            style={{
                                                color: "#232323",
                                                borderRadius: '3px'
                                            }}
                                            disabled={false}
                                        >
                                            <option value="">Select</option>
                                            <option value='1'>
                                                Option 1
                                            </option>
                                        </select>
                                        {errors['ticket_type'] && (
                                            <p className="error" role="alert">
                                                {errors['ticket_type'].message}
                                            </p>
                                        )}
                                    </>
                                </div>

                                <div className='relative mb-6 w-full'>
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Subject Name
                                    </label>

                                    <>
                                        <input {...register('subject_name', { required: "This field is required", })}
                                            type={'text'}
                                            className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg focus:border-none focus-visible:border-none 
                                                                    focus-visible:outline-none text-[14px] h-[60px]"
                                            placeholder={'Enter Subject'}
                                            style={{
                                                color: "#232323",
                                                borderRadius: '3px'
                                            }}
                                            disabled={false}
                                            aria-invalid={!!errors['subject_name']}
                                        />
                                        {errors['subject_name'] && (
                                            <p className="error" role="alert">
                                                {errors['subject_name'].message}
                                            </p>
                                        )}
                                    </>
                                </div>

                                <div className='relative mb-6 w-full'>
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Description
                                    </label>

                                    <>
                                        <textarea id="message" rows="4" className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                                                                focus:visible:outline-none focus:visible:border-none h-[282px]`}
                                            placeholder={'Enter  Description'}
                                            {...register('description', { required: "This field is required", })}></textarea>
                                        {errors['description'] && (
                                            <p className="error" role="alert">
                                                {errors['description'].message}
                                            </p>
                                        )}
                                    </>
                                </div>


                                <div className='relative mb-6 w-full'>

                                    <>
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-64 border-2
                                                     cursor-pointer input-bg" style={{ border: '2px dotted #1D5BBF' }}>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">
                                                        Choose or Drag your bug’s images</span>
                                                    </p>

                                                </div>
                                                <input id="dropzone-file" type="file" {...imageField}

                                                    onChange={(e) => {
                                                        imageField.onChange(e);
                                                        if (e.target.files && e.target.files[0]) {
                                                            let types = ['image/png', 'image/jpeg']
                                                            if (types.includes(e.target.files[0].type)) {
                                                                setLogoImage(URL.createObjectURL(e.target.files[0]));
                                                            } else {
                                                                setError(['image'], 'Invalid file type')
                                                            }
                                                        }
                                                    }}
                                                    className="hidden" />
                                            </label>

                                        </div>
                                        {logoImage !== '' &&
                                            <>
                                                <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Image</div>

                                                <div className='flex justify-between items-center w-[30%] mt-5 px-4 py-4'
                                                    style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                    <div className='flex w-[80%] gap-3 items-center'>
                                                        <img src={UploadIcon} alt="altlogo" />
                                                        <span className='text-[12px]'> {getValues('image') && getValues('image')[0]?.name}</span>
                                                    </div>
                                                    <img className='w-[30px] cursor-pointer' onClick={handleDeleteImage} src={DeleteIcon} alt="DeleteIcon" />
                                                </div>


                                            </>
                                        }
                                        {errors['image'] && (
                                            <p className="error" role="alert">
                                                {errors['image'].message}
                                            </p>
                                        )}
                                    </>
                                </div>

                            </div>

                            <div className="flex gap-6 justify-center align-middle py-16">
                                <Button btnName='Cancel' btnCls="w-[13%]" btnCategory="secondary" onClick={() => navigate('/dashboard')} />
                                <Button btnType="submit" btnName='Sent  to Help desk admin' btnCategory="primary" />
                            </div>
                        </form>
                    </div>
                </div>

            </div >
        </div >
    )
}
