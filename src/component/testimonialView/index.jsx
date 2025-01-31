import { Backdrop, Box, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Button } from '../../shared'
import { CancelPopup } from '../Mentor/Task/cancelPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimonialView, updateTestimonial } from '../../services/request';
import ConnectIcon from '../../assets/images/Connectpop1x.png';
import { useNavigate, useParams } from 'react-router-dom';
import BlueCloseIcon from '../../assets/icons/blue-close-icon.svg';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import CancelColorIcon from '../../assets/icons/cancelCircle.svg'

export const TestimonialView = () => {
    const params = useParams();
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo);
    const { testimonialData } = useSelector((state) => state.requestList);
    const role = userInfo.data.role
    const dispatch = useDispatch()

    console.log(testimonialData)

    const [open, setOpen] = React.useState({
        accept: false,
        cancel: false,
        activity: false,
        type: ""
    })

    const handleOpenPopup = (type) => {
        setOpen({
            ...open,
            [type]: true,
            type: type
        })
    }

    const handleClosePopup = () => {
        setOpen({
            accept: false,
            cancel: false,
            activity: false,
            type: ""
        })
    }


    const handleSubmit = (type = open?.type, reason) => {
        const payload = {
            request_id: testimonialData?.request_id,
            action: type === "cancel" ? "reject" : "accept"
        }

        dispatch(updateTestimonial(payload)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setOpen({
                    ...open,
                    [type]: false,
                    activity: true
                })
                setTimeout(() => {
                    setOpen({
                        ...open,
                        activity: false,
                        [type]: false,
                        type: ""
                    })
                    getTestimonialData()
                }, 2000);
            }
        })

    }


    const getTestimonialData = () => {
        dispatch(getTestimonialView(params?.id))
    }

    useEffect(() => {
        getTestimonialData()
    }, [])

    return (
        <Box className="!border !border-[#DBE0E5] rounded-[10px] m-[20px] p-[20px]">
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ borderBottom: "1px solid #D5E4F2", mb: "20px" }}>
                <Typography p={"20px 0px"} className='!text-[18px]' fontWeight={600}>View Testimonials</Typography>
                <div onClick={() => navigate(-1)} className='cursor-pointer'>
                    <img src={BlueCloseIcon} alt='' />
                </div>
            </Stack>

            <div className="relative flex gap-6 justify-between">
                <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody style={{ border: '1px solid #232323' }}>
                        <tr className="bg-white border-b">
                            <th scope="row" style={{ border: '1px solid #232323' }} className="px-6 py-4 font-medium whitespace-nowrap ">
                                Category
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {testimonialData?.category}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                Program Name
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {testimonialData?.program_name}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Tesimonials Type
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {testimonialData?.testimonial_type}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Program Start date & time
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {`${testimonialData?.start_date} ${testimonialData?.start_time}`}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Program End date & time
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {`${testimonialData?.end_date} ${testimonialData?.end_time ?? ""}`}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                To Requested
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {testimonialData?.requested_to}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Email Id
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: "#FE634E" }}>
                                {testimonialData?.email}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody style={{ border: '1px solid #232323' }}>
                        <tr className="bg-white border-b">
                            <th scope="row" style={{ border: '1px solid #232323' }} className="px-6 py-4 font-medium whitespace-nowrap ">
                                Location
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.location}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                Phone Number
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.phone_number}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Zip Code
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.zip_code ?? ""}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Request date
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.request_date}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Requested by
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.requested_by}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Participated Volunteers
                            </th>
                            <td className="px-6 py-4 text-white" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.participated_mentees ?? ""}
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th style={{ border: '1px solid #232323' }} scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                Status
                            </th>
                            <td className="px-6 py-4 text-white capitalize" style={{ background: '#4f4f4f' }}>
                                {testimonialData?.status}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>


            <Box className="!border !border-[#232323] p-[20px] rounded-[3px]" mt={3}>
                <Typography className='!text-font-primary-main !text-[14px]'>
                    Description: <span className='!text-[#18283D] !text-[14px]'>{testimonialData?.program_description}</span>
                </Typography>
            </Box>


            <Box className="bg-background-primary-light rounded-[3px] border border-background-primary-main" mt={3}>
                <Typography className='px-[20px] py-[12px] border-b-2 border-background-primary-main !text-font-primary-main !text-[16px]'>{testimonialData?.requested_by}</Typography>
                <Typography className='px-[20px] py-[12px] !text-font-primary-main !text-[16px]'>{testimonialData?.testimonial_content}</Typography>
            </Box>


            <Stack direction="row" alignItems="center" justifyContent="center" width="100%" mt={3}>
                <Stack direction={"row"} alignItems={"center"} spacing={"20px"}>
                    <Button
                        btnType='button'
                        btnCategory='secondary'
                        btnName="Close"
                        btnCls='!border !border-[#18283D] !text-[#18283D]'
                        onClick={() => navigate(-1)} />
                    {(role === "admin" && testimonialData?.status === "new") && <Button
                        btnType='button'
                        btnCategory='secondary'
                        btnName="Reject"
                        btnCls='!border !border-[#FFE7E7] !text-[#E0382D] !bg-[#FFE7E7]'
                        onClick={() => handleOpenPopup("cancel")} />}
                    {(role === "admin" && testimonialData?.status === "new") && <Button
                        btnType='button'
                        btnCategory='primary'
                        btnName="Accept"
                        btnCls=''
                        onClick={() => handleOpenPopup("accept")} />}
                </Stack>
            </Stack>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open?.accept}
            >
                <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
                    <img src={ConnectIcon} alt='ConnectIcon' />

                    <div className='py-5'>
                        <p
                            style={{
                                color: 'rgba(24, 40, 61, 1)',
                                fontWeight: 600,
                                fontSize: '18px',
                            }}
                        >
                            Are you sure you want to approve testimonial?
                        </p>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex gap-6 justify-center align-middle'>
                            <Button
                                btnName='Cancel'
                                btnCategory='secondary'
                                onClick={() => handleClosePopup()}
                            />
                            <Button
                                btnType='button'
                                btnCls='w-[110px]'
                                btnName={'Yes'}
                                btnCategory='primary'
                                onClick={() => handleSubmit("accept")}
                            />
                        </div>
                    </div>
                </div>
            </Backdrop>

            {/* <CancelPopup open={open?.cancel} handleClosePopup={handleClosePopup}
                handleSubmit={(reason) => handleSubmit("cancel", reason)}
                header='Cancel Reason' /> */}

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open?.cancel}
            >
                <div className='popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center'>
                    <img src={CancelColorIcon} alt='ConnectIcon' />

                    <div className='py-5'>
                        <p
                            style={{
                                color: 'rgba(24, 40, 61, 1)',
                                fontWeight: 600,
                                fontSize: '18px',
                            }}
                        >
                            Are you sure you want to reject testimonial?
                        </p>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex gap-6 justify-center align-middle'>
                            <Button
                                btnName='Cancel'
                                btnCategory='secondary'
                                onClick={() => handleClosePopup()}
                            />
                            <Button btnType="button" btnCls="w-[110px]" btnName={'Yes'}
                                style={{ background: '#E0382D' }} btnCategory="primary"
                                onClick={() => handleSubmit("cancel")}
                            />
                        </div>
                    </div>
                </div>
            </Backdrop>


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open?.activity}
                onClick={() => false}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                            style={{
                                fontWeight: 600
                            }}
                        >{open?.type === "accept" ? "Testimonial Successfully Approved" : "Testimonial Successfully Rejected"}</p>
                    </div>

                </div>
            </Backdrop>
        </Box>
    )
}