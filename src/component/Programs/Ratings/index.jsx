import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import MuiModal from '../../../shared/Modal'
import { Button } from '../../../shared'
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

export default function Ratings({ open, modalClose, modalSuccess,id }) {
    const [formInfo, setFormInfo] = useState({ rating: '', reason: '' })
    const [error, setError] = useState({ rating: '', reason: '' })
    const params = useParams()
    const handleSubmit = async () => {
        if (formInfo.rating === '') {
            setError({ ...error, rating: 'Please provide the review' });
            return
        }

        if (formInfo.reason === '') {
            setError({ ...error, reason: 'Please provide the review' });
            return
        }

        const payload = {
            "description": formInfo.reason,
            "rating": formInfo.rating,
            "program_id": params.id||id
        }

        const submitReview = await api.post('rating/review', payload);
        if ((submitReview.status === 201 || submitReview.status === 200) && submitReview.data) {
            modalSuccess && modalSuccess()
            setError({ rating: '', reason: '' })
            setFormInfo({ rating: '', reason: '' })
        }
    }
    return (
        <MuiModal modalOpen={open} modalClose={()=>{
            modalClose()
            setError({ rating: '', reason: '' })
            setFormInfo({ rating: '', reason: '' })
            }} noheader>
            <div className='px-10 py-1 flex w-full' style={{ border: '1px solid rgba(29, 91, 191, 1)' }}>
                <div className='flex w-full  flex-col gap-5 py-5 mt-3 mb-20'
                >
                    <div className='flex flex-col gap-3 px-20 w-full items-center justify-center'>
                        <p style={{ color: 'rgba(24, 40, 61, 1)' }} className='text-[24px] font-semibold'>Reviews and Ratings</p>

                        <p className='text-[13px]'>How you think of the course experience ?</p>

                        <p className='text-[24px] font-semibold'>{formInfo.rating}</p>
                        <Rating
                            name="simple-controlled"
                            size="large"
                            value={formInfo.rating}
                            onChange={(event, newValue) => {
                                setFormInfo({ ...formInfo, rating: newValue });
                            }}
                        />
                        {error.rating !== '' && (
                            <p className="error" role="alert">
                                {error.rating}
                            </p>
                        )}

                    </div>

                    <div className='relative pb-8 mt-6'>
                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                            What are the main reason of your rating?*
                        </label>

                        <div className='relative'>
                            <textarea
                                name='reason'
                                id="message" rows="4" className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                               focus-visible:outline-none focus-visible:border-none`}

                                placeholder={''}
                                onChange={(e) => setFormInfo({ ...formInfo, reason: e.target.value })}
                            ></textarea>

                        </div>
                        {error.reason !== '' && (
                            <p className="error" role="alert">
                                {error.reason}
                            </p>
                        )}
                    </div>

                    <div className='flex justify-center'>
                        <Button  style={{ backgroundColor: "#FE634E" }} btnName="Submit" btnCls='w-[150px]' onClick={handleSubmit} />
                    </div>

                </div>

            </div>
        </MuiModal>
    )
}
