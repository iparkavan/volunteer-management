import React, { useEffect, useState } from "react";

import UploadIcon from "../../assets/images/image_1x.png";
import DeleteIcon from "../../assets/images/delete_1x.png";
import CancelIcon from "../../assets/images/cancel-colour1x.png";
import EditIcon from "../../assets/images/Edit1x.png";
import FileIcon from "../../assets/icons/linkIcon.svg";
import ReportUserIcon from "../../assets/images/report.png";
import SuccessTik from "../../assets/images/blue_tik1x.png";
import ReportVideoIcon from "../../assets/images/report1.png";
import ActiveGoalIcon from "../../assets/images/active-goals.png";
import InprogressGoalIcon from "../../assets/images/in-progress.png";
import CompletedGoalIcon from "../../assets/images/completed-goal.png";
import CancelGoalIcon from "../../assets/images/cancel-goals.png";
import ConnectIcon from "../../assets/images/Connectpop1x.png";
import OverDeleteIcon from "../../assets/images/delete_1x.png";
import CancelModalIcon from "../../assets/images/cancel1x.png";
import MoreIcon from "../../assets/icons/moreIcon.svg";
import ViewIcon from "../../assets/icons/View.svg";
import BatchIcon from "../../assets/icons/GoalBatch.svg";
import SearchIcon from "../../assets/icons/search.svg";
import CancelColorIcon from "../../assets/icons/cancelCircle.svg";
import { Button } from "../../shared";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MuiModal from "../../shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import {
  getGoalInfo,
  getGoalsHistory,
  updateGoalStatus,
  updateHistoryGoal,
} from "../../services/goalsInfo";
import {
  goalDataStatus,
  goalHeadingStatus,
  goalPeriods,
  goalRequestStatus,
  goalStatus,
  requestStatus,
  user,
} from "../../utils/constant";
import {
  getCategoryList,
  updateGoalRequest,
  updateLocalRequest,
} from "../../services/request";
import DataTable from "../../shared/DataGrid";
import { categoryColumns } from "../../mock";
import CloseReqPopup from "../../assets/icons/blackCloseIcon.svg";
import CancelReq from "../../assets/icons/cancelRequest.svg";
import dayjs from "dayjs";
import CreateGoal from "./CreateGoal";
import { dateFormat, dateFormatRever } from "../../utils";

const ViewGoal = ({ type = "" }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = React.useState(false);
  const location = useLocation(); // Provides access to the current URL
  const queryParams = new URLSearchParams(location.search); // Parses the query string

  const requestId = queryParams.get("requestId");
  const dispatch = useDispatch();
  const [pageloading, setPageLoading] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState({
    show: false,
    selectedItem: [],
    page: "",
    tab: "",
  });
  const [actionModal, setActionModal] = useState({
    start: false,
    started: false,
    cancel: false,
    cancelled: false,
    complete: false,
    completed: false,
  });
  const [confirmPopup, setConfirmPopup] = React.useState({
    bool: false,
    activity: false,
    type: "",
  });
  const [editActionModal, setEditActionModal] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [categoryInfo, setCategoryInfo] = useState({ search: "", list: [] });
  const { goalInfo, loading, status } = useSelector((state) => state.goals);
  console.log("goalInfo", goalInfo);
  const userInfo = useSelector((state) => state.userInfo);
  const {
    categoryList,
    loading: requestLoading,
    status: reqStatus,
  } = useSelector((state) => state.requestList);

  const role = userInfo.data.role;

  let imageIcon = ActiveGoalIcon;

  const handleActionBtn = () => {
    setActionModal({ ...actionModal, started: false, start: true });
  };

  const handleActionCompleteBtn = () => {
    setActionModal({ ...actionModal, complete: true });
  };

  const handleSubmitGoal = () => {
    dispatch(
      updateGoalStatus({ id: parseInt(goalInfo.id), status: "completed" })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setActionModal({
          ...actionModal,
          complete: false,
          completed: true,
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    });
  };

  const handleStartGoal = () => {
    const payload = {
      id: goalInfo.id,
      status: "in_progress",
      start_date: dayjs(new Date()).format("YYYY-MM-DD"),
    };
    dispatch(updateHistoryGoal(payload)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setActionModal({
          ...actionModal,
          start: false,
          started: true,
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    });
  };

  const resetActionModal = () => {
    setActionModal({
      start: false,
      started: false,
      cancel: false,
      cancelled: false,
      complete: false,
      completed: false,
    });
    dispatch(getGoalInfo(params.id));
  };

  const handleCancelGoal = () => {
    setActionModal({ ...actionModal, cancel: true, cancelled: false });
  };

  const handleCloseGoal = (e) => {
    if (e) e.preventDefault();
    if (role === "admin") {
      if (!reason.trim()) {
        setReasonError(true); // Set error if reason is empty
        return; // Prevent further action
      }
      dispatch(
        updateGoalRequest({
          goal_request_ids: [requestId],
          status: "cancel",
          description: reason,
        })
      );
    } else {
      dispatch(
        updateGoalStatus({ id: parseInt(goalInfo.id), status: "cancel" })
      ).then((res) => {
        if (res?.meta?.requestStatus === "fulfilled") {
          setActionModal({
            ...actionModal,
            cancel: false,
            cancelled: true,
          });
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      });
    }
  };

  const handleCloseActionModal = () => {
    resetActionModal();
    setReason("");
    setReasonError("");
  };

  // Category Popup Close
  const handleCloseCategoryPopup = () => {
    setCategoryPopup({ show: false, selectedItem: [], page: "", tab: "" });
  };

  const handleAcceptCancelProgramRequest = (actionType) => {
    if (actionType === "approve") {
      dispatch(getCategoryList());
    }

    if (actionType === "reject") {
      setActionModal({ ...actionModal, cancel: true });
    }
  };

  const handleSelectedItems = (selectedInfo) => {
    let data = { ...categoryPopup };
    if (selectedInfo.length) {
      data = { ...data, selectedItem: selectedInfo };
    }
    const categoryId = [];
    data.selectedItem.forEach((selected) =>
      categoryId.push(selected.categories_id)
    );
    const payload = {
      status: "accept",
      goal_request_ids: [requestId],
      category_id: selectedCategory,
    };
    dispatch(updateGoalRequest(payload));
  };

  const footerComponent = (props) => {
    return (
      <div className="flex gap-6 justify-center items-center py-4">
        <button
          onClick={() => setCategoryPopup({ show: false, selectedItem: [] })}
          className="py-3 px-6 w-[16%] border border-background-secondary-black rounded-[3px]"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleSelectedItems(props.selectedRows);
          }}
          className="text-white py-3 px-6 w-[16%] bg-background-primary-main rounded-[3px]"
        >
          Submit
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (reqStatus === requestStatus.categoryload) {
      setCategoryPopup({ show: true, selectedItem: [] });
      setTimeout(() => {
        dispatch(updateLocalRequest({ status: "" }));
      }, 2000);
    }

    if (reqStatus === requestStatus.goalupdate) {
      if (categoryPopup.show) handleCloseCategoryPopup();
      if (actionModal.cancel) resetActionModal();
      setTimeout(() => {
        dispatch(getGoalInfo(params.id));
        dispatch(updateLocalRequest({ status: "" }));
      }, 3000);
    }
  }, [reqStatus]);

  useEffect(() => {
    if (status === goalStatus.start) {
      setActionModal({
        started: true,
        start: false,
        cancel: false,
        cancelled: false,
      });
      setTimeout(() => {
        resetActionModal();
        navigate("/goals");
      }, [2000]);
    }

    if (status === goalStatus.complete) {
      setActionModal({
        started: false,
        start: false,
        cancel: false,
        completed: true,
      });
      setTimeout(() => {
        resetActionModal();
        navigate("/goals");
      }, [2000]);
    }

    if (status === goalStatus.abort) {
      setActionModal({
        started: false,
        start: false,
        cancel: false,
        cancelled: true,
      });
      setTimeout(() => {
        resetActionModal();
        navigate("/goals");
      }, [2000]);
    }
  }, [status]);

  useEffect(() => {
    dispatch(getGoalInfo(params.id));
  }, []);

  if (Object.keys(goalInfo).length) {
    switch (goalInfo.status) {
      case "inactive":
        imageIcon = CancelGoalIcon;
        break;
      case "ongoing":
        imageIcon = InprogressGoalIcon;
        break;
      case "completed":
        imageIcon = CompletedGoalIcon;
        break;
      case "aborted":
        imageIcon = CancelGoalIcon;
        break;
      default:
        imageIcon = ActiveGoalIcon;
        break;
    }
  }

  const [seletedItem, setSelectedItem] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const programTable = [
    {
      field: "category_name",
      headerName: "Category",
      flex: 1,
      id: 1,
    },
    {
      field: "program_name",
      headerName: "Program Name",
      flex: 1,
      id: 1,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return <div>{dateFormat(params.row.start_date)}</div>;
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
      id: 1,
      renderCell: (params) => {
        return <div>{dateFormat(params.row.end_date)}</div>;
      },
    },
    // {
    //     field: "created_by",
    //     headerName: "Created By",
    //     flex: 1,
    //     id: 1,
    // },
    {
      field: "participated_mentees_count",
      headerName: "Mentee Count",
      flex: 1,
      id: 1,
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
                onClick={(e) => navigate(`/program-details/${seletedItem?.id}`)}
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

  // My changes

  const handleOpenConfirmPopup = (type) => {
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
      id: params.id,
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

        // setActionModal({
        //     ...actionModal,
        //     [confirmPopup?.type === "complete" ? "complete" : "cancel"]: false,
        //     [confirmPopup?.type === "complete" ? "completed" : "cancelled"]: true
        // })
        // setTimeout(() => {
        //     navigate(-1)
        // }, 2000);

        setTimeout(() => {
          setConfirmPopup({
            ...confirmPopup,
            bool: false,
            activity: false,
            type: "",
          });
          navigate(payload?.status === "cancel" ? "/goals?type=cancel" : -1);
        }, 2000);
      }
    });
  };

  // Edit Form

  const handleCloseModal = () => {
    setEditActionModal(false);
    dispatch(getGoalInfo(params.id));
  };

  const handleOpenEditForm = () => {
    setEditActionModal(true);
  };
  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
  };
  const handleSearchCategory = (e) => {
    let catList =
      categoryList &&
      categoryList?.length > 0 &&
      categoryList.filter((list) =>
        list.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    if (e.target.value === "") catList = categoryList;
    setCategoryInfo({ search: e.target.value, list: catList });
  };
  const categoryColumn = [
    {
      field: "checkbox",
      headerName: "",
      // flex: 1,
      id: 0,
      width: 100,
      for: ["admin", "mentor"],
      renderCell: (params) => {
        return (
          <div>
            <Checkbox
              checked={selectedCategory === params?.row?.categories_id}
              onChange={() => handleSelectCategory(params.row.categories_id)}
            />
          </div>
        );
      },
    },
    ...categoryColumns,
  ];
  useEffect(() => {
    if (categoryList) {
      setCategoryInfo({ search: "", list: categoryList });
    }
  }, [categoryList]);

  return (
    <div className="px-9 py-9">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          actionModal.started || actionModal.cancelled || actionModal.completed
        }
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
              Goal is{" "}
              {actionModal.cancelled
                ? "Cancelled "
                : actionModal.completed
                ? "Completed "
                : "Stared "}{" "}
              Successfully
            </p>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || pageloading || requestLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={actionModal.start}
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
                onClick={resetActionModal}
              />
              <Button
                btnCls="w-[130px]"
                btnType="button"
                btnName="Start goal"
                btnCategory="primary"
                onClick={handleStartGoal}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={actionModal.complete}
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
              Are you sure you want to Complete this goal?
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-6 justify-center align-middle">
              <Button
                btnCls="w-[170px]"
                btnName="Cancel"
                btnCategory="secondary"
                onClick={resetActionModal}
              />
              <Button
                btnCls="w-[170px]"
                btnType="button"
                btnName="Complete"
                btnCategory="primary"
                onClick={handleSubmitGoal}
              />
            </div>
          </div>
        </div>
      </Backdrop>

      <MuiModal
        modalSize="md"
        modalOpen={actionModal.cancel && role === "admin"}
        modalClose={handleCloseActionModal}
        noheader
      >
        <div className="px-5 py-5">
          <div
            className="flex justify-center flex-col gap-5  mt-4 mb-4"
            style={{
              border: "1px solid rgba(29, 91, 191, 1)",
              borderRadius: "10px",
            }}
          >
            <div
              className="flex justify-between px-3 py-4 items-center"
              style={{ borderBottom: "1px solid rgba(29, 91, 191, 1)" }}
            >
              <p className="text-[18px]" style={{ color: "rgba(0, 0, 0, 1)" }}>
                Reject Request Reason{" "}
              </p>
              <img
                className="cursor-pointer"
                onClick={handleCloseActionModal}
                src={CancelIcon}
                alt="CancelIcon"
              />
            </div>

            <div className="px-5">
              <form onSubmit={handleCloseGoal}>
                <div className="relative pb-8">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Reject Reason <span style={{ color: "red" }}>{"*"}</span>
                  </label>

                  <div className="relative">
                    <textarea
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                        setReasonError(false);
                      }}
                      id="message"
                      rows="4"
                      className={`block p-2.5 input-bg w-full text-sm text-black  border
                               focus-visible:outline-none focus-visible:border-none h-[130px]`}
                      placeholder={""}
                      style={{ border: "1px solid black" }}
                    ></textarea>
                    {reasonError && (
                      <p className="text-red-500 text-xs mt-1">
                        Please provide a reason for rejection.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center gap-5 items-center pt-5 pb-10">
                  <Button
                    btnName="Cancel"
                    btnCls="w-[18%]"
                    btnCategory="secondary"
                    onClick={handleCloseActionModal}
                  />
                  <button
                    type="submit"
                    className="text-white py-3 px-7 w-[18%]"
                    style={{
                      background:
                        "linear-gradient(93.13deg, #00AEBD -3.05%, #1D5BBF 93.49%)",
                      borderRadius: "3px",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MuiModal>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={actionModal.cancel && role !== "admin"}
      >
        <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
          <div
            style={{ borderRadius: "15px" }}
            className="relative flex flex-col gap-2 justify-center 
                        items-center py-14 px-16"
          >
            {/* <img className='absolute top-2 right-3 cursor-pointer' onClick={handleCloseActionModal}
                            src={CancelModalIcon} alt="CancelIcon" /> */}

            <img
              className="w-[50px]"
              src={role === "admin" ? CancelColorIcon : OverDeleteIcon}
              alt="OverDeleteIcon"
            />
            {role === "admin" && (
              <div
                className="text-[24px] font-semibold"
                style={{ color: "#000" }}
              >
                Reject
              </div>
            )}

            <div className="py-5 mb-3">
              <p
                style={{
                  color: "rgba(24, 40, 61, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Are you sure want to {role === "admin" ? "reject " : "cancel "}{" "}
                this goal?
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-6 justify-center align-middle">
                <button
                  style={{
                    border: "1px solid rgba(229, 0, 39, 1)",
                    color: "rgba(229, 0, 39, 1)",
                    borderRadius: "3px",
                    width: "130px",
                    padding: "13px",
                  }}
                  onClick={handleCloseActionModal}
                >
                  No
                </button>
                <button
                  style={{
                    background: "rgba(229, 0, 39, 1)",
                    color: "#fff",
                    borderRadius: "3px",
                    width: "130px",
                    padding: "13px",
                  }}
                  onClick={handleCloseGoal}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={reqStatus === requestStatus.goalupdate}
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
              Goal request is updated Successfully
            </p>
          </div>
        </div>
      </Backdrop>

      {/* { 'Select Categort Popup'} */}
      <MuiModal
        modalSize="md"
        modalOpen={categoryPopup.show}
        modalClose={handleCloseCategoryPopup}
        noheader
      >
        <div className="px-5 py-5">
          <div
            className="flex justify-center flex-col gap-5 px-5 pb-5 mt-4 mb-4"
            style={{
              border: "1px solid rgba(0, 0, 0, 1)",
              borderRadius: "10px",
            }}
          >
            <div className="flex justify-between px-3 py-4 items-center border-b border-background-primary-main">
              <p className="text-[18px]" style={{ color: "rgba(0, 0, 0, 1)" }}>
                Select Category
              </p>
              <img
                className="cursor-pointer"
                onClick={handleCloseCategoryPopup}
                src={CancelIcon}
                alt="CancelIcon"
              />
            </div>
            <div className="flex justify-between px-3 mb-4">
              <div className="relative w-full">
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 text-sm text-gray-900 border-none"
                  placeholder="Search here..."
                  style={{
                    border: "1px solid #FE634E",
                    borderRadius: "50px",
                    height: "60px",
                    width: "100%",
                  }}
                  onChange={handleSearchCategory}
                  value={categoryInfo.search}
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <img src={SearchIcon} alt="SearchIcon" />
                </div>
              </div>
            </div>

            <DataTable
              rows={categoryInfo.list}
              columns={categoryColumn}
              height={"460px"}
              footerComponent={footerComponent}
              hideCheckbox
              selectedAllRows={categoryPopup.selectedItem}
            />
          </div>
        </div>
      </MuiModal>

      {Object.keys(goalInfo).length && !loading ? (
        <div
          className="px-3 py-5"
          style={{ boxShadow: "4px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
        >
          {/* <div className='flex justify-between px-5 pb-4 mb-8 items-center border-b-2'>
                            <div className='flex gap-5 items-center text-[20px]'>
                                <p>Goals </p>
                            </div>
                        </div> */}

          <div
            className="px-4"
            style={{
              border: "1px solid rgba(223, 237, 255, 1)",
              borderRadius: "10px",
            }}
          >
            <div className="">
              <div className="flex justify-between px-5 py-5 items-center border-b-2">
                <div className="flex gap-5 items-center text-[20px]">
                  <p>{goalHeadingStatus[goalInfo.status]}</p>
                  {goalInfo.status === "new" && role !== user.admin && (
                    <div
                      className="inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      onClick={() => handleOpenEditForm()}
                    >
                      <img src={EditIcon} alt="EditIcon" />
                    </div>
                  )}
                </div>

                <div className="flex gap-8 items-center">
                  <div className="relative">
                    <div
                      className="inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      onClick={() => navigate(-1)}
                    >
                      <img src={CancelIcon} alt="CancelIcon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-8 py-12 px-9">
              <div className="col-span-2">
                <img className="w-full" src={imageIcon} alt="ActiveGoalIcon" />
              </div>
              <div className="col-span-3 relative">
                <h3
                  className="text-[28px]"
                  style={{ color: "rgba(24, 40, 61, 1)", fontWeight: 700 }}
                >
                  {goalInfo.description}
                </h3>
                {goalInfo.status === "completed" && (
                  <img
                    className="absolute top-0 right-0"
                    src={BatchIcon}
                    alt="BatchIcon"
                  />
                )}

                <div className="py-7">
                  <table className="w-[100%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 !bg-white">
                    <tbody>
                      <tr className="bg-white text-black">
                        <th
                          scope="row"
                          className="px-0 pr-4 py-2 font-medium whitespace-nowrap w-[40px]"
                        >
                          Start date:
                        </th>
                        <td className="px-0 py-2">
                          {dateFormatRever(goalInfo.start_date)}
                        </td>
                      </tr>
                      <tr className="bg-white text-black">
                        <th
                          scope="row"
                          className="px-0 pr-4 py-2 font-medium  whitespace-nowrap w-[40px]"
                        >
                          Duration:
                        </th>
                        <td className="px-0 py-2">
                          {
                            goalPeriods.find(
                              (goalPeriod) =>
                                parseInt(goalPeriod.value) ===
                                parseInt(goalInfo.period)
                            )?.name
                          }
                        </td>
                      </tr>
                      <tr className="bg-white text-black">
                        <th
                          scope="row"
                          className="px-0 pr-4 py-2 font-medium whitespace-nowrap w-[40px]"
                        >
                          Status:
                        </th>
                        <td className="px-0 py-2">
                          {goalRequestStatus[goalInfo.status]}&nbsp;&nbsp;Goal
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Typography className="text-[18px] mt-[20px] pt-7 text-[#3E3E3E]">
                    {goalInfo?.description}
                  </Typography>
                </div>
                <div className="leading-8">{goalInfo.goal_description}</div>
                {goalInfo?.admin_goal_request_description && (
                  <div className="border border-[#E0382D] rounded-[5px] bg-[#FFE7E7]">
                    <Typography
                      className="text-[#E0382D] !text-[22px] border border-b-[#E0382D]"
                      p={"12px 20px"}
                    >
                      Cancelled Reason
                    </Typography>
                    <Typography
                      className="text-[#18283D] !text-[14px]"
                      p={"12px 20px"}
                    >
                      {goalInfo?.admin_goal_request_description}
                    </Typography>
                  </div>
                )}

                <div className="flex items-center py-9 gap-4">
                  {/* {
                                            (goalInfo.status === 'completed' || type === 'mentor') &&
                                            <>
                                                <Button
                                                    onClick={() => navigate('/goals')}
                                                    btnName={'Close'} btnCatergory="primary"
                                                    style={{ background: '#FE634E', borderRadius: '27px', width: '180px' }} />
                                            </>
                                        } */}

                  {type === "" && role !== "admin" && (
                    <>
                      {goalInfo.status === "in_progress" && (
                        <>
                          <Button
                            btnName="Cancel Goal"
                            style={{
                              border: "1px solid rgba(0, 0, 0, 1)",
                              borderRadius: "4px",
                              width: "180px",
                              color: "rgba(24, 40, 61, 1)",
                            }}
                            onClick={handleCancelGoal}
                          />
                          <Button
                            onClick={handleActionCompleteBtn}
                            btnName={"Complete Goal"}
                            btnCatergory="primary"
                            style={{
                              background: "#FE634E",
                              borderRadius: "4px",
                              width: "180px",
                            }}
                          />
                          {/* <Button
                                                            onClick={() => navigate('/goals')}
                                                            btnName={'Close'} btnCatergory="primary"
                                                            style={{ background: '#FE634E', borderRadius: '27px', width: '180px' }} /> */}
                        </>
                      )}

                      {goalInfo.status === "active" && (
                        <>
                          {/* <Button btnName="Back" style={{ border: '1px solid rgba(29, 91, 191, 1)', borderRadius: '4px', width: '180px', color: 'rgba(29, 91, 191, 1)' }}
                                                            onClick={() => navigate('/goals')}
                                                        /> */}
                          <Button
                            onClick={() => handleOpenConfirmPopup("cancel")}
                            btnName={"Cancel"}
                            btnCategory="secondary"
                            btnCls="border !border-[#E0382D] !text-[#E0382D] w-[140px] bg-[#fff]"
                          />

                          {/* <Button
                                                            onClick={handleActionBtn}
                                                            btnName={'Start'} btnCatergory="primary" style={{ background: '#FE634E', borderRadius: '4px', width: '140px' }} /> */}
                        </>
                      )}

                      {(goalInfo.status === "cancel" ||
                        goalInfo.status === "accept" ||
                        goalInfo?.status === "completed") && (
                        <>
                          <Button
                            btnName={
                              goalInfo?.status === "completed"
                                ? "Close"
                                : "Back"
                            }
                            style={{
                              border: "1px solid rgba(29, 91, 191, 1)",
                              width: "180px",
                              color: "rgba(29, 91, 191, 1)",
                            }}
                            onClick={() =>
                              navigate(
                                goalInfo?.status === "completed"
                                  ? "/goals?type=completed"
                                  : -1
                              )
                            }
                          />

                          <Button
                            onClick={() => handleOpenEditForm()}
                            btnName={"Re-Create Goal"}
                            btnCatergory="primary"
                            style={{ background: "#FE634E", width: "180px" }}
                          />
                        </>
                      )}
                    </>
                  )}
                  {type && (
                    <Button
                      btnName={"Close"}
                      style={{
                        border: "1px solid rgba(29, 91, 191, 1)",
                        width: "180px",
                        color: "rgba(29, 91, 191, 1)",
                      }}
                      onClick={() => navigate(-1)}
                    />
                  )}
                  {role === "admin" && goalInfo.status !== "completed" ? (
                    <>
                      {goalInfo.status === "inactive" ||
                      ["new", "pending"].includes(goalInfo?.status) ? (
                        <>
                          <button
                            className="py-3 px-16 text-white text-[14px] flex items-center"
                            style={{
                              border: "1px solid #E0382D",
                              borderRadius: "5px",
                              color: "#E0382D",
                            }}
                            onClick={() =>
                              handleAcceptCancelProgramRequest(
                                "reject",
                                params.id
                              )
                            }
                          >
                            Reject Request
                          </button>
                          <button
                            className="py-3 px-16 text-white text-[14px] flex items-center"
                            style={{
                              background: "#16B681",
                              borderRadius: "5px",
                            }}
                            onClick={() =>
                              handleAcceptCancelProgramRequest(
                                "approve",
                                params.id
                              )
                            }
                          >
                            Approve Request
                          </button>
                        </>
                      ) : (
                        // (goalInfo.status === 'aborted' || goalInfo.status === 'cancel') ?
                        //     <button className='py-3 px-16 text-white text-[14px] flex items-center' style={{
                        //         border: "1px solid #E0382D",
                        //         borderRadius: '5px',
                        //         color: '#E0382D',
                        //         cursor: 'not-allowed'
                        //     }}
                        //         onClick={() => undefined}
                        //     >Cancelled
                        //     </button>
                        //     :
                        <>
                          {![
                            "new",
                            "pending",
                            "in_progress",
                            "aborted",
                            "cancel",
                          ].includes(goalInfo?.status) && (
                            <button
                              className="py-3 px-16 text-white text-[14px] flex items-center"
                              style={{
                                background: "#16B681",
                                borderRadius: "5px",
                                cursor: "not-allowed",
                              }}
                              onClick={undefined}
                            >
                              Approved
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ) : null}
                  {["new", "pending"].includes(goalInfo?.status) &&
                    role !== "admin" && (
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Button
                          onClick={() => handleOpenConfirmPopup("cancel")}
                          btnName={"Cancel"}
                          btnCategory="secondary"
                          btnCls="border !border-[#E0382D] !text-[#E0382D] w-[140px] bg-[#fff]"
                        />

                        <Button
                          onClick={() => handleOpenEditForm()}
                          btnName={"Edit"}
                          btnCategory="primary"
                          btnCls="w-[140px]"
                        />
                      </Stack>
                    )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              {goalInfo?.programs.length > 0 && (
                <DataTable
                  rows={goalInfo?.programs ?? []}
                  columns={programTable}
                  hideCheckbox
                  hideFooter
                />
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Edit Goal Form */}
      <CreateGoal
        open={editActionModal}
        handleCloseModal={handleCloseModal}
        editMode={goalInfo?.status === "completed" ? false : true}
        seletedItem={goalInfo}
        recreate={
          ["new", "completed"].includes(goalInfo?.status) ? false : true
        }
      />

      {/* request popup */}

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
                Are you sure want to cancel this Goal?
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
    </div>
  );
};

export default ViewGoal;
