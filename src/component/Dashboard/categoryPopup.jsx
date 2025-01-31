import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '../../assets/icons/search.svg';
import { Button } from '../../shared';

export const CategoryPopup = ({
    selectedCategory = [],
    setSelectedCategory = () => false,
    category = {},
    handleGetCategory = () => false,
    handleUpdateGategory = () => false,
    handleSelectCategory = () => false
}) => {

    React.useEffect(() => {
        handleGetCategory()
    }, [])

    const handleUpdate = (type = "") => {
        handleUpdateGategory(type)
    }


    return (
        <Box mt={2}>
            <div className='flex justify-between px-3 mb-4'>
                <div className="relative w-full">
                    <input type="text" id="search-navbar"
                        className="block w-full p-2 text-sm text-gray-900 border-none bg-[#EEF5FF]"
                        placeholder="Search here..." style={{
                            border: '1px solid #FE634E',
                            borderRadius: '50px',
                            height: '60px',
                            width: '100%'
                        }} onChange={(e) => handleGetCategory(e.target.value)} />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <img src={SearchIcon} alt='SearchIcon' />
                    </div>
                </div>
            </div>


            <Box p={"14px 20px"}>
                <Box style={{
                    height: "200px",
                    overflow: "auto"
                }}>
                    <Grid container spacing={2}>
                        {
                            category?.map((e) => {
                                return (
                                    <Grid item xs={3}>
                                        <Box className={`border border-[${selectedCategory?.includes(e?.id) ? '#1D5BBF' : '#DBE0E5'}] rounded-[30px] flex items-center justify-center cursor-pointer bg-[${selectedCategory?.includes(e?.id) && '#DFEDFF'}]`}
                                            onClick={() => handleSelectCategory(e?.id)}>
                                            <Typography className='text-[14px] text-[#000000] p-[12px]'>{e?.name}</Typography>
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>

            </Box>

            <Divider></Divider>
            <Box className={"flex items-center justify-center"} p={"20px 0px 12px 0px"}>
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Button
                        btnName='Skip'
                        btnCategory='secondary'
                        btnCls="!border !border-[#18283D] !text-[#18283D] w-[140px]"
                        onClick={() => handleUpdate("skip")}
                    />
                    <Button
                        btnType='button'
                        btnCls='w-[140px]'
                        btnName={'Continue'}
                        btnCategory='primary'
                        disabled={!selectedCategory?.length>0}
                        onClick={() => handleUpdate("update")}
                    />
                </Stack>
            </Box>

        </Box>
    )
}