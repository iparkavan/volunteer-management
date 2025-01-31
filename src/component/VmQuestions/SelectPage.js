import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import ProgramManager from "../../assets/icons/ProgramManager.svg"
import vmMainLogo from "../../assets/icons/vmMainLogo.svg"
import volunteer from "../../assets/icons/volunteer.svg"

export default function SelectPage() {
    const navigate = useNavigate()
    return (
        <div className="h-full pt-20">
            <div className="flex flex-wrap h-full">
                <div className="w-full">
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    // open={userInfo.loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div className="block bg-white h-full">
                        <div className="g-0 flex justify-center items-center h-full">
                            <div className="px-4 md:px-0 lg:w-4/12 flex justify-center items-center">
                                <div className="w-9/12">
                                    <div className="text-center">
                                        <div className="flex justify-center items-center">
                                            <img src={vmMainLogo} /> 

                                            <h4 className="mt-1 pl-3 pb-1 text-xl font-extrabold" style={{ color: '#FE634E' }}>
                                                Logo
                                            </h4>
                                        </div>

                                        <h3 className="mb-6 mt-6 pb-8 text-xl font-semibold defaultTextColor">
                                            Choose one you could continue as ?
                                        </h3>
                                        <div className="flex justify-center gap-8 pb-8">
                                            <span
                                                onClick={() => navigate("/questions")}>
                                                <div className="border border-gray-200 rounded-lg p-8 w-48 flex flex-col items-center cursor-pointer hover:border-[#FE634E]">
                                                    <img src={ProgramManager} />
                                                    <p className="mt-4 text-base font-medium">Program Manager</p>
                                                </div>
                                            </span>
                                            <span onClick={() => {
                                                navigate("/volunteerSelectPage")
                                            }}>
                                                <div className="border border-gray-200 rounded-lg p-8 w-48 flex flex-col items-center cursor-pointer hover:border-[#FE634E]">
                                                    <img src={volunteer} />
                                                    <p className="mt-4 text-base font-medium">Volunteer</p>

                                                </div>
                                            </span>
                                        </div>

                                    </div>

                                    <form>

                                        <div className="text-center lg:text-left flex justify-center">
                                            <button
                                                type="button"
                                                className="inline-block rounded px-7 pb-3 pt-3 text-sm font-medium text-white w-44"
                                                data-twe-ripple-init
                                                data-twe-ripple-color="light"
                                                style={{
                                                    background:
                                                        "#FE634E",
                                                }}
                                            // onClick={handleSubmit}
                                            >
                                                Let's get started
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}