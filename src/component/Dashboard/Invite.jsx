import React, { useEffect, useState } from 'react'
import { Button } from '../../shared';
import InviteFriendsIcon from '../../assets/icons/Invite-friends.svg'
import LinkIcon from '../../assets/images/link1x.png';
import LinkedInIcon from '../../assets/images/linked-in1x.png';
import InstagramIcon from '../../assets/images/instagram_1x.png';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import FacebookOutlineIcon from '../../assets/images/facebook-outline1x.png';
import TwitterIcon from '../..//assets/images/twitter1x.png';
import MuiModal from '../../shared/Modal';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { Backdrop, CircularProgress } from '@mui/material';
import ToastNotification from '../../shared/Toast';

export default function Invite() {
    const [inviteModal, setInviteModal] = useState({ open: false, loading: false, success: false })
    const [message, setMessage] = useState(false);

    const handleCloseInviteModal = () => {
        setInviteModal({ open: false, loading: false, success: false })
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();

    const handleCopy = () => {
        navigator.clipboard.writeText(process.env.REACT_APP_SITE_URL)
            .then(() => {
                setMessage(true);
            })
            .catch((err) => {
                console.error('Error copying text: ', err);
                setMessage(false);
            });
    };

    const onSubmit = async (data) => {
        const email = data.recipients.split(',');
        const payload = {
            "link": process.env.REACT_APP_SITE_URL,
            "share_type": "mail",
            "recipients": email
        }
        setInviteModal({ ...inviteModal, loading: true })
        const invitePeople = await api.post("invite/invite", payload);
        if (invitePeople.status === 200) {
            reset()
            setInviteModal({ ...inviteModal, open: false, loading: false, success: true })
        }
    }

    const handleClose = () => {
        setMessage(false)
    }

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(false)
            }, 3000)
        }
    }, [message])

    useEffect(() => {
        if (inviteModal.success) {
            setTimeout(() => {
                handleCloseInviteModal()
            }, 3000)

        }
    }, [inviteModal.success])

    return (
        <div className="pb-3" style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
            <div className="flex py-6 px-6 justify-evenly gap-4">
                <div className="flex h-[50px] text-center px-4" style={{ background: 'rgba(238, 245, 255, 1)' }}>
                    <img src={InviteFriendsIcon} alt="user icon" />
                </div>

                <div className='flex items-center justify-center'>
                    <p className="text-[18px]">Invite friends</p>
                    {/* <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
                </div>
            </div>
            <div className="text-center">
                <Button btnCls="!px-12 !py-3" style={{ backgroundColor: "#FE634E" }} btnName='Invite' btnCategory="primary" onClick={() => setInviteModal({ ...inviteModal, open: true })} />
            </div>

            {
                message &&
                <ToastNotification openToaster={message} message={'Invite URL copied!'} handleClose={handleClose} toastType={'success'} />
            }

            <Backdrop
                sx={{ zIndex: (theme) => 999999 }}
                open={inviteModal.loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


            <MuiModal modalOpen={inviteModal.open} modalClose={handleCloseInviteModal} noheader>
                <div className='px-5 py-1 flex justify-center items-center' style={{ border: '1px solid rgba(29, 91, 191, 1)' }}>
                    <div className='flex justify-center items-center flex-col gap-8 py-10 px-20 mt-5'
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-wrap gap-4">

                                <div className={`relative mb-6 w-full`} >
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        URL
                                    </label>

                                    <div className='relative input-bg w-full'>
                                        <input className='input-bg text-[12px] h-[60px] w-full px-5'
                                            value={process.env.REACT_APP_SITE_URL} disabled />
                                    </div>
                                </div>


                                <div className={`relative mb-6 w-full`} >
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                        Invite Recipients
                                    </label>
                                    <textarea id="message" rows="4" className={`block p-2.5 input-bg w-full text-sm text-gray-900  rounded-lg border
                                            focus:visible:outline-none focus:visible:border-none}`}
                                        placeholder={''}
                                        {...register('recipients', { required: "This field is required" })}></textarea>

                                    {errors['recipients'] && (
                                        <p className="error" role="alert">
                                            {errors['recipients'].message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='flex gap-7'>
                                <img className='cursor-pointer' src={LinkIcon} alt="LinkIcon" onClick={handleCopy} />
                                <img className='cursor-pointer' src={LinkedInIcon} alt="LinkedInIcon" />
                                <img className='cursor-pointer' src={InstagramIcon} alt="InstagramIcon" />
                                <img className='cursor-pointer' src={FacebookOutlineIcon} alt="FacebookOutlineIcon" />
                                <img className='cursor-pointer' src={TwitterIcon} alt="TwitterIcon" />
                            </div>

                            <div className="flex  justify-center align-middle pt-8">
                                <Button btnType="submit" btnName='Submit' btnCategory="primary" />
                            </div>
                        </form>
                    </div>

                </div>
            </MuiModal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={inviteModal.success}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >Your invitation is successfully sent</p>
                    </div>

                </div>
                
            </Backdrop>

        </div>
    )
}
