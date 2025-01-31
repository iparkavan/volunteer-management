import { Backdrop, Box, CircularProgress, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React from 'react'
import { Button } from '../../shared'
import AddCategory from "../../assets/icons/addCategory.svg"
import SearchIcon from '../../assets/icons/search.svg';
import { AdminCategory } from '../../mock';
import ViewIcon from '../../assets/images/view1x.png'
import EditIcon from "../../assets/icons/editIcon.svg"
import DataTable from '../../shared/DataGrid';
import MoreIcon from "../../assets/icons/moreIcon.svg";
import DeleteIcon from "../../assets/icons/deleteNew.svg"
import { CategoryCreateEdit } from './categoryCreateEdit';
import MuiModal from '../../shared/Modal';
import { createCategory, deleteCategory, editCategory, getCategory, updateCategoryLocalState } from '../../services/category';
import SuccessTik from '../../assets/images/blue_tik1x.png';
import { useDispatch, useSelector } from 'react-redux';
import CloseReqPopup from "../../assets/icons/blackCloseIcon.svg"
import CancelReq from "../../assets/icons/cancelRequest.svg"
import { useNavigate } from 'react-router-dom';

const initialDeleteState = {
    bool: false,
    id: "",
    activity: false
}
const Category = () => {

    const { categories, loading, formDetails } = useSelector((state) => state.category)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10,
    });
    const [seletedItem, setSelectedItem] = React.useState({})
    const [createEditForm, setCreateEditForm] = React.useState({
        bool: false,
        data: "",
        type: "create"
    })
    const [activity, setActivity] = React.useState({
        bool: false,
        type: "create"
    })
    const [search, setSearch] = React.useState("")
    const [deletePopup, setDeletePopup] = React.useState({
        ...initialDeleteState
    })

    const handleClick = (event, data) => {
        setSelectedItem(data)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenEditForm = (data, editform = false) => {
        handleClose()
        const constructedData = {
            category_name: data?.name,
            description: data?.description,
            id: data?.id
        }
        setCreateEditForm({
            ...createEditForm,
            data: data,
            bool: true,
            type: editform ? "edit" : "create"
        })
        dispatch(updateCategoryLocalState({ formDetails: constructedData }))
    }

    const handleCloseForm = () => {
        setCreateEditForm({
            ...createEditForm,
            bool: false,
            data: "",
        })
    }

    const handleGetCategoryTableData = (searchText = search) => {
        const payload = {
            page: paginationModel?.page + 1,
            limit: paginationModel?.pageSize,
            search: searchText
        }
        dispatch(getCategory(payload))
    }

    React.useEffect(() => {
        handleGetCategoryTableData()
    }, [paginationModel])


    const handleSearch = (searchText) => {
        setSearch(searchText)
        handleGetCategoryTableData(searchText)
    }


    const adminCategoryColumn = [
        {
            field: 'name',
            headerName: 'Category Name',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{params.row.name ?? "..."}</div>
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
            id: 0,
            renderCell: (params) => {
                return <div className='flex gap-2 items-center'>{params.row.description ?? "..."}</div>
            }
        },
        ...AdminCategory,
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            id: 4,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e, params.row)}>
                        <img src={MoreIcon} alt='ViewIcon' />
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
                        <MenuItem onClick={() => {
                            navigate("/categoryView", {
                                state: {
                                    id: seletedItem?.id
                                }
                            })
                        }} className='!text-[14px] !text-[#18283D]' style={{fontWeight: 500}}>
                            <img src={ViewIcon} alt="ViewIcon" field={params.id} className='pr-3 w-[30px]' />
                            View
                        </MenuItem>
                        <MenuItem onClick={() => handleOpenEditForm(seletedItem, true)}
                        className='!text-[14px] !text-[#18283D]' style={{fontWeight: 500}}>
                            <img src={EditIcon} alt="EditIcon" field={params.id} className='pr-3 w-[30px]' />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleOpenDeletePopup(seletedItem?.id)} className='!text-[14px] !text-[#18283D]' style={{fontWeight: 500}}>
                            <img src={DeleteIcon} alt="EditIcon" field={params.id} className='pr-3 w-[30px]' />
                            Delete
                        </MenuItem>
                    </Menu>

                </>
            }
        }
    ]

    const onSubmit = (data) => {
        const payload = {
            name: data?.category_name,
            description: data?.description,
        }
        if (formDetails?.id) {
            Object.assign(payload, { id: formDetails?.id })
            dispatch(editCategory(payload)).then((res) => {
                if (res?.meta?.requestStatus === "fulfilled") {
                    dispatch(updateCategoryLocalState({ formDetails: {} }))
                    handleCloseForm()
                    setActivity({
                        ...activity,
                        bool: true
                    })
                    setTimeout(() => {
                        setActivity({
                            ...activity,
                            bool: false
                        })
                        handleGetCategoryTableData()
                        setCreateEditForm({
                            ...createEditForm,
                            type: "create",
                            bool: false
                        })
                    }, 2000);
                }
            })

        } else {
            dispatch(createCategory(payload)).then((res) => {
                if (res?.meta?.requestStatus === "fulfilled") {
                    handleCloseForm()
                    setActivity({
                        ...activity,
                        bool: true
                    })
                    setTimeout(() => {
                        setActivity({
                            ...activity,
                            bool: false
                        })
                        handleGetCategoryTableData()
                    }, 2000);
                }
            })
        }




    }

    // delete Section

    const handleDeleteCategory = () => {

        dispatch(deleteCategory(deletePopup?.id)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setDeletePopup({
                    ...deletePopup,
                    bool: false,
                    id: "",
                    activity: true
                })

                setTimeout(() => {
                    handleCloseDeletePopup()
                    handleGetCategoryTableData()
                }, 2000);
            }
        })
    }


    const handleOpenDeletePopup = (id) => {
        handleClose()
        setDeletePopup({
            ...deletePopup,
            bool: true,
            id: id
        })
    }

    const handleCloseDeletePopup = () => {
        setDeletePopup({
            ...initialDeleteState
        })
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box className={"p-[16px] border border-[#DBE0E5] rounded-[10px] m-[32px] bg-[#fff]"}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} mb={"20px"}>
                    <Typography className='text-[22px] text-[#18283D] font-bold' sx={{ fontWeight: 600 }}>Category</Typography>

                    <Stack direction={"row"} alignItems={"center"} spacing={"30px"}>
                        <div>
                            <div className="relative">
                                <input type="text" id="search-navbar" className="block w-full p-2 text-sm text-gray-900 border-none"
                                    placeholder="Search here..." style={{
                                        border: '1px solid #FE634E',
                                        height: '41px',
                                        width: '345px'
                                    }}
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)} />
                                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                    <img src={SearchIcon} alt='SearchIcon' />
                                </div>
                            </div>

                        </div>

                        <Button btnName={
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                <img src={AddCategory} />
                                <Typography className='!text-[14px]'>Add Category</Typography>
                            </Stack>
                        }
                            onClick={() => setCreateEditForm({
                                ...createEditForm,
                                bool: true
                            })}
                        />
                    </Stack>
                </Stack>

                <Divider className='mt-[20px]'></Divider>

                <Box>
                    <DataTable rows={categories?.results ?? []} columns={adminCategoryColumn} hideCheckbox
                        rowCount={categories?.count}
                        paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
                </Box>
            </Box>


            {/* Create and edit form */}

            <MuiModal modalSize='sm' modalOpen={createEditForm?.bool} modalClose={() => handleCloseForm()} noheader>
                <Box>
                    <CategoryCreateEdit
                        handleCancelForm={() => handleCloseForm()}
                        onSubmit={onSubmit}
                    />
                </Box>
            </MuiModal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={activity?.bool}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                        style={{
                          fontWeight: 600
                        }}
                        >{createEditForm?.type === "edit" ? "Your category has been successfully edited" : "Your category has been successfully submitted"}</p>
                    </div>

                </div>

            </Backdrop>


            {/* delete popup */}


            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={deletePopup?.bool}
            >

                <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center">
                    <div className='border border-[#E50027] rounded-[15px] h-[100%] w-[100%] justify-center items-center flex flex-col relative'>
                        <div className='absolute top-[12px] right-[12px]' onClick={() => handleCloseDeletePopup()}>
                            <img src={CloseReqPopup} />
                        </div>
                        <img src={CancelReq} alt="ConnectIcon" />

                        <div className='py-5'>
                            <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>Are you sure want to Remove this category?</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className="flex gap-6 justify-center align-middle">
                                <Button btnName='Cancel' btnCategory="secondary"
                                    btnCls="border !border-[#E50027] !text-[#E50027] w-[110px]" onClick={() => handleCloseDeletePopup()} />
                                <Button btnType="button" btnCls="w-[110px] !bg-[#E50027] !text-[#fff] border !border-[#E50027]" btnName={"Remove"}
                                    btnCategory="secondary"
                                    onClick={() => handleDeleteCategory()}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </Backdrop>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={deletePopup?.activity}
            // onClick={() => setCreateMeetingLoading(false)}
            >
                <div className='px-5 py-1 flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20'
                        style={{ background: '#fff', borderRadius: '10px' }}>
                        <img src={SuccessTik} alt="SuccessTik" />
                        <p className='text-[16px] font-semibold bg-clip-text text-font-primary-main'
                        style={{
                          fontWeight: 600
                        }}
                        >Program Manager category deleted is successfully</p>
                    </div>

                </div>
            </Backdrop>
        </>
    )
}


export default Category