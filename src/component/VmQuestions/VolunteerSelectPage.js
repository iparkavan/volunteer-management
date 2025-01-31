import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import individual from "../../assets/icons/individual.svg"
import group from "../../assets/icons/group.svg"
import bg_image from "../../assets/images/role-selection-screen-bg.svg";
import vmMainLogo from "../../assets/icons/vmMainLogo.svg"

export default function VolunteerSelectPage() {
    const navigate = useNavigate()
    const [selectedType, setSelectedType] = useState("");

    const handleSelection = (type) => {
        setSelectedType(type);
    };

    const handleSubmit = () => {
        if (selectedType) {
            navigate(`/${selectedType}`)
        }
    };

    console.log("selectedType?.length ===>", selectedType?.length)
    return (
        <div className="h-full">
            <div className="flex flex-wrap h-full">
                <div className="min-h-screen w-full">
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    // open={userInfo.loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div className="block bg-white shadow-lg h-full" style={{ background: `url(${bg_image}) center / cover ` }}>
                        <div className="g-0 flex justify-center items-center h-full">
                            <div className="px-4 md:px-0 lg:w-4/6 flex justify-center items-center">
                                <div className="w-9/12">
                                    <div className="text-center">
                                        <div className="flex justify-center items-center">
                                            <img src={vmMainLogo} />
                                            <h4 className="mt-1 pl-3 pb-1 text-xl font-semibold logoColor">
                                                MyLogo
                                            </h4>
                                        </div>

                                        <h3 className="mb-6 mt-6 pb-8 text-2xl font-semibold defaultTextColor">
                                            Choose one you could continue as ?
                                        </h3>
                                    </div>

                                    <form>

                                        <center>
                                            <div className="bg-background-primary-light rounded-full px-8 py-2 border border-background-primary-main w-[220px]">
                                                <span className="text-lg font-medium text-gray-800">Volunteer</span>
                                            </div>
                                            <svg width="327" height="65" viewBox="0 0 327 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M159.5 0.5V22M159.5 22H21C9.95431 22 1 30.9543 1 42V65M159.5 22H306C317.046 22 326 30.9543 326 42V65" stroke="#FE634E" />
                                            </svg>
                                        </center>
                                        <div className="pb-8">
                                            <div className="flex justify-center gap-20 ">
                                                <div className="relative mb-6">

                                                    <div className={`border ${selectedType === "individual" ? 'border-background-primary-main' : 'border-gray-200'} rounded-lg p-8 w-48 flex flex-col items-center justify-between cursor-pointer hover:border-[#FE634E] h-[180px]`}
                                                        onClick={() => handleSelection('individual')}>
                                                        <img src={individual} className="h-[60px] w-[60px]" />
                                                        <p className="mt-4 text-base font-medium whitespace-nowrap">Individual</p>
                                                    </div>
                                                </div>

                                                <div className="relative mb-6">
                                                    <div className={`border ${selectedType === "group" ? 'border-background-primary-main' : 'border-gray-200'} rounded-lg p-8 w-48 flex flex-col items-center justify-between cursor-pointer hover:border-[#FE634E] h-[180px]`}
                                                        onClick={() => handleSelection('group')}>
                                                        <img src={group} className="h-[60px] w-[60px]" />
                                                        <p className="mt-4 text-base font-medium whitespace-nowrap">Group/Family</p>

                                                    </div>
                                                </div>

                                            </div>

                                            {/* {error && (
                                                <p className="error" role="alert">
                                                    Please Select type
                                                </p>
                                            )} */}
                                        </div>
                                        <div className="text-center lg:text-left flex justify-center">
                                            <button
                                                type="button"
                                                className={`inline-block rounded px-7 pb-3 pt-3 text-sm font-medium text-white w-44 bg-background-primary-main`}
                                                data-twe-ripple-init
                                                data-twe-ripple-color="light"
                                                onClick={handleSubmit}
                                                disabled={selectedType?.length === 0}
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