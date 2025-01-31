import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';

import { listCertificateColumn } from '../../mock'
import DataTable from '../../shared/DataGrid';
import { certificateColor, certificateText } from '../../utils/constant';
import { getCertificates } from '../../services/certificate';

import FeedbackIcon from '../../assets/icons/feedback.svg'
import SearchIcon from '../../assets/icons/SearchColor.svg'
import ActionIcon from '../../assets/images/certficate_action.png'


export default function Certificate() {
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch()
    const { certificates, loading } = useSelector(state => state.certificates)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const listCertificatesColumn = [
        ...listCertificateColumn,
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            id: 2,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full relative'>
                        <span className='w-[80px] flex justify-center h-[30px] px-7'
                            style={{
                                background: certificateColor[params.row.status]?.bg || '', lineHeight: '30px',
                                borderRadius: '3px', width: '110px', height: '34px', color: certificateColor[params.row.status]?.color || '',
                                fontSize: '12px'
                            }}>
                            {certificateText[params.row.status] || ''}
                        </span>
                    </div>
                </>
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            id: 4,
            renderCell: (params) => {
                return <>
                    <div className='cursor-pointer flex items-center h-full' onClick={(e) => handleClick(e, params.row)}>
                        <img src={ActionIcon} alt='ActionIcon' />
                    </div>
                </>
            }
        },
    ]

    const handleCertificateSearch = (value) => {
        
        dispatch(getCertificates({search: value}))
    }

    useEffect(() => {
        dispatch(getCertificates())
    }, [])

    return (
        <div className="certificate px-9 py-9">
            <div className='px-3 py-5' style={{ boxShadow: '4px 4px 25px 0px rgba(0, 0, 0, 0.15)', borderRadius: '10px' }}>
                <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                    <div className='flex w-full gap-5 items-center justify-between'>
                        <p style={{ color: 'rgba(24, 40, 61, 1)', fontWeight: 700 }}>Certificates</p>
                        <img className='cursor-pointer' src={FeedbackIcon} alt={'FeedbackIcon'} />
                    </div>
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className='certificate-content'>
                    <div className='certificate-action'>
                        <div className="relative">
                            <input type="text" className="block w-full p-2 text-sm text-gray-900 border-none"
                                onChange={(e) => handleCertificateSearch(e.target.value)}
                                placeholder="Search Certificate" style={{
                                    background: 'rgba(238, 245, 255, 1)',
                                    height: '55px',
                                    width: '400px',
                                    borderRadius: '6px'
                                }} />
                            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                                <img src={SearchIcon} alt='SearchIcon' />
                            </div>
                        </div>
                    </div>

                    <div className='certificate-table py-9'>
                        <DataTable rows={certificates} columns={listCertificatesColumn} hideCheckbox />
                    </div>
                </div>
            </div>
        </div >
    )
}
