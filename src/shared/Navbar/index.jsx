import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import NotificationIcon from "../../assets/icons/notificationIconNew.svg";
import SettingsIcon from "../../assets/images/setting1x.png";
import UserImage from "../../assets/icons/user-icon.svg";
import SearchIcon from "../../assets/images/search1x.png";
import HelpIcon from "../../assets/icons/Help.svg";
import ProfileIcon from "../../assets/icons/Profile.svg";
import ExportIcon from "../../assets/icons/export_icon.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";
import LogoutColorIcon from "../../assets/icons/Logoutpop.svg";
import AddTicketIcon from "../../assets/icons/add-ticket-icon.svg";
import {
  Avatar,
  Backdrop,
  Badge,
  ClickAwayListener,
  Stack,
  Tooltip,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { Button } from "../Button";
// import AppLogo from "public/VM_app_logo.svg";
import { OverlayPanel } from "primereact/overlaypanel";
import Notification from "../../component/Notification";
import { userActivities } from "../../services/activities";
import api from "../../services/api";
import { getUserProfile } from "../../services/profile";
import SettingIcon from "../../assets/icons/settingIcon.svg";
import { styled } from "@mui/material/styles";
import CategoryIcon from "../../assets/icons/category.svg";
import PermissionIcon from "../../assets/icons/permissionIcon.svg";
import { user } from "../../utils/constant";
import NavHead from "./NavHead";

const AppLogo = `${process.env.PUBLIC_URL}/VM_app_logo.svg`;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fff",
    maxWidth: 220,
    border: "1px solid #1D5BBF80",
    padding: "16px",
  },
}));

export const Navbar = () => {
  const navigate = useNavigate();
  const searchBar = useRef(null);
  const op = useRef(null);
  const [isLogout, setIsLogout] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const { activity } = useSelector((state) => state.activity);
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { profile } = useSelector((state) => state.profileInfo);
  const [searchProps, setSearchProps] = useState({
    searchType: "program",
    search: "",
    dropOpen: false,
    searchData: [],
    current: null,
  });
  const open = Boolean(anchorEl);
  const { pathname } = location;
  const role = userInfo.data.role || "";

  const filterBtn = [
    {
      key: "program",
      name: "Program",
    },
    {
      key: "mentor",
      name: "Program Managers",
    },
    {
      key: "mentee",
      name: "Volunteers",
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch({ type: "logout" });
    navigate("/login");
  };

  const handleProfile = () => {
    handleClose();
    if (
      userInfo?.data?.role === "super_admin" &&
      userInfo?.data?.is_registered === true
    ) {
      navigate("/my-profile-admin");
    } else {
      navigate("/profile");
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.display = "block";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.display = "none";
  }

  const handleLeftSidebar = () => {
    const leftElement = document.getElementById("leftSideNav");
    const leftBar = document.getElementsByClassName("left-bar")[0];
    leftElement.style.width = "300px";
    leftElement.style.display = "block";
    document.getElementById("left-content").appendChild(leftBar);
  };

  function closeLeftNav() {
    document.getElementById("leftSideNav").style.width = "0";
    document.getElementById("leftSideNav").style.display = "none";
  }

  const handleCloseNotification = () => {
    document.getElementsByClassName("notification-image")[0].click();
  };

  const handleGlobalChange = async (value) => {
    const getSearchData = await api.get(
      `globalsearch?keyword=${searchProps.searchType}&search=${value}`
    );
    if (getSearchData.status === 200 && getSearchData.data) {
      setSearchProps({ ...searchProps, searchData: getSearchData.data });
    }
  };

  const handleSelectFilter = (key) => {
    setSearchProps({ ...searchProps, searchType: key, searchData: [] });
  };

  const documentUpload =
    window.location.href.includes("mentor-doc-upload") ||
    window.location.href.includes("mentee-doc-upload");

  const questionUpload = window.location.href.includes("questions");

  const handleOpenSearchBar = (e) => {
    if (!document.getElementById("search_overlay_panel")) {
      searchBar.current.toggle(e);
    }
    setSearchProps({
      ...searchProps,
      searchData: [],
      dropOpen: true,
      current: e,
    });
  };

  const searchNavigation = (url) => {
    searchBar.current.toggle(searchProps.current);
    document.getElementById("search-navbar").value = "";
    setSearchProps({
      ...searchProps,
      searchData: [],
      searchType: "program",
      current: null,
    });
    navigate(url);
  };

  const handleLogoClick = () => {
    if (
      !window.location.href.includes("mentee-doc-upload") &&
      !window.location.href.includes("questions") &&
      !window.location.href.includes("mentor-doc-upload")
    ) {
      if (role === "mentee" && !userInfo?.data?.is_registered) {
        navigate("/programs");
      } else if (
        userInfo?.data?.role === "super_admin" &&
        userInfo?.data?.is_registered === true
      ) {
      } else {
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    if (!Object.keys(profile).length) {
      dispatch(getUserProfile());
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(userActivities({ limit: 10 }));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    dispatch(userActivities({ limit: 10 }));
  }, []);

  // console.log(userInfo.data.role);

  const [openSetting, setOpenSetting] = React.useState(false);

  const handleTooltipClose = () => {
    setOpenSetting(false);
  };

  const handleTooltipOpen = () => {
    setOpenSetting(true);
  };

  return (
    <div
      className="navbar-content px-4"
      style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLogout}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <img src={LogoutColorIcon} alt="LogoutColorIcon" />
          <span style={{ color: "#232323", fontWeight: 600, fontSize: "24px" }}>
            Log out
          </span>

          <div className="py-5">
            <p
              style={{
                color: "rgba(24, 40, 61, 1)",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Are you sure you want to log out ?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center align-middle">
              <Button
                btnName="Cancel"
                btnCategory="secondary"
                onClick={() => setIsLogout(false)}
              />
              <Button
                btnType="button"
                btnCls="w-[110px]"
                style={{ backgroundColor: "#FE634E" }}
                btnName={"Logout"}
                btnCategory="primary"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      {!questionUpload && !documentUpload && (
        <nav className="bg-white border-gray-200">
          <div className="flex justify-between">
            <div className="contain gap-24 flex justify-between w-3/12 p-4">
              {/* <div
                className="site-logo cursor-pointer flex items-center space-x-3 rtl:space-x-reverse"
                onClick={handleLogoClick}
              >
                <Avatar
                  variant="square"
                  sx={{ width: 50, height: 50 }}
                  src={AppLogo}
                  alt={"logo"}
                />
              </div> */}
              <NavHead
                role={userInfo?.data?.role}
                handleLogoClick={handleLogoClick}
              />
              {userInfo?.data?.role === user.super_admin && (
                <div>
                  <ul
                    // className='flex items-center justify-between h-full'
                    style={{ gap: "40px" }}
                    className={`flex flex-col ${
                      !userInfo?.data?.is_registered
                        ? "ml-[150px]"
                        : "justify-center"
                    } items-center p-4 md:p-0 mt-4 h-full font-medium border border-gray-100
                    rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0`}
                  >
                    {/* {userInfo?.data?.is_registered && (
                      <li
                        className={`transition-all duration-300 ${
                          pathname === "/dashboard"
                            ? "dashboard-menu-active"
                            : ""
                        }`}
                      >
                        <span
                          onClick={() => navigate("/dashboard")}
                          className="block py-2 px-3 rounded md:p-0 cursor-pointer"
                          aria-current="page"
                        >
                          Dashboard
                        </span>
                      </li>
                    )}
                    {userInfo?.data?.is_registered && (
                      <li
                        className={`transition-all duration-300 ${
                          pathname === "/members" ? "dashboard-menu-active" : ""
                        }`}
                      >
                        <span
                          onClick={() => navigate("/members")}
                          className="block py-2 px-3 rounded md:p-0 cursor-pointer"
                          aria-current="page"
                        >
                          Members
                        </span>
                      </li>
                    )} */}

                    {userInfo?.data?.is_registered && (
                      <li
                        className={`transition-all duration-300 ${
                          pathname === "/tickets" ? "dashboard-menu-active" : ""
                        }`}
                      >
                        <span
                          onClick={() => navigate("/tickets")}
                          className="block py-2 px-3 rounded md:p-0 cursor-pointer"
                          aria-current="page"
                        >
                          Tickets
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
              <div className="navbar-mobile-menu" onClick={handleLeftSidebar}>
                <div className="user-image">
                  <img
                    className="rounded-3xl object-cover h-10 w-10 cursor-pointer"
                    src={UserImage}
                    alt="User logo1"
                  />
                </div>
              </div>
              {/* {
                            role === 'mentee' &&

                            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                                    <li>
                                        <a href="/" onClick={undefined} className="block py-2 px-3 rounded md:p-0" aria-current="page">Learn</a>
                                    </li>
                                    <li>
                                        <a href="/" className="block py-2 px-3 rounded md:hover:bg-transparent md:p-0">Courses</a>
                                    </li>
                                    <li>
                                        <a href="/" className="block py-2 px-3 rounded md:hover:bg-transparent md:p-0">Survey</a>
                                    </li>
                                </ul>
                            </div>
                        } */}
            </div>

            <div
              className="flex items-center justify-center p-4 gap-4"
              // className={`navbar-icons flex items-center ${
              //   userInfo?.data?.is_registered && !documentUpload
              //     ? 'justify-between'
              //     : 'justify-end'
              // } ${getWindowDimensions().width <= 1536 ? 'w-3/6' : 'w-2/5'} p-4`}
            >
              {userInfo?.data?.is_registered && !documentUpload && (
                <div className="relative mt-1 search-container">
                  {userInfo?.data?.role === "super_admin" ? (
                    <div>
                      <input
                        type="text"
                        id="search-navbar"
                        className="block w-full p-2 text-sm text-gray-900 border-none rounded-lg"
                        placeholder="Search..."
                        style={{
                          backgroundColor: "#FFF8F2",
                          width: "430px",
                          height: "50px",
                          borderRadius: "3px",
                        }}
                        onClick={(e) => handleOpenSearchBar(e)}
                        onChange={(e) => handleGlobalChange(e.target.value)}
                      />
                      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <img src={SearchIcon} alt="SearchIcon" />
                      </div>

                      <OverlayPanel
                        ref={searchBar}
                        id="search_overlay_panel"
                        style={{ width: "430px", top: "63px !important" }}
                        className="notification-container searchbar-container"
                        onClose={() => console.log("Close")}
                      >
                        <div className="flex gap-4">
                          {filterBtn.map((fBtn) => (
                            <button
                              key={fBtn.key}
                              onClick={() => handleSelectFilter(fBtn.key)}
                              className={`${
                                searchProps.searchType === fBtn.key
                                  ? "active-info"
                                  : ""
                              }`}
                            >
                              {fBtn.name}
                            </button>
                          ))}
                        </div>
                        <div>
                          <ul>
                            {searchProps.searchData.map((sData, i) => {
                              let name =
                                searchProps.searchType === "program"
                                  ? sData.program_name
                                  : sData.name;
                              let url =
                                searchProps.searchType === "program"
                                  ? `program-details/${sData.id}`
                                  : `mentor-details/${sData.id}`;
                              return (
                                <li
                                  key={i}
                                  className="cursor-pointer"
                                  onClick={() => searchNavigation(url)}
                                >
                                  {name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </OverlayPanel>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        id="search-navbar"
                        className="block w-full p-2 text-sm text-gray-900 border-none rounded-lg"
                        placeholder="Search..."
                        style={{
                          backgroundColor: "#FFF8F2",
                          width: "430px",
                          height: "50px",
                          borderRadius: "3px",
                        }}
                        onClick={(e) => handleOpenSearchBar(e)}
                        onChange={(e) => handleGlobalChange(e.target.value)}
                      />
                      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <img src={SearchIcon} alt="SearchIcon" />
                      </div>

                      <OverlayPanel
                        ref={searchBar}
                        id="search_overlay_panel"
                        style={{ width: "430px", top: "63px !important" }}
                        className="notification-container searchbar-container"
                        onClose={() => console.log("Close")}
                      >
                        <div className="flex gap-4">
                          {filterBtn.map((fBtn) => (
                            <button
                              key={fBtn.key}
                              onClick={() => handleSelectFilter(fBtn.key)}
                              className={`${
                                searchProps.searchType === fBtn.key
                                  ? "active-info"
                                  : ""
                              }`}
                            >
                              {fBtn.name}
                            </button>
                          ))}
                        </div>
                        <div>
                          <ul>
                            {searchProps.searchData.map((sData, i) => {
                              let name =
                                searchProps.searchType === "program"
                                  ? sData.program_name
                                  : sData.name;
                              let url =
                                searchProps.searchType === "program"
                                  ? `program-details/${sData.id}`
                                  : `mentor-details/${sData.id}`;
                              return (
                                <li
                                  key={i}
                                  className="cursor-pointer"
                                  onClick={() => searchNavigation(url)}
                                >
                                  {name}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </OverlayPanel>
                    </div>
                  )}
                </div>
              )}

              {/* <img className='search-icon hidden' src={SearchIcon} alt="SearchIcon" /> */}
              {userInfo?.data?.is_registered && !documentUpload && (
                <div className="relative" onClick={(e) => op.current.toggle(e)}>
                  {userInfo?.data?.role === "super_admin" ? null : (
                    <div className="notitification-group">
                      <div className="bg-[#FFF8F2] rounded-[3px] h-[40px] w-[40px] flex items-center justify-center">
                        {activity?.notifications?.length > 0 ? (
                          <Badge
                            color="error"
                            badgeContent={activity.notifications_count}
                            variant="standard"
                            sx={{ cursor: "pointer" }}
                            max={999}
                          >
                            <img
                              src={NotificationIcon}
                              className="cursor-pointer notification-image"
                              alt="NotificationIcon"
                            />
                          </Badge>
                        ) : (
                          <img
                            src={NotificationIcon}
                            className="cursor-pointer notification-image"
                            alt="NotificationIcon"
                          />
                        )}
                      </div>
                      {/* {activity.length > 0 ? (
                        <span
                          style={{
                            position: 'absolute',
                            top: '1px',
                            right: '-6px',
                            background: '#f00',
                            padding: '2px 4px',
                            borderRadius: '50%',
                            fontSize: '11px',
                            color: '#fff',
                            fontWeight: 'bold',
                            border: '3px solid #fff',
                            cursor: 'pointer',
                          }}
                        >
                          {activity.length}
                        </span>
                      ) : null} */}

                      <OverlayPanel
                        ref={op}
                        id="overlay_panel"
                        style={{ width: "450px" }}
                        className="notification-container"
                      >
                        <Notification handleClose={handleCloseNotification} />
                      </OverlayPanel>
                    </div>
                  )}
                </div>
              )}

              {userInfo?.data.role === user.super_admin && (
                <div className="flex items-center relative">
                  <img className="absolute ml-4" src={AddTicketIcon} alt="" />
                  <Button
                    btnType="button"
                    btnCls="w-[160px] h-12 pl-12"
                    btnName={"Add Ticket"}
                    btnCategory="primary"
                    onClick={() => navigate("/add-new-ticket")}
                  />
                </div>
              )}

              {/* Setting Start */}
              {role === "admin" && (
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <div>
                    <HtmlTooltip
                      onClose={handleTooltipClose}
                      open={openSetting}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={
                        <React.Fragment>
                          <Stack spacing={3}>
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              spacing={"12px"}
                              className="cursor-pointer"
                              onClick={() => {
                                handleTooltipClose();
                              }}
                            >
                              <img src={PermissionIcon} />
                              <Typography className="text-[#18283D] !text-[14px]">
                                Permission
                              </Typography>
                            </Stack>

                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              spacing={"12px"}
                              className="cursor-pointer"
                              onClick={() => {
                                navigate("/category");
                                handleTooltipClose();
                              }}
                            >
                              <img src={CategoryIcon} />
                              <Typography className="text-[#18283D] !text-[14px]">
                                Category
                              </Typography>
                            </Stack>

                            {/* <Stack
                              direction={'row'}
                              alignItems={'center'}
                              spacing={'12px'}
                              className='cursor-pointer'
                              onClick={() => {
                                handleRedirectDocuSign();
                              }}
                            >
                              <img src={PermissionIcon} />
                              <Typography className='text-[#18283D] !text-[14px]'>
                                Docu-Sign
                              </Typography>
                            </Stack> */}
                          </Stack>
                        </React.Fragment>
                      }
                    >
                      <img
                        src={SettingIcon}
                        onClick={handleTooltipOpen}
                        className="cursor-pointer"
                      />
                    </HtmlTooltip>
                  </div>
                </ClickAwayListener>
              )}

              {/* Setting end */}

              <span
                className="more-icon-menu cursor-pointer hidden text-[25px]"
                onClick={() => openNav()}
              >
                &#9776;
              </span>

              <div className="reletive action-menu">
                <img
                  className="rounded-3xl object-cover h-8 w-8 cursor-pointer"
                  src={profile?.image || UserImage}
                  alt="User Icon"
                  onClick={handleClick}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {userInfo?.data?.is_registered && !documentUpload && (
                    <div>
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          if (
                            userInfo?.data?.role === "super_admin" &&
                            userInfo?.data?.is_registered === true
                          ) {
                            navigate("/help-admin");
                          } else {
                            navigate("/help");
                          }
                        }}
                      >
                        <img
                          src={HelpIcon}
                          alt="HelpIcon"
                          className="pr-3 w-[30px]"
                        />
                        Help
                      </MenuItem>

                      <MenuItem onClick={handleProfile}>
                        <img
                          src={ProfileIcon}
                          alt="ProfileIcon"
                          className="pr-3 w-[30px]"
                        />
                        Profile
                      </MenuItem>                      
                    </div>
                  )}

                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsLogout(true);
                    }}
                  >
                    <img
                      src={LogoutIcon}
                      alt="LogoutIcon"
                      className="pr-3 w-[30px]"
                    />
                    Log out
                  </MenuItem>
                </Menu>
              </div>

              <div id="mySidenav" className="sub-menu sidenav hidden">
                <a
                  href="javascript:void(0)"
                  className="closebtn"
                  onClick={() => closeNav()}
                >
                  &times;
                </a>

                <ul className="flex flex-col gap-2  p-4 md:p-0 mt-4 font-medium">
                  <li
                    className={`${
                      pathname === "/dashboard" ? "dashboard-menu-active" : ""
                    }`}
                  >
                    <span
                      onClick={() => navigate("/dashboard")}
                      className="block py-2 text-black px-3 rounded md:p-0 cursor-pointer"
                      aria-current="page"
                    >
                      Dashboard
                    </span>
                  </li>
                  <li
                    className={`${
                      pathname === "/programs" ? "dashboard-menu-active1" : ""
                    }`}
                  >
                    <span
                      onClick={() => navigate("/programs")}
                      className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:p-0 cursor-pointer"
                    >
                      Programs
                    </span>
                  </li>
                  {role === "mentee" && (
                    <li
                      className={`${
                        pathname === "/mentors" ? "dashboard-menu-active" : ""
                      }`}
                    >
                      <span
                        onClick={() => navigate("/dashboard")}
                        className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:p-0 cursor-pointer"
                      >
                        Program Managers
                      </span>
                    </li>
                  )}

                  {role === "mentors" && (
                    <li
                      className={`${
                        pathname === "/mentees" ? "dashboard-menu-active" : ""
                      }`}
                    >
                      <span
                        onClick={() => navigate("/dashboard")}
                        className="block py-2 px-3 text-white rounded md:hover:bg-transparent md:p-0 cursor-pointer"
                      >
                        Volunteers
                      </span>
                    </li>
                  )}

                  <li>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-black"
                          id="menu-button"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          Objectives
                          <svg
                            className="-mr-1 h-6 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${
                      pathname === "/calendar" ? "dashboard-menu-active" : ""
                    }`}
                  >
                    <span
                      onClick={() => navigate("/calendar")}
                      className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:p-0 cursor-pointer"
                    >
                      Scheduler
                    </span>
                  </li>
                  <li
                    className={`${
                      pathname === "/discussions" ? "dashboard-menu-active" : ""
                    }`}
                  >
                    <span
                      onClick={() => navigate("/dashboard")}
                      className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:p-0 cursor-pointer"
                    >
                      Discussions
                    </span>
                  </li>
                  <li>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex w-full justify-center gap-x-1.5  px-3 py-2  text-black"
                          id="menu-button"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          More
                          <svg
                            className="-mr-1 h-6 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span
                      onClick={() => navigate("/logout")}
                      className="block py-2 px-3 text-black rounded md:hover:bg-transparent md:p-0 cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </ul>
              </div>

              <div id="leftSideNav" className="sub-menu leftsidenav hidden">
                <a href="#" className="closebtn" onClick={() => closeLeftNav()}>
                  &times;
                </a>

                <div id="left-content" className="px-3"></div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};
