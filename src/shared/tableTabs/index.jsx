import { Box, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'

export const TableTabs = ({
    tabsList = [],
    selectedTab = "",
    handleTab = () => false
}) => {
    return (
        <>
            <Box sx={{ borderBottom: "1px solid #D9E4F2" }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTab}
                    sx={{
                        "& .MuiTabs-indicator": {
                            height: "5px",
                            background: "#FE634E",
                            borderRadius: "12px 12px 0px 0px"
                        }
                    }}
                >
                    {
                        tabsList?.map((e) => {
                            return (
                                <Tab value={e?.key} label={
                                    <Typography className={`!text-[14px] text-[${selectedTab === e.key ? '#353F4F' : '#353F4F'}] 
                                                    capitalize -pb-[8px]`} sx={{ fontWeight: selectedTab === e.key ? 600 : 400 }}>{e?.name}</Typography>
                                } />
                            )
                        })
                    }
                </Tabs>
            </Box>
        </>
    )
}