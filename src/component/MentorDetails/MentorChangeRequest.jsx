import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import { Backdrop, CircularProgress, Menu, MenuItem } from "@mui/material";
import DataTable from "../../shared/DataGrid";
import ArrowRightIcon from "../../assets/icons/arrowRightColor.svg";
import MaleIcon from "../../assets/images/male.png";
import {  MentorChangeViewColumns } from "../../mock";
import Cancel from "../../assets/images/cancel-colour1x.png";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import TickCircle from "../../assets/icons/tickCircle.svg";
import CloseCircle from "../../assets/icons/closeCircle.svg";
import ViewIcon from "../../assets/images/view1x.png";

function MentorChangeRequest() {
  const [seletedItem, setSelectedItem] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (e) => {
    console.log(e);
  };

  let col = [
    ...MentorChangeViewColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      id: 4,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleMoreClick(e, params.row)}
            >
              <img src={MoreIcon} alt="MoreIcon" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(e) => {
                  handleClose();
                }}
                className="!text-[12px]"
              >
                <img
                  src={ViewIcon}
                  alt="ViewIcon"
                  field={params.id}
                  className="pr-3 w-[30px]"
                />
                View
              </MenuItem>

              <MenuItem className="!text-[12px]">
                <img
                  src={TickCircle}
                  alt="AcceptIcon"
                  className="pr-3 w-[27px]"
                />
                Approve
              </MenuItem>
              <MenuItem className="!text-[12px]">
                <img
                  src={CloseCircle}
                  alt="CancelIcon"
                  className="pr-3 w-[27px]"
                />
                Reject
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];


  return (
    <div className="px-8 mt-10">
      {" "}
      <div
        style={{
          boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        }}
      >
        <div className="title flex justify-between  py-5 border-b-2 px-5 items-center">
          <div className="flex gap-3 font-[600] text-[14px]">
            <p style={{ color: "rgba(89, 117, 162, 1)", fontWeight: 500 }}>
            Program Manager Change Request
            </p>
            <img src={ArrowRightIcon} alt="ArrowRightIcon" />
            <p style={{  fontWeight: 500 }}>
              View Program Manager Profile
            </p>
          </div>
          <div className="flex gap-5">
            <div className="cursor-pointer">
              <img src={Cancel} alt="link" className="w-[20px] h[10px]" />
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-8 justify-center m-8" style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '6px' }}>
            <div
              className="user-image w-[200px] px-5 flex justify-center items-center h-[180px]"
            >
              <img
                style={{
                  borderRadius: "50%",
                  height: "137px",
                  width: "90%",
                  objectFit: "cover",
                }}
                src={MaleIcon}
                alt="MaleIcon"
              />
            </div>
            <div>
              <div className="text-[14px] py-3">
                Nolan (Software
                Developer)
              </div>
              <p className="text-[12px] py-3">
               <b className="text-red-500">Reason:</b> The purpose of lorem ipsum is to create a natural looking block
                of text (sentence, paragraph, page, etc.) that doesn't distract
                from the layout. A practice not without controversy
              </p>
            </div>
          </div>
        </div>
        <div
        className="m-8"
          style={{
            boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            
          }}
        >
          <div className="title flex justify-between py-3 border-b-2 px-4 items-center">
            <div className="flex font-[600] text-black">Current Programs</div>
            <div className="flex gap-5">
              <div className="relative">
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 text-sm text-gray-900 border-none"
                  placeholder="Search here..."
                  style={{
                    border: '1px solid #FE634E',
                    borderRadius: "1px",
                    height: "45px",
                    width: "280px",
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <img src={SearchIcon} alt="SearchIcon" />
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-7 program-info">
            <Backdrop sx={{ zIndex: (theme) => 999999999 }} open={false}>
              <CircularProgress color="inherit" />
            </Backdrop>

            <DataTable
              rows={[]}
              columns={col}
              hideFooter
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorChangeRequest;
