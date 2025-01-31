import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'


export default function Loader() {
    const programInfo = useSelector(state => state.userPrograms)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={programInfo.loading}
        >
            {
                programInfo.loading ?
                    <CircularProgress color="inherit" />
                    : null
            }
        </Backdrop>
    )
}
