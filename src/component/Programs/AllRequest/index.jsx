import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "../../../shared/Card";
import {
  adminRequestOverview,
  menteesRequestOverview,
  myRequestOverview,
  requestStatus,
  RequestStatus,
  RequestStatusArray,
  requestStatusColor,
  requestStatusText,
  user,
} from "../../../utils/constant";
import SearchIcon from "../../../assets/icons/search.svg";
import Edit_Icon from "../../../assets/icons/editIcon.svg";
import LinkIcon from "../../../assets/images/link1x.png";
import CalendarIcon from "../../../assets/images/calender_1x.png";
import MoreIcon from "../../../assets/icons/moreIcon.svg";
import TickCircle from "../../../assets/icons/tickCircle.svg";
import Bg_verificatin_icon from "../../../assets/icons/bg-verification-icon.svg";
import DocuSign_icon from "../../../assets/icons/docu-sign-icon.svg";
import CloseCircle from "../../../assets/icons/closeCircle.svg";
import ViewIcon from "../../../assets/images/view1x.png";
import CancelIcon from "../../../assets/images/cancel1x.png";
import TickColorIcon from "../../../assets/icons/tickColorLatest.svg";
import CancelColorIcon from "../../../assets/icons/cancelCircle.svg";
import SuccessTik from "../../../assets/images/blue_tik1x.png";
import ShareIcon from "../../../assets/images/share1x.png";
import DataTable from "../../../shared/DataGrid";
import {
  categoryColumns,
  certificateRequestColumns,
  goalsRequestColumns,
  learningAccessRequestsColumns,
  memberMenteeRequestColumns,
  memberMentorRequestColumns,
  newGoalsRequestsColumns,
  programExtendRequestColumns,
  programRequestColumns,
  reportRequestColumns,
  resourceAccessRequestColumns,
  techinicalSupportRequestColumns,
  testimonialRequestColumns,
} from "../../../mock";

import "./request.css";

import {
  cancelMemberRequest,
  certificateRequest,
  getCategoryList,
  getExtendProgramRequest,
  getlearningAccessRequest,
  getMemberRequest,
  getprogramRequest,
  getReopenRequest,
  getReportRequest,
  getResourceRequest,
  getTestimonialRequest,
  goalsRequest,
  updateCertificateRequest,
  updateGoalRequest,
  updateLocalRequest,
  updateMemberRequest,
  updateProgramMenteeRequest,
  updateProgramRequest,
  updateReportRequest,
  updateTestimonial,
} from "../../../services/request";
import ToastNotification from "../../../shared/Toast";
import MuiModal from "../../../shared/Modal";
import { useForm } from "react-hook-form";
import { Button } from "../../../shared";
import { SelectBox } from "../../../shared/SelectBox";
import { getAllGoals } from "../../../services/goalsInfo";
import { docuSign } from "../../../services/activities";

export default function AllRequest() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userInfo = useSelector((state) => state.userInfo);
  const role = userInfo.data.role;
  const currentTab =
    searchParams?.type === "goal_request"
      ? "mentor"
      : role === "mentee"
      ? "program_join"
      : "program_new";
  const dispatch = useDispatch();
  const {
    programRequest: programTableInfo,
    programExtend: programExtendRequests,
    memberRequest,
    resourceRequest,
    categoryList,
    goalsRequest: goalsRequestInfo,
    certificateRequestList,
    reportsRequest: reportsRequestInfo,
    learningAccessRequests,
    testimonialRequest,
    loading,
    status,
    error,
    reopenRequest,
  } = useSelector((state) => state.requestList);
  const { goalsList, loading: goalLoading } = useSelector(
    (state) => state.goals
  );
  const [currentRequestTab, setCurrentRequestTab] = useState(
    RequestStatus.programRequest
  );
  const [categoryInfo, setCategoryInfo] = useState({ search: "", list: [] });
  const [filterStatus, setFilterStatus] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState({ search: "", filter_by: "" });
  const open = Boolean(anchorEl);
  const selectedRequestedtype = searchParams.get("type");
  const [actionTab, setActiveTab] = useState(currentTab);
  const [actionTabFilter, setActionTabFilter] = useState([]);
  const [requestOverview, setRequestOverview] = useState([]);
  const [activeTableDetails, setActiveTableDetails] = useState({
    column: [],
    data: [],
  });
  const [message, setMessage] = useState(false);
  const [showShare, setShowShare] = React.useState(false);
  const [seletedItem, setSelectedItem] = useState({});
  const [confirmPopup, setConfirmPopup] = useState({
    show: false,
    title: "",
    type: "",
    action: "",
  });
  const [cancelPopup, setCancelPopup] = useState({ show: false, page: "" });
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const [categoryPopup, setCategoryPopup] = useState({
    show: false,
    selectedItem: [],
    page: "",
    tab: "",
  });
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });

  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const [selectedTab, setSelectedTab] = React.useState(
    role === "mentee" ? "mentees" : "my"
  );
  const shareUrl = `${process.env.REACT_APP_SITE_URL}/program-details/${seletedItem.program}`;
  const handleChange = (newAlignment) => () => {
    setSelectedTab(newAlignment);
    setFilterStatus("all");
    // handleResetTab()
    // navigate(`?type=program_request`)
    navigate(
      newAlignment === "admin" && role === "admin"
        ? `/all-request?type=testimonial_request`
        : `/all-request?type=program_request`
    );
    setFilter({
      ...filter,
      filter_by: "",
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  let programRequestTab = [
    {
      name: "Program Request",
      key: "program_new",
      for: ["admin", "mentor"],
      forTabs: ["my"],
    },
    {
      name: "Joining Request",
      key: "program_join",
      for: ["mentee", "mentor"],
      forTabs: ["mentees"],
    },
    {
      name: "Rescheduled Programs",
      key: "program_reschedule",
      for: ["mentor", "admin"],
      forTabs: ["my"],
    },
    {
      name: "Program Join",
      key: "program_join",
      for: ["mentor", "mentee", "admin"],
      forTabs: role === "mentee" ? ["my"] : role === "admin" ? ["mentees"] : [],
    },
    {
      name: "Cancelled Programs",
      key: "program_cancel",
      for: ["mentor", "mentee", "admin"],
      forTabs: ["my", "mentees"],
    },
  ];

  programRequestTab = programRequestTab.filter(
    (tab) => tab.for.includes(role) && tab.forTabs.includes(selectedTab)
  );

  const memberJoinRequestTab = [
    {
      name: "Program Manager Request",
      key: "mentor",
      // for: ["mentor"]
    },
    {
      name: "Volunteer Request",
      key: "mentee",
      // for: ["mentees"]
    },
  ];

  const requestActionTab = [
    {
      name: "My Request",
      value: "my",
    },
    {
      name: "Volunteer Request",
      value: "mentees",
    },
    // {
    //   name: "Supervisor Request",
    //   value: "admin",
    // },
  ];

  const requestAdminActionTab = [
    {
      name: "Program Manager Request",
      value: "my",
    },
    {
      name: "Volunteers Request",
      value: "mentees",
    },
    {
      name: "My Request",
      value: "admin",
    },
  ];

  const goalsRequestTab = [
    {
      name: "Program Manager Goals",
      key: "mentor",
      for: ["my", "mentor"],
    },
    {
      name: "Volunteer goals",
      key: "mentee",
      for: ["my", "mentor", "mentee"],
    },
  ];

  const resourceAccessRequestTab = [
    {
      name: "Program Manager Resources",
      key: "mentor",
    },
    {
      name: "Volunteer Resources",
      key: "mentee",
    },
  ];

  const statusOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "New",
      value: "new",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label:
        selectedRequestedtype === "goal_request" ||
        selectedRequestedtype === "new_goals_request" ||
        selectedRequestedtype === "member_join_request"
          ? "Accepted"
          : "Approved",
      value:
        selectedRequestedtype === "goal_request" ||
        selectedRequestedtype === "new_goals_request" ||
        selectedRequestedtype === "member_join_request"
          ? "accept"
          : "approved",
    },
    {
      label:
        selectedRequestedtype === "goal_request" ||
        selectedRequestedtype === "new_goals_request" ||
        selectedRequestedtype === "member_join_request"
          ? "Cancelled"
          : "Rejected",
      value:
        selectedRequestedtype === "goal_request" ||
        selectedRequestedtype === "new_goals_request" ||
        selectedRequestedtype === "member_join_request"
          ? "cancel"
          : "rejected",
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
      })
      .catch(() => {
        setMessage(false);
      });
  };
  const handleCloseNotify = () => {
    setMessage(false);
  };
  const handleMoreClick = (event, data) => {
    setSelectedItem(data);
    setAnchorEl(event.currentTarget);
  };

  // Reset Confirm Popup
  const resetConfirmPopup = () => {
    setConfirmPopup({
      show: false,
      title: "",
      requestType: "",
      type: "",
      action: "",
    });
  };

  // Open Confirm Popup
  const handleOpenConfirmPopup = (
    title,
    pageType,
    request,
    type = "approve"
  ) => {
    setConfirmPopup({
      show: true,
      title: title,
      requestType: pageType,
      type: type,
      action: request,
    });
  };

  // Confirm Accept Popup
  const handleConfirmPopup = () => {
    if (confirmPopup.requestType === "program_request") {
      handleAcceptProgramApiRequest();
    }

    if (confirmPopup.requestType === "member_join_request") {
      if (confirmPopup.type === "reject") {
        handleCancelMemberApiRequest();
      }
    }

    if (confirmPopup.requestType === "report_request") {
      if (confirmPopup.type === "approve") {
        handleAcceptReportApiRequest();
      }
    }
    if (confirmPopup.requestType === "certificate_request") {
      if (confirmPopup.type === "approve") {
        handleApproveCertificateApiRequest();
      }
      if (confirmPopup.type === "reject") {
        handleCancelCertificateApiRequest();
      }
    }

    if (confirmPopup.requestType === "testimonial_request") {
      handleTestimonialRequest();
    }
  };

  const handleTestimonialRequest = () => {
    const payload = {
      request_id: seletedItem?.request_id,
      action: confirmPopup.type === "approve" ? "accept" : "reject",
    };

    dispatch(updateTestimonial(payload));
  };

  // Cancel Accept Popup
  const handleCancelConfirmPopup = () => {
    resetConfirmPopup();
  };
  // Certificate Approve
  const handleApproveCertificateApiRequest = () => {
    dispatch(
      updateCertificateRequest({
        id: seletedItem.id,
        status: "approved",
      })
    );
  };

  const handleCancelCertificateApiRequest = (reason = "") => {
    dispatch(
      updateCertificateRequest({
        id: seletedItem.id,
        status: "rejected",
        rejection_reason: reason,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseCancelReasonPopup();
      }
    });
  };

  const handleCancelMemberJoinApiRequest = (reason = "") => {
    dispatch(
      updateCertificateRequest({
        id: seletedItem.id,
        status: "rejected",
        rejection_reason: reason,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseCancelReasonPopup();
      }
    });
  };

  // ACCEPT API CALLS

  // Accepting Program Request Api Call
  const handleAcceptProgramApiRequest = () => {
    if (role === "admin") {
      dispatch(
        updateProgramRequest({
          id: seletedItem.id,
          status: "approved",
        })
      );
    }

    if (role === "mentor") {
      dispatch(
        updateProgramMenteeRequest({
          id: seletedItem.id,
          status: "approved",
        })
      );
    }
  };

  // Accepting Report Request Api Call
  const handleAcceptReportApiRequest = () => {
    dispatch(
      updateReportRequest({
        id: seletedItem.id,
        status: "approved",
      })
    );
  };

  // Cancel Goal Request Api Call
  const handleCancelGoalApiRequest = (reason = "") => {
    dispatch(
      updateGoalRequest({
        status: "cancel",
        goal_request_ids: [seletedItem.id],
        description: reason,
      })
    ).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        handleCloseCancelReasonPopup();
      }
    });
  };

  // Cancel Member Request Api Call
  const handleCancelMemberApiRequest = () => {
    dispatch(
      cancelMemberRequest({
        member_id: seletedItem.id,
      })
    );
  };

  // Close Cancel Reason Popup
  const handleCloseCancelReasonPopup = () => {
    resetCancelReasonPopup();
    reset();
  };

  // Reset Cancel Popup
  const resetCancelReasonPopup = () => {
    setCancelPopup({ show: false, page: "" });
  };

  // Cancel Reason Popup Submit
  const handleCancelReasonPopupSubmit = (data) => {
    if (data.cancel_reason !== "") {
      if (cancelPopup.show) {
        if (cancelPopup.page === "program_request") {
          if (role === "admin") {
            dispatch(
              updateProgramRequest({
                id: seletedItem.id,
                status: "rejected",
                reason: data.cancel_reason,
              })
            ).then((res) => {
              if (res?.meta?.requestStatus === "fulfilled") {
                handleCloseCancelReasonPopup();
              }
            });
          }

          if (role === "mentor") {
            dispatch(
              updateProgramMenteeRequest({
                id: seletedItem.id,
                status: "rejected",
                rejection_reason: data.cancel_reason,
              })
            ).then((res) => {
              if (res?.meta?.requestStatus === "fulfilled") {
                handleCloseCancelReasonPopup();
              }
            });
          }

          if (role === "mentee") {
            dispatch(
              updateProgramRequest({
                id: seletedItem.id,
                status: "rejected",
                reason: data.cancel_reason,
              })
            ).then((res) => {
              if (res?.meta?.requestStatus === "fulfilled") {
                handleCloseCancelReasonPopup();
              }
            });
          }
        }

        if (cancelPopup.page === "report_request") {
          dispatch(
            updateReportRequest({
              id: seletedItem.id,
              status: "rejected",
              rejection_reason: data.cancel_reason,
            })
          ).then((res) => {
            if (res?.meta?.requestStatus === "fulfilled") {
              handleCloseCancelReasonPopup();
            }
          });
        }

        if (
          cancelPopup.page === "goal_request" ||
          cancelPopup.page === "new_goals_request"
        ) {
          handleCancelGoalApiRequest(data.cancel_reason);
        }

        if (cancelPopup.page === "certificate_request") {
          handleCancelCertificateApiRequest(data?.cancel_reason);
        }

        if (cancelPopup.page === "member_join_request") {
          handleCancelMemberJoinApiRequest(data?.cancel_reason);
        }
      }
    }
  };

  // PROGRAM

  // Program Dropwdowm Accept
  const handleAcceptProgramRequest = () => {
    handleOpenConfirmPopup(
      "Program Request",
      currentRequestTab.key,
      actionTab,
      "approve"
    );
    handleClose();
  };

  // Program Dropdown Cancel
  const handleCancelProgramRequest = () => {
    setCancelPopup({ show: true, page: currentRequestTab.key });
    handleClose();
  };

  // MEMBERS

  // Member Drodown Accept
  const handleMemberAcceptRequest = () => {
    dispatch(getCategoryList());
    handleClose();
  };

  // Member Drodown Cancel
  const handleMemberCancelRequest = () => {
    handleOpenConfirmPopup(
      `${actionTab === "mentor" ? "Program Manager " : "Volunteer "} Request`,
      currentRequestTab.key,
      actionTab,
      "reject"
    );
    // setCancelPopup({ show: true, page: currentRequestTab.key });
    handleClose();
  };

  // REPORTS
  const handleAcceptReportsRequest = () => {
    handleOpenConfirmPopup(
        "Report Request",
        currentRequestTab.key,
        actionTab,
        "approve"
    );
    // setCancelPopup({ show: true, page: currentRequestTab.key });
    handleClose();
  };
  // Certificate
  const handleAcceptCeritificateRequest = () => {
    handleOpenConfirmPopup(
      "Certificate Request",
      currentRequestTab.key,
      actionTab,
      "approve"
    );
    handleClose();
  };
  const handleCancelCeritificateRequest = () => {
    // handleOpenConfirmPopup(
    //     "Certificate Request",
    //     currentRequestTab.key,
    //     actionTab,
    //     "reject"
    // );
    setCancelPopup({ show: true, page: currentRequestTab.key });
    handleClose();
  };

  const handleCancelTestimonialRequest = () => {
    handleOpenConfirmPopup(
      "Testimonial Request",
      currentRequestTab.key,
      actionTab,
      "reject"
    );
    handleClose();
  };

  // Program Dropdown Cancel
  const handleCancelReportRequest = () => {
    setCancelPopup({ show: true, page: currentRequestTab.key });
    handleClose();
  };

  // GOAL

  // Goal Dropdown Accept
  const handleAcceptGoalRequest = () => {
    dispatch(getCategoryList());
    handleClose();
  };

  // Goal Dropdown Cancel
  const handleCancelGoalRequest = () => {
    // handleOpenConfirmPopup('Goal Request', currentRequestTab.key, actionTab, 'reject')
    setCancelPopup({ show: true, page: currentRequestTab.key });
    handleClose();
  };

  // Category Popup Close
  const handleCloseCategoryPopup = () => {
    setCategoryPopup({ show: false, selectedItem: [], page: "", tab: "" });
    setSelectedCategory("");
  };
// Docsign
const handleRedirectDocuSign = () => {
    dispatch(docuSign()).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        const url = res?.payload?.url ?? "#";
        window.open(url, "_blank");
      }
    });
  };
  // Handle Selected Items for Category
  const handleSelectedItems = (selectedInfo) => {
    let data = { ...categoryPopup };
    if (selectedInfo.length) {
      data = { ...data, selectedItem: selectedInfo };
    }
    if (categoryPopup.page === "goal_request") {
      const payload = {
        status: "accept",
        goal_request_ids: [seletedItem.id],
        category_id: selectedCategory,
      };
      dispatch(updateGoalRequest(payload));
    }

    if (categoryPopup.page === "member_join_request") {
      const categoryId = [];
      data.selectedItem.forEach((selected) =>
        categoryId.push(selected.categories_id)
      );
      const payload = {
        member_id: seletedItem.id,
        categories_id: selectedCategory,
      };
      dispatch(updateMemberRequest(payload));
    }
  };

  const requestList = requestOverview.filter((request) =>
    request.for.includes(role)
  );

  let programRequestColumn = programRequestColumns.filter((request) =>
    request.for.includes(role)
  );
  let programExtendRequestColumn = programExtendRequestColumns.filter(
    (request) => request.for.includes(role)
  );

  if (actionTab !== "program_start") {
    programRequestColumn = programRequestColumn.filter(
      (column) => column.field !== "auto_approval"
    );
  }

  programRequestColumn = [
    ...programRequestColumn,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      mainTab: ["my", "mentees", "admin"],
      tab: [
        "program_cancel",
        "program_join",
        "program_reschedule",
        "program_new",
      ],
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
              </span>
            </div>
          </>
        );
      },
    },
    {
      ...// role !== "mentee" &&
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        id: 4,
        mainTab: ["my", "mentees", "admin"],
        tab: [
          "program_cancel",
          "program_join",
          "program_reschedule",
          "program_new",
        ],
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
                    const requestQuery = `&request_id=${seletedItem.id}`;
                    const url =
                      (role === "mentor" || role === "admin") &&
                      actionTab === "program_join"
                        ? `/mentee-details/${seletedItem.created_by}?type=mentee_request${requestQuery}&from=program_join`
                        : role === "admin"
                        ? `/program-details/${seletedItem.program}?request_id=${seletedItem.id}&type=${actionTab}`
                        : seletedItem?.status === "approved"
                        ? `/program-details/${seletedItem.program}?request_id=${seletedItem.id}&type=${actionTab}`
                        : `/program-details/${seletedItem.program}?request_id=${seletedItem.id}&type=${actionTab}`;
                    return navigate(url, { state: { data: seletedItem } });
                  }}
                  className="!text-[12px]"
                >
                  <img
                    src={ViewIcon}
                    alt="ViewIcon"
                    className="pr-3 w-[30px]"
                  />
                  View
                </MenuItem>

                {["new", "pending"].includes(seletedItem.status) &&
                  role === "mentor" &&
                  selectedTab !== "my" && (
                    <>
                      {
                        <MenuItem
                          onClick={handleAcceptProgramRequest}
                          className="!text-[12px]"
                        >
                          <img
                            src={TickCircle}
                            alt="AcceptIcon"
                            className="pr-3 w-[27px]"
                          />
                          {actionTab === "program_cancel"
                            ? "Accept"
                            : "Approve"}
                        </MenuItem>
                      }
                      <MenuItem
                        onClick={handleCancelProgramRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        {actionTab === "program_cancel" ? "Continue" : "Reject"}
                      </MenuItem>
                    </>
                  )}

                {["new", "pending"].includes(seletedItem.status) &&
                  role === "admin" && (
                    <>
                      {
                        <MenuItem
                          onClick={handleAcceptProgramRequest}
                          className="!text-[12px]"
                        >
                          <img
                            src={TickCircle}
                            alt="AcceptIcon"
                            className="pr-3 w-[27px]"
                          />
                          {actionTab === "program_cancel"
                            ? "Accept"
                            : "Approve"}
                        </MenuItem>
                      }
                      <MenuItem
                        onClick={handleCancelProgramRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        {actionTab === "program_cancel" ? "Continue" : "Reject"}
                      </MenuItem>
                    </>
                  )}

                {["new", "pending"].includes(seletedItem.status) &&
                  (role === "mentor" || role === "mentee") &&
                  selectedTab === "my" &&
                  (actionTab === "program_new" ||
                    actionTab === "program_reschedule" ||
                    actionTab === "program_cancel" ||
                    actionTab === "program_join") && (
                        <div>
                        {![
                          "program_reschedule",
                          "program_cancel",
                          "program_join",
                        ].includes(actionTab) && (
                          <MenuItem
                            onClick={() => {
                              navigate(`/update-program/${seletedItem.program}`);
                            }}
                            className="!text-[12px]"
                          >
                            <img
                              src={Edit_Icon}
                              alt="CancelIcon"
                              className="pr-3 w-[27px]"
                            />
                            Edit
                          </MenuItem>
                        )}
                        <MenuItem
                          onClick={() => {
                            // setCancelPopup({
                            //     ...cancelPopup,
                            //     show: true,
                            //     page: actionTab
                            // })
                            handleCancelProgramRequest();
                          }}
                          className="!text-[12px]"
                        >
                          <img
                            src={CloseCircle}
                            alt="CancelIcon"
                            className="pr-3 w-[27px]"
                          />
                          Cancel Request
                        </MenuItem>
                      </div>
                  )}
                {/* mentee Cancel Request */}

                {["new", "pending"].includes(seletedItem.status) &&
                  role === "mentee" &&
                  (actionTab === "program_cancel" ||
                    actionTab === "program_join") && (
                    <MenuItem
                      onClick={() => {
                        // setCancelPopup({
                        //     ...cancelPopup,
                        //     show: true,
                        //     page: actionTab
                        // })
                        handleCancelProgramRequest();
                      }}
                      className="!text-[12px]"
                    >
                      <img
                        src={CloseCircle}
                        alt="CancelIcon"
                        className="pr-3 w-[27px]"
                      />
                      Cancel Request
                    </MenuItem>
                  )}
                   <MenuItem
                  className="!text-[12px]"
                  onClick={() => {
                    handleClose();
                    setShowShare(true);
                  }}
                >
                  <img
                    src={ShareIcon}
                    alt="ShareIcon"
                    className="pr-3 w-[25px]"
                  />
                  Share
                </MenuItem>
              </Menu>
            </>
          );
        },
      },
    },
  ];

  const goalColumns = [
    {
      field: "goal_name",
      headerName: "Goal Name",
      flex: 1,
      id: 0,
      for: ["admin", "mentor"],
      renderCell: (params) => {
        return (
          <div className="flex gap-2 items-center">
            {params?.row?.goal?.goal_name ?? "..."}
          </div>
        );
      },
    },
    {
      field: "reason_request",
      headerName: "Description",
      flex: 1,
      id: 1,
      for: ["admin", "mentor"],
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
    ...goalsRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
        // if (params.row.status !== "new" && params.row.status !== "pending" && params.row.status !== "accept")
        //     return <></>;
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
                  navigate(
                    `/view-goal/${seletedItem?.goal?.id}?requestId=${seletedItem.id}`
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

              {role === "admin" && (
                <>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={handleAcceptGoalRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={TickCircle}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        Approve
                      </MenuItem>
                      <MenuItem
                        onClick={handleCancelGoalRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        Reject
                      </MenuItem>
                    </>
                  )}
                </>
              )}
              {role === "mentee" && (
                <MenuItem
                  onClick={() => handleCancelGoalRequest()}
                  className="!text-[12px]"
                >
                  <img
                    src={CloseCircle}
                    alt="CancelIcon"
                    className="pr-3 w-[27px]"
                  />
                  Cancel Request
                </MenuItem>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const membersColumns = [
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
                  navigate(`/mentor-details/${seletedItem.id}`, {
                    state: {
                      reqType: "member_join_request",
                    },
                  });
                }}
                className="!text-[12px]"
              >
                <img
                  src={ViewIcon}
                  alt="ViewIcon"
                  field={params.id}
                  className="pr-3 w-[30px]"
                />
                View Profile
              </MenuItem>

              {role === "admin" && (
                <>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={handleMemberAcceptRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={TickCircle}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        Approve
                      </MenuItem>
                      <MenuItem
                        onClick={handleMemberCancelRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        Reject
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate("/bgVerify")}
                        className="!text-[12px]"
                      >
                        <img
                          src={Bg_verificatin_icon}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        BG verification
                      </MenuItem>
                      <MenuItem
                        onClick={handleRedirectDocuSign}
                        className="!text-[12px]"
                      >
                        <img
                          src={DocuSign_icon}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        DocuSign
                      </MenuItem>
                    </>
                  )}

                  {/* <MenuItem onClick={() => undefined} className='!text-[12px]'>
                                    <img src={ShareIcon} alt="ShareIcon" className='pr-3 w-[27px]' />
                                    Share
                                </MenuItem> */}
                </>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const resourceColumns = [
    ...resourceAccessRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
              onClick={(e) => handleMoreClick(e, params.row)}
            >
              <img src={MoreIcon} alt="MoreIcon" />
            </div>
          </>
        );
      },
    },
  ];

  const reportRequestColumn = [
    ...reportRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background: requestStatusColor[params.row.status]?.bg || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
              {role === "admin" && (
                <>
                  <MenuItem
                    onClick={() => navigate(`/view-report/${seletedItem?.id}`)}
                    className="!text-[12px]"
                  >
                    <img
                      src={ViewIcon}
                      alt="AcceptIcon"
                      className="pr-3 w-[27px]"
                    />
                    View
                  </MenuItem>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={handleAcceptReportsRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={TickCircle}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        Approve
                      </MenuItem>
                      <MenuItem
                        onClick={handleCancelReportRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        Reject
                      </MenuItem>
                    </>
                  )}
                </>
              )}
              {role === "mentor" && (
                <>
                  <MenuItem
                    onClick={() => navigate(`/view-report/${seletedItem?.id}`)}
                    className="!text-[12px]"
                  >
                    <img
                      src={ViewIcon}
                      alt="ViewIcon"
                      className="pr-3 w-[27px]"
                    />
                    View
                  </MenuItem>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={() => handleCancelReportRequest()}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        Cancel Request
                      </MenuItem>
                    </>
                  )}
                </>
              )}
            </Menu>
          </>
        );
      },
    },
  ];
  const extendRequestColumn = [
    ...programExtendRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background: requestStatusColor[params.row.status]?.bg || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
              {role === "admin" && (
                <>
                  <MenuItem
                    onClick={() =>
                      navigate(`/view-report/${seletedItem.report_id}`)
                    }
                    className="!text-[12px]"
                  >
                    <img
                      src={TickCircle}
                      alt="AcceptIcon"
                      className="pr-3 w-[27px]"
                    />
                    View
                  </MenuItem>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={handleAcceptReportsRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={TickCircle}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        Approve
                      </MenuItem>
                      <MenuItem
                        onClick={handleCancelReportRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        Reject
                      </MenuItem>
                    </>
                  )}
                </>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const techinicalColums = [
    ...techinicalSupportRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      id: 4,
    },
  ];

  const certificateColumns = [
    ...certificateRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
              {role === "admin" && (
                <>
                  <MenuItem
                    onClick={() =>
                      navigate(`/certificate_mentees/${seletedItem.program}`, {
                        state: {
                          rowId: seletedItem?.id,
                          status: seletedItem?.status,
                        },
                      })
                    }
                    className="!text-[12px]"
                  >
                    <img
                      src={ViewIcon}
                      alt="AcceptIcon"
                      className="pr-3 w-[27px]"
                    />
                    View
                  </MenuItem>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={handleAcceptCeritificateRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={TickCircle}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        Approve
                      </MenuItem>
                      {/* <MenuItem
                                                    onClick={handleCancelCeritificateRequest}
                                                    className="!text-[12px]"
                                                >
                                                    <img
                                                        src={CloseCircle}
                                                        alt="CancelIcon"
                                                        className="pr-3 w-[27px]"
                                                    />
                                                    Reject
                                                </MenuItem> */}
                    </>
                  )}
                </>
              )}
              {role === "mentor" && (
                <>
                  <MenuItem
                    onClick={() =>
                      navigate(`/certificate_mentees/${seletedItem.program}`, {
                        state: {
                          rowId: seletedItem?.id,
                          status: seletedItem?.status,
                        },
                      })
                    }
                    className="!text-[12px]"
                  >
                    <img
                      src={ViewIcon}
                      alt="AcceptIcon"
                      className="pr-3 w-[27px]"
                    />
                    View
                  </MenuItem>
                  {["new", "pending"].includes(seletedItem.status) && (
                  <MenuItem
                    onClick={() =>
                      // navigate(`/certificate_mentees/${seletedItem.program}`, {
                      //     state: {
                      //         rowId: seletedItem?.id,
                      //         status: seletedItem?.status
                      //     }
                      // })
                      handleCancelCeritificateRequest()
                    }
                    className="!text-[12px]"
                  >
                    <img
                      src={CloseCircle}
                      alt="CancelIcon"
                      className="pr-3 w-[27px]"
                    />
                    Cancel Request
                  </MenuItem>
                  )}
                </>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  const testimonialRequestColumn = [
    ...testimonialRequestColumns,
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      id: 2,
      renderCell: (params) => {
        return (
          <>
            <div className="cursor-pointer flex items-center h-full relative">
              <span
                className="w-[80px] flex justify-center h-[30px] px-7"
                style={{
                  background:
                    requestStatusColor[params.row.status]?.bgColor || "",
                  lineHeight: "30px",
                  borderRadius: "3px",
                  width: "110px",
                  height: "34px",
                  color: requestStatusColor[params.row.status]?.color || "",
                  fontSize: "12px",
                }}
              >
                {requestStatusText[params.row.status] || ""}
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
              {role === "admin" && (
                <>
                  <MenuItem
                    onClick={() =>
                      navigate(`/testimonialView/${seletedItem.request_id}`)
                    }
                    className="!text-[12px]"
                  >
                    <img
                      src={ViewIcon}
                      alt="AcceptIcon"
                      className="pr-3 w-[27px]"
                    />
                    View
                  </MenuItem>
                  {(seletedItem.status === "new" ||
                    seletedItem.status === "pending") && (
                    <>
                      <MenuItem
                        onClick={handleAcceptCeritificateRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={TickCircle}
                          alt="AcceptIcon"
                          className="pr-3 w-[27px]"
                        />
                        Approve
                      </MenuItem>
                      <MenuItem
                        onClick={handleCancelTestimonialRequest}
                        className="!text-[12px]"
                      >
                        <img
                          src={CloseCircle}
                          alt="CancelIcon"
                          className="pr-3 w-[27px]"
                        />
                        Reject
                      </MenuItem>
                    </>
                  )}
                </>
              )}
              {role === "mentor" && (
                <MenuItem
                  onClick={() =>
                    navigate(`/testimonialView/${seletedItem.request_id}`)
                  }
                  className="!text-[12px]"
                >
                  <img
                    src={ViewIcon}
                    alt="AcceptIcon"
                    className="pr-3 w-[27px]"
                  />
                  View
                </MenuItem>
              )}
            </Menu>
          </>
        );
      },
    },
  ];

  let learningAccessRequestsColumn = learningAccessRequestsColumns.filter(
    (request) => request.for.includes(role)
  );
  let newGoalsRequestsColumn = newGoalsRequestsColumns.filter((request) =>
    request.for.includes(role)
  );

  const handleClick = (menu) => {
    navigate(`/all-request?type=${menu.status}`);
    handleStatus("all");
    setFilter({ search: "", filter_by: "" });
    if (menu?.status === "goal_request") {
      setActiveTab("mentor");
    }
    // handleResetTab()
  };

  const getProgramRequestApi = () => {
    let payload = {
      request_type: actionTab,
      ...(filterStatus !== "all" ? { status: filterStatus } : ""),
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
      ...(filter.search !== "" && { search: filter.search }),
      ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
    };

    if (role === "mentor") {
      if (selectedTab === "mentees") {
        payload.request_by = "mentee";
      }
      payload.request_type = actionTab;
    }
    if (role === "admin") {
      payload.request_by = selectedTab === "mentees" ? "mentee" : "mentor";
    }
    // handleResetTab(actionTab)
    dispatch(getprogramRequest(payload));
  };

  const getLearningAccessApi = async () => {
    dispatch(
      getlearningAccessRequest({
        ...(filterStatus !== "all" && { status: filterStatus }),
        created_at: "mentor",
        filter_by: "month",
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        ...(filter.search !== "" && { search: filter.search }),
        ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
      })
    );
  };

  const getGoalsRequestApi = (createdBy = actionTab) => {
    dispatch(
      goalsRequest({
        ...(filterStatus !== "all" && { status: filterStatus }),
        // created_by: createdBy,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        ...(filter.search !== "" && { search: filter.search }),
        ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
      })
    );
  };

  const handleNewGoalRequestApi = () => {
    let payload = {
      ...(filter.filter_by !== "" && { time_frame: filter.filter_by }),
      params: "request",
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
      ...(filterStatus !== "all" && { status: filterStatus }),
      // ...((actionTab !== "mentor" && role === "mentor") && { created_by: actionTab ?? "mentor" }),
      // ...((role === "admin") && { created_by: actionTab ?? "mentor" }),
      // created_by: "mentee",
      ...(filter.search !== "" && { search: filter.search }),
    };
    if (role === "admin") {
      if (selectedTab === "my") {
        payload = {
          ...payload,
          created_by: actionTab ?? "mentor",
        };
      } else {
        payload = {
          ...payload,
          created_by: "mentee",
        };
      }
    } else if (actionTab !== "mentor" && role === user.mentor) {
      payload = {
        ...payload,
        created_by: actionTab ?? "mentor",
      };
    }
    dispatch(getAllGoals(payload));

    //   console.log("goal payload ==>", {
    //     ...(filter.filter_by !== ""
    //         ? { time_frame: filter.filter_by }
    //         : { time_frame: "month" }),
    //     params: "request",
    //     page: paginationModel?.page + 1,
    //     limit: paginationModel?.pageSize,
    //     ...(filterStatus !== "all" && { status: filterStatus }),
    //     ...((actionTab !== "mentor" && role === "mentor") && { created_by: actionTab ?? "mentor" }),
    //     ...((role === "admin") && { created_by: actionTab ?? "mentor" }),
    //     ...(filter.search !== "" && { search: filter.search }),
    // })
  };

  const getReportsRequestApi = () => {
    dispatch(
      getReportRequest({
        ...(filterStatus !== "all" && { status: filterStatus }),
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        request_type: "report",
        ...(role === "admin" && { request_by: "mentor" }),
        ...(filter.search !== "" && { search: filter.search }),
        ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
      })
    );
  };

  const getTestimonialRequestApi = () => {
    // console.log("filter.filter_by ===>", filter)
    // dispatch(
    //     getTestimonialRequest({
    //         ...(filterStatus !== "all" ? { status: filterStatus } : ""),
    //         page: paginationModel?.page + 1,
    //         limit: paginationModel?.pageSize,
    //         // request_type: "testimonial",
    //         ...(role === "admin" && { request_by: selectedTab === "mentees" ? "mentee" : "mentor" }),
    //         ...(filter.search !== "" && { search: filter.search }),
    //         ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
    //     })
    // );

    dispatch(
      getTestimonialRequest({
        // ...(filterStatus !== "all" && { rep_status: filterStatus }),
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        // request_type: "testimonial",
        ...(role === "admin" && {
          request_by:
            selectedTab === "admin"
              ? "admin"
              : selectedTab === "mentees"
              ? "mentee"
              : "mentor",
        }),
        ...(filter.search !== "" && { search: filter.search }),
        // ...(filter.filter_by !== ""
        //     ? { filter_by: filter.filter_by }
        //     : { filter_by: "month" }),
      })
    );
  };

  const getCerificateRequestAPi = () => {
    dispatch(
      certificateRequest({
        filterStatus: filterStatus !== "all" ? filterStatus : "",
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize ?? 10,
        request_type: "certificate",
        ...(role === "admin" && { request_by: "mentor" }),
        ...(filter.search !== "" && { search: filter.search }),
        ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
      })
    );
  };

  const getMembersRequestApi = () => {
    let payload = {
      ...(filterStatus !== "all" && { status: filterStatus }),
      user: "mentor",
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
      ...(filter.search !== "" && { search: filter.search }),
      ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
    };

    if (role === "admin" && selectedTab === "mentees") {
      payload = {
        ...payload,
        user: "mentee",
      };
    }
    dispatch(getMemberRequest(payload));
  };
  const getExtendRequestApi = () => {
    let payload = {
      request_type: "program_extend",
      ...(filterStatus !== "all" ? { status: filterStatus } : ""),
      page: paginationModel?.page + 1,
      limit: paginationModel?.pageSize,
      ...(role === "admin" && { request_by: "mentor" }),
      ...(filter.search !== "" && { search: filter.search }),
      ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
    };

    // if (role === "mentor") {
    //     if (selectedTab === "mentees") {
    //         payload.created_at = "mentee";
    //          payload.request_by = "mentee"
    //     }
    //     payload.request_type = actionTab
    // }
    // if (role === "admin") {
    //     payload.request_by = "mentor"
    // }
    dispatch(getExtendProgramRequest(payload));
  };

  const getResourceRequestApi = () => {
    dispatch(
      getResourceRequest({
        ...(filterStatus !== "all" && { status: filterStatus }),
        // created_at: selectedTab,
        request_type: "learning_material",
        ...(role === "admin" && { request_by: "mentor" }),
        ...(selectedTab === "mentees" && { request_by: "mentee" }),
        ...(filter.search !== "" && { search: filter.search }),
        ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
      })
    );
  };

  const getReopenRequestApi = () => {
    dispatch(
      getReopenRequest({
        ...(filterStatus !== "all" && { rep_status: filterStatus }),
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        request_type: "program_reopen",
        ...(role === "admin" && { request_by: "mentor" }),
        ...(filter.search !== "" && { search: filter.search }),
        ...(filter.filter_by !== "" && { filter_by: filter.filter_by }),
      })
    );
  };

  const handleStatus = (val) => {
    setFilterStatus(val);
    setPaginationModel({
      page: 0,
      pageSize: 10,
    });
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

  useEffect(() => {
    if (selectedRequestedtype && role !== "" && !userInfo.loading) {
      const tab = selectedRequestedtype;
      const requestTabDetails = RequestStatusArray.find(
        (request) => request.key === tab
      );
      let tableDetails = { ...activeTableDetails };
      let actionFilter = [];
      let activeTabName = "";
      switch (tab) {
        case RequestStatus.programRequest.key:
          let programInfoTab = programRequestTab;
          tableDetails = { column: programRequestColumn, data: [] };
          actionFilter = programInfoTab;
          activeTabName =
            selectedTab === "my" && role === "mentee"
              ? "program_join"
              : selectedTab === "mentees" && role === "mentor"
              ? "program_join"
              : selectedTab === "my"
              ? "program_new"
              : selectedTab === "mentees"
              ? "program_join"
              : "program_request";
          if (actionTab !== "program_join" && actionTab !== "program_new") {
            activeTabName = actionTab;
          }

          break;
        case RequestStatus.memberJoinRequest.key:
          tableDetails = { column: memberMentorRequestColumns, data: [] };
          // actionFilter = memberJoinRequestTab
          // .filter(
          //     (request) => request.for.includes(selectedTab)
          // );;
          activeTabName = selectedTab === "mentor" ? "mentor" : "mentee";
          break;
        case RequestStatus.goalRequest.key:
          tableDetails = { column: goalColumns, data: [] };
          // actionFilter = goalsRequestTab.filter(
          //     (request) => request.for.includes(selectedTab)
          // );
          activeTabName = selectedTab === "mentees" ? "mentee" : "mentor";
          break;
        case RequestStatus.resourceAccessRequest.key:
          tableDetails = { column: resourceColumns, data: [] };
          activeTabName = "mentor";
          break;
        case RequestStatus.technicalSupportRequest.key:
          tableDetails = { column: techinicalColums, data: [] };
          break;
        case RequestStatus.testimonicalRequest.key:
          tableDetails = { column: testimonialRequestColumns, data: [] };
          break;
        case RequestStatus.certificateRequest.key:
          tableDetails = { column: certificateColumns, data: [] };
          break;
        case RequestStatus.reportRequest.key:
          tableDetails = { column: reportRequestColumns, data: [] };
          break;
        case RequestStatus.learningAccessRequests.key:
          tableDetails = { column: learningAccessRequestsColumn, data: [] };
          actionFilter = [];
          break;
        case RequestStatus.newGoalsRequests.key:
          tableDetails = { column: newGoalsRequestsColumn, data: [] };
          actionFilter = [];
          break;
        case RequestStatus.extendedRequests.key:
          tableDetails = { column: programExtendRequestColumn, data: [] };
          actionFilter = [];
          break;
        default:
          tableDetails = { column: programRequestTab, data: [] };
          actionFilter = [];
          break;
      }
      setActiveTableDetails(tableDetails);
      setCurrentRequestTab(requestTabDetails);
      setActionTabFilter(actionFilter);
      setActiveTab(activeTabName);
    } else {
      if (role !== "") {
        setActionTabFilter(programRequestTab);
        if (role !== "admin") {
          if (selectedTab === "my") {
            setActiveTab(actionTab ?? "program_new");
          } else if (selectedTab === "mentees") {
            setActiveTab(actionTab ?? "program_join");
          }
        }
      }
    }
  }, [searchParams, role, selectedTab]);

  useEffect(() => {
    // Program update action
    if (status === requestStatus.programupdate) {
      setShowToast({
        show: true,
        message: "Program Request updated successfully",
      });
      getProgramRequestApi();
      if (confirmPopup.show) resetConfirmPopup();
      if (cancelPopup.show) resetCancelReasonPopup();
      setTimeout(() => {
        setShowToast({ show: false, message: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, [3000]);
    }

    // Category load action
    if (status === requestStatus.categoryload) {
      setCategoryPopup({
        show: true,
        selectedItem: [],
        page: currentRequestTab.key,
        tab: actionTab,
      });
      setCategoryInfo({ search: "", list: categoryList });
      setTimeout(() => {
        dispatch(updateLocalRequest({ status: "" }));
      }, 2000);
    }

    // Member update action
    if (
      status === requestStatus.memberupdate ||
      status === requestStatus.membercancel
    ) {
      if (confirmPopup.show) resetConfirmPopup();
      if (categoryPopup.show) handleCloseCategoryPopup();
      getMembersRequestApi();
      setShowToast({
        show: true,
        message: "Member Request updated successfully",
      });
      setTimeout(() => {
        setShowToast({ show: false, message: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, 3000);
    }

    // Goal update action
    if (status === requestStatus.goalupdate) {
      if (confirmPopup.show) resetConfirmPopup();
      if (categoryPopup.show) handleCloseCategoryPopup();
      getGoalsRequestApi();
      setShowToast({
        show: true,
        message: "Goal Request updated successfully",
      });
      setTimeout(() => {
        setShowToast({ show: false, message: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, 3000);
    }

    // Certificate update action
    if (status === requestStatus.certificateupdate) {
      if (confirmPopup.show) resetConfirmPopup();
      if (categoryPopup.show) handleCloseCategoryPopup();
      getCerificateRequestAPi();
      setShowToast({
        show: true,
        message: "Certificate Request updated successfully",
      });
      setTimeout(() => {
        setShowToast({ show: false, message: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, 3000);
    }

    // Report update action
    if (status === requestStatus.reportupdate) {
      if (confirmPopup.show) resetConfirmPopup();
      if (cancelPopup.show) resetCancelReasonPopup();
      getReportsRequestApi();
      setShowToast({
        show: true,
        message: "Reports Request updated successfully",
      });
      setTimeout(() => {
        setShowToast({ show: false, message: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, 3000);
    }

    if (status === requestStatus.testimonialupdate) {
      setShowToast({
        show: true,
        message: "Testimonial Request updated successfully",
      });
      getTestimonialRequestApi();
      if (confirmPopup.show) resetConfirmPopup();
      if (cancelPopup.show) resetCancelReasonPopup();
      setTimeout(() => {
        setShowToast({ show: false, message: "" });
        dispatch(updateLocalRequest({ status: "" }));
      }, [3000]);
    }
  }, [status]);

  useEffect(() => {
    if (selectedRequestedtype === "program_request" || !selectedRequestedtype) {
      let programRequestFilteredColumn = !actionTab
        ? programRequestColumn
        : programRequestColumn?.filter((request) =>
            request?.tab?.includes(actionTab)
          );
      let programRequestMainTabFilteredColumn = !selectedTab
        ? programRequestFilteredColumn
        : programRequestFilteredColumn?.filter((request) =>
            request?.mainTab?.includes(selectedTab)
          );
      setActiveTableDetails({
        column: programRequestMainTabFilteredColumn,
        data: programTableInfo.results,
        rowCount: programTableInfo?.count,
      });
    }

    if (selectedRequestedtype === "member_join_request") {
      setActiveTableDetails({
        column:
          actionTab === "mentor"
            ? [...memberMentorRequestColumns, ...membersColumns]
            : [...memberMenteeRequestColumns, ...membersColumns],
        data: memberRequest?.results,
        rowCount: memberRequest?.count,
      });
    }

    if (selectedRequestedtype === "new_goals_request") {
      setActiveTableDetails({
        column: goalColumns,
        data: goalsRequestInfo?.results,
        rowCount: goalsRequestInfo?.count,
      });
    }
    if (selectedRequestedtype === "certificate_request") {
      setActiveTableDetails({
        column: certificateColumns,
        data: certificateRequestList?.results,
        rowCount: certificateRequestList?.count,
      });
    }

    if (selectedRequestedtype === "resource_access_request") {
      setActiveTableDetails({
        column: resourceColumns,
        data: resourceRequest?.results,
      });
    }

    if (selectedRequestedtype === "report_request") {
      setActiveTableDetails({
        column: reportRequestColumn,
        data: reportsRequestInfo?.results,
        rowCount: reportsRequestInfo?.count,
      });
    }
    if (selectedRequestedtype === "extended_request") {
      setActiveTableDetails({
        column: extendRequestColumn,
        data: programExtendRequests?.results,
        rowCount: programExtendRequests?.count,
      });
    }
    if (selectedRequestedtype === "learning_access_requests") {
      setActiveTableDetails({
        column: learningAccessRequestsColumns,
        data: learningAccessRequests?.results,
        rowCount: learningAccessRequests?.count,
      });
    }
    if (selectedRequestedtype === "testimonial_request") {
      setActiveTableDetails({
        column: testimonialRequestColumn,
        data: testimonialRequest?.results,
        rowCount: testimonialRequest?.count,
      });
    }
    if (selectedRequestedtype === "re_open_request") {
      setActiveTableDetails({
        column: extendRequestColumn,
        data: reopenRequest?.results,
        rowCount: reopenRequest?.count,
      });
    }
    if (selectedRequestedtype === "goal_request") {
      setActiveTableDetails({
        column: goalColumns,
        data: goalsList?.results,
        rowCount: goalsList?.count,
      });
    }
  }, [
    programTableInfo,
    memberRequest,
    resourceRequest,
    programExtendRequests,
    goalsRequestInfo,
    certificateRequestList,
    reportsRequestInfo,
    anchorEl,
    learningAccessRequests,
    testimonialRequest,
    goalsList,
  ]);

  useEffect(() => {
    if (role !== "") {
      if (
        !selectedRequestedtype ||
        selectedRequestedtype === "program_request"
      ) {
        getProgramRequestApi();
      }

      if (selectedRequestedtype === "learning_access_requests") {
        getLearningAccessApi();
      }
      if (selectedRequestedtype === "member_join_request") {
        getMembersRequestApi();
      }

      if (selectedRequestedtype === "resource_access_request") {
        getResourceRequestApi();
      }

      if (selectedRequestedtype === "new_goals_request") {
        getGoalsRequestApi();
      }
      if (selectedRequestedtype === "goal_request") {
        handleNewGoalRequestApi();
      }

      if (selectedRequestedtype === "certificate_request") {
        getCerificateRequestAPi();
      }
      if (selectedRequestedtype === "report_request") {
        getReportsRequestApi();
      }
      if (selectedRequestedtype === "extended_request") {
        getExtendRequestApi();
      }
      if (selectedRequestedtype === "testimonial_request") {
        getTestimonialRequestApi();
      }
      if (selectedRequestedtype === "re_open_request") {
        getReopenRequestApi();
      }
    }
  }, [actionTab, searchParams, filterStatus, role, paginationModel]);

  const footerComponent = (props) => {
    return (
      <div className="flex gap-6 justify-center items-center py-4">
        <button
          onClick={() => {
            setCategoryPopup({ show: false, selectedItem: [] });
            selectedCategory([]);
          }}
          className="py-3 px-6 w-[16%] !border !border-border-black text-font-secondary-black rounded-[3px]"
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

  const resetPageDetails = () => {
    handleStatus("all");
  };

  const handleSearch = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  useEffect(() => {
    if (filter.search !== "") {
      searchParams.set("search", filter.search);
    } else {
      searchParams.delete("search");
    }
    if (filter.filter_by !== "") {
      searchParams.set("filter_by", filter.filter_by);
    } else {
      searchParams.delete("filter_by");
    }
    // setSelectedTab(selectedTab)
    // setActiveTab(actionTab)
    setSearchParams(searchParams);
  }, [filter]);

  useEffect(() => {
    let currentOveriew = [];
    let currentTab = "";
    if (role !== user.mentee) {
      switch (selectedTab) {
        case "my":
          currentOveriew = myRequestOverview;
          currentTab =
            role === "admin" && selectedRequestedtype === "goal_request"
              ? "mentor"
              : role === "mentee"
              ? "program_join"
              : "program_new";
          break;
        case "mentees":
          currentOveriew = menteesRequestOverview;
          currentTab =
            (role === "admin" || role === "mentor") &&
            selectedRequestedtype === "goal_request"
              ? "mentor"
              : "program_join";
          break;
        case "admin":
          currentOveriew = adminRequestOverview;
          currentTab = "program_request";
          break;

        default:
          break;
      }
    } else {
      currentOveriew = myRequestOverview?.filter((e) =>
        e?.for.includes(user?.mentee)
      );
      currentTab = "program_join";
    }
    setActiveTab(
      selectedRequestedtype === "member_join_request" ? "mentor" : currentTab
    );
    setRequestOverview(currentOveriew);
  }, [selectedTab, selectedRequestedtype]);

  const handleSelectCategory = (value) => {
    if (selectedRequestedtype === "member_join_request") {
      if (selectedCategory?.includes(value)) {
        setSelectedCategory(selectedCategory.filter((e) => e !== value));
      } else {
        setSelectedCategory([...selectedCategory, value]);
      }
    } else {
      setSelectedCategory(value);
    }
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
              checked={
                selectedRequestedtype === "member_join_request"
                  ? selectedCategory.includes(params?.row?.categories_id)
                  : selectedCategory === params?.row?.categories_id
              }
              onChange={() => handleSelectCategory(params.row.categories_id)}
            />
          </div>
        );
      },
    },
    ...categoryColumns,
  ];

  const breadcrumbs = [
    <Link variant="body2" underline="hover" key="1" color="inherit" href="#">
      Objective
    </Link>,
    <Typography key="2" variant="body2" color={"primary"}>
      All Request
    </Typography>,
  ];

  return (
    <div className="program-request px-8 mt-10">
      {role === "mentor" && (
        <div className="flex gap-x-4 mb-6">
          {requestActionTab.map((action) => {
            return (
              <Button
                onClick={handleChange(action.value)}
                btnCategory={selectedTab === action.value ? "primary" : ""}
                btnName={action.name}
              />
            );
          })}
        </div>
      )}

      {role === "admin" && (
        // requestAdminActionTab
        <div className="flex gap-x-4 mb-6">
          {requestAdminActionTab.map((action) => {
            return (
              <Button
                onClick={handleChange(action.value)}
                btnCategory={selectedTab === action.value ? "primary" : ""}
                btnName={action.name}
              />
            );
          })}
        </div>
      )}
      <div
        className="px-3 py-5"
        style={{
          boxShadow:
            role === "admin"
              ? "4px 4px 25px 0px rgba(0, 0, 0, 0.15)"
              : undefined,
        }}
      >
        {/* {role === 'admin' &&
                    <Breadcrumbs
                        className="pb-4"
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                } */}

        {/* {showToast.show && (
                    <ToastNotification
                        message={showToast.message}
                        handleClose={handleClose}
                    />
                )} */}

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showToast.show}
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
                {showToast.message}
              </p>
            </div>
          </div>
        </Backdrop>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => 1 }}
          open={confirmPopup.show}
        >
          <div className="popup-content w-2/6 bg-white flex flex-col gap-2 h-[330px] justify-center items-center">
            <img
              src={
                confirmPopup.type === "approve"
                  ? TickColorIcon
                  : confirmPopup.type === "reject"
                  ? CancelColorIcon
                  : ""
              }
              alt="TickColorIcon"
            />
            <span
              style={{ color: "#232323", fontWeight: 600, fontSize: "24px" }}
            >
              {confirmPopup.type === "approve"
                ? "Approve"
                : confirmPopup.type === "reject"
                ? "Reject"
                : ""}
            </span>
            <div className="py-5">
              <p
                style={{
                  color: "rgba(24, 40, 61, 1)",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                Are you sure want to {confirmPopup.type} {confirmPopup.title}?
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex gap-6 justify-center align-middle">
                <Button
                  btnCls="w-[110px]"
                  btnName={
                    confirmPopup.type === "approve"
                      ? "Cancel"
                      : confirmPopup.type === "reject"
                      ? "No"
                      : ""
                  }
                  btnCategory="secondary"
                  onClick={handleCancelConfirmPopup}
                />
                <Button
                  btnType="button"
                  btnCls="w-[110px]"
                  btnName={
                    confirmPopup.type === "approve"
                      ? "Approve"
                      : confirmPopup.type === "reject"
                      ? "Yes"
                      : ""
                  }
                  style={{
                    background:
                      confirmPopup.type === "approve" ? "#16B681" : "#E0382D",
                  }}
                  btnCategory="primary"
                  onClick={handleConfirmPopup}
                />
              </div>
            </div>
          </div>
        </Backdrop>

        {/* {'Cancel Popup'} */}
        <MuiModal
          modalSize="md"
          modalOpen={cancelPopup.show}
          modalClose={handleCloseCancelReasonPopup}
          noheader
        >
          <div className="px-5 py-5">
            <div className="flex justify-center flex-col gap-5  mt-4 mb-4 border border-background-primary-main rounded-[10px]">
              <div className="flex justify-between px-3 py-4 items-center border-b border-background-primary-main">
                <p
                  className="text-[18px]"
                  style={{ color: "rgba(0, 0, 0, 1)" }}
                >
                  {role === "admin" ? "Reject Request Reason" : "Cancel Reason"}
                </p>
                <img
                  className="cursor-pointer"
                  onClick={handleCloseCancelReasonPopup}
                  src={CancelIcon}
                  alt="CancelIcon"
                />
              </div>

              <div className="px-5">
                {/* {error !== "" ? (
                                    <p className="error" role="alert">
                                        {error}
                                    </p>
                                ) : null} */}

                <form onSubmit={handleSubmit(handleCancelReasonPopupSubmit)}>
                  <div className="relative pb-8">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                      {role === "admin" ? "Reject Reason" : "Cancel Reason"}
                    </label>

                    <div className="relative">
                      <textarea
                        {...register("cancel_reason", {
                          required: "This field is required",
                        })}
                        id="message"
                        rows="4"
                        className={`block p-2.5 input-bg w-full text-sm text-gray-900  border
                                                                   focus-visible:outline-none focus-visible:border-none border-2 border-background-primary-main`}
                        placeholder={""}
                      ></textarea>
                      {errors["cancel_reason"] && (
                        <p className="error" role="alert">
                          {errors["cancel_reason"].message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center gap-5 items-center pt-5 pb-10">
                    <Button
                      btnName="Cancel"
                      btnCls="w-[18%]"
                      btnCategory="secondary"
                      onClick={handleCloseCancelReasonPopup}
                    />
                    <button
                      type="submit"
                      className="text-white py-3 px-7 w-[18%] bg-background-primary-main rounded-[3px]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </MuiModal>

        {/* { 'Select Categort Popup'} */}
        <MuiModal
          modalSize="md"
          modalOpen={categoryPopup.show}
          modalClose={handleCloseCategoryPopup}
          noheader
        >
          <div className="px-5 py-5">
            <div className="flex justify-center flex-col gap-5 px-5 pb-5 mt-4 mb-4 !border !border-background-primary-main rounded-[10px]">
              <div className="flex justify-between px-3 py-4 items-center !border-b !border-background-primary-main">
                <p
                  className="text-[18px]"
                  style={{ color: "rgba(0, 0, 0, 1)" }}
                >
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
                    className="block w-full p-2 text-sm text-gray-900 border border-background-primary-main"
                    placeholder="Search here..."
                    style={{
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
                columns={
                  categoryPopup.page === "goal_request"
                    ? categoryColumn
                    : categoryColumn
                }
                height={"460px"}
                footerComponent={footerComponent}
                hideCheckbox
                // hideCheckbox={categoryPopup.page === "goal_request"}
                // selectedAllRows={categoryPopup.selectedItem}
              />
            </div>
          </div>
        </MuiModal>

        <div className="px-4">
          <div className="grid grid-cols-5 gap-3">
            <div className="row-span-3 flex flex-col gap-8">
              <Card
                cardTitle={"Request Overview"}
                cardContent={requestList}
                handleClick={handleClick}
                activeItem={currentRequestTab?.key}
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
                  <div
                    className="flex gap-4"
                    style={{ color: "rgba(24, 40, 61, 1)", fontWeight: 600 }}
                  >
                    {currentRequestTab?.name}
                  </div>
                  <div className="flex gap-7 items-center">
                    <div className="relative">
                      <input
                        type="text"
                        id="search-navbar"
                        className="block w-full p-2 text-sm text-gray-900 border border-background-primary-main"
                        placeholder="Search here..."
                        style={{
                          height: "45px",
                          width: "280px",
                        }}
                        value={filter.search}
                        onChange={handleSearch}
                      />
                      <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                        <img src={SearchIcon} alt="SearchIcon" />
                      </div>
                    </div>
                    {/* <img src={SearchIcon} alt="statistics" /> */}

                    <p
                      className="text-[12px] py-2 pl-5 pr-4 flex gap-4 border border-border-black"
                      style={{
                        borderRadius: "5px",
                      }}
                    >
                      <img src={CalendarIcon} alt="CalendarIcon" />

                      <select
                        className="focus:outline-none"
                        style={{
                          border: "none",
                        }}
                        onChange={(e) =>
                          setFilter({ ...filter, filter_by: e.target.value })
                        }
                      >
                        <option value="" selected={filter.filter_by === ""}>
                          All
                        </option>
                        <option
                          value="month"
                          selected={filter.filter_by === "month"}
                        >
                          Month
                        </option>
                        <option
                          value="day"
                          selected={filter.filter_by === "day"}
                        >
                          Day
                        </option>
                      </select>
                    </p>

                    {/* <p className="text-[12px] py-2 pl-5 pr-4 flex gap-4" style={{ background: 'rgba(29, 91, 191, 1)', borderRadius: '5px', height: '40px' }}>
                                            <select className='focus:outline-none' style={{ background: 'rgba(29, 91, 191, 1)', border: 'none', color: '#fff' }} onChange={(e) => handleStatus(e?.target?.value)}>

                                                {
                                                    statusOptions.map((option, index) =>
                                                        <option style={{ background: '#fff !important', color: '#000' }} key={index} selected={option?.value === filterStatus} value={option?.value}>{option?.label}</option>
                                                    )
                                                }
                                            </select>                                            
                                        </p> */}
                    <SelectBox
                      value={filterStatus}
                      handleChange={(e) => handleStatus(e?.target?.value)}
                      menuList={statusOptions}
                    />
                  </div>
                </div>

                <div className="px-6 py-7 program-info">
                  {actionTabFilter.length ? (
                    <div className="flex justify-between px-5 mb-8 items-center border-b-2 ">
                      <ul className="tab-list">
                        {actionTabFilter.map((discussion, index) => (
                          <li
                            className={`${
                              actionTab === discussion.key ? "active" : ""
                            } relative`}
                            key={index}
                            onClick={() => {
                              setActiveTab(discussion.key);
                              resetPageDetails();
                              // setFilter({ search: '', filter_by: '' })
                            }}
                          >
                            {/* <div className='flex justify-center pb-1'>
                                                                    <div className={`total-proram-count relative ${actionTab === discussion.key ? 'active' : ''}`}>10

                                                                        <p className='notify-icon'></p>
                                                                    </div>
                                                                </div> */}
                            <div className="text-[13px]">
                              {" "}
                              {`${discussion.name}`}
                            </div>
                            {actionTab === discussion.key && <span></span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <Backdrop
                    sx={{ zIndex: (theme) => 999999999 }}
                    open={loading || goalLoading}
                  >
                    <CircularProgress sx={{ color: "white" }} />
                  </Backdrop>

                  <DataTable
                    rows={activeTableDetails.data}
                    columns={activeTableDetails.column}
                    hideFooter={!activeTableDetails?.data?.length}
                    rowCount={activeTableDetails?.rowCount}
                    paginationModel={paginationModel}
                    setPaginationModel={setPaginationModel}
                  />
                      <MuiModal
                    modalOpen={showShare}
                    modalClose={() => setShowShare(false)}
                    noheader
                  >
                    <div className="px-5 py-1 flex justify-center items-center border border-font-primary-main">
                      <div className="flex justify-center items-center flex-col gap-8 py-10 px-5 sm:px-20 mt-5">
                        <div>{seletedItem?.program_name}</div>
                        <input
                          className="input-bg text-sm h-12 w-full sm:w-[396px] px-5 rounded-full"
                          disabled
                          value={shareUrl}
                        />
                        <div className="flex gap-7">
                          <img
                            className="cursor-pointer"
                            src={LinkIcon}
                            alt="Link Icon"
                            onClick={handleCopy}
                          />
                        </div>

                        <div className="flex justify-center align-middle pt-4">
                          <Button
                            btnType="button"
                            onClick={() => setShowShare(false)}
                            btnName="Close"
                            btnCategory="primary"
                          />
                        </div>
                      </div>
                    </div>
                  </MuiModal>
                  {message && (
                    <ToastNotification
                      openToaster={message}
                      message={"URL copied!"}
                      handleClose={handleCloseNotify}
                      toastType={"success"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
