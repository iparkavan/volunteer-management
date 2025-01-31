import React from 'react'
import SearchIconVm from "../../assets/icons/searchIconVM.svg"

export const SearchBoxVM = ({
    placeholder = "Search here",
    handleSearch = () => false,
    value = "",
    height = "55px",
    width = "345px"
}) => {
    return (
        <div className="relative">
            <input type="text" id="search-navbar"
                className="block w-full p-2 text-sm text-gray-900 border border-[#353F4F] rounded-[3px]"
                placeholder={placeholder} style={{
                    height: height ?? '55px',
                    width: width ?? '345px'
                }}
                value={value}
                onChange={(e) => handleSearch(e.target.value)} />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <img src={SearchIconVm} alt='SearchIcon' />
            </div>
        </div>
    )
}