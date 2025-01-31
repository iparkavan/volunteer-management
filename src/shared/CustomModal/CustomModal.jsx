import { Box, Dialog } from '@mui/material'
import React from 'react'

export const CustomModal = ({
    open = false,
    handleClose = () => false,
    content = "",
    width = "sm"
}) => {
    const widthList = {
        sm: "400px",
        md: "600px",
        lg: "800px"
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth={false} 
            sx={{
                "& .MuiPaper-root": {
                    width: "100%",
                    borderRadius: "10px",
                    maxWidth: widthList[width],
                },
            }}
        >
            <Box sx={{ background: "#fff", borderRadius: "10px" }}>
                {content}
            </Box>
        </Dialog>
    )
}