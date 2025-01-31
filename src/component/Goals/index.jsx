import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useSearchParams } from "react-router-dom";

import RecentActivities from "../Dashboard/RecentActivities";
import CreateGoal from "./CreateGoal";
import GoalProgress from "./GoalProgress";
import GoalPerformance from "./GoalPerformance";
import MenteeGoals from "./MenteeGoals";

import {
  deleteGoalInfo,
  getAllGoals,
  getGoalsCount,
  getGoalsHistory,
  getGoalsRequest,
  updateHistoryGoal,
  updateLocalGoalInfo,
} from "../../services/goalsInfo";
import {
  goalDataStatus,
  goalPeriods,
  goalRequestColor,
  goalRequestStatus,
  goalStatus,
  goalStatusColor,
} from "../../utils/constant";
import {
  goalsColumns,
  goalsHistoryColumn,
  goalsRequestColumn,
  menteeGoalsRequestColumn,
} from "../../mock";

import DataTable from "../../shared/DataGrid";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import ViewIcon from "../../assets/images/view1x.png";
import CalenderIcon from "../../assets/images/calender_1x.png";
import DeleteIcon from "../../assets/images/delete1x.png";
import AddGoalIcon from "../../assets/icons/addGoal.svg";
import SuccessTik from "../../assets/images/blue_tik1x.png";
import OverDeleteIcon from "../../assets/images/delete_1x.png";
import CancelIcon from "../../assets/images/cancel1x.png";
import EditIcon from "../../assets/images/Edit1x.png";
import CompleteIcon from "../../assets/icons/Completed.svg";
import CancelReqIcon from "../../assets/icons/cancelReqIcon.svg";
import TickColorIcon from "../../assets/icons/tickColorLatest.svg";
import ConnectIcon from "../../assets/images/Connectpop1x.png";
import CloseReqPopup from "../../assets/icons/blackCloseIcon.svg";
import CancelReq from "../../assets/icons/cancelRequest.svg";
import CloseIcon from "../../assets/icons/closeCircle.svg";
import "./goal.css";
import dayjs from "dayjs";
import { Button } from "../../shared";
import StartIcon from "../../assets/icons/startIcon.svg";
import TickCircleIcon from "../../assets/icons/tickCircle.svg";

const Goals = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role;
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("type") ?? "";
  const [anchorEl, setAnchorEl] = useState(null);
  const [requestEl, setRequestEl] = useState(null);
  const open = Boolean(anchorEl);
  const requestOpen = Boolean(requestEl);
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [requestTab, setRequestTab] = useState("mentor-goals");
  const [actionModal, setActionModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [seletedItem, setSelectedItem] = useState({});
  const [popupModal, setPopupModal] = useState("");
  const [allTimeFrame, setAllTimeFrame] = React.useState("month");
  const [historyTimeFrame, setHistoryTimeFrame] = React.useState("month");
  const [requestTimeFrame, setRequestTimeFrame] = React.useState("month");
  const [requestPaginationModel, setRequestPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [historyPaginationModel, setHistoryPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [allGoalPaginationModel, setAllGoalPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [createdBy, setCreatedBy] = React.useState("");
  const [adminTab, setAdminTab] = React.useState("mentor");
  const [adminTablePaginationModal, setAdminTablePaginationModal] =
    React.useState({
      page: 0,
      pageSize: 10,
    });
  const [adminTimeFrame, setAdminTimeFrame] = React.useState("month");
  const [confirmPopup, setConfirmPopup] = React.useState({
    bool: false,
    activity: false,
    type: "",
  });
  const [actionPopup, setActionPopup] = React.useState({
    bool: false,
    activity: false,
    type: "",
  });

  useEffect(() => {
    setRequestPaginationModel({
      page: 0,
      pageSize: 10,
    });
    setHistoryPaginationModel({
      page: 0,
      pageSize: 10,
    });
    setAllGoalPaginationModel({
      page: 0,
      pageSize: 10,
    });
    setAdminTablePaginationModal({
      page: 0,
      pageSize: 10,
    });
  }, [filterType]);

  const {
    goalsList,
    loading,
    status,
    createdGoal,
    goalsCount,
    goalRequest,
    goalHistory,
  } = useSelector((state) => state.goals);

  const dispatch = useDispatch();

  const requestBtns = [
    {
      name: "My Goals",
      key: "mentor-goals",
    },
    {
      name: "Volunteer Goals",
      key: "mentee-goals",
    },
  ];

  const goalsListMenu = [
    {
      name: "Total Goals",
      key: "total_goals",
    },
    {
      name: "Active Goals",
      key: "active",
    },
    {
      name: "Goals in Progress",
      key: "in_progress",
    },
    {
      name: "Completed Goals",
      key: "completed",
    },
    {
      name: "Cancelled Goals",
      key: "cancel",
    },
  ];

  const timeFrameList = [
    {
      label: "Month",
      value: "month",
    },
    {
      label: "Week",
      value: "week",
    },
    {
      label: "Day",
      value: "day",
    },
  ];

  React.useEffect(() => {
    if (role === "admin") {
      setShowAdmin(true);
      setCreatedBy("mentor");
    }
  }, [role]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  const handleRequest = (event, data) => {
    setSelectedItem(data);
    setRequestEl(event.currentTarget);
  };

  const handleDeleteGoal = () => {
    dispatch(deleteGoalInfo(seletedItem.id));
  };

  const handleDelete = () => {
    handleClose();
    setDeleteModal(true);
  };

  const handlEditGoal = () => {
    dispatch(updateLocalGoalInfo({ error: "" }));
    setAnchorEl(null);
    setActionModal(true);
  };

  const getAllGoalData = (created_by = createdBy, user_id) => {
    const res = seletedItem?.created_by ? seletedItem?.created_by : user_id;
    dispatch(getGoalsCount({ time_frame: allTimeFrame, user_id: res }));
    dispatch(
      getGoalsRequest({
        status: filterType,
        created_by: created_by,
        time_frame: requestTimeFrame,
        page: requestPaginationModel?.page + 1,
        limit: requestPaginationModel?.pageSize,
        user_id: res,
      })
    );
    dispatch(
      getGoalsHistory({
        status: filterType ?? "new",
        created_by: created_by,
        time_frame: historyTimeFrame,
        page: historyPaginationModel?.page + 1,
        limit: historyPaginationModel?.pageSize,
        user_id: res,
      })
    );
  };

  // useEffect(() => {
  //     getAllGoalData()
  // }, [filterType])

  useEffect(() => {
    if (role === "admin") {
      handleGetAdminTableData(adminTimeFrame, adminTab);
    }
  }, [createdBy, adminTablePaginationModal]);

  const handleGetAllGoals = (timeframe = allTimeFrame) => {
    let payload = {};

    if (role === "admin") {
      payload = {
        page: allGoalPaginationModel?.page + 1,
        limit: allGoalPaginationModel?.pageSize,
        status: filterType,
        time_frame: timeframe,
        created_by: createdBy,
        user_id: seletedItem.created_by,
      };
    } else {
      payload = {
        page: allGoalPaginationModel?.page + 1,
        limit: allGoalPaginationModel?.pageSize,
        status: filterType,
        time_frame: timeframe,
        created_by: createdBy,
        // user_id:seletedItem.created_by
      };
    }
    dispatch(getAllGoals(payload));
    dispatch(getGoalsRequest(payload));
    dispatch(
      getGoalsCount({
        time_frame: timeframe,
        user_id: role === "admin" ? seletedItem?.created_by : undefined,
      })
    );
  };

  useEffect(() => {
    handleGetAllGoals();
  }, [searchParams, allGoalPaginationModel]);

  useEffect(() => {
    dispatch(
      getGoalsHistory({
        status: filterType,
        created_by: createdBy,
        time_frame: historyTimeFrame,
        page: historyPaginationModel?.page + 1,
        limit: historyPaginationModel?.pageSize,
        user_id: role === "admin" ? seletedItem?.created_by : "",
      })
    );
  }, [historyPaginationModel]);

  useEffect(() => {
    if (status === goalStatus.delete) {
      setPopupModal("Deleted");
      setDeleteModal(false);

      handleGetAllGoals();
      getAllGoalData();
      setTimeout(() => {
        setPopupModal("");
      }, [3000]);
    }

    if (status === goalStatus.update) {
      setActionModal(false);
      setPopupModal("Updated");
      handleGetAllGoals();
      getAllGoalData();
      setTimeout(() => {
        setPopupModal("");
      }, [3000]);
    }
  }, [status]);

  const goalColumn = [
    ...goalsColumns,
    {
      field: "period",
      headerName: "Period",
      id: 2,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            {
              goalPeriods.find(
                (goalPeriod) =>
                  parseInt(goalPeriod.value) === parseInt(params.row.period)
              )?.name
            }
          </div>
        );
      },
    },
    {
      ...(searchParams.get("type") !== "total_goals" && {
        field: "goal_status",
        headerName: "Status",
        id: 2,
        flex: 1,
        renderCell: (params) => {
          return (
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background: goalRequestColor[params.row.status]?.bg,
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: goalRequestColor[params.row.status]?.color,
                }}
              >
                {goalRequestStatus[params.row.status]}
              </span>
            </div>
          );
        },
      }),
    },
    {
      field: "action",
      headerName: "Action",
      id: 4,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleClick(e, params.row)}
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
              {params.row.goal_status === "active" && (
                <MenuItem onClick={handlEditGoal} className="!text-[12px]">
                  <img
                    src={EditIcon}
                    alt="EditIcon"
                    className="pr-3 w-[30px]"
                  />
                  Edit
                </MenuItem>
              )}

              <MenuItem
                onClick={(e) => {
                  navigate(
                    `/view-goal/${seletedItem.id}&requestId=${seletedItem?.goal_request_id}`
                  );
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

              {params.row.goal_status === "inactive" && (
                <MenuItem onClick={handleDelete} className="!text-[12px]">
                  <img
                    src={DeleteIcon}
                    alt="DeleteIcon"
                    className="pr-3 w-[30px]"
                  />
                  Delete
                </MenuItem>
              )}

              {/* {
                            params.row.status === 'active' &&
                            <MenuItem onClick={() => handleOpenAction("start")} className='!text-[12px]'>
                                <img src={StartIcon} alt="EditIcon" className='pr-3 w-[30px]' />
                                Start
                            </MenuItem>
                        } */}
              {["in_progress"].includes(params?.row?.status) && (
                <MenuItem
                  onClick={() => handleOpenConfirmPopup("complete")}
                  className="!text-[12px]"
                >
                  <img
                    src={TickCircleIcon}
                    alt="CancelReqIcon"
                    field={params.id}
                    className="pr-3 w-[30px]"
                  />
                  Complete
                </MenuItem>
              )}
              {["active", "in_progress"].includes(params?.row?.status) && (
                <MenuItem
                  onClick={() => handleOpenConfirmPopup("cancel")}
                  className="!text-[12px]"
                >
                  <img
                    src={CancelReqIcon}
                    alt="CancelReqIcon"
                    field={params.id}
                    className="pr-3 w-[30px]"
                  />
                  Cancel
                </MenuItem>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const menteeGoalsColumn = [
    ...menteeGoalsRequestColumn,
    {
      field: "performance",
      headerName: "Performance",
      id: 2,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div
              className="relative"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "100%",
                width: "70%",
              }}
            >
              <div
                style={{
                  background: "#FFD41B",
                  width: "67%",
                  borderRadius: "30px",
                  height: "30px",
                  top: "20%",
                  position: "absolute",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#18283D",
                    height: "30px",
                  }}
                >
                  50%
                </div>
              </div>
              <div
                style={{
                  background: "rgba(217, 217, 217, 1)",
                  width: "100%",
                  borderRadius: "30px",
                  height: "30px",
                }}
              ></div>
            </div>
          </>
        );
      },
    },
    {
      field: "goal_status",
      headerName: "Status",
      id: 2,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background: "#FFF7D8",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                }}
              >
                {" "}
                {params.row.goal_status}
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
      id: 4,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleClick(e, params.row)}
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
            ></Menu>
          </>
        );
      },
    },
  ];

  const goalHistoryColumn = [
    ...goalsHistoryColumn,
    {
      field: "period",
      headerName: "Period",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">{`${params?.row?.period} ${
            params?.row?.period === 1 ? "Month" : "Months"
          }`}</div>
        );
      },
    },
    {
      field: "completed_date",
      headerName: "Completed Date",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.completed_date
              ? dayjs(params?.row?.completed_date).format("DD-MM-YYYY")
              : "..."}
          </div>
        );
      },
    },
    {
      field: "goal_status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-4"
                style={{
                  background: goalRequestColor[params.row.status]?.bg,
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: goalRequestColor[params.row.status]?.color,
                  fontSize: "12px",
                }}
              >
                {goalRequestStatus[params.row.status]}
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
      id: 4,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleClick(e, params.row)}
            >
              <img src={MoreIcon} alt="MoreIcon" />
            </div>
            {params?.row?.id === seletedItem?.id && (
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
                    if (role === "admin") {
                      navigate(
                        `/view-goal/${seletedItem.id}?requestId=${seletedItem?.goal_request_id}`
                      );
                    } else {
                      navigate(`/view-goal/${seletedItem.id}`);
                    }
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
                {/* {
                            (params.row.status === 'active' && role !== "admin") &&
                            <MenuItem onClick={() => handleOpenAction("start")} className='!text-[12px]'>
                                <img src={StartIcon} alt="EditIcon" className='pr-3 w-[30px]' />
                                Start
                            </MenuItem>
                        } */}
                {(params?.row?.status === "new" ||
                  params?.row?.status === "pending") &&
                  role !== "admin" && (
                    <MenuItem onClick={handlEditGoal} className="!text-[12px]">
                      <img
                        src={EditIcon}
                        alt="EditIcon"
                        className="pr-3 w-[30px]"
                      />
                      Edit
                    </MenuItem>
                  )}

                {params?.row?.status === "in_progress" && role !== "admin" && (
                  <MenuItem
                    onClick={() => handleOpenConfirmPopup("complete")}
                    className="!text-[12px]"
                  >
                    <img
                      src={CompleteIcon}
                      alt="CompleteIcon"
                      field={params.id}
                      className="pr-3 w-[30px]"
                    />
                    Complete
                  </MenuItem>
                )}

                {["new", "pending", "active"].includes(params?.row?.status) &&
                  role !== "admin" && (
                    <MenuItem
                      onClick={() => handleOpenConfirmPopup("cancel")}
                      className="!text-[12px]"
                    >
                      <img
                        src={CancelReqIcon}
                        alt="CancelReqIcon"
                        field={params.id}
                        className="pr-3 w-[30px]"
                      />
                      Cancel{" "}
                      {params?.row?.status === "new" ||
                      params?.row?.status === "pending"
                        ? "Request"
                        : null}
                    </MenuItem>
                  )}
              </Menu>
            )}
          </>
        );
      },
    },
  ];

  const goalRequestColumn = [
    {
      field: "goal_name",
      headerName: "Goals Name",
      id: 0,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.goal?.goal_name ?? "..."}
          </div>
        );
      },
    },
    {
      field: "goal_designation",
      headerName: "Goals Designation",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.goal?.designation ?? "..."}
          </div>
        );
      },
    },
    {
      field: "goal_description",
      headerName: "Goals Description",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.goal?.description?.length
              ? params?.row?.goal?.description
              : "..."}
          </div>
        );
      },
    },
    {
      field: "request_date",
      headerName: "Request Date",
      flex: 1,
      id: 3,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.requested_date
              ? dayjs(params?.row?.requested_date).format("DD-MM-YYYY")
              : "..."}
          </div>
        );
      },
    },
    {
      field: "approved_date",
      headerName: "Approved Date",
      flex: 1,
      id: 4,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.approved_date
              ? dayjs(params?.row?.approved_date).format("DD-MM-YYYY")
              : "..."}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 5,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background: goalRequestColor[params?.row?.goal?.status].bg,
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: goalRequestColor[params?.row?.goal?.status].color,
                }}
              >
                {goalRequestStatus[params?.row?.goal?.status]}
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
      id: 4,
      renderCell: (params) => {
        return (
          <>
            <div
              className="cursor-pointer flex items-center h-full"
              onClick={(e) => handleRequest(e, params.row)}
            >
              <img src={MoreIcon} alt="MoreIcon" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={requestEl}
              open={requestOpen}
              onClose={() => setRequestEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(e) => {
                  navigate(`/view-goal/${seletedItem?.goal?.id}`);
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

              {params.row.goal_status === "inactive" && (
                <MenuItem onClick={handleDelete} className="!text-[12px]">
                  <img
                    src={DeleteIcon}
                    alt="DeleteIcon"
                    className="pr-3 w-[30px]"
                  />
                  Delete
                </MenuItem>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const title =
    role === "admin"
      ? adminTab === "mentor"
        ? "Program Manager Goal"
        : "Volunteer Goal"
      : goalsListMenu.find((option) => option.key === searchParams.get("type"))
          ?.name || (role === "mentee" ? "Volunteer Goals" : "My Goals");

  const handleTab = (event, newValue) => {
    setRequestTab(newValue);
  };

  const handleSelectedRow = (row) => {
    setSelectedRows(row);
  };

  const handleCloseModal = () => {
    setActionModal(false);
    setSelectedItem({});
    handleGetAllGoals();
  };

  const handleGoalsClick = (goal) => {
    if (goal.key === "total_goals") navigate("/goals");
    else navigate("/goals?type=" + goal.key);
  };

  const handleOpenCreateGoalModal = () => {
    dispatch(updateLocalGoalInfo({ error: "" }));
    setSelectedItem({});
    setActionModal(true);
  };

  useEffect(() => {
    if (Object.keys(createdGoal).length && status === goalStatus.create) {
      setActionModal(false);
      setPopupModal("Requested");
      setTimeout(() => {
        setPopupModal("");
      }, [3000]);

      const filterType = searchParams.get("type");
      let query = "";
      if (filterType && filterType !== "") {
        query = filterType === "total_goals" ? "" : filterType;
      }
      const payload = {
        page: allGoalPaginationModel?.page + 1,
        limit: allGoalPaginationModel?.pageSize,
        status: filterType,
        time_frame: allTimeFrame,
      };
      dispatch(getAllGoals(payload));
      getAllGoalData();
    }
  }, [status]);

  useEffect(() => {
    setGoals(goalsList);
  }, [goalsList]);

  const handleChangeHistoryTimeFrame = (value) => {
    setHistoryTimeFrame(value);
    setHistoryPaginationModel({
      page: 0,
      pageSize: 10,
    });
    dispatch(
      getGoalsHistory({
        status: "new",
        created_by: createdBy,
        time_frame: value,
        page: 1,
        limit: 10,
      })
    );
  };

  const handleOpenConfirmPopup = (type) => {
    handleClose();
    setConfirmPopup({
      ...confirmPopup,
      bool: true,
      type: type,
    });
  };

  const handleCloseConfirmPopup = (type) => {
    setConfirmPopup({
      ...confirmPopup,
      bool: false,
      type: "",
      activity: false,
    });
  };

  const handleUpdateHistoryGoal = () => {
    const payload = {
      id: seletedItem?.id,
      status: confirmPopup?.type === "complete" ? "completed" : "cancel",
      start_date: dayjs(new Date()).format("YYYY-MM-DD"),
    };
    dispatch(updateHistoryGoal(payload)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setConfirmPopup({
          ...confirmPopup,
          bool: false,
          activity: true,
        });

        setTimeout(() => {
          setConfirmPopup({
            ...confirmPopup,
            bool: false,
            activity: false,
            type: "",
          });

          handleGetAllGoals();
        }, 2000);
      }
    });
  };

  const handleChangeRequestTimeFrame = (value) => {
    setRequestTimeFrame(value);
    setRequestPaginationModel({
      page: 0,
      pageSize: 5,
    });
    dispatch(
      getGoalsRequest({
        status: "new2",
        created_by: createdBy,
        time_frame: value,
        page: 1,
        limit: 5,
      })
    );
  };

  const handleAllTimeFrame = async (value) => {
    setAllTimeFrame(value);
    await setAllGoalPaginationModel({
      page: 0,
      pageSize: 5,
    });
    await handleGetAllGoals(value);
  };

  const handleAdminTabChange = async (event, newValue) => {
    setAdminTab(newValue);
    await setAdminTimeFrame("month");
    await setAdminTablePaginationModal({
      page: 0,
      pageSize: 10,
    });
  };

  const adminMentorColumns = [
    {
      field: "mentor_name",
      headerName: "Program Manager Name",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.created_by_name ?? "..."}
          </div>
        );
      },
    },
    {
      field: "total_goals",
      headerName: "Total Goals",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.goal_count}
          </div>
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
              onClick={(e) => handleClick(e, params.row)}
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
                onClick={(e) => handleViewTab("mentor")}
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
            </Menu>
          </>
        );
      },
    },
  ];

  const adminMenteeColumns = [
    {
      field: "mentee_name",
      headerName: "Volunteer Name",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.created_by_name ?? "..."}
          </div>
        );
      },
    },
    {
      field: "total_goals",
      headerName: "Total Goals",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.goal_count}
          </div>
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
              onClick={(e) => handleClick(e, params.row)}
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
                onClick={(e) => handleViewTab("mentee")}
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
            </Menu>
          </>
        );
      },
    },
  ];

  const handleGetAdminTableData = (
    time_frame = adminTimeFrame,
    created_by = adminTab
  ) => {
    dispatch(
      getAllGoals({
        // status: "new",
        created_by: created_by,
        time_frame: time_frame,
        page: adminTablePaginationModal?.page + 1,
        limit: adminTablePaginationModal?.pageSize,
      })
    );
  };

  // React.useEffect(() => {
  //     if (role === "admin") {
  //         handleGetAdminTableData(adminTimeFrame, adminTab)
  //     }
  // }, [adminTablePaginationModal])

  const handleAdminTimeFrame = (value) => {
    handleGetAdminTableData(value);
    setAdminTimeFrame(value);
  };

  const handleViewTab = (type) => {
    handleClose();
    setRequestTab("mentor-goals");
    setShowAdmin(false);
    setCreatedBy(type);
    getAllGoalData(type, seletedItem?.created_by);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(true);
    setCreatedBy("");
    setAdminTab("mentor");
    handleGetAdminTableData("month", "mentor");
    navigate("/goals");
  };

  const resetActionModal = (type) => {
    setActionPopup({
      bool: false,
      activity: false,
      type: "",
    });
  };

  const handleOpenAction = (type) => {
    handleClose();
    setActionPopup({
      bool: true,
      activity: false,
      type: type,
    });
  };

  const handleOpenActivity = () => {
    setActionPopup({
      ...actionPopup,
      activity: true,
      bool: false,
    });
    setTimeout(() => {
      resetActionModal();
    }, 2000);
  };

  // Start Goal Api

  const handleStartGoal = () => {
    const payload = {
      id: seletedItem.id,
      status: "in_progress",
      start_date: dayjs(new Date()).format("YYYY-MM-DD"),
    };
    dispatch(updateHistoryGoal(payload)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleOpenActivity();
        handleGetAllGoals();
      }
    });
  };
  const actionButtonFunction = (type) => {
    switch (type) {
      case "start":
        handleStartGoal();
        break;

      default:
        break;
    }
  };

  const activityPopupText = {
    start: "Your goal has been successfully started",
  };

  return (
    <div className="goals px-9 py-9">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={popupModal !== ""}
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <img src={SuccessTik} alt="SuccessTik" />
            <p
              className="text-[16px] font-semibold bg-clip-text text-font-primary-main"
              style={{
                fontWeight: 600,
              }}
            >
              Goal {popupModal} Successfully
            </p>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleteModal}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <div
            style={{
              border: "1px solid rgba(229, 0, 39, 1)",
              borderRadius: "15px",
            }}
            className="relative flex flex-col gap-2 justify-center 
                        items-center py-14 px-16"
          >
            <img
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => setDeleteModal(false)}
              src={CancelIcon}
              alt="CancelIcon"
            />

            <img
              className="w-[50px]"
              src={OverDeleteIcon}
              alt="OverDeleteIcon"
            />

            <div className="py-5 mb-3">
              <p
                style={{
                  color: "rgba(24, 40, 61, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Are you sure want to delete this goal?
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-6 justify-center align-middle">
                <button
                  style={{
                    background: "rgba(229, 0, 39, 1)",
                    color: "#fff",
                    borderRadius: "3px",
                    width: "130px",
                    padding: "13px",
                  }}
                  onClick={() => setDeleteModal(false)}
                >
                  No
                </button>
                <button
                  style={{
                    border: "1px solid rgba(229, 0, 39, 1)",
                    color: "rgba(229, 0, 39, 1)",
                    borderRadius: "3px",
                    width: "130px",
                    padding: "13px",
                  }}
                  onClick={handleDeleteGoal}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Backdrop>

      <div
        className="px-3 py-5"
        style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
      >
        <div className="flex justify-between px-5 pb-4 mb-8 items-center border-b-2">
          <div className="flex gap-5 items-center">
            <p style={{ color: "rgba(24, 40, 61, 1)", fontWeight: 700 }}>
              Goals
            </p>
          </div>
          {!showAdmin && role === "admin" && (
            <div onClick={() => handleCloseAdmin()}>
              <img src={CloseIcon} alt="CloseIcon" />
            </div>
          )}
        </div>

        <div className="mx-5">
          {role === "mentor" && (
            <div className="flex gap-7 mb-6 ">
              <Tabs
                value={requestTab}
                onChange={handleTab}
                sx={{
                  "& .MuiTabs-indicator": {
                    height: "5px",
                    background: "#FE634E",
                    borderRadius: "12px 12px 0px 0px",
                  },
                }}
              >
                {requestBtns?.map((e) => {
                  return (
                    <Tab
                      value={e?.key}
                      label={
                        <Typography
                          className={`!text-[14px] px-10 text-[${
                            requestTab === e.key ? "#FE634E" : "#18283D"
                          }] 
                                                    capitalize -pb-[8px]`}
                          sx={{ fontWeight: 500 }}
                        >
                          {e?.name}
                        </Typography>
                      }
                    />
                  );
                })}

                {/* <Tab value="mentee" label={
                                    <Typography className={`text-[16px] text-[${requestTab === actionBtn.key ? '#1D5BBF' : '#18283D'}] 
                                    capitalize`} sx={{ fontWeight: 500 }}>Mentee Goals</Typography>
                                } /> */}
              </Tabs>
              {/* {
                                requestBtns.map((actionBtn, index) =>
                                    <button key={index} className='px-5 py-4 text-[14px]' style={{
                                        background: requestTab === actionBtn.key ? 'linear-gradient(97.86deg, #005DC6 -15.07%, #00B1C0 112.47%)' :
                                            '#fff',
                                        border: requestTab !== actionBtn.key ? '1px solid rgba(136, 178, 232, 1)' : 'none',
                                        color: requestTab === actionBtn.key ? '#fff' : '#000',
                                        borderRadius: '30px',
                                        width: '180px'
                                    }}
                                        onClick={() => handleTab(actionBtn.key)}
                                    >{actionBtn.name}</button>
                                )
                            } */}
            </div>
          )}

          {requestTab === "mentor-goals" && !showAdmin && (
            <div className="goals-container">
              <div className="title-container flex justify-between items-center">
                <div className="flex gap-5 items-center ">
                  <p className="text-[18px] font-semibold">{title}</p>
                </div>
                <div className="flex gap-8 items-center">
                  <div
                    className="relative flex gap-3 py-3 px-3"
                    style={{
                      border: "1px solid rgba(24, 40, 61, 0.25)",
                      borderRadius: "3px",
                    }}
                  >
                    <img src={CalenderIcon} alt="CalenderIcon" />
                    <select
                      className="focus:outline-none"
                      value={allTimeFrame}
                      onChange={(e) => handleAllTimeFrame(e.target.value)}
                    >
                      {timeFrameList?.map((e) => {
                        return <option value={e?.value}>{e?.label}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="goals-info">
                <div className="goals-list flex items-center gap-4">
                  {goalsListMenu.map((goal) => (
                    <div
                      className={`goal-counts-container 
                                                ${
                                                  searchParams.get("type") ===
                                                    goal.key ||
                                                  (searchParams.get("type") ===
                                                    null &&
                                                    goal.key === "total_goals")
                                                    ? "active"
                                                    : ""
                                                }
                                            `}
                      key={goal.key}
                      onClick={() => handleGoalsClick(goal)}
                    >
                      <p>{goal.name}</p>
                      <p className="goal-count">
                        {goal?.key === "total_goals" &&
                          goalsCount?.total_goals_count}
                        {
                          goalsCount?.goals?.find((e) => e?.status === goal.key)
                            ?.goal_count
                        }
                      </p>
                    </div>
                  ))}
                  {role !== "admin" && (
                    <div
                      className="create-goal flex justify-center items-center flex-col gap-4"
                      onClick={handleOpenCreateGoalModal}
                    >
                      <p style={{ color: "#FE634E" }}>
                        {role === "mentee"
                          ? "New Goal Request"
                          : "Create New Goal"}
                      </p>
                      <img src={AddGoalIcon} alt="AddGoalIcon" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-7 py-5">
                  <div className="col-span-3">
                    {searchParams.get("type") === null ? (
                      <div>
                        <div
                          style={{
                            border: "1px solid #000000",
                            padding: "20px",
                            borderRadius: "10px",
                            margin: "60px 0",
                          }}
                        >
                          <div className="goal-title-container flex justify-between items-center mb-10">
                            <div className="flex gap-5 items-center ">
                              <p className="text-[18px] font-semibold">
                                Goals History
                              </p>
                            </div>
                            <div className="flex gap-8 items-center">
                              <div
                                className="relative flex gap-3 py-3 px-3"
                                style={{
                                  border: "1px solid rgba(24, 40, 61, 0.25)",
                                  borderRadius: "3px",
                                }}
                              >
                                <img src={CalenderIcon} alt="CalenderIcon" />

                                <select
                                  className="focus:outline-none"
                                  value={historyTimeFrame}
                                  onChange={(e) =>
                                    handleChangeHistoryTimeFrame(e.target.value)
                                  }
                                >
                                  {timeFrameList?.map((e) => {
                                    return (
                                      <option value={e?.value}>
                                        {e?.label}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                          <DataTable
                            rows={goalHistory?.results}
                            columns={goalHistoryColumn}
                            handleSelectedRow={handleSelectedRow}
                            height={650}
                            rowCount={goalHistory?.count}
                            paginationModel={historyPaginationModel}
                            setPaginationModel={setHistoryPaginationModel}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          border: "1px solid #000000",
                          padding: "10px 30px 20px",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="px-2 py-5">{title}</div>
                        <DataTable
                          rows={goals?.results}
                          columns={goalColumn}
                          handleSelectedRow={handleSelectedRow}
                          rowCount={goals?.count}
                          paginationModel={allGoalPaginationModel}
                          setPaginationModel={setAllGoalPaginationModel}
                          hideFooter={goals?.results?.length === 0}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    {/* {
                                            searchParams.get('type') === null && <GoalProgress />
                                        } */}

                    <RecentActivities />
                  </div>
                </div>
              </div>
            </div>
          )}

          {requestTab === "mentee-goals" && <MenteeGoals />}

          {showAdmin && (
            <Box>
              <Tabs
                value={adminTab}
                onChange={handleAdminTabChange}
                sx={{
                  "& .MuiTabs-indicator": {
                    height: "5px",
                    background: "#FE634E",
                    borderRadius: "12px 12px 0px 0px",
                  },
                }}
              >
                <Tab
                  value="mentor"
                  label={
                    <Typography
                      className={`text-[16px] text-[${
                        adminTab === "mentor" ? "#FE634E" : "#18283D"
                      }] 
                                    capitalize`}
                      sx={{ fontWeight: 500 }}
                    >
                      Program Manager Goals
                    </Typography>
                  }
                />
                <Tab
                  value="mentee"
                  label={
                    <Typography
                      className={`text-[16px] text-[${
                        adminTab === "mentee" ? "#FE634E" : "#18283D"
                      }] 
                                    capitalize`}
                      sx={{ fontWeight: 500 }}
                    >
                      Volunteer Goals
                    </Typography>
                  }
                />
              </Tabs>

              <Box
                className="border border-[#C6C6C6] rounded-[10px] mt-[20px]"
                p={1}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  p={2}
                >
                  <Typography className={"text-[#18283D] text-[20px]"}>
                    {adminTab === "mentor"
                      ? "Program Manager Goals"
                      : "Volunteer Goals"}
                  </Typography>
                  <div
                    className="relative flex gap-3 py-3 px-3"
                    style={{
                      border: "1px solid rgba(24, 40, 61, 0.25)",
                      borderRadius: "3px",
                    }}
                  >
                    <img src={CalenderIcon} alt="CalenderIcon" />
                    <select
                      className="focus:outline-none"
                      value={adminTimeFrame}
                      onChange={(e) => handleAdminTimeFrame(e.target.value)}
                    >
                      {timeFrameList?.map((e) => {
                        return <option value={e?.value}>{e?.label}</option>;
                      })}
                    </select>
                  </div>
                </Stack>
                <Divider></Divider>

                <Box mt={2}>
                  <DataTable
                    rows={goalHistory?.results ?? []}
                    columns={
                      adminTab === "mentor"
                        ? adminMentorColumns
                        : adminMenteeColumns
                    }
                    rowCount={goalHistory?.count}
                    paginationModel={adminTablePaginationModal}
                    setPaginationModel={setAdminTablePaginationModal}
                    hideCheckbox
                  />
                </Box>
              </Box>
            </Box>
          )}

          <CreateGoal
            open={actionModal}
            handleCloseModal={handleCloseModal}
            editMode={Object.keys(seletedItem).length}
            seletedItem={seletedItem}
          />
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmPopup?.bool && confirmPopup?.type === "complete"}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <img src={ConnectIcon} alt="ConnectIcon" />
          {/* <span style={{ color: '#232323', fontWeight: 600, fontSize: '24px' }}>{followInfo.is_following ? 'UnFollow' : 'Follow'}</span> */}

          <div className="py-5">
            <p
              style={{
                color: "rgba(24, 40, 61, 1)",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Are you sure want to Complete this goal?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center align-middle">
              <Button
                btnName="Cancel"
                btnCategory="secondary"
                onClick={() => handleCloseConfirmPopup()}
              />
              <Button
                btnType="button"
                style={{ backgroundColor: "#FE634E" }}
                btnCls="w-[110px]"
                btnName={"Complete"}
                btnCategory="primary"
                onClick={() => handleUpdateHistoryGoal()}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      {/* cancel Request */}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmPopup?.bool && confirmPopup?.type === "cancel"}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] p-[12px] justify-center items-center">
          <div className="border border-[#E50027] rounded-[15px] h-[100%] w-[100%] justify-center items-center flex flex-col relative">
            <div
              className="absolute top-[12px] right-[12px] cursor-pointer"
              onClick={() => handleCloseConfirmPopup()}
            >
              <img src={CloseReqPopup} />
            </div>
            <img src={CancelReq} alt="ConnectIcon" />

            <div className="py-5">
              <p
                style={{
                  color: "rgba(24, 40, 61, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Are you sure want to cancel this Request?
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-6 justify-center align-middle">
                <Button
                  btnName="No"
                  btnCategory="secondary"
                  btnCls="border !border-[#E50027] !text-[#E50027] w-[110px]"
                  onClick={() => handleCloseConfirmPopup()}
                />
                <Button
                  btnType="button"
                  btnCls="w-[110px] !bg-[#E50027] !text-[#fff] border !border-[#E50027]"
                  btnName={"Yes"}
                  btnCategory="secondary"
                  style={{ backgroundColor: "#FE634E" }}
                  onClick={() => handleUpdateHistoryGoal()}
                />
              </div>
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={confirmPopup?.activity}
        onClick={() => false}
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <img src={SuccessTik} alt="SuccessTik" />
            <p
              className="text-[16px] font-semibold bg-clip-text text-font-primary-main"
              style={{
                fontWeight: 600,
              }}
            >
              {confirmPopup?.type === "cancel"
                ? "Your New goal has been successfully cancelled"
                : "Your goal has been successfully completed"}
            </p>
          </div>
        </div>
      </Backdrop>

      {/* Start Goal Popup */}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={actionPopup.bool}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <img src={ConnectIcon} alt="ConnectIcon" />

          <div className="py-5">
            <p
              style={{
                color: "rgba(24, 40, 61, 1)",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Are you sure you want to Start goal?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center align-middle">
              <Button
                btnCls="w-[130px]"
                btnName="Cancel"
                btnCategory="secondary"
                onClick={() => resetActionModal()}
              />
              <Button
                btnCls="w-[130px]"
                btnType="button"
                btnName="Start goal"
                btnCategory="primary"
                onClick={() => actionButtonFunction(actionPopup?.type)}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      {/* Cancel Goal Popup */}

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={actionPopup.activity}
      >
        <div className="px-5 py-1 flex justify-center items-center">
          <div
            className="flex justify-center items-center flex-col gap-[2.25rem] py-[4rem] px-[3rem] mt-20 mb-20"
            style={{ background: "#fff", borderRadius: "10px" }}
          >
            <img src={SuccessTik} alt="SuccessTik" />
            <p
              className="text-[16px] font-semibold bg-clip-text text-font-primary-main"
              style={{
                fontWeight: 600,
              }}
            >
              {activityPopupText[actionPopup?.type]}
            </p>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default Goals;
