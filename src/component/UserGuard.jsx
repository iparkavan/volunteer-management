import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function UserGuard() {
    const userInfo = useSelector(state => state.userInfo)
    if (userInfo.data.role === 'fresher') {
        return <Navigate to="/login-type" />
    }
    if (userInfo.data.role !== 'fresher') {
        if (userInfo.data.is_registered) { return <Navigate to="/dashboard" /> }
        return <Navigate to="/questions" />
    }

    return <Outlet />
}
