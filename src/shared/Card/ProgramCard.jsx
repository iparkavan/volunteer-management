import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import SearchIcon from '../../assets/icons/SearchColor.svg'
import FilterIcon from '../../assets/icons/filterIcon.svg'
import EditIcon from '../../assets/icons/editIcon.svg';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import CancelIcon from '../../assets/images/cancel1x.png'
import UserImage from "../../assets/icons/user-icon.svg";
import MoreIcon from '../../assets/icons/moreIcon.svg'
import BookmarkedIcon from '../../assets/icons/Bookmarked.svg'
import BookmarkedColorIcon from '../../assets/images/bookmarked-colour1x.png'
import CalenderIcon from '../../assets/icons/Calender.svg';
import StarColorIcon from '../../assets/icons/starColor.svg';
import UploadIcon from "../../assets/images/image_1x.png"
import DeleteIcon from "../../assets/images/delete_1x.png"
import { ProgramStatusInCard } from '../../utils/constant';
import MuiModal from '../Modal';
import { Button } from '../Button';
import { updateProgramImage } from '../../services/userprograms';
import { Backdrop, CircularProgress } from '@mui/material';
import { getAllCategories } from '../../services/programInfo';
import NoProgramImageBg from "../../assets/icons/noProgramImageBg.svg"
import NoProgramImageIcon from "../../assets/icons/noProgramImageIcon.svg"
import Balck_Heart_Icon from "../../assets/icons/gray-heart.svg";
import Crown_Icon from "../../assets/icons/cronwn.svg";
import { dateFormat } from '../../utils';
import NoDataIcon from "../../assets/icons/noDataIcon.svg"


export default function ProgramCard({ title, viewpage, handleNavigateDetails, handleBookmark, programs, height, action = [], noTitle = false, loadProgram }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const [anchorEl, setAnchorEl] = useState(null);
    const [programImage, setProgramImage] = useState(null)
    const [hoverIndex, setHoverIndex] = useState({ image: null, desc: null })
    const [programUploadAction, setProgramUploadAction] = useState({ loading: false, imageModal: false, successModal: false, error: '', selectedProgram: {} })
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
        setValue,
        getValues
    } = useForm();

    const [categoryPopup, setCategoryPopup] = useState({ show: false, search: '', categoryList: [], selectedItem: [] })
    const open = Boolean(anchorEl);
    const userInfo = useSelector(state => state.userInfo)
    const { profile } = useSelector(state => state.profileInfo)
    const { category, loading: apiLoading } = useSelector(state => state.programInfo)
    const role = userInfo.data.role

    const statusNotShow = ['yettoapprove', 'yettojoin', 'yettostart', 'draft', 'start_request_submitted']

    const programImageRestirct = ['yettoapprove', 'draft', 'cancelled', 'completed']
    const programEditRestirct = ['yettoapprove', 'draft', 'new_program_request_rejected', "cancelled", 'completed']

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseModal = () => {
        setProgramUploadAction({ loading: false, imageModal: false, successModal: false, error: '', selectedProgram: {} })
    }

    const handleProgramImageUpdate = (programInfo) => {
        setProgramUploadAction({ ...programUploadAction, imageModal: true, selectedProgram: programInfo })
    }

    const handleProgramImageSubmit = (data) => {
        setProgramUploadAction({ ...programUploadAction, loading: true })
        let bodyFormData = new FormData();
        bodyFormData.append('program_id', programUploadAction.selectedProgram.id)
        bodyFormData.append('program_image', programImage[0])
        dispatch(updateProgramImage({
            id: programUploadAction.selectedProgram.id,
            data: bodyFormData
        })).then(() => {
            loadProgram && loadProgram()
            setProgramUploadAction({ loading: false, imageModal: false, successModal: true, error: '', selectedProgram: {} })
            setProgramImage(null)
            reset()
        })
    }

    const handleDeleteImage = () => {
        setValue('program_image', '')
        setProgramImage(null)
    }

    const handleCategoryFilter = () => {
        let options = { ...categoryPopup, show: true, search: '', selectedItem: [] }
        if (searchParams.has('category_id') && searchParams.get('category_id') !== '') {
            options = { ...options, selectedItem: searchParams.get('category_id').split(',').map(Number) }
        }
        setCategoryPopup(options)
    }

    const handleCategorySearch = (value) => {
        let catList = category.filter(cat => cat.name.toLowerCase().includes(value.toLowerCase()))
        if (value === '') catList = category
        setCategoryPopup({ ...categoryPopup, search: value, categoryList: catList })
    }

    const handleSelectCategory = (categoryId) => {
        let selectedItems = categoryPopup.selectedItem
        const selectedCategory = selectedItems.includes(categoryId) ? selectedItems.filter(select => select !== categoryId) : [...selectedItems, categoryId]
        setCategoryPopup({ ...categoryPopup, selectedItem: selectedCategory })
    }

    const handleSearchSubmit = () => {
        const selectedCategory = categoryPopup.selectedItem
        if (selectedCategory.length) {
            searchParams.set("category_id", selectedCategory.toString());

        } else {
            searchParams.delete("category_id")
        }
        setSearchParams(searchParams)
        setCategoryPopup({ show: false, search: '', categoryList: category, selectedItem: [] })
    }

    useEffect(() => {
        setCategoryPopup({ show: false, search: '', categoryList: category, selectedItem: [] })
    }, [category])

    useEffect(() => {
        if (!category.length) {
            dispatch(getAllCategories())
        }
    }, [])

    const imageField = register('program_image', { required: 'This field is required' })

    useEffect(() => {
        if (programUploadAction.successModal) {
            setTimeout(() => {
                handleCloseModal()
            }, 3000)
        }
    }, [programUploadAction.successModal])


    return (
        <>
            <div className='main-program' style={{ boxShadow: noTitle ? 'none' : '4px 4px 25px 0px rgba(0, 0, 0, 0.05)', borderRadius: '10px' }}>
                {
                    !noTitle &&
                    <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
                        <div className="flex gap-4">
                            <div className="card-dash" style={{ background: '#FE634E', border: "1px solid #FE634E" }} ></div>
                            <h4>{title}</h4>
                            <img className='cursor-pointer' onClick={handleCategoryFilter} src={FilterIcon} alt="statistics" />
                        </div>
                        {
                            programs && programs.length ?

                                <p className="text-[12px] py-2 px-2 cursor-pointer bg-background-primary-main text-font-secondary-white" style={{
                                    borderRadius: '3px'
                                }}
                                    onClick={() => navigate(viewpage)}
                                >View All</p>

                                : null
                        }

                        {
                            action && action.length ?
                                <>
                                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e)}>
                                        <img src={MoreIcon} alt='MoreIcon' />
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        {
                                            action.map((act, i) =>
                                                <MenuItem key={i} onClick={() => navigate(act.url)} className='!text-[12px]'>
                                                    {act.icon && <img src={act.icon} alt="Icon" className='pr-3 w-[30px]' />}
                                                    {act.name}
                                                </MenuItem>
                                            )
                                        }
                                    </Menu>
                                </>

                                : null

                        }
                    </div>
                }

                <div className={`py-3 px-3 ${programs?.length < 6 ? 'h-[1070px]' : ""}`}>
                    <div className={programs?.length > 0 ?"flex flex-wrap": "h-full"}>
                        {
                            programs && programs.length ?

                                programs.map((currentProgram, index) => {
                                    let startDate = ''
                                    if (currentProgram.start_date !== '') {
                                        startDate = new Date(currentProgram.start_date).toISOString().substring(0, 10).split("-")
                                    }
                                    const actualStartDate = dateFormat(startDate)
                                    // startDate.length ? `${startDate[2]}/${startDate[1]}/${startDate[0]}` : ''

                                    const date = new Date(currentProgram.created_at);

                                    const options = {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    };

                                    const timeInAMPM = date.toLocaleString('en-US', options);

                                    const rating = currentProgram?.mentor_rating === 0 ? 3 : currentProgram?.mentor_rating;

                                    return (
                                        <div key={index} className={`curated-programs program-container flex gap-1 items-center py-5 px-5 w-[33%]`}
                                            style={{
                                                ...(currentProgram.status === 'yettoapprove' && !currentProgram?.mentor_id) ? {
                                                    opacity: '0.5',
                                                    pointerEvents: 'none',
                                                    cursor: 'not-allowed',
                                                }
                                                    :
                                                    {}
                                            }}
                                        >
                                            <div className="w-full" style={{ boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                                <div className="py-6 px-7 border-b-2 relative">
                                                    <div className="h-full relative" style={{ borderRadius: '10px' }}>
                                                        {
                                                            currentProgram?.program_image ?
                                                                <img className="object-cover w-full h-[150px] cursor-pointer" src={currentProgram.program_image} alt="Program Logo"
                                                                    onMouseEnter={() => setHoverIndex({ ...hoverIndex, image: index })} onMouseLeave={() => setHoverIndex({ ...hoverIndex, image: null })}
                                                                />
                                                                :
                                                                <div
                                                                    style={{
                                                                        position: "relative",
                                                                        display: "inline-block",
                                                                    }}
                                                                >
                                                                    <img src={NoProgramImageBg} alt="Background" />
                                                                    <div
                                                                        style={{
                                                                            position: "absolute",
                                                                            top: "50%",
                                                                            left: "50%",
                                                                            transform: "translate(-50%, -50%)",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                        }}
                                                                    >
                                                                        <img src={NoProgramImageIcon} alt="Icon" />
                                                                    </div>
                                                                </div>
                                                        }
                                                        {
                                                            (currentProgram.program_edit && !programImageRestirct.includes(currentProgram.status)) &&

                                                            <div className={`absolute top-2 left-3 cursor-pointer  ${hoverIndex.image === index ? 'show' : 'hidden'}`} style={{ background: '#fff', borderRadius: '50%', padding: '13px 15px' }}
                                                                onClick={() => handleProgramImageUpdate(currentProgram)} onMouseEnter={() => setHoverIndex({ ...hoverIndex, image: index })} onMouseLeave={() => setHoverIndex({ ...hoverIndex, image: null })}
                                                            >
                                                                <img className="h-[25px] w-[22px]" src={EditIcon} alt="EditIcon" />
                                                            </div>
                                                        }
                                                        <div className='absolute top-2 right-0' style={{ background: '#fff', borderRadius: '50%', padding: '14px 17px' }}>
                                                            <img className="cursor-pointer"
                                                                onClick={() => handleBookmark(currentProgram)}
                                                                src={currentProgram.is_bookmark ? BookmarkedColorIcon : BookmarkedIcon} alt="BookmarkedIcon" />
                                                        </div>
                                                    </div>
                                                    <div className='pt-2'>
                                                        {currentProgram?.is_sponsored ? (
                                                            <div className="bg-[#DADADA] inline-flex gap-2 px-2 py-1 rounded-md">
                                                                <img src={Balck_Heart_Icon} alt="" />
                                                                <p className="font-semibold text-xs">Free</p>
                                                            </div>
                                                        ) : (
                                                            <div className="bg-[#1DA164] inline-flex gap-2 text-white px-2 py-1 rounded-md">
                                                                <img src={Crown_Icon} alt="" />
                                                                <p className="font-semibold text-xs">
                                                                    Premium
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='flex justify-between py-4'>
                                                        <h4 className="text-[16px]" title={currentProgram.program_name} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '180px' }}>
                                                            {currentProgram.program_name}
                                                        </h4>
                                                        {
                                                            currentProgram?.categories && currentProgram?.categories.length > 0 &&
                                                            <p className="py-1 px-1 text-[12px] text-center rounded-3xl w-[90px]"
                                                                style={{ border: '1px solid rgba(238, 238, 238, 1)' }}>{currentProgram?.categories[0]?.name}</p>
                                                        }
                                                    </div>
                                                    <div className={`${currentProgram?.program_edit ? "cursor-pointer" : "cursor-default"} flex justify-between`}
                                                        onClick={() => {
                                                            if (currentProgram.program_edit && !programEditRestirct.includes(currentProgram.status)) {

                                                                navigate(`/update-program/${currentProgram.id}`)
                                                            }
                                                        }
                                                        }
                                                        onMouseOver={() => setHoverIndex({ ...hoverIndex, desc: index })} onMouseLeave={() => setHoverIndex({ ...hoverIndex, desc: null })}>

                                                        <span className="text-[12px] line-clamp-2 ">{currentProgram.description}</span>
                                                        {
                                                            (currentProgram.program_edit && !programEditRestirct.includes(currentProgram.status)) &&
                                                            <img className={`h-[18px] w-[15px] ${hoverIndex.desc === index ? 'show' : 'hidden'}`} src={EditIcon} alt="EditIcon" />
                                                        }
                                                    </div>
                                                    <div className='flex gap-2 items-center py-3 text-[12px]'>
                                                    {currentProgram?.mentor_rating > 0 &&
                                                        <div className="flex gap-2 items-center">
                                                            <img src={StarColorIcon} alt="StarColorIcon" />
                                                            <span>{rating}</span>
                                                            <span style={{ borderRight: '1px solid #18283D', height: "20px" }}></span>
                                                        </div>}
                                                        
                                                        <img className="w-6 h-6 rounded-full shadow-lg object-cover" src={currentProgram?.mentor_profile_image || UserImage} alt="User logo" />
                                                        <span style={{
                                                            textOverflow: 'ellipsis', overflow: 'hidden',
                                                            width: '215px', whiteSpace: 'nowrap', textTransform: "capitalize",

                                                        }}>Instructor : <span style={{ color: "#1D5BBF" }}>{currentProgram?.mentor_name}</span></span>
                                                    </div>
                                                    <div className='flex justify-center pt-2'>
                                                        {
                                                            (currentProgram.status === 'yettoapprove' && !currentProgram?.mentor_id) || currentProgram.status === 'draft' ?
                                                                <button className={`text-white text-[12px] py-3 ${currentProgram.status === 'draft' ? 'w-[110px]' : 'w-[170px]'}`}
                                                                    onClick={() => currentProgram.status === 'draft' ? navigate(`/update-program/${currentProgram.id}`) : undefined}
                                                                    style={{ background: currentProgram.status === 'yettoapprove' && !currentProgram?.mentor_id ? '#76818E' : 'rgba(29, 91, 191, 1)', borderRadius: '5px' }}>
                                                                    {currentProgram.status === 'draft' ? 'Continue' : 'Waiting for approval'}

                                                                </button>
                                                                :
                                                                <button className="text-font-secondary-white text-[12px] py-3 w-[140px] !bg-background-primary-main rounded-[5px]"
                                                                    onClick={() => handleNavigateDetails(currentProgram)}>View Details</button>
                                                        }
                                                    </div>
                                                </div>


                                                <div className="flex justify-between pb-3 mx-4 my-4 items-center">
                                                    <div className="program-time-info flex text-[12px] gap-4 items-center">
                                                        <img src={CalenderIcon} alt="CalendarImage" />
                                                        <span className='program-date'>{actualStartDate}</span>
                                                        <div
                                                            className="w-[6px] h-[6px]  mx-[-1px]  flex items-center justify-center">
                                                            <span className="w-[6px] h-[6px]  rounded-full" style={{ background: 'rgba(0, 0, 0, 1)' }}></span>
                                                        </div>
                                                        <span className='program-time'>{currentProgram?.program_created_time}</span>
                                                    </div>

                                                    {
                                                        !statusNotShow.includes(currentProgram.status) ?

                                                            <div className="text-[12px] px-2 py-2" style={{
                                                                background: `${ProgramStatusInCard[currentProgram.status]?.bg}`,
                                                                color: `${ProgramStatusInCard[currentProgram.status]?.color}`, borderRadius: '3px'
                                                            }}>
                                                                {ProgramStatusInCard[currentProgram.status]?.text}
                                                            </div>
                                                            :
                                                            <div className="posted-tim text-[12px] px-2 py-2" style={{ background: 'rgba(241, 241, 241, 1)', borderRadius: '3px' }}>{currentProgram.created_time}</div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                                : <div className="flex items-center justify-center h-full"
                                // style={{
                                //   position: "relative",
                                //   top: "50%",
                                //   left: "50%",
                                //   transform: "translate(-50%, -50%)",
                  
                                // }}
                                >
                                  <img src={NoDataIcon} alt="noDataImage" />
                                </div>
                        }

                    </div>
                </div>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => 999999 }}
                    open={programUploadAction.loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {/* Image Modal  */}
                <MuiModal modalSize='md' modalOpen={programUploadAction.imageModal} modalClose={handleCloseModal} noheader>

                    <div className='px-5 py-5'>
                        <div className='flex justify-center flex-col gap-5  mt-4 mb-4 border border-background-primary-main rounded-[10px]'>
                            <div className='flex justify-between px-3 py-4 items-center border-b border-background-primary-main'>
                                <p className='text-[18px]' style={{ color: 'rgba(0, 0, 0, 1)' }}>Upload Program Image </p>
                                <img className='cursor-pointer' onClick={handleCloseModal} src={CancelIcon} alt="CancelIcon" />
                            </div>

                            <div className='px-5'>
                                {
                                    programUploadAction.error !== '' ? <p className="error" role="alert">{programUploadAction.error}</p> : null
                                }

                                <form onSubmit={handleSubmit(handleProgramImageSubmit)}>
                                    <div className='relative pb-8'>
                                        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Attachment
                                        </label>

                                        <div className='relative'>
                                            <>
                                                <div className="flex items-center justify-center w-full">
                                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2
                                                                                 border-gray-300 border-dashed cursor-pointer
                                                                                  bg-gray-50 hover:bg-gray-100">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">
                                                                Upload Program Logo/Image(jpg,png)</span>
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                (200*200 Pixels)
                                                            </p>
                                                        </div>
                                                        <input id={'program_image'} type="file" accept="image/png, image/jpeg, image/jpg,image/webp,image/heic"
                                                            {...imageField}

                                                            onChange={(e) => {
                                                                imageField.onChange(e);
                                                                if (e.target.files && e.target.files[0]) {
                                                                    let types = [
                                                                        "image/png",
                                                                        "image/jpeg",
                                                                        "image/jpg",
                                                                        "image/webp",
                                                                        "image/heic",
                                                                    ]
                                                                    if (types.includes(e.target.files[0].type)) {
                                                                        setProgramImage(e.target.files);
                                                                    } else {
                                                                        setError(['progran_image'], 'Invalid file type')
                                                                    }
                                                                }
                                                            }}
                                                            className="hidden" />
                                                    </label>

                                                </div>
                                                {getValues('program_image')?.length > 0 &&
                                                    <>
                                                        <div className='text-[14px] pt-5' style={{ color: 'rgba(0, 0, 0, 1)' }}>Uploaded Image</div>

                                                        <div className='flex justify-between items-center w-[30%] mt-5 px-4 py-4'
                                                            style={{ border: '1px solid rgba(29, 91, 191, 0.5)', borderRadius: '3px' }}>
                                                            <div className='flex w-[80%] gap-3 items-center'>
                                                                <img src={UploadIcon} alt="altlogo" />
                                                                <span className='text-[12px]'> {getValues('program_image') && getValues('program_image')[0]?.name}</span>
                                                            </div>
                                                            <img className='w-[30px] cursor-pointer' onClick={() => handleDeleteImage()} src={DeleteIcon} alt="DeleteIcon" />
                                                        </div>
                                                    </>
                                                }
                                                {errors['program_image'] && (
                                                    <p className="error" role="alert">
                                                        {errors['program_image'].message}
                                                    </p>
                                                )}
                                            </>
                                        </div>
                                    </div>

                                    <div className='flex justify-center gap-5 items-center pt-5 pb-10'>
                                        <Button btnName='Cancel' btnCls="w-[18%]" btnCategory="secondary" onClick={handleCloseModal} />
                                        <button
                                            type='submit'
                                            className='text-white py-3 px-7 w-[18%] rounded-[3px] bg-background-primary-main'>
                                            Submit
                                        </button>
                                    </div>
                                </form>

                            </div>


                        </div>

                    </div>
                </MuiModal>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={programUploadAction.successModal}
                >
                    <div className='px-5 py-1 flex justify-center items-center'>
                        <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                            style={{ background: '#fff', borderRadius: '10px' }}>
                            <img src={SuccessTik} alt="SuccessTik" />
                            <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                                style={{
                                    fontWeight: 600
                                }}
                            >Program Image Updated successfully</p>
                        </div>

                    </div>
                </Backdrop>

            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={categoryPopup.show}
            >
                <div className='py-3 px-4 bg-white' style={{ borderRadius: '3px' }}>
                    <div style={{ border: '1px solid rgba(0, 0, 0, 1)', borderRadius: '3px' }} className='py-5 px-5'>
                        <div className="relative">
                            <input type="text" className="block w-full p-2 text-sm text-gray-900 border-none"
                                onChange={(e) => handleCategorySearch(e.target.value)}
                                placeholder="Search Category" style={{
                                    background: '#FFF8F2',
                                    height: '55px',
                                    width: '400px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(0, 0, 0, 1)',
                                }}
                                value={categoryPopup.search}
                            />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <img src={SearchIcon} alt='SearchIcon' />
                            </div>
                        </div>


                        <div className='text-black'>
                            <ul className='py-6 leading-10' style={{ maxHeight: '250px', overflowY: 'scroll', margin: '15px 0px 30px 0' }}>
                                {
                                    categoryPopup.categoryList.map((category, index) =>
                                        <li key={index} className='flex gap-7'>
                                            <input type="checkbox" className='w-[20px]' checked={categoryPopup.selectedItem.includes(category.id)}
                                                onChange={() => handleSelectCategory(category.id)} value={category.id}

                                            />
                                            <span className='text-[16px]'>{category.name}</span>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="flex gap-6 justify-center align-middle">
                                <Button btnName='Cancel' btnCategory="secondary" onClick={() => setCategoryPopup({ ...categoryPopup, search: '', show: false, selectedItem: [] })} />
                                <Button btnType="button" btnCls="w-[100px]" btnStyle={{ background: '#FE634E' }} onClick={handleSearchSubmit}
                                    btnName={'Ok'} btnCategory="primary" />
                            </div>
                        </div>
                    </div>
                </div>

            </Backdrop>
        </>

    )
}
