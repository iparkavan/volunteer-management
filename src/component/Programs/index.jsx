import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Backdrop,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Typography,
} from "@mui/material";

import Card from "../../shared/Card";
import CloseIcon from "../../assets/icons/blueCloseIcon.svg";
import ProgramCard from "../../shared/Card/ProgramCard";
import SearchIcon from "../../assets/icons/search.svg";
import CalendarIcon from "../../assets/images/calender_1x.png";
import GridViewIcon from "../../assets/icons/gridviewIcon.svg";
import ListViewIcon from "../../assets/icons/listviewIcon.svg";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import ViewIcon from "../../assets/images/view1x.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  pipeUrls,
  programActionStatus,
  programMenus,
  programStatus,
  statusAction,
} from "../../utils/constant";
import {
  getMenteeProgramCount,
  getMenteePrograms,
  getProgramCounts,
} from "../../services/userprograms";
import DataTable from "../../shared/DataGrid";
import { programListColumns } from "../../utils/tableFields";
import api from "../../services/api";
import { getUserProfile } from "../../services/profile";
import { getallMenteeProgram } from "../../services/programInfo";
import { jwtDecode } from "jwt-decode";
import MuiModal from "../../shared/Modal";
import { CategoryPopup } from "../Dashboard/categoryPopup";
import { acceptMember, getCategory } from "../../services/category";
import { useGetAllProgramsQuery } from "../../features/program/programApi.services";
import { TabContext, TabList } from "@mui/lab";

const CustomPagination = ({
  totalItems = 200,
  pageSize = 6,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const [inputValue, setInputValue] = useState(currentPage.toString());

  // Update input value when currentPage prop changes
  React.useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow empty input for clearing
    if (value === "") {
      setInputValue("");
      return;
    }

    // Only allow numbers
    if (!/^\d+$/.test(value)) {
      return;
    }

    setInputValue(value);
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      // Reset to current page if input is empty on blur
      setInputValue(currentPage.toString());
      return;
    }

    const newPage = parseInt(inputValue, 10);
    if (newPage >= 1 && newPage <= totalPages) {
      handlePageChange(newPage);
    } else {
      // Reset to current page if input is invalid
      setInputValue(currentPage.toString());
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-12 h-8 border border-gray-300 rounded px-2 text-center"
        />
        <span className="ml-2 text-gray-600">of {totalPages}</span>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default function Programs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [programType, setProgramType] = React.useState("1");

  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 1,
    pageSize: 6,
  });
  // console.log("paginationModel", paginationModel);
  const [programMenusList, setProgramMenusList] = useState([]);
  const [programView, setProgramView] = useState("grid");
  const [seletedItem, setSelectedItem] = useState({});
  const [programFilter, setProgramFilter] = useState({
    search: "",
    filter_by: "all",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userInfo = useSelector((state) => state.userInfo);
  const { profile } = useSelector((state) => state.profileInfo);
  const userprograms = useSelector((state) => state.userPrograms);
  const role = userInfo.data.role || "";
  const filterType = searchParams.get("type");
  const filterSearch = searchParams.get("search");
  const filterDate = searchParams.get("filter_by");
  const isBookmark = searchParams.get("is_bookmark");
  // console.log("filterType", filterType);
  // console.log("filterSearch", filterSearch);
  // console.log("filterDate", filterDate);
  // console.log("isBookmark", isBookmark);
  const { data, isLoading, refetch, isFetching } = useGetAllProgramsQuery(
    {
      program_type: programType,
      limit: paginationModel.pageSize,
      page: programView === "list" ? paginationModel?.page + 1 : paginationModel.page,
      ...((filterType && !isBookmark) && {
        status:
          !filterType &&
          (role === "mentee" || role === "admin") &&
          !userInfo?.data?.is_registered
            ? "planned"
            : filterType,
      }),
      ...((filterDate && filterDate !== "all") && { filter_by: filterDate }),
      ...(filterSearch && { search: filterSearch }),
      ...(isBookmark && isBookmark !== "" && {is_bookmark: true})
    },
    {
      refetchOnMountOrArgChange: true,
      // skip:
      //   role === "admin" && filterType === programActionStatus.program_assign,
    }
  );

  const [openCategory, setOpenCategory] = React.useState(false);
  const token = localStorage.getItem("access_token");
  const decoded = React.useMemo(() => jwtDecode(token), [token]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  const handleTabChange = (event, newValue) => {
    setProgramType(newValue);
  };

  const handleGetCategory = (searchText = "") => {
    const payload = {
      search: searchText,
    };
    dispatch(getCategory(payload)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setCategory(res?.payload ?? []);
      }
    });
  };

  const handleUpdateGategory = (type = "") => {
    let payload = {};
    if (type === "update") {
      payload = {
        type: "mentee_category",
        categories_id: selectedCategory,
      };
    } else {
      payload = {
        type: "mentee_category",
      };
    }
    dispatch(acceptMember(payload)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setOpenCategory(false);
        setCategory([]);
        localStorage.setItem("access_token", res?.payload?.access);
        localStorage.setItem("refresh_token", res?.payload?.refresh);
        refetch();
      }
    });
  };

  const handleSelectCategory = (value) => {
    if (selectedCategory.includes(value)) {
      // Remove the value if it's already selected
      setSelectedCategory(selectedCategory.filter((id) => id !== value));
    } else {
      // Add the value if it's not already selected
      setSelectedCategory([...selectedCategory, value]);
    }
  };
  React.useEffect(() => {
    if (!decoded?.category_added && role === "mentee") {
      setOpenCategory(true);
    }
  }, [role]);

  const handleBookmark = async (program) => {
    const payload = {
      program_id: program.id,
      marked: !program.is_bookmark,
    };
    // setLoading(true);
    const pay = {
      filter_by: programFilter.filter_by ? programFilter.filter_by : filterDate,
    };
    const bookmark = await api.post("bookmark", payload);
    if (bookmark.status === 201 && bookmark.data) {
      // setLoading(false);
      refetch();
      if (role === "mentor") dispatch(getProgramCounts(pay));
      if (role === "mentee") dispatch(getMenteeProgramCount(pay));
    }

    // dispatch(updateProgram({ id: program.id, is_bookmark: !program.is_bookmark }))
  };

  const handleNavigation = (programdetails) => {
    // if (!userInfo?.data?.is_registered) {
    //     navigate(`/questions?program_id=${programdetails.id}`)
    // }
    // else {
    let baseUrl = pipeUrls.programdetails;
    if (Object.keys(programdetails).length) {
      // if (role === "mentor" && programdetails.status !== "completed") {
      //   if (programdetails.status === programActionStatus.yettostart)
      //     baseUrl = pipeUrls.startprogram;
      //   if (programdetails.status === programActionStatus.inprogress)
      //     baseUrl = pipeUrls.startprogram;
      // }

      navigate(
        `${baseUrl}/${programdetails.program || programdetails?.id}${
          programdetails?.admin_program_request_id
            ? `?request_id=${programdetails?.admin_program_request_id}`
            : "admin_assign_program" in programdetails
            ? `?program_create_type=admin_program`
            : ""
        }`
      );
    }
  };

  const handleViewChange = () => {
    setProgramView(programView === "grid" ? "list" : "grid");
    setPaginationModel({
      page: programView === "grid" ? 0 : 1,
      pageSize: programView === "grid" ? 10 : 6
    })
  };

  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPrograms = () => {
    const pay = {
      filter_by: programFilter.filter_by ? programFilter.filter_by : filterDate,
    };
    let query = {};

    if (filterType && filterType !== "") {
      query = { type: "status", value: filterType };
    }

    if (
      !filterType &&
      (role === "mentee" || role === "admin") &&
      !userInfo?.data?.is_registered
    ) {
      query = { type: "status", value: "planned" };
    }

    if (filterSearch && filterSearch !== "") {
      query.search = { search: "search", value: filterSearch };
    }

    if (filterDate && filterDate !== "") {
      query.date = { date: "filter_by", value: filterDate };
    }
    if (!filterDate) {
      query.date = { date: "filter_by", value: programFilter.filter_by };
    }

    if (isBookmark && isBookmark !== "") {
      query = { type: "is_bookmark", value: isBookmark };
    }

    if (role === "mentee") {
      dispatch(getMenteePrograms(query));
      dispatch(getMenteeProgramCount(pay));
    }
    if (role === "mentor" || role === "admin") {
      dispatch(getProgramCounts(pay));

      // dispatch(getUserPrograms(query));
    }

    // if (role === '') dispatch(getUserPrograms(query));
  };
  // const getTableData = (search = "") => {
  //   const payload = {
  //     page: paginationModel?.page + 1,
  //     limit: paginationModel?.pageSize,
  //   };
  //   if (filterType && filterType !== "") {
  //     payload.status = filterType;
  //   }

  //   if (
  //     !filterType &&
  //     (role === "mentee" || role === "admin") &&
  //     !userInfo?.data?.is_registered
  //   ) {
  //     payload.status = "planned";
  //   }

  //   if (filterSearch && filterSearch !== "") {
  //     payload.search = filterSearch;
  //   }

  //   if (filterDate && filterDate !== "") {
  //     payload.filter_by = filterDate;
  //   }

  //   if (isBookmark && isBookmark !== "") {
  //     payload.is_bookmark = isBookmark;
  //   }
  //   if (role === "mentee") {
  //     dispatch(getallMenteeProgram(payload));
  //   } else {
  //     // if (role === "mentor" || role === "admin") {
  //     //   dispatch(getallMyProgram(payload));
  //     // }
  //   }
  // };

  // useEffect(() => {
  //   if(role !== user.mentee){
  //   getTableData();}
  // }, [paginationModel, searchParams, role]);

  const programTableFields = [
    ...programListColumns,
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      id: 0,
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
                onClick={(e) => handleNavigation(seletedItem)}
                className="!text-[12px]"
              >
                <img src={ViewIcon} alt="ViewIcon" className="pr-3 w-[30px]" />
                View
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const handlePageChange = (newPage) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const getQueryString = () => {
    let query = {};
    if (filterType && filterType !== "") {
      query = { type: filterType };
    }
    if (isBookmark && isBookmark !== "") {
      query.is_bookmark = true;
    }
    if (programFilter.search !== "") query.search = programFilter.search;
    if (programFilter.filter_by !== "")
      query.filter_by = programFilter.filter_by;

    return query;
  };

  const handleProgramSearch = (e) => {
    setProgramFilter({ ...programFilter, search: e.target.value });
  };

  const handleDateFilter = (e) => {
    setProgramFilter({ ...programFilter, filter_by: e.target.value });
  };

  const menuNavigate = () => {
    setPaginationModel({
      page: programView === "grid" ? 1 : 0,
      pageSize: programView === "grid" ? 6 : 10
    })
    setProgramFilter({ search: "", filter_by: "all" });
  };

  useEffect(() => {
    let query = getQueryString();
    setSearchParams(query);
  }, [programFilter]);

  useEffect(() => {
    let listPrograms = programMenus('program').filter((programs) =>
      programs.for.includes(role)
    );
console.log("listPrograms ==>", listPrograms)
    const totalCount =
      role === 'mentor' || role === 'admin'
        ? userprograms.statusCounts
        : userprograms.programsCounts;

    if (
      (role === 'mentee' || role === 'admin') &&
      !userInfo?.data?.is_registered
    ) {
      listPrograms = listPrograms.filter(
        (list) => list.status === programActionStatus.yettojoin
      );
    }

    const programMenu = [...listPrograms].map((menu) => {
      if (menu.status === 'all') {
        return {
          ...menu,
          count:
            role === 'mentor' || role === 'admin'
              ? userprograms.totalPrograms
              : totalCount?.allprogram,
        };
      }
      // Mentor Response Count
      if (
        (role === 'mentor' || role === 'admin') &&
        statusAction.includes(menu.status)
      ) {
        return { ...menu, count: totalCount[menu.mentorStatus] };
      }

      // Mentee Response Count
      if (role === 'mentee' || role === 'admin') {
        return { ...menu, count: totalCount[menu.menteeStatus] };
      }
      return menu;
    });
    setProgramMenusList(programMenu);
  }, [userprograms.statusCounts, userprograms.programsCounts]);

  useEffect(() => {
    if (!Object.keys(profile).length) {
      dispatch(getUserProfile());
    }
  }, [searchParams, role, profile]);

  useEffect(() => {
    if (userprograms.status === programStatus.bookmarked) {
      let query = {};
      const pay = {
        filter_by: programFilter.filter_by
          ? programFilter.filter_by
          : filterDate,
      };
      if (filterType && filterType !== "") {
        query = { type: "status", value: filterType };
      }

      if (isBookmark && isBookmark !== "") {
        query = { type: "is_bookmark", value: isBookmark };
      }

      if (role === "mentee") {
        if (programFilter.filter_by || filterDate) {
          dispatch(getMenteePrograms(query));
        }
        dispatch(getMenteeProgramCount(programFilter.filter_by !== "all" ? pay : {}));
      }
      if (role === "mentor" || role === "admin") {
        // dispatch(getUserPrograms(query));
        dispatch(getProgramCounts(pay));
        refetch();
      }
    }
  }, [userprograms.status]);

  // useEffect(() => {
  //   if (userprograms.status === programStatus.load) {
  //     let loadProgram = [];
  //     if (filterType === null && isBookmark === null) {
  //       loadProgram = userprograms.yettojoin;
  //     }

  //     if (isBookmark !== null && isBookmark !== "") {
  //       loadProgram = userprograms.bookmarked;
  //     }

  //     if (
  //       filterType === null &&
  //       userInfo?.data?.is_registered &&
  //       isBookmark === null
  //     ) {
  //       loadProgram = userprograms.allprograms;
  //     }

  //     if (filterType && isBookmark === null) {
  //       if (filterType === "planned") {
  //         loadProgram = userprograms.yettojoin;
  //       } else {
  //         loadProgram = userprograms[filterType];
  //       }
  //     }
  //     setProgramsList(loadProgram);
  //   }
  // }, [userprograms]);

  useEffect(() => {
    if (role === "mentor" || role === "admin") {
      dispatch(
        getProgramCounts({
          filter_by: programFilter.filter_by
            ? programFilter.filter_by
            : filterDate,
        })
      );
    }
    if (role === "mentee") {
      dispatch(
        getMenteeProgramCount(programFilter.filter_by !== "all" ? {
          filter_by: programFilter.filter_by
            ? programFilter.filter_by
            : filterDate,
        } : {})
      );
    }
  }, [role, searchParams, programFilter]);

  return (
    <div className="dashboard-content px-8 mt-10">
      <div className="flex justify-between items-center mb-8">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading || isFetching}
        >
          {isLoading || isFetching ? (
            <CircularProgress color="inherit" />
          ) : null}
        </Backdrop>
        {userInfo?.data?.is_registered && (
          <TabContext value={programType}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#FE634E",
                  },
                }}
              >
                <Tab
                  sx={{
                    color: programType === "1" ? "#FE634E" : "inherit",
                    "&.Mui-selected": {
                      color: "#FE634E",
                    },
                  }}
                  label="Training Session"
                  value="1"
                />
                <Tab
                  sx={{
                    color: programType === "2" ? "#FE634E" : "inherit",
                    "&.Mui-selected": {
                      color: "#FE634E",
                    },
                  }}
                  label="Field Action"
                  value="2"
                />
              </TabList>
            </Box>
          </TabContext>
        )}
        {userInfo &&
          userInfo.data &&
          (userInfo.data.role === "mentor" ||
            userInfo.data.role === "admin") && (
            <div>
              <button
                onClick={() => navigate("/create-programs")}
                className="text-[13px] px-4 py-4 !bg-background-primary-main !text-font-secondary-white rounded-[6px]"
              >
                Create New Program
              </button>
            </div>
          )}
      </div>

      <div className="grid grid-cols-5 gap-3">
        <div className="row-span-3 flex flex-col gap-8">
          <Card
            cardTitle={"Program Types"}
            cardContent={programMenusList}
            menuNavigate={menuNavigate}
          />
        </div>

        <div className="col-span-4">
          <div
            style={{
              boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.05)",
              borderRadius: "10px",
            }}
          >
            <div className="title flex justify-between py-3 px-4 border-b-2 items-center">
              <div className="flex gap-4">
                <div>
                  {programMenusList.find((menu) => menu.status === filterType)
                    ?.name ||
                    ((filterType === "planned" ||
                      (filterType === null &&
                        (role === "mentee" || role === "admin") &&
                        !userInfo?.data?.is_registered)) &&
                      "Active Programs") ||
                    (isBookmark ? "Bookmarked Programs" : "All Programs")}
                </div>
                <img
                  src={programView === "grid" ? ListViewIcon : GridViewIcon}
                  className="cursor-pointer"
                  alt="viewicon"
                  onClick={handleViewChange}
                />
              </div>
              <div className="flex gap-8 items-center">
                <div className="relative">
                  <input
                    type="text"
                    id="search-navbar"
                    className="block w-full p-2 text-sm text-gray-900 border border-background-primary-main h-[40px] w-[345px]"
                    placeholder="Search here..."
                    value={programFilter.search}
                    onChange={handleProgramSearch}
                    style={{ border: "1px solid #FE634E" }}
                  />
                  <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                    <img
                      src={SearchIcon}
                      className="w-[15px]"
                      alt="SearchIcon"
                    />
                  </div>
                </div>
                <p
                  className="text-[12px] py-2 pl-5 pr-4 flex gap-4 !border !border-border-black rounded-[5px]"
                  // style={{
                  //   background: "rgba(223, 237, 255, 1)",
                  //   borderRadius: "5px",
                  // }}
                >
                  <img src={CalendarIcon} alt="CalendarIcon" />
                  <select
                    className="focus:outline-none"
                    // style={{
                    //   background: "rgba(223, 237, 255, 1)",
                    //   border: "none",
                    // }}
                    onChange={handleDateFilter}
                    value={programFilter?.filter_by}
                  >
                    <option value="all">All</option>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </p>
              </div>
            </div>
            {programView === "grid" && (
              <>
                <ProgramCard
                  title="Active Programs"
                  viewpage="/programs?type=yettojoin"
                  handleNavigateDetails={handleNavigation}
                  handleBookmark={handleBookmark}
                  programs={data?.programs}
                  noTitle
                  loadProgram={getPrograms}
                />

                {data?.total_pages > 1 && (
                  <div className="p-4">
                    <CustomPagination
                      totalItems={data?.count}
                      pageSize={paginationModel.pageSize}
                      currentPage={paginationModel.page}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
            {programView === "list" && (
              <div className="py-6 px-6">
                <DataTable
                  loading={isLoading || isFetching}
                  rows={data?.programs || []}
                  columns={programTableFields}
                  hideCheckbox
                  rowCount={data?.count}
                  paginationModel={paginationModel
                  //   {
                  //   page: paginationModel?.page - 1,
                  //   pageSize: paginationModel?.pageSize
                  // }
                }
                  setPaginationModel={setPaginationModel}
                />
              </div>
            )}
          </div>
        </div>
        <MuiModal
          modalOpen={openCategory}
          modalClose={() => {setOpenCategory(false)
            handleUpdateGategory("skip")
          }}
          noheader
          padding={0}
        >
          <Stack
            p={"12px 18px"}
            className="border-b border-[#D9E4F2]"
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography>Select Category's</Typography>
            <div onClick={() => {
              setOpenCategory(false)
              handleUpdateGategory("skip")
              }}>
              <img src={CloseIcon} alt="" />
            </div>
          </Stack>
          <CategoryPopup
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleGetCategory={handleGetCategory}
            handleUpdateGategory={handleUpdateGategory}
            handleSelectCategory={handleSelectCategory}
          />
        </MuiModal>
      </div>
    </div>
  );
}
