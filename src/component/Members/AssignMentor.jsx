import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search.svg";
import { Backdrop, CircularProgress, Menu, MenuItem } from "@mui/material";
import DataTable from "../../shared/DataGrid";
import { assignMentorColumns } from "../../mock";
import { Button } from "../../shared";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import ViewIcon from "../../assets/images/view1x.png";
function AssignMentor() {
  const [activeTableDetails, setActiveTableDetails] = useState({
    column: [],
    data: [],
  });
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
    ...assignMentorColumns,
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
            <div className="cursor-pointer flex items-center h-full" onClick={(e) => handleMoreClick(e, params.row)}>
              <img src={MoreIcon} alt="MoreIcon" />
            </div>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={(e) => { handleClose()}} className="!text-[12px]" >
                <img src={ViewIcon} alt="ViewIcon" className="pr-3 w-[30px]" />
                View
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
      <div style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)", borderRadius: "10px",}}>
        <div className="title flex justify-between py-3 border-b-2 px-4 items-center">
          <div className="flex font-[600] text-black">
            Assign To Another Program Manager
          </div>
          <div className="flex gap-5">
            <div className="relative">
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 text-sm text-gray-900 border-none"
                placeholder="Search here..."
                style={{ border: "1px solid #FE634E", borderRadius: "1px", height: "45px", width: "280px"}}
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
          <DataTable rows={[]} columns={col} hideFooter />
          <div className="flex justify-center pt-6">
            <div className="flex gap-6 justify-center align-middle">
              <Button btnName="Cancel" btnCategory="secondary" />
              <Button btnType="button" btnCls="w-[110px]" btnName={"Submit"} btnCategory="primary"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignMentor;
