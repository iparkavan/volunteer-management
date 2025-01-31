import React, { useState, useEffect, useCallback } from "react";
import { Backdrop, CircularProgress, Menu, MenuItem } from "@mui/material";
import SearchIcon from "../../../assets/icons/search.svg";
import { Button } from "../../../shared";
import DataTable from "../../../shared/DataGrid";
import { useNavigate } from "react-router-dom";
import { memberStatusColor } from "../../../utils/constant";
import MoreIcon from "../../../assets/icons/moreIcon.svg";
import TickCircleIcon from "../../../assets/icons/tickCircle.svg";
import CloseCircleIcon from "../../../assets/icons/closeCircle.svg";
import ViewIcon from "../../../assets/images/view1x.png";
import DeleteIcon from "../../../assets/icons/Delete.svg";
import protectedApi from "../../../services/api";
import PopupMenu from "../../PopupMenu";
import Swal from "sweetalert2"; // Import SweetAlert2
import MuiModal from "../../../shared/Modal";

function SuperMembers() {
  const [taskSuccess, setTaskSuccess] = useState(false);
  const [seletedItem, setSelectedItem] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [supermemberData, setSupermemberData] = useState([]); // Store the fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const fetchMembers = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await protectedApi.get("/members-list?role=admin");
      setSupermemberData(response.data);
    } catch (error) {
      console.error("Error fetching member data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetchMembers();
  }, []); 

  const handleDelete = useCallback(
    async (userId) => {
      handleClose();
      const actionPerformed = "Delete";
      const isActive = true; 

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to ${actionPerformed} this user?`,
        icon: isActive ? "error" : "info",
        showCancelButton: true,
        confirmButtonColor: isActive ? "#d33" : "#5BC4BF",
        cancelButtonColor: "#D3D3D3",
        confirmButtonText: actionPerformed,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Perform the API call to delete the user
            await protectedApi.delete(`/user/delete/?user_id=${userId}`);

            // After successful deletion, remove the user from the list
            setSupermemberData((prevData) =>
              prevData.filter((item) => item.id !== userId)
            );

            Swal.fire("Deleted!", "The user has been deleted.", "success");
          } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire("Error", "Failed to delete the user.", "error");
          }
        }
      });
    },
    [supermemberData]
  );

   const handleToggleStatus = async (userId, currentStatus) => {
    handleClose();
    const action = currentStatus ? "Deactivate" : "Activate";
    const status = currentStatus ? false : true; // Toggle status (false = inactive, true = active)

    Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      text: `Do you want to ${action.toLowerCase()} the user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5BC4BF",
      cancelButtonColor: "#D3D3D3",
      confirmButtonText: `${action}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await protectedApi.put(`/user/update/?user_id=${userId}`, {
            is_active: status, 
          });

          Swal.fire(
            `${action}d!`,
            `The user has been ${action.toLowerCase()}d successfully.`,
            "success"
          );

          setSupermemberData((prevData) =>
            prevData.map((item) =>
              item.id === userId ? { ...item, is_active: status } : item
            )
          );
        } catch (error) {
          console.error("Error updating user status:", error);
          Swal.fire("Error", "Failed to update the user status.", "error");
        }
      }
    });
  };
  // Filter the members based on search query
  const filteredMembers = supermemberData.filter((member) =>
    (member.users_name || "").toLowerCase().includes(searchQuery) ||
  (member.email || "").toLowerCase().includes(searchQuery) 
  );
  const supermemberColumn = [
    // {
    //   field: "id",
    //   headerName: "Member ID",
    //   flex: 1,
    //   id: 0,
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    // },
    {
      field: "users_name",
      headerName: "User Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "categories",
      headerName: "Category",
      flex: 1,
      minWidth: 150,
      align: "center", // Ensures the header content is centered
      headerAlign: "center", // Centering the header text
      renderCell: (params) => {
        // const { value, row } = params;
        const categories = params?.row?.categories || []; // Safe check for categories array
        const categoryNames = categories.map((category) => category.name); // Get just the category names

        // If there are multiple categories, show the first one and the remaining count
        const firstCategory = categoryNames[0];
        const remainingCategoriesCount =
          categoryNames.length > 1 ? categoryNames.length - 1 : 0;

        return (
          <>
            {categories.length > 0 && (
              <PopupMenu
                menuOption={categoryNames} // Pass only the category names to the menuOption
                disablePopupMenu={categoryNames.length <= 1} // Disable popup if there's 1 or less category
              >
                <div className="flex justify-center items-center px-3 py-1  text-[13px] font-medium leading-5 capitalize cursor-pointer w-full">
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "clip",
                      textAlign: "center", // Ensure text is centered
                    }}
                  >
                    {/* Render first category and append +X if there are more */}
                    {firstCategory}
                    {remainingCategoriesCount > 0 && (
                      <span className="ml-2 text-[10px] border border-[#18283d] rounded-full p-[3px]">
                        +{remainingCategoriesCount}
                      </span>
                    )}
                  </p>
                </div>
              </PopupMenu>
            )}
          </>
        );
      },
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email Address",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "role",
      headerName: "Designation",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="!w-[100px] flex justify-center !h-[30px] px-7"
                style={{
                  background: params.row.is_active
                    ? memberStatusColor.accept.bgColor
                    : memberStatusColor.cancel.bgColor,
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: params.row.is_active ? "110px" : "92px",
                  height: "34px",
                  color: params.row.is_active
                    ? memberStatusColor.accept?.color
                    : memberStatusColor.cancel.color,
                  fontSize: "12px",
                }}
              >
                {params.row.is_active ? "Active" : "Deactive"}{" "}
              </span>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      id: 1,
      align: "center",
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleMoreClick(e, params.row)}
            >
              <img src={MoreIcon} className="pl-4" alt="MoreIcon" />
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
                className="!text-[12px]"
                onClick={() => {
                  handleClose();
                  // navigate(`/mentor-details/${params.row.id}`); // Navigate to details page
                  navigate(`/my-profile`); // Navigate to details page
                }}
              >
                <img src={ViewIcon} alt="ViewIcon" className="pr-3 w-[30px]" />
                View
              </MenuItem>

              {/* Inactive / Active Toggle */}
              <MenuItem
                className="!text-[12px]"
                 onClick={() =>
                  
                  handleToggleStatus(seletedItem.id, seletedItem.is_active)
                }
              >
                <img
                  src={seletedItem.is_active ? CloseCircleIcon : TickCircleIcon} // Toggle icon based on is_active
                  alt="StatusIcon"
                  className="pr-3 w-[27px]"
                />
                {seletedItem.is_active ? "Inactive" : "Active"}{" "}
                {/* Toggle label based on is_active */}
              </MenuItem>

              {/* Delete Option */}
              <MenuItem
                className="!text-[12px]"
                onClick={() => handleDelete(seletedItem.id)} // Call handleDelete on click
              >
                <img
                  src={DeleteIcon}
                  alt="DeleteIcon"
                  className="pr-3 w-[27px]"
                />
                Delete
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="px-8 mt-10 ">
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading} // Show loading spinner while data is being fetched
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <div
          className="px-3 py-5"
          style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="flex justify-between px-5 pb-4 mb-8 items-center border-b-2">
            <div className="flex gap-5 items-center text-[18px] font-semibold">
              <p>Supervisor List</p>
            </div>

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
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <img src={SearchIcon} alt="SearchIcon" />
                </div>
              </div>

              <Button
                btnName="Add Supervisor"
                onClick={() => navigate("/super-members/add")}
              />
            </div>
          </div>

          <div>
            <div className="px-6 py-70">
              <DataTable
                hideCheckbox
                rows={filteredMembers} // Use filtered data
                columns={supermemberColumn}
              />
            </div>
          </div>
        </div>
      </div>
      <MuiModal
        modalOpen={taskSuccess}
        modalClose={() => setTaskSuccess(false)}
        noheader
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-5 py-10 px-20 mt-20 mb-20"
            style={{
              // background:
              //   "linear-gradient(101.69deg, #1D5BBF -94.42%, #00AEBD 107.97%)",
              borderRadius: "10px",
            }}
          >
            {/* <img src={SuccessTik} alt="SuccessTik" /> */}
            <p className="text-white text-[12px]">
              New Org Supervisor successfully created!
            </p>
          </div>
        </div>
      </MuiModal>
    </div>
  );
}

export default SuperMembers;
