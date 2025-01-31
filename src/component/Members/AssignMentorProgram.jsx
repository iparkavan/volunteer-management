import React, { useEffect, useState } from 'react'
import MuiModal from '../../shared/Modal'
import { Backdrop, CircularProgress } from '@mui/material'
import CancelIcon from '../../assets/images/cancel1x.png'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from '../../shared';
import { getAssignMentorProgram, submitAssignProgram } from '../../services/members';

export default function AssignMentorProgram({ open, handleClose, selectedItem }) {
    const dispatch = useDispatch()
    const { mentor, mentee, loading, error, assignProgramInfo } = useSelector(state => state.members)
    const categoryList = assignProgramInfo?.category || []
    const mentorList = assignProgramInfo?.mentor || []
    const programList = assignProgramInfo?.programs || []
    const [selectedProgramValues, setSelectedProgramValues] = useState(null);
    const [programOptions, setProgramOptions] = useState([])
    const cities = [
        { name: 'Program 1', code: 'NY' },
        { name: 'Program 2', code: 'RM' },
        { name: 'Program 3', code: 'LDN' },
        { name: 'Program 4', code: 'IST' },
        { name: 'Program 5', code: 'PRS' }
    ];

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = data => {
        let programId = []
        if(selectedProgramValues.length){
            selectedProgramValues.forEach(sProgram => {
                programId.push(sProgram.code)
            })
        }
       
        const payload = {
            "program_id": programId,
            "mentor_id": data.mentor_id,
            "deactivate_user_id": selectedItem.id,
            "deactivate_request_id": selectedItem.deactivate_request_id
        }

        dispatch(submitAssignProgram(payload)).then(() => {
            handleClose('taskassigned')
        })
    }

    const fetchProgramMentorInfo = (categoryId) => {
        dispatch(getAssignMentorProgram({ user_id: selectedItem.id, category_id: categoryId }))
    }

    useEffect(() => {
        dispatch(getAssignMentorProgram({ user_id: selectedItem.id }))
    }, [])

    useEffect(() => {
        if (programList.length) {
            const programs = []
            programList.forEach(program => {
                programs.push({ name: program.program_name, code: program.id })
            })
            setProgramOptions(programs)
        }
    }, [programList])


    const categoryField = register('category', { required: 'This field is required' })

    return (
        <MuiModal modalSize='lg' modalOpen={open} modalClose={handleClose} noheader style={{ zIndex: 999 }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => 999999 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='px-5 py-5'>
                <div className='flex justify-center flex-col gap-5  mt-4 mb-4'
                    style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '10px', }}>
                    <div className='flex justify-between px-3 py-4 items-center' style={{ borderBottom: '1px solid rgba(29, 91, 191, 1)' }}>
                        <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Assign Programs </p>
                        <img className='cursor-pointer' onClick={handleClose} src={CancelIcon} alt="CancelIcon" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='px-5'>
                            {
                                error !== '' ? <p className="error" role="alert">{error}</p> : null
                            }
                            <div className='relative pb-8'>
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Category
                                </label>


                                <select
                                    {...categoryField}

                                    className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg 
                                                            focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                                    style={{
                                        color: "#232323",
                                        borderRadius: '3px',
                                        borderRight: '16px solid transparent'
                                    }}
                                    onChange={(e) => {
                                        categoryField.onChange(e)
                                        fetchProgramMentorInfo(e.target.value)
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        categoryList.map(category => <option value={category.category_id}>{category.category_name}</option>)
                                    }

                                </select>
                                {errors['category'] && (
                                    <p className="error" role="alert">
                                        {errors['category'].message}
                                    </p>
                                )}
                            </div>

                            <div className='relative pb-8'>
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Program Manager
                                </label>

                                <select
                                    {...register('mentor_id', { required: 'This field is required' })}
                                    className="w-full border-none px-3 py-[0.32rem] leading-[2.15] input-bg 
                                                            focus:border-none focus-visible:border-none focus-visible:outline-none text-[14px] h-[60px]"
                                    style={{
                                        color: "#232323",
                                        borderRadius: '3px',
                                        borderRight: '16px solid transparent'
                                    }}
                                >
                                    <option value="">Select</option>
                                    {
                                        mentorList.map(mentor => <option value={mentor.user_id}>{mentor.name}</option>)
                                    }

                                </select>
                                {errors['mentor_id'] && (
                                    <p className="error" role="alert">
                                        {errors['mentor_id'].message}
                                    </p>
                                )}
                            </div>


                            <div className='relative pb-8'>
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Program
                                </label>
                                <div className="card flex justify-content-center">
                                    <MultiSelect value={selectedProgramValues} onChange={(e) => setSelectedProgramValues(e.value)}
                                        options={programOptions} optionLabel="name" display="chip"
                                        placeholder="Select Programs"
                                        maxSelectedLabels={5} className="w-full md:w-20rem input-bg " />
                                </div>
                            </div>



                            <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                                <Button btnName='Cancel' btnCls="w-[18%]" btnCategory="secondary" onClick={handleClose} />
                                <button
                                    type='submit'
                                    className='text-white py-3 px-7 w-[18%]'
                                    style={{ background: 'linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)', borderRadius: '3px' }}>
                                    Submit
                                </button>
                            </div>

                        </div>
                    </form>

                </div>

            </div>
        </MuiModal>
    )
}
