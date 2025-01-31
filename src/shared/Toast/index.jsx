import React from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ToastNotification({ openToaster, message, toastType = 'success', handleClose = undefined }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={true}
            autoHideDuration={2000}
           >
            <Alert
                severity={toastType}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
