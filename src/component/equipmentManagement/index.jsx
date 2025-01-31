import { Backdrop, Box, CircularProgress, Menu, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import { TableTabs } from '../../shared/tableTabs'
import { SearchBoxVM } from '../../shared/searchBoxVM'
import DataTable from '../../shared/DataGrid'
import { EquipmentTableColumn } from '../../utils/formFields'
import MoreIcon from "../../assets/icons/moreIcon.svg";
import { SelectBox } from '../../shared/SelectBox'
import { useDispatch, useSelector } from 'react-redux'
import { getEquipment, updateEquipment } from './network/equipment'
import { equipmentStatusColor, equipmentStatusText } from '../../utils/constant'
import { useNavigate } from 'react-router-dom'
import cancelIcon from "../../assets/icons/cancelIcon.svg"
import { ActivityPopup } from '../../shared/activityPopup/activityPopup'
import { Button } from '../../shared'
import ConfirmTik from "../../assets/icons/confirmTik.svg"
import deactivatePopupIcon from "../../assets/icons/deactivatePopupIcon.svg"

const Equipment = () => {

    const menuOptions = [
        {
            label: "All",
            value: "all"
        },
        {
            label: "Vehicle",
            value: "vehicle"
        },
        {
            label: "Machinery",
            value: "machinery"
        },
        {
            label: "Essentials",
            value: "essentials"
        }
    ]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { getEquipmentData, loading } = useSelector(state => state.equipment)
    const userInfo = useSelector(state => state.userInfo);
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 10
    })
    const [selectedTab, setSelectedTab] = React.useState("")
    const [selectedItem, setSelectedItem] = React.useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [status, setStatus] = React.useState("all")
    const [search, setSearch] = React.useState("")
    const [popup, setPopup] = React.useState({
        deactive: false,
        activity: false,
        type: ""
    })
    const role = userInfo.data.role || '';

    const msg = {
        deactivated: 'Deactivation Successful',
        activate: "Activation Successful",
        archive: "Equipment Moved to archive",
        unarchive: "Equipment Unarchived"
    }

    const confirmMsg = {
        deactivated: 'Are you sure you want to deactivate this Equipment?',
        activate: "Are you sure you want to Activate this Equipment?",
        archive: "Are you sure you want to move this Equipment to Archive",
        unarchive: "Are you sure you want to move this Equipment to Unarchive"
    }

    const handleOpenPopup = (type) => {
        handleClose()
        setPopup({
            ...popup,
            [type]: true,
            type: type
        })
    }

    const handleClosePopup = () => {
        setPopup({
            deactive: false,
            activity: false,
            type: ""
        })
    }

    const open = Boolean(anchorEl);

    const handleMoreClick = (event, data) => {
        setSelectedItem(data);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectTab = (event, newValue) => {
        setSelectedTab(newValue)
        handleGetEquipment("", newValue)
    }

    const handleStatus = (value) => {
        setStatus(value)
        // handleGetEquipment("", selectedTab, value)
        setPaginationModel({
            page: 0,
            pageSize: 10
        })
    }

    const handleSearch = (value) => {
        setSearch(value)
        handleGetEquipment(value)
    }

    const tabsList = [
        {
            name: "All",
            key: ""
        },
        {
            name: "Available",
            key: "available"
        },
        {
            name: "In Use",
            key: "inuse"
        },
        {
            name: "Deactivated",
            key: "deactivated"
        },
        {
            name: "Archived",
            key: "archived"
        }
    ]

    const equipmentColumns = [
        ...EquipmentTableColumn,
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            id: 5,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full relative'>

                        <span className='w-[80px] flex justify-center h-[30px] px-7'
                            style={{
                                background: equipmentStatusColor?.[params?.row?.equipment_status]?.bg, lineHeight: '30px',
                                borderRadius: '3px', width: '110px', height: '34px', color: equipmentStatusColor?.[params?.row?.equipment_status]?.color
                            }}>
                            {equipmentStatusText?.[params?.row?.equipment_status]}
                        </span>
                    </div>
                </>
            }
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            id: 4,
            renderCell: (params) => {
                return (
                    <>
                        <div className="cursor-pointer flex items-center h-full" onClick={(e) => handleMoreClick(e, params.row)}>
                            <img src={MoreIcon} alt="MoreIcon" />
                        </div>
                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                            "aria-labelledby": "basic-button"
                        }}
                        >
                            <MenuItem
                                onClick={(e) => navigate("/equipmentView", {
                                    state: {
                                        id: selectedItem?.id,
                                        type: "view"
                                    }
                                })}
                                className="!text-[12px]" >
                                View
                            </MenuItem>
                            {
                                (selectedItem?.equipment_status === "inuse" && role === "admin") &&
                                <MenuItem className="!text-[12px]" onClick={() => navigate("/equipmentView", {
                                    state: {
                                        type: "track",
                                        id: selectedItem?.id
                                    }
                                })}>
                                    Track Equipment
                                </MenuItem>
                            }


                            {
                                (!["deactivated", "inuse", "archived"].includes(selectedItem?.equipment_status) && role === "admin") &&
                                <MenuItem onClick={(e) => navigate("/equipmentForm", {
                                    state: {
                                        id: selectedItem?.id,
                                        type: "edit"
                                    }
                                })} className="!text-[12px]" >
                                    Edit
                                </MenuItem>
                            }
                            {
                                (selectedItem?.equipment_status === "available" && role === "admin") &&
                                <MenuItem className="!text-[12px]" onClick={() => handleOpenPopup("deactivated")}>
                                    Deactivate
                                </MenuItem>
                            }

                            {
                                (selectedItem?.equipment_status === "deactivated" && role === "admin") &&
                                <MenuItem className="!text-[12px]" onClick={() => handleOpenPopup("activate")}>
                                    Activate
                                </MenuItem>
                            }
                            {
                                (selectedItem?.equipment_status === "deactivated" && role === "admin") &&
                                <MenuItem onClick={() => handleOpenPopup("archive")} className="!text-[12px]" >
                                    Move to Archive
                                </MenuItem>
                            }
                            {
                                (selectedItem?.equipment_status === "archived" && role === "admin") &&
                                <MenuItem onClick={() => handleOpenPopup("unarchive")} className="!text-[12px]" >
                                    Move to Unarchive
                                </MenuItem>
                            }
                            <MenuItem onClick={() => navigate("/equipmentHistory", { state: { data: selectedItem } })} className="!text-[12px]" >
                                History
                            </MenuItem>
                        </Menu>
                    </>
                );
            },
        },
    ]


    const handleGetEquipment = (searchText = search, selectedStatus = selectedTab, filter = status) => {
        const payload = {
            page: paginationModel?.page + 1,
            limit: paginationModel?.pageSize,
            search: searchText,
            status: selectedStatus,
            filter: filter
        }
        dispatch(getEquipment(payload))
    }

    React.useEffect(() => {
        handleGetEquipment()
    }, [paginationModel])

    const handleStatusChange = (status) => {
        let payload = {
            id: selectedItem?.id,
            data: {
                created_by: userInfo?.data?.user_id,
                equipment_status: status
            }
        }
        if (status === "deactivated") {
            payload = {
                ...payload,
                data: {
                    ...payload?.data,
                    equipment_deactivated_date: (new Date().toISOString())
                }
            }
        }
        dispatch(updateEquipment(payload)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setPopup({
                    ...popup,
                    [popup?.type]: false,
                    activity: true
                })
                setTimeout(() => {
                    setPopup({
                        ...popup,
                        [popup?.type]: false,
                        activity: false,
                        type: ""
                    })
                    handleGetEquipment()
                }, 2000);
            }
        })
    }

    const handleDeactive = () => {
        handleStatusChange("deactivated")
    }

    const handleAccept = () => {
        const statusType = {
            deactivated: "deactivated",
            activate: "available",
            archive: "archived",
            unarchive: "available"
        }

        handleStatusChange(statusType[popup?.type])
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            <Box
                className="bg-[#fff] rounded-[10px]"
                sx={{
                    boxShadow: "4px 4px 15px 4px #0000000D",
                    padding: "30px 20px",
                    margin: "50px 30px 30px 30px"
                }}
            >
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography className='!text-[#353F4F] !text-[22px]' fontWeight={600}>Equipment</Typography>
                    <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <SelectBox
                            background='#fff'
                            isBlackArrow
                            borderColor="#353F4F"
                            height='55px'
                            color='#353F4F'
                            value={status}
                            handleChange={(e) => handleStatus(e?.target?.value)}
                            menuList={menuOptions}
                            width='200px' />
                        <SearchBoxVM handleSearch={(value) => handleSearch(value)} value={search} />
                    </Stack>
                </Stack>
                <Stack spacing={"14px"}>
                    <TableTabs tabsList={tabsList} handleTab={handleSelectTab} selectedTab={selectedTab} />
                    <DataTable
                        rows={getEquipmentData?.results ?? []}
                        columns={equipmentColumns}
                        paginationModel={paginationModel}
                        setPaginationModel={setPaginationModel}
                        rowCount={getEquipmentData?.count}
                        hideCheckbox
                        hideFooter={getEquipmentData?.results?.length === 0}
                    />
                </Stack>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popup?.deactivated}
                >

                    <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center">
                        <div className='border border-[#BF453A] rounded-[15px] h-[100%] w-[100%] justify-center items-center flex flex-col relative'>
                            {/* <div className='absolute top-[12px] right-[12px]' onClick={() => handleCloseDeletePopup()}>
                                <img src={CloseReqPopup} />
                            </div> */}
                            <img src={cancelIcon} alt="ConnectIcon" />

                            <div className='py-5'>
                                <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>Are you sure you want to deactivate this Equipment?</p>
                            </div>
                            <div className='flex justify-center'>
                                <div className="flex gap-6 justify-center align-middle">
                                    <Button btnName='Cancel' btnCategory="secondary"
                                        btnCls="w-[110px]" onClick={() => handleClosePopup()} />
                                    <Button btnType="button" btnCls="w-[110px] !bg-[#BF453A] !text-[#fff] border !border-[#BF453A]" btnName={"Yes"}
                                        btnCategory="secondary"
                                        onClick={() => handleDeactive()}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </Backdrop>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={popup?.activate || popup?.archive || popup?.unarchive}
                >

                    <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center">
                        <div className='h-[100%] w-[100%] justify-center items-center flex flex-col relative'>
                            <img src={popup?.type === "activate" ? ConfirmTik : deactivatePopupIcon} alt="ConfirmTik" />

                            <div className='py-5'>
                                <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 600, fontSize: '18px' }}>{confirmMsg[popup?.type]}</p>
                            </div>
                            <div className='flex justify-center'>
                                <div className="flex gap-6 justify-center align-middle">
                                    <Button btnName='No' btnCategory="secondary"
                                        btnCls="w-[110px]" onClick={() => handleClosePopup()} />
                                    <Button btnType="button" btnCls={`w-[110px] ${popup?.type === "activate" ? '!bg-background-success-main' : '!bg-background-primary-main'} !text-[#fff] !border !border-none`} btnName={"Yes"}
                                        btnCategory="secondary"
                                        onClick={() => handleAccept()}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </Backdrop>

                <ActivityPopup open={popup?.activity} message={msg[popup?.type]} />
            </Box>
        </>
    )
}

export default Equipment