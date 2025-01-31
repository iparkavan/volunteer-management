import React from 'react'
import TooltipComponent from '@mui/material/Tooltip';

export default function Tooltip({children, title}) {
    return (
        <TooltipComponent title={title}>
            {children}
        </TooltipComponent>
    )
}
